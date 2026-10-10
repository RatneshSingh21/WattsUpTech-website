import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export function CssCube() {
  const faces = [
    { label: "React", t: "rotateY(0deg) translateZ(60px)" },
    { label: "JS", t: "rotateY(90deg) translateZ(60px)" },
    { label: "Java", t: "rotateY(180deg) translateZ(60px)" },
    { label: "Python", t: "rotateY(-90deg) translateZ(60px)" },
    { label: "Web", t: "rotateX(90deg) translateZ(60px)" },
    { label: "DB", t: "rotateX(-90deg) translateZ(60px)" },
  ];
  return (
    <div className="cube-scene w-[120px] h-[120px] mx-auto" aria-hidden="true">
      <div className="cube-spin relative w-full h-full">
        {faces.map((f) => (
          <div key={f.label} className="absolute inset-0 grid place-items-center font-black text-cyanx bg-electric/15 border border-cyanx/40 rounded-lg backdrop-blur text-sm" style={{ transform: f.t }}>
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageHero({ title, accent, subtitle, crumb }: { title: string; accent: string; subtitle: string; crumb: string }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full bg-electric/20 blur-[120px]" />
        <div className="absolute -bottom-32 -left-20 w-[380px] h-[380px] rounded-full bg-violetx/20 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-[1fr_auto] gap-8 items-center relative">
        <Reveal>
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-cyanx">Home / {crumb}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold">{title} <span className="text-gradient">{accent}</span></h1>
            <p className="mt-4 text-muted max-w-2xl">{subtitle}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="hidden md:block pr-6"><CssCube /></div>
        </Reveal>
      </div>
    </section>
  );
}
