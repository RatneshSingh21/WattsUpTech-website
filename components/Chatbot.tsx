"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, X, Send, Loader2, Sparkles } from "lucide-react";
import { whatsappLink } from "@/lib/site";

type Msg = { role: "user" | "bot"; text: string };

const QUICK = ["What services do you offer?", "How much does a website cost?", "I have a college project", "How do I start?"];

export default function Chatbot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm WattBot 🤖 — your WattsUpTech.in assistant. Ask me about services, pricing, timelines, or say 'start project' and I'll guide you." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sugg, setSugg] = useState<string[]>(["Start Your Project", "View Services", "Pricing info"]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wattbot-history");
      if (raw) { const h = JSON.parse(raw); if (Array.isArray(h) && h.length) setMsgs(h.slice(-20)); }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("wattbot-history", JSON.stringify(msgs.slice(-20))); } catch { /* ignore */ }
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    // local shortcut actions
    const low = q.toLowerCase();
    if (low.includes("start") && (low.includes("project") || low.includes("builder"))) {
      setLoading(false);
      setMsgs((m) => [...m, { role: "bot", text: "Great! Taking you to the Project Builder — a 5-step wizard (type → tech → requirements → budget → contact). Opening now 👇" }]);
      setTimeout(() => router.push("/start-project"), 600);
      return;
    }
    if (low.includes("whatsapp") || low.includes("talk")) {
      setLoading(false);
      setMsgs((m) => [...m, { role: "bot", text: `You can chat instantly on WhatsApp here: ${whatsappLink()} — prefilled message included. Or use the floating green button.` }]);
      return;
    }
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: q }) });
      const j = await r.json();
      setMsgs((m) => [...m, { role: "bot", text: j.reply || "Sorry, I had trouble. Try again." }]);
      if (j.suggestions) setSugg(j.suggestions);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: "Connection hiccup — but I still work offline: ask about services, pricing, timelines, or click Start Your Project." }]);
    } finally { setLoading(false); }
  }

  function handleSugg(s: string) {
    if (s === "Start Your Project") return send("start project builder");
    if (s === "Talk on WhatsApp") return send("talk on whatsapp");
    if (s === "View Services") { router.push("/services"); return; }
    if (s === "View Portfolio") { router.push("/portfolio"); return; }
    send(s);
  }

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open AI chatbot"
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full btn-primary grid place-items-center shadow-glow">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
      {open && (
        <div
          className="fixed z-50 inset-x-3 bottom-20 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[360px] md:w-[400px]
                     h-[min(34rem,calc(100dvh-6.5rem))] sm:h-[min(36rem,calc(100dvh-7.5rem))]
                     glass rounded-2xl sm:rounded-3xl overflow-hidden shadow-card flex flex-col"
          role="dialog" aria-label="WattBot AI assistant">
          <div
  className="relative z-10 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shrink-0 text-[#00111f]"
  style={{ background: "linear-gradient(90deg, var(--electric, #1e90ff), var(--cyanx, #22d3ee))" }}
>
  <div className="flex items-center gap-2 font-bold min-w-0">
    <Bot size={19} className="shrink-0" /> WattBot
    <span className="text-[10px] sm:text-[11px] font-semibold bg-black/20 rounded-full px-2 py-0.5 inline-flex items-center gap-1 whitespace-nowrap">
      <Sparkles size={11} /> AI • Online
    </span>
  </div>
  <button onClick={() => setOpen(false)} aria-label="Close chatbot" className="p-2 -mr-1 rounded-lg hover:bg-black/15 shrink-0">
    <X size={18} />
  </button>
</div>
          <div ref={boxRef} className="chat-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 text-[13px] sm:text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={`rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 max-w-[88%] sm:max-w-[85%] leading-relaxed break-words ${m.role === "user" ? "ml-auto bg-electric text-white" : "bg-white/8 bg-white/10 border border-white/10"}`}>{m.text}</div>
            ))}
            {loading && <div className="bg-white/10 border border-white/10 rounded-2xl px-3.5 py-2.5 w-fit flex items-center gap-2 text-muted"><Loader2 size={14} className="animate-spin" /> WattBot is thinking…</div>}
          </div>
          <div className="shrink-0 max-h-24 sm:max-h-32 overflow-y-auto">
            <div className="px-3 pb-1 flex flex-wrap gap-1.5">
              {QUICK.map((q) => <button key={q} onClick={() => send(q)} className="text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyanx hover:text-cyanx text-left">{q}</button>)}
            </div>
            {sugg.length > 0 && <div className="px-3 pb-1 flex flex-wrap gap-1.5">{sugg.map((s) => <button key={s} onClick={() => handleSugg(s)} className="text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-electric/15 border border-electric/30 text-cyanx">{s}</button>)}</div>}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-2.5 sm:p-3 flex gap-2 border-t border-white/10 shrink-0">
            <input aria-label="Chat message" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about services, pricing…" className="flex-1 min-w-0 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-base sm:text-sm outline-none focus:border-cyanx" />
            <button aria-label="Send" disabled={loading} className="btn-primary w-10 h-10 rounded-full grid place-items-center shrink-0 disabled:opacity-50"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}