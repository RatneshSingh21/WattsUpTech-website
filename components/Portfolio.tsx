"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { portfolioItems, PortfolioCategory } from "@/lib/data";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { ExternalLink, Code, ArrowRight } from "lucide-react";

const filters: ("All" | PortfolioCategory)[] = ["All", "Websites", "Web Applications", "Programming Projects"];

export default function Portfolio({ limit, showViewAll = false }: { limit?: number; showViewAll?: boolean }) {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const router = useRouter();
  const all = f === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === f);
  const list = limit ? all.slice(0, limit) : all;
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* <Reveal>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center">Explore <span className="text-gradient">Our Work</span></h2>
          <p className="text-muted text-center mt-3">Demonstration concepts showing capability patterns — replaceable with real client work via <code className="text-cyanx">lib/data.ts</code>.</p>
        </Reveal> */}
        <div className="mt-8 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Portfolio filters">
          {filters.map((x) => (
            <button key={x} role="tab" aria-selected={f === x} onClick={() => setF(x)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition ${f === x ? "btn-primary" : "btn-ghost"}`}>{x}</button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <Tilt3D className="h-full">
              <article className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                <div className={`h-40 bg-gradient-to-br ${p.gradient} relative`}>
                  <div className="absolute inset-0 grid place-items-center text-5xl font-black text-white/90 drop-shadow">{p.title.charAt(0)}</div>
                  <span className="absolute top-3 left-3 text-[11px] font-bold bg-black/50 rounded-full px-3 py-1">{p.category}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-muted text-sm mt-2 flex-1">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-electric/10 border border-electric/20 text-cyanx">{t}</span>)}</div>
                  <p className="mt-3 text-[11px] text-yellow-300/80">⚠ {p.demoNote}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="btn-ghost rounded-full px-4 py-2 text-xs flex items-center gap-1.5 flex-1 justify-center" onClick={() => router.push("/start-project")}><ExternalLink size={13} /> Live Demo</button>
                    <button className="btn-ghost rounded-full px-4 py-2 text-xs flex items-center gap-1.5 flex-1 justify-center" onClick={() => router.push("/contact")}><Code size={13} /> Source Code</button>
                  </div>
                </div>
              </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
        {showViewAll && (
          <div className="mt-8 text-center">
            <a href="/portfolio" className="btn-ghost rounded-full px-8 py-3 text-sm inline-flex items-center gap-2">View All Work <ArrowRight size={16} /></a>
          </div>
        )}
      </div>
    </section>
  );
}
