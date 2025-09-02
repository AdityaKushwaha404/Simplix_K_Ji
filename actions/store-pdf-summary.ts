'use server';

import { getData } from '@/lib/db';

interface StorePdfSummaryParams {
  userId: string;
  summary: string;
  fileUrl: string;
  title?: string;
  fileName?: string;
}

export async function storePdfSummaryAction({ userId, summary, fileUrl, title, fileName }: StorePdfSummaryParams) {
  try {
    // Example: Insert into a 'pdf_summaries' table
    const sql = await getData();
    const result = await sql`
      INSERT INTO pdf_summaries (user_id, summary_text, original_file_url, title, file_name)
      VALUES (${userId}, ${summary}, ${fileUrl}, ${title ?? null}, ${fileName ?? null})
      RETURNING id
    `;
    return { success: true, message: 'Summary stored successfully', id: result[0]?.id };
  } catch (error: any) {
    console.error('❌ Error storing PDF summary:', error);
    return { success: false, message: error.message };
  }
}
