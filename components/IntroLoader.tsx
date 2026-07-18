"use client";

import { useEffect, useState } from "react";

export function IntroLoader() {
  const [phase, setPhase] = useState<"video" | "title" | "done">("video");

  useEffect(() => {
    if (phase === "video") {
      const fallback = window.setTimeout(() => setPhase("title"), 7000);
      return () => window.clearTimeout(fallback);
    }
    if (phase === "title") {
      const reveal = window.setTimeout(() => setPhase("done"), 1800);
      return () => window.clearTimeout(reveal);
    }
  }, [phase]);

  if (phase === "done") return null;
  return <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#030609]" role="status" aria-label="Loading NEXUS temporal archive">
    {phase === "video" && <><video autoPlay muted playsInline onEnded={() => setPhase("title")} onError={() => setPhase("title")} className="absolute inset-0 h-full w-full object-cover opacity-65"><source src="/background/background_loader.mp4" type="video/mp4"/></video><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(3,6,9,.66)_78%)]"/><div className="relative text-center"><p className="font-mono text-[10px] uppercase tracking-[.42em] text-[#a8dcf0]">NEXUS temporal archive</p><div className="mx-auto mt-5 h-px w-40 overflow-hidden bg-white/20"><span className="block h-full w-1/2 animate-[temporal-flow_1.2s_linear_infinite] bg-[#7ce8ff]"/></div><p className="mt-4 font-mono text-[9px] uppercase tracking-[.2em] text-[#d3d8d2]">Synchronising history</p></div></>}
    {phase === "title" && <div className="animate-[intro-title_1.8s_ease-in-out_forwards] text-center"><p className="font-mono text-[11px] uppercase tracking-[.45em] text-[#9fcce0]">NEXUS presents</p><h1 className="mt-4 text-[clamp(5rem,18vw,15rem)] font-black leading-none tracking-[-.08em] text-red-600 drop-shadow-[0_0_35px_rgba(255,30,50,.7)]">What If?</h1><p className="mt-5 font-mono text-[10px] uppercase tracking-[.32em] text-[#e5e8e2]">Counterfactuals. Real-world consequences.</p></div>}
  </div>;
}
