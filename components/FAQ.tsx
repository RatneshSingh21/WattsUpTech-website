"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";
import Reveal from "./Reveal";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* <Reveal><h2 className="text-3xl sm:text-4xl font-extrabold text-center">Frequently Asked <span className="text-gradient">Questions</span></h2></Reveal> */}
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="glass rounded-2xl overflow-hidden">
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 font-semibold flex justify-between items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyanx rounded-2xl">
                  {f.q}<ChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180 text-cyanx" : ""}`} size={18} />
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
