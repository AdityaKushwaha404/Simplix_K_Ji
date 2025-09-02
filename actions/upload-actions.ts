'use server';

import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromGemini } from '@/lib/gemini';
import { formatFileNameAsTitle } from "../utils/format_utils";

interface UploadResponse {
  serverData: {
    userId: string;
    fileUrl?: string;
    fileName?: string;
    file?: {
      ufsUrl: string;
      name: string;
    };
  };
}[]

export async function generatePdfSummary(uploadResponse: UploadResponse) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return {
      success: false,
      message: 'File upload failed: Empty response.',
      data: null,
    };
  }

  // Support both UploadThing v9 and legacy response formats
  const first = uploadResponse[0];
  const serverData = first.serverData || {};
  const userId = serverData.userId || first.userId;
  // Try all possible locations for the PDF URL
  const pdfUrl = first.ufsUrl || first.url || serverData.file?.ufsUrl || serverData.ufsUrl || serverData.fileUrl;
  const fileName = first.name || serverData.file?.name || serverData.fileName;

  if (!pdfUrl) {
    return {
      success: false,
      message: 'AI processing failed: File URL missing.',
      data: null,
    };
  }

  try {
    console.log('🔗 PDF URL for extraction:', pdfUrl);
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log('🧾 Extracted PDF Text:', pdfText);

    try {
      console.log('🚀 Sending extracted text to Gemini:', pdfText?.slice(0, 500)); // log first 500 chars
      const summary = await generateSummaryFromGemini(pdfText);
      console.log('🧠 Generated Summary:', summary);

  // Use the utility function for formatting file names as titles
  const title = fileName ? formatFileNameAsTitle(fileName) : undefined;
      return {
        success: true,
        message: 'Summary generated successfully',
        data: {
          summary,
          fileUrl: pdfUrl,
          title,
          fileName,
        },
      };
    } catch (error) {
      console.error('❌ Error generating summary from Gemini:', error);
      return {
        success: false,
        message: 'AI processing failed: Summary generation error.',
        data: null,
      };
    }
  } catch (err: any) {
    console.error('❌ PDF extraction failed:', err);
    return {
      success: false,
      message: `File processing failed: ${err?.message || 'Unknown error'}`,
      data: null,
    };
  }
}



