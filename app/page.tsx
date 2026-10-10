import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Spotlight from "@/components/Spotlight";
import Services from "@/components/Services";
import TechOrbit from "@/components/TechOrbit";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import WhyChoose from "@/components/WhyChoose";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "WattsUpTech.in — Turning Your Ideas Into Digital Reality",
  description: "Modern websites, web apps, college projects and custom software. Your Vision, Our Code.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Spotlight />
      <Services />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Tech That <span className="text-gradient">Orbits Around You</span></h2>
          <p className="text-muted mt-3">The stack we deliver in — <a href="/technologies" className="text-cyanx underline">explore all technologies</a></p>
          <div className="mt-4"><TechOrbit compact /></div>
        </div>
      </section>
      <HowItWorks />
      <Portfolio limit={3} showViewAll />
      <WhyChoose />
      <CtaBanner />
    </>
  );
}
