import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { companyName } = req.body;

  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide a concise overview of ${companyName}. Include the following information if available:

1. Company Name:
2. CIN (Corporate Identification Number):
3. Founder(s):
4. Year Founded:
5. Industry:
6. Main Products or Services:
7. Company Website:
8. Key Social Media Links:
9. Recent News:
10. Primary Bank (if publicly known):
11. Notable Achievements:

If any information is not available or uncertain, state "Not available" for that item.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ result: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
}