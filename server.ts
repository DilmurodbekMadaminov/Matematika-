import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let firestoreDb: any = null;

async function getFirestoreDb() {
  if (firestoreDb) return firestoreDb;
  
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const { initializeApp } = await import('firebase/app');
      const { getFirestore } = await import('firebase/firestore');
      const app = initializeApp(firebaseConfig);
      firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
      console.log("[Firebase Server] Initialized Firestore successfully with database ID:", firebaseConfig.firestoreDatabaseId);
    } catch (err) {
      console.error("[Firebase Server Setup Error]:", err);
    }
  } else {
    console.log("[Firebase Server] firebase-applet-config.json not found, skipping cloud persistence.");
  }
  return firestoreDb;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  app.get('/pdf.worker.min.mjs', (req, res) => {
    try {
      const workerPaths = [
        path.join(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs'),
        path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs'),
        path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs')
      ];

      for (const p of workerPaths) {
        if (fs.existsSync(p)) {
          res.setHeader('Content-Type', 'application/javascript');
          return res.sendFile(p);
        }
      }

      console.error("[Worker Server] Could not locate pdf.worker.min.mjs in any standard locations");
      res.status(404).send('Worker file not found on server');
    } catch (err: any) {
      console.error("[Worker Server Output Error]:", err);
      res.status(500).send("Worker loading system error: " + err.message);
    }
  });

  app.post('/api/generate-content', async (req, res) => {
    try {
      const { params } = req.body;
      const { GoogleGenAI } = await import("@google/genai");
      const apiKey = process.env.GEMINI_API_KEY || "";
      const ai = new GoogleGenAI({ apiKey });
      
      try {
        const response = await ai.models.generateContent(params);
        return res.json({ text: response.text });
      } catch (firstError: any) {
        const errStr = String(
          firstError?.message || 
          firstError?.error?.message || 
          firstError?.statusText || 
          (typeof firstError === 'string' ? firstError : JSON.stringify(firstError)) || 
          ""
        ).toUpperCase();
        const errStatus = String(firstError?.status || firstError?.error?.status || "").toUpperCase();
        const errCode = String(firstError?.status || firstError?.code || firstError?.error?.code || "");
        
        const isQuotaOrTransientError = 
          errStr.includes("429") || 
          errStr.includes("503") ||
          errStr.includes("500") ||
          errStr.includes("RESOURCE_EXHAUSTED") || 
          errStr.includes("QUOTA") || 
          errStr.includes("LIMIT") ||
          errStr.includes("UNAVAILABLE") ||
          errStr.includes("DEMAND") ||
          errStr.includes("TEMPORARY") ||
          errStr.includes("OVERLOAD") ||
          errStr.includes("CAPACITY") ||
          errStr.includes("BUSY") ||
          errStr.includes("EXHAUSTED") ||
          errStr.includes("DOWN") ||
          errStr.includes("SERVICE") ||
          errStatus.includes("UNAVAILABLE") ||
          errStatus.includes("RESOURCE_EXHAUSTED") ||
          errStatus.includes("TEMPORARY") ||
          errCode === "503" ||
          errCode === "429";
                             
        // If it is a quota or transient/high-demand error and the model is gemini-3.5-flash, fallback to gemini-3.1-flash-lite
        if (isQuotaOrTransientError && params.model === "gemini-3.5-flash") {
          console.log("[Model Router] Routing request to alternative queue (gemini-3.1-flash-lite)...");
          const backupParams = { ...params, model: "gemini-3.1-flash-lite" };
          try {
            const response = await ai.models.generateContent(backupParams);
            return res.json({ 
              text: response.text, 
              warning: "Active model selection adjusted to gemini-3.1-flash-lite for peak responsiveness" 
            });
          } catch (secondError: any) {
            throw secondError; // Throw the error if the fallback also fails
          }
        } else if (isQuotaOrTransientError && params.model === "gemini-3.1-flash-lite") {
          console.log("[Model Router] Routing request to alternative queue (gemini-3.5-flash)...");
          const backupParams = { ...params, model: "gemini-3.5-flash" };
          try {
            const response = await ai.models.generateContent(backupParams);
            return res.json({ 
              text: response.text, 
              warning: "Active model selection adjusted to gemini-3.5-flash for peak responsiveness" 
            });
          } catch (secondError: any) {
            throw secondError;
          }
        }
        throw firstError;
      }
    } catch (error: any) {
      const errStr = String(error?.message || error || "").toUpperCase();
      const isExpectedOrQuota = 
        errStr.includes("429") || 
        errStr.includes("503") || 
        errStr.includes("RESOURCE_EXHAUSTED") || 
        errStr.includes("QUOTA") || 
        errStr.includes("LIMIT");

      if (isExpectedOrQuota) {
        console.warn('Gemini API Expected/Quota Warning:', error.message || error);
      } else {
        console.error('Gemini API Error:', error);
      }
      res.status(500).json({ error: error.message || error });
    }
  });

  app.post('/api/parse-document', async (req, res) => {
    try {
      const { fileBase64, fileName } = req.body;
      if (!fileBase64) {
        return res.status(400).json({ error: 'Fayl jo\'natilmadi' });
      }

      const buffer = Buffer.from(fileBase64, 'base64');
      const name = fileName.toLowerCase();
      let pageTexts: string[] = [];

      if (name.endsWith('.pdf')) {
        try {
          let pdfParse = require('pdf-parse');
          if (pdfParse && typeof pdfParse.default === 'function') {
            pdfParse = pdfParse.default;
          } else if (pdfParse && typeof pdfParse === 'object' && typeof pdfParse.pdfParse === 'function') {
            pdfParse = pdfParse.pdfParse;
          }
          
          if (typeof pdfParse !== 'function') {
            throw new Error('pdf-parse target is not a function');
          }

          const listPages: string[] = [];
          const parseOptions = {
            pagerender: function(pageData: any) {
              return pageData.getTextContent().then(function(textContent: any) {
                let lastY: number | null = null;
                let text = "";
                if (textContent && textContent.items) {
                  for (const item of textContent.items) {
                    if (!("str" in item)) continue;
                    const y = item.transform[5];
                    if (lastY !== null && Math.abs(y - lastY) > 5) {
                      text += "\n";
                    } else if (lastY !== null) {
                      text += " ";
                    }
                    text += item.str;
                    lastY = y;
                  }
                }
                listPages.push(text);
                return text;
              });
            }
          };

          await pdfParse(buffer, parseOptions);
          pageTexts = listPages;
          console.log(`[Server Document Extraction] Successfully parsed "${fileName}" via pdf-parse: ${pageTexts.length} pages.`);
        } catch (pdfParseErr: any) {
          console.error('[Server Document Extraction] pdf-parse failed, falling back to pdfjs-dist:', pdfParseErr);
          let pdfjsLib;
          try {
            pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
          } catch (err) {
            try {
              pdfjsLib = await import('pdfjs-dist');
            } catch (err2: any) {
              throw new Error('PDF.js ni serverda yuklashda xatolik: ' + err2.message);
            }
          }

          const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
          const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(arrayBuffer),
            useSystemArr: true,
            disableFontFace: true,
            standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/standard_fonts/',
          });
          const pdf = await loadingTask.promise;

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            let lastY: number | null = null;
            let text = "";

            for (const item of textContent.items) {
              if (!("str" in item)) continue;
              const y = item.transform[5];
              if (lastY !== null && Math.abs(y - lastY) > 5) {
                text += "\n";
              } else if (lastY !== null) {
                text += " ";
              }
              text += item.str;
              lastY = y;
            }
            pageTexts.push(text);
          }
        }
      } else if (name.endsWith('.docx')) {
        try {
          const mammothModule = await import('mammoth');
          // Support ESM default exports or standard CommonJS exports
          const mammothInstance = mammothModule.default || mammothModule;
          const result = await mammothInstance.extractRawText({ buffer });
          const text = result.value || "";
          pageTexts = splitTextIntoPages(text, 2000);
        } catch (err: any) {
          throw new Error('Word (.docx) tahlilida xatolik: ' + err.message);
        }
      } else if (name.endsWith('.doc')) {
        // Fallback or binary string cleaner for older .doc files as backup
        const text = buffer.toString('utf8');
        let cleaned = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, " ").replace(/\s+/g, " ").trim();
        cleaned = cleaned.replace(/[^\x20-\x7E\xA0-\xFF\u0400-\u04FF\u0100-\u017F\u0180-\u024F]{20,}/g, " ");
        pageTexts = splitTextIntoPages(cleaned, 2000);
      } else {
        // Fallback for TXT, JSON, MD, LOG etc
        const text = buffer.toString('utf8');
        pageTexts = splitTextIntoPages(text, 2000);
      }

      console.log(`[Server Document Extraction] Successfully parsed "${fileName}" (${pageTexts.length} pages)`);
      return res.json({ pages: pageTexts });
    } catch (err: any) {
      console.error('[Server Document Extraction Error]:', err);
      return res.status(500).json({ error: `Serverda faylni o'qishda xatolik: ${err.message || err}` });
    }
  });

  // Helper text segment splitter line-by-line
  function splitTextIntoPages(text: string, charsPerPage: number = 2000): string[] {
    const paragraphs = text.split(/\n+/);
    const pages: string[] = [];
    let currentPage = "";

    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      if (currentPage.length + trimmed.length > charsPerPage && currentPage.length > 0) {
        pages.push(currentPage.trim());
        currentPage = trimmed;
      } else {
        if (currentPage.length > 0) {
          currentPage += "\n\n" + trimmed;
        } else {
          currentPage = trimmed;
        }
      }
    }
    if (currentPage.length > 0) {
      pages.push(currentPage.trim());
    }
    if (pages.length === 0) {
      pages.push(text || "(Hujjat bo'sh)");
    }
    return pages;
  }

  app.get('/api/subjects', async (req, res) => {
    try {
      const creatorParam = (req.query.creator as string) || 'dilnuramadaminova06@gmail.com';
      const db = await getFirestoreDb();
      if (db) {
        try {
          const { collection, getDocs } = await import('firebase/firestore');
          const subjectsSnap = await getDocs(collection(db, 'subjects'));
          const subjectsList: any[] = [];
          subjectsSnap.forEach(docSnap => {
            const data = docSnap.data();
            subjectsList.push({ id: docSnap.id, ...data });
          });
          
          if (subjectsList.length > 0) {
            console.log(`[Firestore Server] Loaded ${subjectsList.length} total subjects from cloud database.`);
            return res.json(subjectsList);
          }
        } catch (dbErr: any) {
          console.error("[Firestore Server] Cloud fetch subjects failed, falling back to local storage:", dbErr.message);
        }
      }

      // Local fallback
      const dataDir = path.join(process.cwd(), 'data');
      const jsonPath = path.join(dataDir, 'subjects.json');
      if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        try {
          const subjects = JSON.parse(fileContent);
          // Auto Seed Firestore with local backup subject so it remains active
          if (db && subjects.length > 0) {
            try {
              const { doc, setDoc } = await import('firebase/firestore');
              for (const sub of subjects) {
                await setDoc(doc(db, 'subjects', sub.id), {
                  id: sub.id,
                  name: sub.name,
                  variantSize: sub.variantSize || 30,
                  questions: sub.questions || [],
                  creator: sub.creator || 'dilnuramadaminova06@gmail.com'
                });
                console.log(`[Firestore Server] Seeded Local subject "${sub.name}" to Cloud Firestore successfully.`);
              }
            } catch (seedErr) {
              console.error("[Firestore Server] Failed to auto-seed local data to cloud database:", seedErr);
            }
          }
          return res.json(subjects);
        } catch (jsonErr) {
          console.error("Malformed subjects.json:", jsonErr);
        }
      }
      res.json([]);
    } catch (error: any) {
      console.error('Fetch Subjects Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/save-questions', async (req, res) => {
    try {
      const { questions, variantSize = 30, subjectName = 'Matematika', creator = '' } = req.body;
      if (!Array.isArray(questions)) {
        return res.status(400).json({ error: 'Noto\'g\'ri ma\'lumot formati' });
      }

      const newSubjectId = subjectName.toLowerCase().replace(/\s+/g, '-');
      const db = await getFirestoreDb();
      let finalCreator = creator || 'dilnuramadaminova06@gmail.com';
      let mergedQuestions = [...questions];

      // 1. Sync to Cloud Firestore
      if (db) {
        try {
          const { doc, getDoc, setDoc } = await import('firebase/firestore');
          const subDocRef = doc(db, 'subjects', newSubjectId);
          const subDocSnap = await getDoc(subDocRef);
          
          if (subDocSnap.exists()) {
            const existingData = subDocSnap.data();
            mergedQuestions = [...(existingData.questions || []), ...questions];
            finalCreator = existingData.creator || finalCreator;
          }
          
          await setDoc(subDocRef, {
            id: newSubjectId,
            name: subjectName,
            variantSize,
            questions: mergedQuestions,
            creator: finalCreator
          });
          console.log(`[Firestore Server] Synchronized saved questions for "${subjectName}" to cloud Firestore.`);
        } catch (dbErr: any) {
          console.error("[Firestore Server] Cloud save failed:", dbErr.message);
        }
      }

      // 2. Sync to Local storage fallback
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      const jsonPath = path.join(dataDir, 'subjects.json');
      let subjects = [];
      if (fs.existsSync(jsonPath)) {
        try {
          subjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } catch (err) {
          subjects = [];
        }
      }

      const existingIdx = subjects.findIndex(s => s.id === newSubjectId);
      if (existingIdx !== -1) {
        subjects[existingIdx].questions = mergedQuestions;
        subjects[existingIdx].variantSize = variantSize;
        if (!subjects[existingIdx].creator) {
          subjects[existingIdx].creator = finalCreator;
        }
      } else {
        subjects.push({
          id: newSubjectId,
          name: subjectName,
          variantSize,
          questions: mergedQuestions,
          creator: finalCreator
        });
      }

      fs.writeFileSync(jsonPath, JSON.stringify(subjects, null, 2));

      // Re-write backup questions.ts index
      const filePath = path.join(dataDir, 'questions.ts');
      const fileContent = `import { Question, Subject } from '../types';
import subjectsData from './subjects.json';

export const subjects: Subject[] = subjectsData as Subject[];

export const totalVariantsForSubject = (subjectId: string) => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return 0;
  const vSize = subject.variantSize || 30;
  return Math.ceil(subject.questions.length / vSize);
};

export const getQuestionsByVariant = (subjectId: string, variant: number): Question[] => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return [];
  const vSize = subject.variantSize || 30;
  const start = (variant - 1) * vSize;
  const end = start + vSize;
  return subject.questions.slice(start, end);
};
`;

      fs.writeFileSync(filePath, fileContent);
      res.json({ success: true, count: mergedQuestions.length });
    } catch (error: any) {
      console.error("[Save Questions Endpoint error]:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/update-subject', async (req, res) => {
    try {
      const { subjectId, questions, variantSize, name, creator } = req.body;
      const db = await getFirestoreDb();
      let updatedName = name;
      let updatedVariantSize = variantSize;
      let updatedQuestions = questions;
      let updatedCreator = creator;

      // 1. Sync to Cloud Firestore
      if (db) {
        try {
          const { doc, getDoc, setDoc } = await import('firebase/firestore');
          const subDocRef = doc(db, 'subjects', subjectId);
          const subDocSnap = await getDoc(subDocRef);
          
          let existingData: any = {};
          if (subDocSnap.exists()) {
            existingData = subDocSnap.data();
          }

          updatedName = name || existingData.name || subjectId;
          updatedVariantSize = variantSize || existingData.variantSize || 30;
          updatedQuestions = questions || existingData.questions || [];
          updatedCreator = creator || existingData.creator || 'dilnuramadaminova06@gmail.com';

          await setDoc(subDocRef, {
            id: subjectId,
            name: updatedName,
            variantSize: updatedVariantSize,
            questions: updatedQuestions,
            creator: updatedCreator
          });
          console.log(`[Firestore Server] Synchronized updated subject "${subjectId}" to cloud Firestore.`);
        } catch (dbErr: any) {
          console.error("[Firestore Server] Cloud update failed:", dbErr.message);
        }
      }

      // 2. Sync to Local storage cache fallback
      const dataDir = path.join(process.cwd(), 'data');
      const jsonPath = path.join(dataDir, 'subjects.json');

      if (fs.existsSync(jsonPath)) {
        let subjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        const existingIdx = subjects.findIndex(s => s.id === subjectId);
        if (existingIdx !== -1) {
          subjects[existingIdx].questions = updatedQuestions || subjects[existingIdx].questions;
          if (updatedVariantSize) subjects[existingIdx].variantSize = updatedVariantSize;
          if (updatedName) subjects[existingIdx].name = updatedName;
          if (updatedCreator) subjects[existingIdx].creator = updatedCreator;
          
          fs.writeFileSync(jsonPath, JSON.stringify(subjects, null, 2));

          const filePath = path.join(dataDir, 'questions.ts');
          const fileContent = `import { Question, Subject } from '../types';
import subjectsData from './subjects.json';

export const subjects: Subject[] = subjectsData as Subject[];

export const totalVariantsForSubject = (subjectId: string) => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return 0;
  const vSize = subject.variantSize || 30;
  return Math.ceil(subject.questions.length / vSize);
};

export const getQuestionsByVariant = (subjectId: string, variant: number): Question[] => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return [];
  const vSize = subject.variantSize || 30;
  const start = (variant - 1) * vSize;
  const end = start + vSize;
  return subject.questions.slice(start, end);
};
`;
          fs.writeFileSync(filePath, fileContent);
        }
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("[Update Subject Endpoint Error]:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/delete-subject', async (req, res) => {
    try {
      const { subjectId } = req.body;
      const db = await getFirestoreDb();

      // 1. Sync to Cloud Firestore
      if (db) {
        try {
          const { doc, deleteDoc } = await import('firebase/firestore');
          await deleteDoc(doc(db, 'subjects', subjectId));
          console.log(`[Firestore Server] Deleted subject "${subjectId}" from Firestore.`);
        } catch (dbErr: any) {
          console.error("[Firestore Server] Cloud delete failed:", dbErr.message);
        }
      }

      // 2. Sync to Local storage cache fallback
      const dataDir = path.join(process.cwd(), 'data');
      const jsonPath = path.join(dataDir, 'subjects.json');

      if (fs.existsSync(jsonPath)) {
        let subjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        subjects = subjects.filter(s => s.id !== subjectId);
        fs.writeFileSync(jsonPath, JSON.stringify(subjects, null, 2));

        const filePath = path.join(dataDir, 'questions.ts');
        const fileContent = `import { Question, Subject } from '../types';
import subjectsData from './subjects.json';

export const subjects: Subject[] = subjectsData as Subject[];

export const totalVariantsForSubject = (subjectId: string) => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return 0;
  const vSize = subject.variantSize || 30;
  return Math.ceil(subject.questions.length / vSize);
};

export const getQuestionsByVariant = (subjectId: string, variant: number): Question[] => {
  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return [];
  const vSize = subject.variantSize || 30;
  const start = (variant - 1) * vSize;
  const end = start + vSize;
  return subject.questions.slice(start, end);
};
`;
        fs.writeFileSync(filePath, fileContent);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("[Delete Subject Endpoint Error]:", error);
      res.status(500).json({ error: error.message });
    }
  });
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
