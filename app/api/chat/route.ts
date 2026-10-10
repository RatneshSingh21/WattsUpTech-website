import { NextRequest, NextResponse } from "next/server";
import { rateLimit, sanitize } from "@/lib/server";

type Scored = { keys: string[]; reply: string };

const KB: Scored[] = [
  {
    keys: ["price", "pricing", "cost", "charge", "budget", "fees", "rate"],
    reply:
      "Pricing depends on scope, features, technology and timeline. In the Project Builder you can pick: Under ₹5,000 / ₹5–15k / ₹15–30k / ₹30–60k / ₹60k+ / To be discussed. Share your requirements and we'll confirm a defined scope before work starts — no hidden assumptions.",
  },
  {
    keys: ["service", "offer", "what do you do", "work"],
    reply:
      "We offer: 1) Project Development (academic/personal/apps), 2) Website Design & Development (business, portfolio, landing, e-commerce, web apps), 3) Programming (Java, Python, C/C++, JS, PHP), 4) Frontend (HTML/CSS/JS, React, Tailwind), 5) Backend & DB (APIs, auth, MySQL, MongoDB), 6) Custom fixes & consultation. Which one fits your idea?",
  },
  {
    keys: ["technology", "tech stack", "language", "java", "python", "react", "node", "php", "mysql", "mongodb"],
    reply:
      "We work with Java, Python, C/C++, JavaScript, React, Node.js, PHP, HTML/CSS, Tailwind, MySQL, MongoDB, Git/GitHub. Tell me your project and I'll suggest the right stack.",
  },
  {
    keys: ["time", "long", "duration", "delivery", "deadline", "fast"],
    reply:
      "Timelines: small sites/guided projects often days; larger web apps take weeks depending on features + feedback speed. We follow: Share idea → Discuss requirements → Design & Development → Delivery & Support. Share your deadline in the Project Builder for a realistic plan.",
  },
  {
    keys: ["college", "student", "academic", "project", "final year", "mini project", "major project"],
    reply:
      "Yes — we guide legitimate academic projects: title selection, implementation, explanation + documentation support so you can present confidently. Pick 'College or Personal Project' in the builder and describe your requirements.",
  },
  {
    keys: ["website", "site", "business site", "portfolio", "landing", "ecommerce", "e-commerce", "shop"],
    reply:
      "We build modern responsive websites: business, portfolio, landing pages, e-commerce and web apps. Scroll to Services or hit 'Start Your Project' — select Website Design/Development and describe pages + references.",
  },
  {
    keys: ["contact", "talk", "human", "whatsapp", "email", "phone", "call"],
    reply:
      "You can reach us via the Contact form below, the floating WhatsApp button (prefilled message included), or the chatbot here. Email is configurable in .env (NEXT_PUBLIC_BUSINESS_EMAIL). What's your project about?",
  },
  {
    keys: ["support", "after", "maintenance", "bug", "fix", "help"],
    reply:
      "We include agreed post-delivery support for fixes in scope, plus bug-fixing and feature development as follow-ups. Describe the issue + tech stack in the Project Builder under 'Bug Fixing'.",
  },
  {
    keys: ["process", "how", "steps", "start", "begin"],
    reply:
      "How it works: 1) Share Your Idea 2) Discuss Requirements (features, budget, timeline) 3) Design & Development 4) Delivery & Support. Click 'Start Your Project' to open the 5-step wizard.",
  },
  {
    keys: ["hi", "hello", "hey", "namaste"],
    reply:
      "Hello! I'm WattBot — WattsUpTech.in assistant. I can help with services, technologies, pricing, timelines, or starting your project. What do you want to build?",
  },
  {
    keys: ["who are you", "your name", "wattsuptech", "about", "company"],
    reply:
      "WattsUpTech.in — 'Your Vision, Our Code.' We turn ideas into digital reality: websites, software and project development built around your needs for startups, businesses, students and entrepreneurs.",
  },
];

function answer(q: string): string {
  const s = q.toLowerCase();
  // high-priority intents first (pricing / academic / support / contact)
  if (/(price|pricing|cost|charge|budget|fees|rate|how much)/.test(s)) return KB[0].reply;
  if (/(college|student|academic|final year|mini project|major project)/.test(s)) return KB[4].reply;
  let best: Scored | null = null;
  let bestScore = 0;
  for (const item of KB) {
    let score = 0;
    for (const k of item.keys) if (s.includes(k)) score += 1 + k.length * 0.1;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  if (best && bestScore > 0.5) return best.reply;
  return "I can help with services, technologies, pricing, timelines, academic projects, support, or contacting the team. Try: 'What services do you offer?' or 'How much does a website cost?' — or click 'Start Your Project' to submit your idea.";
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(`chat:${ip}`, 60)) {
    return NextResponse.json({ ok: false, error: "Slow down — too many messages." }, { status: 429 });
  }
  try {
    const { message, history } = await req.json();
    const clean = sanitize(String(message || ""), 1000);
    if (!clean) return NextResponse.json({ ok: false, error: "Empty message." }, { status: 400 });
    // history is accepted for future LLM integration but unused in rule engine
    void history;
    const reply = answer(clean);
    const suggestions =
      reply.length < 200
        ? ["Start Your Project", "View Services", "Pricing info"]
        : ["Start Your Project", "Talk on WhatsApp", "View Portfolio"];
    return NextResponse.json({ ok: true, reply, suggestions });
  } catch {
    return NextResponse.json({ ok: false, error: "Chat failed." }, { status: 500 });
  }
}
