import { NextRequest, NextResponse } from "next/server";
import { rateLimit, saveRecord, isEmail, sanitize } from "@/lib/server";
import { projectTypes } from "@/lib/site";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`inquiry:${ip}`, 15)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Try again in a minute." }, { status: 429 });
  }
  try {
    const b = await req.json();
    if (b.company) return NextResponse.json({ ok: true });
    const projectType = sanitize(b.projectType, 80);
    const technologies: string[] = Array.isArray(b.technologies) ? b.technologies.map((x: string) => sanitize(x, 40)).slice(0, 12) : [];
    const title = sanitize(b.title, 160);
    const description = sanitize(b.description, 4000);
    const features = sanitize(b.features, 3000);
    const referenceLink = sanitize(b.referenceLink, 500);
    const budget = sanitize(b.budget, 80);
    const deadline = sanitize(b.deadline, 40);
    const urgency = sanitize(b.urgency, 40);
    const name = sanitize(b.name, 120);
    const email = sanitize(b.email, 160);
    const phone = sanitize(b.phone, 30);
    const contactMethod = sanitize(b.contactMethod, 40);

    if (!projectTypes.includes(projectType)) return NextResponse.json({ ok: false, error: "Please select a valid project type." }, { status: 400 });
    if (!technologies.length) return NextResponse.json({ ok: false, error: "Select at least one technology." }, { status: 400 });
    if (!title || title.length < 4) return NextResponse.json({ ok: false, error: "Project title is too short." }, { status: 400 });
    if (!description || description.length < 20) return NextResponse.json({ ok: false, error: "Please describe your requirements (min 20 chars)." }, { status: 400 });
    if (!budget) return NextResponse.json({ ok: false, error: "Please select a budget range." }, { status: 400 });
    if (!name || name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });

    await saveRecord("inquiries.json", { projectType, technologies, title, description, features, referenceLink, budget, deadline, urgency, name, email, phone, contactMethod }, "inquiries");
    const { sendNotifyEmail } = await import("@/lib/mail");
    await sendNotifyEmail(
      `New project inquiry: ${title} — ${name}`,
      `Type: ${projectType}\nTech: ${technologies.join(", ")}\nTitle: ${title}\nDescription: ${description}\nFeatures: ${features || "-"}\nRef: ${referenceLink || "-"}\nBudget: ${budget} | Deadline: ${deadline || "Flexible"} | Urgency: ${urgency}\n\nFrom: ${name} <${email}> phone:${phone || "-"} via ${contactMethod}`
    );
    return NextResponse.json({ ok: true, message: "Project inquiry received! We'll discuss next steps shortly." });
  } catch {
    return NextResponse.json({ ok: false, error: "Submission failed." }, { status: 500 });
  }
}
