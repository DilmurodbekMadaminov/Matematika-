import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  app.post('/api/save-questions', async (req, res) => {
    try {
      const { questions, variantSize = 30, subjectName = 'Matematika' } = req.body;
      if (!Array.isArray(questions)) {
        return res.status(400).json({ error: 'Noto\'g\'ri ma\'lumot formati' });
      }

      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      const jsonPath = path.join(dataDir, 'subjects.json');
      let subjects = [];
      if (fs.existsSync(jsonPath)) {
        subjects = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      }

      const newSubjectId = subjectName.toLowerCase().replace(/\s+/g, '-');
      const existingIdx = subjects.findIndex(s => s.id === newSubjectId);
      if (existingIdx !== -1) {
        subjects[existingIdx].questions.push(...questions); // Append new questions
        subjects[existingIdx].variantSize = variantSize; // Update variantSize
      } else {
        subjects.push({
          id: newSubjectId,
          name: subjectName,
          variantSize,
          questions
        });
      }

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
      res.json({ success: true, count: questions.length });
    } catch (error: any) {
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
