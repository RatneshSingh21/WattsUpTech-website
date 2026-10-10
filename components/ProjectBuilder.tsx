"use client";
import { useState } from "react";
import { projectTypes, techOptions, budgetOptions } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Form = {
  projectType: string; technologies: string[]; title: string; description: string;
  features: string; referenceLink: string; budget: string; deadline: string;
  urgency: string; name: string; email: string; phone: string; contactMethod: string;
};

const init: Form = {
  projectType: "", technologies: [], title: "", description: "", features: "",
  referenceLink: "", budget: "", deadline: "", urgency: "Normal",
  name: "", email: "", phone: "", contactMethod: "WhatsApp",
};

export default function ProjectBuilder({ preselect }: { preselect: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ ...init, projectType: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  // sync preselect from services
  if (preselect && form.projectType === "" && projectTypes.includes(preselect as never)) {
    // map service title -> project type loosely
    const map: Record<string, string> = {
      "Project Development": "College or Personal Project",
      "Website Design & Development": "Website Development",
      "Programming Solutions": "Software Development",
      "Frontend Development": "Website Development",
      "Backend & Database": "Web Application",
      "Custom Digital Solutions": "Bug Fixing",
    };
    if (map[preselect]) setForm({ ...form, projectType: map[preselect] });
  }

  const set = (k: keyof Form, v: string | string[]) => setForm({ ...form, [k]: v as never });

  function valid(): boolean {
    setErr("");
    if (step === 0 && !form.projectType) { setErr("Please select a project type."); return false; }
    if (step === 1 && !form.technologies.length) { setErr("Select at least one technology."); return false; }
    if (step === 2) {
      if (form.title.trim().length < 4) { setErr("Project title too short."); return false; }
      if (form.description.trim().length < 20) { setErr("Describe requirements (min 20 characters)."); return false; }
    }
    if (step === 3 && !form.budget) { setErr("Please select a budget range."); return false; }
    if (step === 4) {
      if (form.name.trim().length < 2) { setErr("Enter your name."); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErr("Enter a valid email."); return false; }
    }
    return true;
  }

  async function submit() {
    if (!valid()) return;
    setLoading(true); setErr(""); setOk("");
    try {
      const r = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Submission failed");
      setOk(j.message);
      setStep(6);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Submission failed");
    } finally { setLoading(false); }
  }

  const titles = ["Project Type", "Technology", "Requirements", "Budget & Timeline", "Contact", "Review"];

  return (
    <section id="builder" className="py-20 bg-deep/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Interactive <span className="text-gradient">Project Builder</span></h2>
          <p className="text-muted text-center mt-3">5 steps + review. Your answers are preserved while navigating.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 glass rounded-3xl p-6 sm:p-8 shadow-card">
            {step < 6 && (
              <>
                <div className="flex items-center gap-2 mb-6" aria-label="Progress">
                  {titles.map((_, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-gradient-to-r from-electric to-cyanx" : "bg-white/10"}`} />
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-cyanx font-bold">Step {step + 1} of 6 — {titles[step]}</p>
              </>
            )}

            {step === 0 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {projectTypes.map((t) => (
                  <button key={t} onClick={() => set("projectType", t)}
                    className={`rounded-xl px-4 py-3.5 text-sm font-semibold border transition text-left ${form.projectType === t ? "border-cyanx bg-electric/15 text-white" : "border-white/10 bg-white/5 hover:border-electric"}`}>{t}</button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {techOptions.map((t) => {
                  const on = form.technologies.includes(t);
                  return (
                    <button key={t} onClick={() => set("technologies", on ? form.technologies.filter((x) => x !== t) : [...form.technologies, t])}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold border ${on ? "border-cyanx bg-electric text-white" : "border-white/15 bg-white/5 hover:border-cyanx"}`}>{t}</button>
                  );
                })}
              </div>
            )}
            {step === 2 && (
              <div className="mt-4 space-y-4">
                <input aria-label="Project title" placeholder="Project title *" value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <textarea aria-label="Project description" placeholder="Describe what you want to build * (min 20 chars)" rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <textarea aria-label="Required features" placeholder="Required features (one per line)" rows={3} value={form.features} onChange={(e) => set("features", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <input aria-label="Reference link" placeholder="Reference link (optional)" value={form.referenceLink} onChange={(e) => set("referenceLink", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
              </div>
            )}
            {step === 3 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted">Budget range *</label>
                  <div className="mt-2 space-y-2">
                    {budgetOptions.map((b) => (
                      <button key={b} onClick={() => set("budget", b)} className={`w-full text-left rounded-xl px-4 py-2.5 text-sm border ${form.budget === b ? "border-cyanx bg-electric/15" : "border-white/10 bg-white/5"}`}>{b}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div><label className="text-sm text-muted">Desired deadline</label>
                    <input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 [color-scheme:dark]" /></div>
                  <div><label className="text-sm text-muted">Urgency</label>
                    <select value={form.urgency} onChange={(e) => set("urgency", e.target.value)} className="mt-2 w-full rounded-xl bg-deep border border-white/10 px-4 py-3">
                      {["Low", "Normal", "High", "Urgent"].map((u) => <option key={u}>{u}</option>)}
                    </select></div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <input aria-label="Full name" placeholder="Full name *" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <input aria-label="Email" placeholder="Email *" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <input aria-label="Phone" placeholder="Phone (optional)" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-cyanx" />
                <select aria-label="Preferred contact" value={form.contactMethod} onChange={(e) => set("contactMethod", e.target.value)} className="w-full rounded-xl bg-deep border border-white/10 px-4 py-3">
                  {["WhatsApp", "Email", "Phone"].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
            )}
            {step === 5 && (
              <div className="mt-4 text-sm bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <p><b>Type:</b> {form.projectType}</p>
                <p><b>Tech:</b> {form.technologies.join(", ")}</p>
                <p><b>Title:</b> {form.title}</p>
                <p><b>Description:</b> {form.description}</p>
                <p><b>Budget:</b> {form.budget} • <b>Deadline:</b> {form.deadline || "Flexible"} • <b>Urgency:</b> {form.urgency}</p>
                <p><b>Contact:</b> {form.name} ({form.email}) via {form.contactMethod}</p>
              </div>
            )}
            {step === 6 && (
              <div className="text-center py-8">
                <CheckCircle2 size={56} className="mx-auto text-green-400" />
                <h3 className="mt-4 text-2xl font-bold">Inquiry Sent!</h3>
                <p className="text-muted mt-2">{ok}</p>
                <button onClick={() => { setForm(init); setStep(0); setOk(""); }} className="mt-6 btn-ghost rounded-full px-6 py-3 text-sm">Start Another Inquiry</button>
              </div>
            )}

            {err && <p role="alert" className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-2.5">{err}</p>}

            {step < 6 && (
              <div className="mt-6 flex justify-between">
                <button disabled={step === 0} onClick={() => { setErr(""); setStep(step - 1); }} className="btn-ghost rounded-full px-6 py-3 text-sm inline-flex items-center gap-2 disabled:opacity-40"><ArrowLeft size={16} /> Back</button>
                {step < 5
                  ? <button onClick={() => { if (valid()) setStep(step + 1); }} className="btn-primary rounded-full px-6 py-3 text-sm inline-flex items-center gap-2">Next <ArrowRight size={16} /></button>
                  : <button onClick={submit} disabled={loading} className="btn-primary rounded-full px-8 py-3 text-sm inline-flex items-center gap-2 disabled:opacity-60">{loading && <Loader2 className="animate-spin" size={16} />} Submit Inquiry</button>}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
