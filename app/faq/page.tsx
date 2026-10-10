import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "FAQ — WattsUpTech.in", description: "Answers on services, pricing, timelines, academic projects and support." };

export default function FaqPage() {
  return (
    <>
      <PageHero crumb="FAQ" title="Questions?" accent="Answered."
        subtitle="Everything about services, pricing, timelines and support. Still stuck — ask WattBot or contact us." />
      <FAQ />
      <CtaBanner title="Still have questions?" sub="Send us a message or start a project inquiry — we reply with next steps." />
    </>
  );
}
