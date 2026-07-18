"use client";

import { TimelineEvent } from "@/lib/types";

type Props = { event?: TimelineEvent; onGenerate: () => void; generating: boolean };

export function EventDetailPanel({ event, onGenerate, generating }: Props) {
  if (!event) return <aside className="flex h-full items-center justify-center border-l border-white/10 bg-panel p-10 text-center font-mono text-xs uppercase tracking-[.18em] text-mist">Select a temporal record<br />to inspect</aside>;
  return <aside className="flex h-full min-h-[720px] flex-col border-l border-white/10 bg-panel p-7">
    <p className="font-mono text-[10px] uppercase tracking-[.25em] text-signal">Record / {event.branchId ? "variant" : "prime"}</p>
    <p className="mt-9 font-mono text-5xl text-[#f1a643] drop-shadow-[0_0_16px_rgba(241,166,67,.25)]">{event.year}</p>
    <h1 className="mt-3 text-2xl font-medium tracking-tight text-[#f5f4ee]">{event.title}</h1>
    <div className="my-7 h-px w-full bg-white/10" />
    <p className="text-sm leading-7 text-[#b9c1bc]">{event.description}</p>
    <div className="mt-8 aspect-square overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#161e20,#0c1014)]">
      {event.image ? <img src={event.image} alt={`Generated illustration for ${event.title}`} className="h-full w-full object-cover" /> : <div className="flex h-full flex-col items-center justify-center p-8 text-center"><div className="mb-5 h-12 w-12 rounded-full border border-signal/50 shadow-signal" /><p className="font-mono text-[10px] uppercase tracking-[.18em] text-mist">Visual record unavailable</p></div>}
    </div>
    {!event.image && <button onClick={onGenerate} disabled={generating} className="mt-4 border border-signal/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-signal transition hover:bg-signal hover:text-ink disabled:cursor-wait disabled:opacity-50">{generating ? "Rendering archive plate..." : "Generate Illustration"}</button>}
  </aside>;
}
