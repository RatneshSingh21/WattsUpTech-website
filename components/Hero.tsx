"use client";
import Hero3D from "./Hero3D";
import Reveal from "./Reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-electric/20 blur-[140px]" />
        <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violetx/20 blur-[140px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyanx glass rounded-full px-4 py-2">
              <Sparkles size={14} /> Your Vision, Our Code
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Turning Your <span className="text-gradient">Ideas Into Digital Reality.</span>
            </h1>
            <p className="mt-5 text-muted text-lg max-w-xl">
              From modern websites to custom software and project development, WattsUpTech.in helps transform your ideas into practical digital solutions.
            </p>
            <p className="mt-3 text-sm text-cyanx font-semibold tracking-wide">Websites. Projects. Technology. Built Around Your Needs.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/start-project" className="btn-primary rounded-full px-7 py-3.5 inline-flex items-center gap-2">
                Start Your Project <ArrowRight size={18} />
              </a>
              <a href="/services" className="btn-ghost rounded-full px-7 py-3.5">Explore Our Services</a>
            </div>
            <div className="mt-8 flex gap-6 text-sm text-muted">
              <div><span className="text-white font-bold">6+</span><br />Service tracks</div>
              <div><span className="text-white font-bold">12+</span><br />Technologies</div>
              <div><span className="text-white font-bold">4-step</span><br />Clear process</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="h-[380px] sm:h-[440px] rounded-3xl glass overflow-hidden shadow-glow tilt">
              <Hero3D />
            </div>
            {/* laptop / code mockup overlay */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 right-6 glass rounded-2xl p-4 shadow-card">
              <div className="flex gap-1.5 mb-2"><span className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="w-2.5 h-2.5 rounded-full bg-yellow-400" /><span className="w-2.5 h-2.5 rounded-full bg-green-400" /></div>
              <pre className="text-[11px] sm:text-xs font-mono text-cyanx/90 overflow-hidden">
{`$ wattsup build --vision your-idea
✓ design system ready
✓ responsive + SEO + chatbot
→ deploying to wattsuptech.in 🚀`}
              </pre>
            </div>
            <div className="absolute -top-4 right-4 glass rounded-full px-4 py-2 text-xs font-bold text-cyanx animate-bounce">Code • Design • Build • Grow</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
