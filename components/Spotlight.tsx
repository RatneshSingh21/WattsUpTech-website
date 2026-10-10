"use client";
import Reveal from "./Reveal";
import Tilt3D from "./Tilt3D";
import { Briefcase, Rocket, GraduationCap, ArrowRight } from "lucide-react";

const spots = [
  {
    icon: <Briefcase />, tag: "For Businesses",
    title: "Business Websites That Win Customers",
    desc: "Modern, responsive sites with clear services, contact flow and WhatsApp chat — designed to turn visitors into inquiries.",
    href: "/start-project?service=Website%20Design%20%26%20Development",
  },
  {
    icon: <Rocket />, tag: "For Startups",
    title: "Web Apps Built Around Your Idea",
    desc: "Landing pages, MVPs and full web apps with React, Node.js and real databases — scoped, built and delivered with support.",
    href: "/start-project?service=Website%20Design%20%26%20Development",
  },
  {
    icon: <GraduationCap />, tag: "For Students",
    title: "College Projects, Done Right",
    desc: "Java, Python, web and database projects with explanation and documentation support so you can present with confidence.",
    href: "/start-project?service=Project%20Development",
  },
];

export default function Spotlight() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-bold tracking-[0.25em] uppercase text-cyanx">What we do best</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mt-2">Made to <span className="text-gradient">Attract Your Visitors</span></h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {spots.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Tilt3D className="h-full">
                <article className="glass rounded-3xl p-7 card-hover h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-electric/25 blur-[70px]" />
                  <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-electric to-cyanx text-[#00111f] rounded-full px-3 py-1 w-fit">{s.tag}</span>
                  <div className="mt-4 w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-electric to-cyanx text-[#00111f] shadow-glow">{s.icon}</div>
                  <h3 className="mt-4 font-bold text-xl leading-snug">{s.title}</h3>
                  <p className="text-muted text-sm mt-2 flex-1">{s.desc}</p>
                  <a href={s.href} className="mt-5 inline-flex items-center gap-2 font-bold text-cyanx hover:gap-3 transition-all">Get this solution <ArrowRight size={16} /></a>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
