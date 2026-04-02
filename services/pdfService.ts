import * as pdfjsLib from 'pdfjs-dist';

// Set worker source to a CDN for simplicity in this environment
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extractTextFromPdf(file: File): Promise<string[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Extract text from all pages in parallel for better performance
    const pagePromises = Array.from({ length: pdf.numPages }, (_, i) => i + 1).map(async (pageNum) => {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      return textContent.items
        .map((item: any) => item.str)
        .join(' ');
    });

    const pageTexts = await Promise.all(pagePromises);
    return pageTexts;
  } catch (error: any) {
    console.error('PDF extraction error:', error);
    throw new Error(`PDF matnini ajratib olishda xatolik: ${error.message}`);
  }
}
