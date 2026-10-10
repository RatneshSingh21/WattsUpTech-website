import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Technologies from "@/components/Technologies";
import TechOrbit from "@/components/TechOrbit";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "Technologies — WattsUpTech.in", description: "Java, Python, React, Node.js, PHP, MySQL, MongoDB and more — the stack we build with." };

export default function TechnologiesPage() {
  return (
    <>
      <PageHero crumb="Technologies" title="Built With the" accent="Right Technology"
        subtitle="Every technology below is one we actually deliver projects in — hover to explore, then tell us your pick in the Project Builder." />
      <section className="py-8"><TechOrbit /></section>
      <Technologies />
      <CtaBanner title="Picked your stack?" sub="Tell us your project idea and preferred technology — we'll confirm the right fit." />
    </>
  );
}
