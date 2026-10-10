"use client";
import Reveal from "./Reveal";

const orbitA = ["React", "JavaScript", "Python", "Java", "PHP", "C++"];
const orbitB = ["Node.js", "MySQL", "MongoDB", "HTML", "CSS", "Tailwind"];

function Ring({ items, radius, duration, reverse = false }: { items: string[]; radius: number; duration: string; reverse?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className={`relative ${reverse ? "orbit-rev" : "orbit-spin"}`} style={{ width: radius * 2, height: radius * 2, animationDuration: duration }}>
        {items.map((t, i) => {
          const a = (360 / items.length) * i;
          return (
            <span key={t} className="absolute top-1/2 left-1/2 text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full glass text-cyanx whitespace-nowrap"
              style={{ transform: `translate(-50%,-50%) rotate(${a}deg) translateX(${radius}px) rotate(${-a}deg)` }}>
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function TechOrbit({ compact = false }: { compact?: boolean }) {
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return (
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        {[...orbitA, ...orbitB].map((t) => <span key={t} className="px-4 py-2 rounded-full glass text-sm">{t}</span>)}
      </div>
    );
  }
  const size = compact ? "h-[320px] sm:h-[360px]" : "h-[380px] sm:h-[440px]";
  return (
    <div className={`relative ${size} grid place-items-center overflow-hidden`} aria-hidden="true">
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-electric to-violetx grid place-items-center text-center shadow-glow z-10">
        <div><p className="font-black text-lg leading-tight">WattsUp<br />Tech.in</p><p className="text-[10px] font-semibold opacity-80 mt-1">12+ technologies</p></div>
      </div>
      <Ring items={orbitA} radius={compact ? 120 : 150} duration="28s" />
      <Ring items={orbitB} radius={compact ? 165 : 200} duration="44s" reverse />
    </div>
  );
}
