"use client";
import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-deep/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          {/* <h2 className="text-3xl sm:text-4xl font-extrabold">Technology <span className="text-gradient">With a Purpose</span></h2>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            At WattsUpTech.in, we believe every good digital product starts with an idea. Our goal is to help individuals
            and businesses turn those ideas into practical websites, software, and technology solutions through thoughtful design and development.
          </p> */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            <div className="glass rounded-2xl p-5"><h3 className="font-bold text-cyanx">Mission</h3><p className="text-sm text-muted mt-1">Make quality development accessible for startups, businesses and students.</p></div>
            <div className="glass rounded-2xl p-5"><h3 className="font-bold text-cyanx">Approach</h3><p className="text-sm text-muted mt-1">Discuss → define scope → design & build → deliver + support.</p></div>
            <div className="glass rounded-2xl p-5"><h3 className="font-bold text-cyanx">Focus</h3><p className="text-sm text-muted mt-1">Clean code, responsive UI, honest timelines, easy contact.</p></div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/services" className="btn-ghost rounded-full px-6 py-3 text-sm">View Services</a>
            <a href="/start-project" className="btn-primary rounded-full px-6 py-3 text-sm inline-flex items-center justify-center gap-2">Start a Project <ArrowRight size={16} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
