import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "WattsUpTech.in — Turning Your Ideas Into Digital Reality",
  description:
    "WattsUpTech.in builds modern websites, web apps, college projects and custom software. Your Vision, Our Code.",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: "WattsUpTech.in — Your Vision, Our Code",
    description: "Websites. Projects. Technology. Built Around Your Needs.",
    url: "/",
    siteName: "WattsUpTech.in",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WattsUpTech.in",
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    description: siteConfig.subheadline,
  };
  return (
    <html lang="en">
      <body className="bg-navy text-white antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PromoBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <WhatsAppButton />
      </body>
    </html>
  );
}
