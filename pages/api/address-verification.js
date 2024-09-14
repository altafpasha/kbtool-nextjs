import { Client, Databases, Query } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { action, data } = req.body;

  if (action !== 'createDocument') {
    return res.status(400).json({ error: 'Invalid action' });
  }

  try {
    // Check if the address already exists
    const existingDocs = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [Query.equal('address', data.address)]
    );

    if (existingDocs.documents.length > 0) {
      return res.status(200).json({ status: 'exists', message: 'Address already exists' });
    }

    // Create new document
    const result = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      'unique()',
      data
    );

    res.status(200).json({ status: 'created', message: 'Address copied', result });
  } catch (error) {
    console.error('Appwrite error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your request' });
  }
}