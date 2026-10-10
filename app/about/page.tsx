import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "About — WattsUpTech.in", description: "Technology with a purpose — practical websites, software and project development." };

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="Technology" accent="With a Purpose"
        subtitle="We help individuals and businesses turn ideas into practical digital products through thoughtful design and development." />
      <About />
      <WhyChoose />
      <CtaBanner />
    </>
  );
}
