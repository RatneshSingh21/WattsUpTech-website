import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { ArrowRight } from "lucide-react";

export default function CtaBanner({ title = "Have an idea in mind?", sub = "Tell us about your requirements — we'll confirm scope, timeline and next steps." }: { title?: string; sub?: string }) {
  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Tilt3D max={6}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b2a5b] via-[#0A1224] to-[#2b1a5e] border border-electric/30 p-8 sm:p-12 text-center shadow-glow">
              <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-electric/30 blur-[100px]" />
              <div className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full bg-violetx/30 blur-[100px]" />
              <h2 className="relative text-2xl sm:text-4xl font-extrabold">{title} <span className="text-gradient">Let&apos;s build it.</span></h2>
              <p className="relative text-muted mt-3 max-w-xl mx-auto">{sub}</p>
              <div className="relative mt-7 flex flex-wrap justify-center gap-4">
                <a href="/start-project" className="btn-primary rounded-full px-8 py-3.5 inline-flex items-center gap-2 text-sm">Start Your Project <ArrowRight size={16} /></a>
                <a href="/contact" className="btn-ghost rounded-full px-8 py-3.5 text-sm">Talk to Us</a>
              </div>
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}
