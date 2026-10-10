"use client";
import { useRef, useState, ReactNode, MouseEvent } from "react";

export default function Tilt3D({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState("");
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  function move(e: MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT(`perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`);
  }

  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setT("")}
      className={className} style={{ transform: t, transition: t ? "transform 0.08s" : "transform 0.4s ease" }}>
      {children}
    </div>
  );
}
