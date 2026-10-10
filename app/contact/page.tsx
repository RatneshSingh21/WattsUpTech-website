import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "Contact — WattsUpTech.in", description: "Tell us about your requirements and let's discuss the next steps." };

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact" title="Let's Build" accent="Something Great"
        subtitle="Have an idea in mind? Tell us about your requirements, and let's discuss the next steps." />
      <Contact />
    </>
  );
}
