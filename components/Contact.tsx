"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { siteConfig, projectTypes, whatsappLink } from "@/lib/site";
import { Loader2, Send, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "", projectType: "" });
  const [err, setErr] = useState(""); const [ok, setOk] = useState(""); const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof f, v: string) => setF({ ...f, [k]: v });

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setOk("");
    if (f.name.trim().length < 2) return setErr("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return setErr("Enter a valid email.");
    if (!f.subject.trim()) return setErr("Enter a subject.");
    if (f.message.trim().length < 10) return setErr("Message min 10 characters.");
    setLoading(true);
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Failed to send");
      setOk(j.message); setF({ name: "", email: "", subject: "", message: "", projectType: "" });
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "Failed"); }
    finally { setLoading(false); }
  }

  const field =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm sm:text-base placeholder:text-white/40 outline-none transition focus:border-cyanx focus:bg-white/[0.07] focus:ring-2 focus:ring-cyanx/20";

  return (
    <section id="contact" className="relative py-16 sm:py-20 bg-deep/60 overflow-hidden">
      {/* soft background glow */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-electric/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* <Reveal><h2 className="text-3xl sm:text-4xl font-extrabold text-center">Let&apos;s Build <span className="text-gradient">Something Great</span></h2>
          <p className="text-muted text-center mt-3">Have an idea in mind? Tell us about your requirements, and let&apos;s discuss the next steps.</p></Reveal> */}

        <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {/* LEFT: contact info (col-span now on the grid child itself) */}
          <div className="lg:col-span-2 min-w-0 [&>*]:h-full">
            <Reveal delay={0.05}>
              <div className="glass rounded-3xl p-5 sm:p-7 h-full">
                <h3 className="text-xl sm:text-2xl font-extrabold">Contact <span className="text-gradient">Information</span></h3>
                <p className="text-sm text-muted mt-2">Configure real details in <code className="text-cyanx">.env</code> before launch.</p>

                <div className="mt-6 space-y-3 text-sm">
                  <a href={`mailto:${siteConfig.email}`}
                    className="group flex items-center gap-3 glass rounded-2xl px-4 py-3.5 transition hover:border-cyanx hover:-translate-y-0.5">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-cyanx/10 shrink-0"><Mail size={18} className="text-cyanx" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-wide text-muted">Email us</span>
                      <span className="block break-all font-medium">{siteConfig.email}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-cyanx transition" />
                  </a>

                  <a href={whatsappLink()} target="_blank" rel="noreferrer"
                    className="group flex items-center gap-3 glass rounded-2xl px-4 py-3.5 transition hover:border-green-400 hover:-translate-y-0.5">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-green-500/10 shrink-0"><MessageCircle size={18} className="text-green-400" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-wide text-muted">WhatsApp Chat</span>
                      <span className="block break-words font-medium">{siteConfig.whatsappNumber ? `+${siteConfig.whatsappNumber}` : "Configure number in .env"}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 opacity-40 group-hover:opacity-100 group-hover:text-green-400 transition" />
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-xs sm:text-sm text-muted">
                  Prefer guided flow? <a href="/start-project" className="text-cyanx underline underline-offset-2 hover:text-white">Open Project Builder</a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-3 min-w-0 [&>*]:h-full">
            <Reveal delay={0.1}>
              <form onSubmit={submit} className="glass rounded-3xl p-5 sm:p-7 space-y-4 h-full">
                {/* honeypot */}
                <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input aria-label="Name" placeholder="Name *" value={f.name} onChange={(e) => set("name", e.target.value)} className={field} />
                  <input aria-label="Email" placeholder="Email *" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} className={field} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input aria-label="Subject" placeholder="Subject *" value={f.subject} onChange={(e) => set("subject", e.target.value)} className={field} />
                  <select aria-label="Project type" value={f.projectType} onChange={(e) => set("projectType", e.target.value)}
                    className={`${field} bg-deep text-white/90 appearance-auto`}>
                    <option value="">Project type (optional)</option>{projectTypes.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <textarea aria-label="Message" placeholder="Your message * (min 10 chars)" rows={6} value={f.message} onChange={(e) => set("message", e.target.value)} className={`${field} resize-y min-h-[140px]`} />
                {err && <p role="alert" className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-2.5">{err}</p>}
                {ok && <p role="status" className="text-sm text-green-300 bg-green-500/10 border border-green-400/30 rounded-xl px-4 py-2.5">{ok}</p>}
                <button disabled={loading} className="btn-primary w-full sm:w-auto justify-center rounded-full px-8 py-3.5 text-sm font-semibold whitespace-nowrap inline-flex items-center gap-2 transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}