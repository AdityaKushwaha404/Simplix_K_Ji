import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyChVV3EJS4sWxrFD0p_4MPMAfUdQlmZF9w';

export async function generateSummaryFromGemini(pdfText: string): Promise<string> {
  try {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SUMMARY_SYSTEM_PROMPT}\n\n${pdfText}` },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error(data?.error?.message || 'Gemini API request failed');
    }
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error: any) {
    console.error('Gemini API fetch error:', error);
    throw error;
  }
}
