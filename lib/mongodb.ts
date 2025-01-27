// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cachedClient: MongoClient | null = null;
let cachedClientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  if (cachedClientPromise) {
    return cachedClientPromise;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    cachedClientPromise = client.connect().then(connectedClient => {
        cachedClient = connectedClient
        return connectedClient
    });
    return cachedClientPromise
  } catch (e) {
    console.error("Database connection error:", e);
    throw e; // Re-throw the error for proper handling
  }
}