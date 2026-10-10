import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb(): Promise<Db | null> {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }
    db = client.db(process.env.MONGODB_DB || "wattsuptech");
    return db;
  } catch (e) {
    console.error("MongoDB connect failed, falling back to file storage:", e);
    return null;
  }
}

export async function insertRecord(collection: string, doc: Record<string, unknown>) {
  try {
    const database = await getDb();
    if (!database) return false;
    await database.collection(collection).insertOne({ ...doc, createdAt: new Date().toISOString() });
    return true;
  } catch (e) {
    console.error(`Mongo insert (${collection}) failed:`, e);
    return false;
  }
}
