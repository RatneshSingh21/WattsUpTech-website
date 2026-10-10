import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StartProjectForm from "@/components/StartProjectForm";

export const metadata: Metadata = { title: "Start a Project — WattsUpTech.in", description: "5-step project inquiry wizard: type, technology, requirements, budget and contact." };

export default function StartProjectPage() {
  return (
    <>
      <PageHero crumb="Start a Project" title="Let's Scope" accent="Your Project"
        subtitle="Answer 5 quick steps. Your progress is saved while navigating, and you review everything before submitting." />
      <StartProjectForm />
    </>
  );
}
