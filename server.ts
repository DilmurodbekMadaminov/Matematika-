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
      const { questions, variantSize = 30 } = req.body;
      if (!Array.isArray(questions)) {
        return res.status(400).json({ error: 'Noto\'g\'ri ma\'lumot formati' });
      }

      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      const filePath = path.join(dataDir, 'questions.ts');
      
      const fileContent = `
import { Question } from '../types';

export const questionsList: Question[] = ${JSON.stringify(questions, null, 2)};
export const variantSize = ${variantSize};

export const totalVariants = Math.ceil(questionsList.length / variantSize);

export const getQuestionsByVariant = (variant: number): Question[] => {
  const start = (variant - 1) * variantSize;
  const end = start + variantSize;
  return questionsList.slice(start, end);
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
