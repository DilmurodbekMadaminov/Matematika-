import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const generateContentWithRetry = async (params: any, maxRetries = 6) => {
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
      // Backoff (2s, 4s, 8s, 16s, 32s)
      const delay = Math.pow(2, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error("Max retries exceeded");
};

export const generateQuestionsFromText = async (pages: string[]): Promise<Question[]> => {
  try {
    // Split text into overlapping chunks by PAGES to ensure no questions are missed at boundaries
    // Processing 1 page per chunk to perfectly map to "har bir betidagi testlar" as requested, ensuring zero overlap duplicates
    const chunkSize = 1; 
    const overlap = 0;    // No overlap minimizes duplication 
    const chunks: string[] = [];
    
    for (let i = 0; i < pages.length; i += 1) {
      chunks.push(pages[i]);
    }

    const results: Question[][] = [];
    
    // Process chunks concurrently in massive batches to achieve extreme speed, matching Google AI Studio performance
    const batchSize = 100;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const batchPromises = batch.map(async (chunk, index) => {
        try {
          const response = await generateContentWithRetry({
            model: "gemini-3-flash-preview",
            contents: `
              Sizga PDF fayldan olingan BIR DONA SAHIFA matni beriladi.
              Ushbu sahifadagi BARCHA matematika test savollarini KETMA-KETLIKDA, hech birini tushirib qoldirmasdan ajratib oling va JSON formatida qaytaring.
              Agar savol sahifada chala bo'lsa (keyingi betga o'tib ketgan), o'z holicha (qanchasi bo'lsa shunchasini) savol sifatida qabul qilavering.
              DIQQAT: Matnda yo'q, o'ylab topilgan yoki qo'shimcha savollarni mutlaqo qo'shmang! Faqat shu sahifada bor savollarni oling.
              Sahifadagi barcha real test savollarini 100% to'liq chiqaring, ularni birlashtirmang yoki qisqartirmang.
              
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
              maxOutputTokens: 8192,
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
    const allQuestions: Question[] = [];
    
    for (const chunkQuestions of results) {
      for (const q of chunkQuestions) {
        if (!q || !q.text || q.text.length < 5) continue; // Skip empty/garbage
        
        allQuestions.push({
          ...q,
          id: currentId++
        });
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
