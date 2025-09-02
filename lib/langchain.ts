import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function fetchAndExtractPdfText(fileUrl: string): Promise<string> {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();

  // Initialize PDFLoader with the file data
  const loader = new PDFLoader(new Blob([arrayBuffer]));

  // Load document pages
  const docs = await loader.load();
  docs.forEach((doc, idx) => {
    console.log(`📄 Page ${idx + 1} content:`, doc.pageContent);
  });

  // Combine all page contents into one string
  return docs.map((doc) => doc.pageContent).join('\n');
}
