"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { navRoutes } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const active = (h: string) => (h === "/" ? path === "/" : path === h || path.startsWith(h + "/"));

  return (
    <header className={`sticky top-0 z-50 transition ${scrolled ? "glass shadow-card" : "bg-navy/80 backdrop-blur"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
          <span className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-electric to-cyanx text-[#00111f] shadow-glow">
            <Zap size={20} strokeWidth={2.5} />
          </span>
          WattsUpTech<span className="text-cyanx">.in</span>
        </Link>
        <div className="hidden lg:flex items-center gap-5 text-sm">
          {navRoutes.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined}
              className={`px-1 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyanx transition ${active(l.href) ? "text-cyanx font-bold" : "text-muted hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <Link href="/start-project" className="btn-primary rounded-full px-5 py-2.5 text-sm">Start a Project</Link>
        </div>
        <button className="lg:hidden p-2 rounded-lg btn-ghost" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden glass border-t border-white/10 px-4 py-4 space-y-1">
          {navRoutes.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg ${active(l.href) ? "bg-electric/20 text-cyanx font-bold" : "hover:bg-white/10"}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/start-project" onClick={() => setOpen(false)} className="btn-primary rounded-xl px-4 py-3 text-center block mt-2 font-bold">
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
