import { siteConfig } from "@/lib/site";
import { Megaphone, ArrowRight } from "lucide-react";

export default function PromoBar() {
  if (!siteConfig.promo.show) return null;
  return (
    <div className="bg-gradient-to-r from-electric via-[#0f6fe0] to-violetx text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-center gap-2 sm:gap-3 text-center">
        <Megaphone size={15} className="shrink-0" />
        <span className="font-medium">{siteConfig.promo.text}</span>
        <a href={siteConfig.promo.href} className="hidden sm:inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 whitespace-nowrap">
          {siteConfig.promo.cta} <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
