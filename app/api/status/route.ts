import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/mongo";
import { isMailConfigured } from "@/lib/mail";

export async function GET() {
  let mongoOk = false;
  if (isMongoConfigured()) {
    try {
      const { getDb } = await import("@/lib/mongo");
      const db = await getDb();
      await db?.command({ ping: 1 });
      mongoOk = true;
    } catch {
      mongoOk = false;
    }
  }
  return NextResponse.json({
    ok: true,
    storage: isMongoConfigured() ? (mongoOk ? "mongodb-connected" : "mongodb-error-file-fallback") : "file",
    mail: isMailConfigured() ? "configured" : "not-configured",
  });
}
