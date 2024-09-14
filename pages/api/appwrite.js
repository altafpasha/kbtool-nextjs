// File: pages/api/appwrite.js

import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const config = {
  QID_121: {
    DATABASE_ID: process.env.APPWRITE_DATABASE_ID_QID_121,
    COLLECTION_ID: process.env.APPWRITE_COLLECTION_ID_QID_121,
  },
  // Add other features as needed
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { feature, action, data } = req.body;

  if (!config[feature]) {
    return res.status(400).json({ error: 'Invalid feature' });
  }

  const { DATABASE_ID, COLLECTION_ID } = config[feature];

  if (!DATABASE_ID || !COLLECTION_ID) {
    return res.status(500).json({ error: 'Database or Collection ID is not configured' });
  }

  try {
    let result;
    switch (action) {
      case 'createDocument':
        result = await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', data);
        break;
      // Add other cases as needed
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Appwrite error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your request' });
  }
}