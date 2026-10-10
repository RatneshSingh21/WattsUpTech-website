import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = { title: "Services — WattsUpTech.in", description: "Websites, web apps, programming projects, frontend, backend and custom digital solutions." };

export default function ServicesPage() {
  return (
    <>
      <PageHero crumb="Services" title="Technology Solutions for" accent="Your Next Big Idea"
        subtitle="Explore development services designed around your goals and requirements. Pick any service to preselect it in the Project Builder." />
      <Services />
      <CtaBanner title="Found your service?" sub="Open the Project Builder and get a scoped plan with timeline and next steps." />
    </>
  );
}
