"use client";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full grid place-items-center text-white shadow-card hover:scale-105 transition"
      style={{ background: "#25D366" }}>
      <MessageCircle size={26} />
    </a>
  );
}
