import { Client, Account } from 'appwrite';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);

  const account = new Account(client);

  try {
    const session = await account.createEmailSession(email, password);
    res.status(200).json({ message: 'Login successful', sessionId: session.$id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
}