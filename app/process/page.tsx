import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "Our Process — WattsUpTech.in", description: "From idea to execution: share, discuss, build, deliver with support." };

export default function ProcessPage() {
  return (
    <>
      <PageHero crumb="Process" title="From Idea" accent="to Execution"
        subtitle="A clear four-step process — no black boxes. You always know what's happening with your project." />
      <HowItWorks />
      <FAQ />
      <CtaBanner title="Ready for step 1?" sub="Sharing your idea takes 5 minutes in the Project Builder." />
    </>
  );
}
