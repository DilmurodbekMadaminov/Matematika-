import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(process.cwd(), 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destDir = path.resolve(process.cwd(), 'public');
const dest = path.resolve(destDir, 'pdf.worker.min.mjs');

console.log(`[Worker Sync] Checking source: ${src}`);

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`[Worker Sync] Copied worker beautifully to: ${dest}`);
  } else {
    console.error(`[Worker Sync] Core source worker not found at ${src}. Attempting alternative path...`);
    // Try adjacent or parent node_modules
    const alternativeSrc = path.resolve(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
    if (fs.existsSync(alternativeSrc)) {
      fs.copyFileSync(alternativeSrc, dest);
      console.log(`[Worker Sync] Copied worker successfully from alternative path: ${dest}`);
    } else {
      console.error('[Worker Sync] Critical: Alternative path also failed.');
    }
  }
} catch (err) {
  console.error('[Worker Sync] Failed to run sync script:', err);
}
