import Link from "next/link";
import { siteConfig, navRoutes } from "@/lib/site";
import { Zap, Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#030713]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-electric to-cyanx text-[#00111f]"><Zap size={20} /></span>
            WattsUpTech<span className="text-cyanx">.in</span>
          </div>
          <p className="text-sm text-muted mt-3">Your one-stop tech partner. Websites, projects and technology — built around your needs.</p>
          <div className="mt-4 flex gap-2">
            {siteConfig.socials.github && <a aria-label="GitHub" href={siteConfig.socials.github} className="w-9 h-9 rounded-full btn-ghost grid place-items-center"><Github size={16} /></a>}
            {siteConfig.socials.linkedin && <a aria-label="LinkedIn" href={siteConfig.socials.linkedin} className="w-9 h-9 rounded-full btn-ghost grid place-items-center"><Linkedin size={16} /></a>}
            {siteConfig.socials.instagram && <a aria-label="Instagram" href={siteConfig.socials.instagram} className="w-9 h-9 rounded-full btn-ghost grid place-items-center"><Instagram size={16} /></a>}
            {siteConfig.socials.x && <a aria-label="X" href={siteConfig.socials.x} className="w-9 h-9 rounded-full btn-ghost grid place-items-center"><Twitter size={16} /></a>}
          </div>
        </div>
        <nav aria-label="Footer">
          <h4 className="font-bold text-sm uppercase tracking-widest text-cyanx">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {navRoutes.map((r) => (
              <li key={r.href}><Link href={r.href} className="hover:text-white">{r.label}</Link></li>
            ))}
            <li><Link href="/start-project" className="hover:text-white font-semibold text-white/80">Start a Project</Link></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-cyanx">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/services#service-project-dev" className="hover:text-white">Project Development</Link></li>
            <li><Link href="/services#service-web-design" className="hover:text-white">Website Design & Development</Link></li>
            <li><Link href="/services#service-programming" className="hover:text-white">Programming Solutions</Link></li>
            <li><Link href="/services#service-frontend" className="hover:text-white">Frontend Development</Link></li>
            <li><Link href="/services#service-backend" className="hover:text-white">Backend & Database</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-cyanx">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>{siteConfig.email}</li>
            <li><Link href="/contact" className="hover:text-white">Contact form</Link></li>
            <li><Link href="/start-project" className="hover:text-white">Project Builder</Link></li>
            <li className="flex gap-4 pt-1"><Link href="/privacy" className="hover:text-white">Privacy Policy</Link><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted px-4">
        © {y} {siteConfig.name} • {siteConfig.tagline} • PROJECTS + WEBSITES + LANGUAGES = ENDLESS POSSIBILITIES
      </div>
    </footer>
  );
}
