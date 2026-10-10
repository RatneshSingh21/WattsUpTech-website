import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Simple in-memory rate limit: ip -> {count, reset}
const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(ip: string, max = 20, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= max;
}

export async function saveRecord(file: string, record: unknown, mongoCollection?: string) {
  const doc = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...(record as object) };
  // 1) Always keep local JSON backup (gitignored, works with zero config)
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const p = path.join(DATA_DIR, file);
    let arr: unknown[] = [];
    try {
      const raw = await fs.readFile(p, "utf-8");
      arr = JSON.parse(raw);
      if (!Array.isArray(arr)) arr = [];
    } catch {
      arr = [];
    }
    arr.push(doc);
    await fs.writeFile(p, JSON.stringify(arr, null, 2));
  } catch (e) {
    console.error("saveRecord failed", e);
  }
  // 2) If MongoDB is configured, also persist there (non-blocking failure)
  if (mongoCollection) {
    try {
      const { insertRecord } = await import("./mongo");
      await insertRecord(mongoCollection, doc as Record<string, unknown>);
    } catch (e) {
      console.error("mongo backup failed", e);
    }
  }
  return doc;
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function sanitize(s: string, max = 2000) {
  return String(s || "").trim().slice(0, max);
}
