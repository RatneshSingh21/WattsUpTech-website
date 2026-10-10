import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = ["/", "/services", "/technologies", "/portfolio", "/process", "/start-project", "/about", "/faq", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${siteConfig.url}${r}`, lastModified: new Date(), changeFrequency: "weekly", priority: r === "/" ? 1 : 0.8 }));
}
