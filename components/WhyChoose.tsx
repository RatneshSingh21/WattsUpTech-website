"use client";
import Reveal from "./Reveal";
import { SlidersHorizontal, MonitorSmartphone, Smartphone, MessagesSquare, FileCheck2, LifeBuoy } from "lucide-react";

const items = [
  { icon: <SlidersHorizontal />, t: "Customized Solutions", d: "Scope defined around your goals — no bloated packages." },
  { icon: <MonitorSmartphone />, t: "Modern User Experience", d: "Clean layouts, readable type and smooth micro-interactions." },
  { icon: <Smartphone />, t: "Responsive Development", d: "Mobile-first builds tested across phone, tablet and desktop." },
  { icon: <MessagesSquare />, t: "Clear Communication", d: "Requirement discussion before work, updates during build." },
  { icon: <FileCheck2 />, t: "Defined Project Scope", d: "Agreed features, timeline and deliverables up front." },
  { icon: <LifeBuoy />, t: "Agreed Delivery & Support", d: "Delivery plus agreed post-delivery assistance." },
];

export default function WhyChoose() {
  return (
    <section id="why" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal><h2 className="text-3xl sm:text-4xl font-extrabold text-center">Built Around <span className="text-gradient">Your Requirements</span></h2></Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 card-hover h-full">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-electric/15 text-cyanx border border-electric/25">{x.icon}</div>
                <h3 className="mt-4 font-bold">{x.t}</h3>
                <p className="text-muted text-sm mt-1">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
