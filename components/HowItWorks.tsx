"use client";
import Reveal from "./Reveal";
import { MessagesSquare, ClipboardCheck, Code2, Rocket } from "lucide-react";

const steps = [
  { icon: <MessagesSquare />, t: "Share Your Idea", d: "Tell us what you want to build." },
  { icon: <ClipboardCheck />, t: "Discuss Requirements", d: "We clarify features, budget, timeline and technical needs." },
  { icon: <Code2 />, t: "Design & Development", d: "We work on agreed scope, design, implementation and testing." },
  { icon: <Rocket />, t: "Delivery & Support", d: "Receive deliverables and agreed post-delivery support." },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-20 bg-deep/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal><h2 className="text-3xl sm:text-4xl font-extrabold text-center">From Idea <span className="text-gradient">to Execution</span></h2></Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.07}>
              <div className="glass rounded-2xl p-6 card-hover relative">
                <span className="absolute top-4 right-5 text-white/20 font-black text-3xl">0{i + 1}</span>
                <div className="w-11 h-11 rounded-full grid place-items-center bg-electric/15 text-cyanx border border-electric/30">{s.icon}</div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="text-muted text-sm mt-1">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
