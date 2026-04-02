import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const generateContentWithRetry = async (params: any, maxRetries = 3) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      retries++;
      console.warn(`API call failed (attempt ${retries}/${maxRetries}):`, error.message || error);
      if (retries >= maxRetries) {
        throw error;
      }
      // Exponential backoff: 2s, 4s, 8s
      const delay = Math.pow(2, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
};

export const generateQuestionsFromText = async (pages: string[]): Promise<Question[]> => {
  try {
    // Split text into overlapping chunks by PAGES to ensure no questions are missed at boundaries
    const chunkSize = 5; // 5 pages per chunk
    const overlap = 1;   // 1 page overlap
    const chunks: string[] = [];
    
    for (let i = 0; i < pages.length; i += (chunkSize - overlap)) {
      const chunkPages = pages.slice(i, i + chunkSize);
      chunks.push(chunkPages.join('\n\n--- SAHIFA CHEGARASI ---\n\n'));
      if (i + chunkSize >= pages.length) break;
    }

    const allQuestions: Question[] = [];
    const seenQuestions = new Set<string>();
    const results: Question[][] = [];
    
    // Process chunks in batches to avoid API rate limits and ensure 100% success
    const batchSize = 5;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const batchPromises = batch.map(async (chunk, index) => {
        try {
          const response = await generateContentWithRetry({
            model: "gemini-3-flash-preview",
            contents: `
              Sizga PDF faylning bir necha sahifasidan olingan matn beriladi.
              Vazifangiz: Matndagi BARCHA matematika test savollarini 100% to'liq, hech birini qoldirmasdan, KETMA-KETLIKDA ajratib olish va JSON formatida qaytaring.
              Agar savol sahifa oxirida uzilib qolgan bo'lsa va keyingi sahifada davom etsa, uni to'liq qilib birlashtiring.
              Faqat to'liq savollarni oling. Savollar matnda qanday kelsa, xuddi shu ketma-ketlikda bo'lishi shart.
              
              Format:
              {
                "id": number,
                "text": "savol matni",
                "options": ["A", "B", "C", "D"],
                "correctAnswer": index
              }

              Matn:
              ${chunk}
            `,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.NUMBER },
                    text: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.NUMBER }
                  },
                  required: ["id", "text", "options", "correctAnswer"]
                }
              }
            }
          });

          let text = response.text || "[]";
          try {
            return JSON.parse(text) as Question[];
          } catch (err) {
            console.warn("Incomplete JSON detected, attempting to recover...");
            let fixedText = text.trim();
            let lastBrace = fixedText.lastIndexOf('}');
            
            while (lastBrace !== -1) {
              fixedText = fixedText.substring(0, lastBrace + 1);
              try {
                return JSON.parse(fixedText + ']') as Question[];
              } catch (e) {
                // If parsing fails, this '}' might be inside a string.
                // Remove it and look for the previous '}'
                fixedText = fixedText.substring(0, fixedText.length - 1);
                lastBrace = fixedText.lastIndexOf('}');
              }
            }
            
            console.error("Failed to recover JSON chunk.");
            return [];
          }
        } catch (err) {
          console.error(`Chunk processing error:`, err);
          return [];
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    let currentId = 1;
    for (const chunkQuestions of results) {
      for (const q of chunkQuestions) {
        // Create a unique key for de-duplication (normalize spaces)
        const normalizedText = q.text.replace(/\s+/g, ' ').trim();
        const uniqueKey = `${normalizedText}_${q.options[0]}`;
        
        if (!seenQuestions.has(uniqueKey)) {
          seenQuestions.add(uniqueKey);
          allQuestions.push({
            ...q,
            id: currentId++
          });
        }
      }
    }

    return allQuestions;
  } catch (error) {
    console.error("AI Question Generation Error:", error);
    return [];
  }
};

export const chatWithAI = async (message: string): Promise<string> => {
  try {
    const response = await generateContentWithRetry({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "Siz matematika o'qituvchisisiz. Savollarga qisqa va aniq javob bering."
      }
    });
    return response.text || "Kechirasiz, javob bera olmayman.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Xatolik yuz berdi.";
  }
};
