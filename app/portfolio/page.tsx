import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "Portfolio — WattsUpTech.in", description: "Demonstration work showing our website, web app and programming capability patterns." };

export default function PortfolioPage() {
  return (
    <>
      <PageHero crumb="Portfolio" title="Explore" accent="Our Work"
        subtitle="Demonstration concepts showing capability patterns. Each card is editable in lib/data.ts — ready to swap in real client work." />
      <Portfolio />
      <CtaBanner title="Want something like this?" sub="Describe your version in the Project Builder and we'll scope it for you." />
    </>
  );
}
