"use client";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { Code2, Globe, Terminal, LayoutDashboard, Database, Wrench } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  "project-dev": <Code2 />,
  "web-design": <Globe />,
  programming: <Terminal />,
  frontend: <LayoutDashboard />,
  backend: <Database />,
  custom: <Wrench />,
};

export default function Services({ onSelect }: { onSelect?: (s: string) => void }) {
  const router = useRouter();
  const pick = (title: string) => {
    if (onSelect) return onSelect(title);
    router.push(`/start-project?service=${encodeURIComponent(title)}`);
  };
  return (
    <section id="services" className="py-20 bg-deep/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Technology Solutions for <span className="text-gradient">Your Next Big Idea</span></h2>
          <p className="text-muted text-center mt-3">Explore development services designed around your goals and requirements.</p>
        </Reveal> */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <Tilt3D className="h-full">
              <article id={`service-${s.id}`} className="glass rounded-2xl p-6 card-hover h-full flex flex-col scroll-mt-24">
                <div className="w-12 h-12 rounded-xl grid place-items-center bg-gradient-to-br from-electric to-cyanx text-[#00111f] mb-4">
                  {icons[s.id]}
                </div>
                <h3 className="font-bold text-xl">{s.title}</h3>
                <p className="text-muted text-sm mt-2">{s.desc}</p>
                <ul className="mt-3 text-sm space-y-1 text-white/80 list-disc list-inside">
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <div className="mt-5 flex gap-3 pt-2">
                  <button onClick={() => pick(s.title)} className="btn-primary rounded-full px-4 py-2 text-sm flex-1 text-center">Request This</button>
                  <a href={`/services#service-${s.id}`} className="btn-ghost rounded-full px-4 py-2 text-sm">Learn More</a>
                </div>
              </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
