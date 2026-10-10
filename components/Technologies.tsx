"use client";
import Reveal from "./Reveal";

const groups: { title: string; items: string[] }[] = [
  { title: "Programming", items: ["Java", "Python", "C", "C++"] },
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Styling", items: ["Tailwind CSS"] },
  { title: "Backend", items: ["Java", "Node.js", "PHP"] },
  { title: "Databases", items: ["MySQL", "MongoDB"] },
  { title: "Tools", items: ["Git", "GitHub"] },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Built With the <span className="text-gradient">Right Technology</span></h2>
          <p className="text-muted text-center mt-3">Clean grid • hover to explore • real stack we deliver in.</p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-cyanx uppercase tracking-widest text-xs">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:border-cyanx hover:text-cyanx hover:-translate-y-0.5 transition cursor-default">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
