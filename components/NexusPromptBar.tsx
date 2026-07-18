"use client";

import { FormEvent, useState } from "react";
import { TimelineEvent } from "@/lib/types";

type Props = { anchor?: TimelineEvent; onCreate: (prompt: string) => Promise<void>; loading: boolean };

export function NexusPromptBar({ anchor, onCreate, loading }: Props) {
  const [prompt, setPrompt] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); if (!prompt.trim() || !anchor || loading) return; await onCreate(prompt.trim()); setPrompt(""); }
  return <form onSubmit={submit} className="fixed inset-x-0 bottom-0 z-30 border-t border-signal/30 bg-[#0b0f13]/95 px-5 py-4 backdrop-blur md:px-8">
    <div className="mx-auto flex max-w-6xl items-center gap-4">
      <div className="hidden font-mono text-[10px] uppercase tracking-[.16em] text-mist md:block">{anchor ? `Anchor: ${anchor.year}` : "Select anchor"}</div>
      <input value={prompt} onChange={(event) => setPrompt(event.target.value)} disabled={!anchor || loading} placeholder={anchor ? "Describe the divergence point..." : "Select a main timeline event first"} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#6c7978] disabled:cursor-not-allowed" />
      <button disabled={!anchor || !prompt.trim() || loading} className="shrink-0 bg-signal px-4 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-ink transition hover:bg-[#ffd08a] disabled:cursor-not-allowed disabled:opacity-35">{loading ? "Mapping..." : "Create Nexus Event"}</button>
    </div>
  </form>;
}
