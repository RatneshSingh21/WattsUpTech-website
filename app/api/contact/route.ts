import { NextRequest, NextResponse } from "next/server";
import { rateLimit, saveRecord, isEmail, sanitize } from "@/lib/server";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`contact:${ip}`, 20)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }
  try {
    const body = await req.json();
    // honeypot
    if (body.company) return NextResponse.json({ ok: true });
    const name = sanitize(body.name, 120);
    const email = sanitize(body.email, 160);
    const subject = sanitize(body.subject, 180);
    const message = sanitize(body.message, 3000);
    const projectType = sanitize(body.projectType || "", 120);

    if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    if (!subject) return NextResponse.json({ ok: false, error: "Please enter a subject." }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ ok: false, error: "Message should be at least 10 characters." }, { status: 400 });

    await saveRecord("contacts.json", { name, email, subject, message, projectType }, "contacts");
    const { sendNotifyEmail } = await import("@/lib/mail");
    await sendNotifyEmail(
      `New contact: ${subject} — ${name}`,
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectType || "-"}\nSubject: ${subject}\n\n${message}`
    );
    return NextResponse.json({ ok: true, message: "Thanks! Your message was received. We'll get back to you soon." });
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
