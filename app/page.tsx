"use client";

import { useState } from "react";
import { EventDetailPanel } from "@/components/EventDetailPanel";
import { NexusPromptBar } from "@/components/NexusPromptBar";
import { TimelineCanvas } from "@/components/TimelineCanvas";
import { initialEvents } from "@/lib/events";
import { BranchResponse, TimelineBranch, TimelineEvent } from "@/lib/types";

export default function NexusPage() {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);
  const [branches, setBranches] = useState<TimelineBranch[]>([]);
  const [selected, setSelected] = useState<TimelineEvent>(initialEvents[6]);
  const [anchor, setAnchor] = useState<TimelineEvent>(initialEvents[6]);
  const [mapping, setMapping] = useState(false);
  const [rendering, setRendering] = useState(false);
  const [notice, setNotice] = useState<string>();

  function selectEvent(event: TimelineEvent) { setSelected(event); if (!event.branchId) setAnchor(event); }

  async function createBranch(prompt: string) {
    setMapping(true); setNotice(undefined);
    try {
      const response = await fetch("/api/generate-branch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, anchor }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to map a branch.");
      const result = data as BranchResponse;
      const branchId = `branch-${Date.now()}`;
      const branch: TimelineBranch = { id: branchId, anchorId: anchor.id, premise: result.premise, events: result.events.map((event, index) => ({ ...event, id: `${branchId}-${index}`, position: index, branchId })) };
      setBranches((current) => [...current, branch]); setSelected(branch.events[0]);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to map a branch."); }
    finally { setMapping(false); }
  }

  async function generateIllustration() {
    setRendering(true); setNotice(undefined);
    try {
      const response = await fetch("/api/generate-illustration", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selected) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to render the illustration.");
      const updated = { ...selected, image: data.image };
      setSelected(updated);
      if (selected.branchId) setBranches((current) => current.map((branch) => branch.id !== selected.branchId ? branch : { ...branch, events: branch.events.map((event) => event.id === selected.id ? updated : event) }));
      else setEvents((current) => current.map((event) => event.id === selected.id ? updated : event));
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to render the illustration."); }
    finally { setRendering(false); }
  }

  return <main className="min-h-screen bg-ink pb-20">
    <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-ink/85 px-6 backdrop-blur md:px-8"><div><span className="font-mono text-lg font-bold tracking-[.25em] text-[#f3f1e9]">NEXUS</span><span className="ml-3 hidden font-mono text-[9px] uppercase tracking-[.18em] text-mist sm:inline">Temporal control bureau</span></div><div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-mist"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal shadow-signal" />System nominal</div></header>
    <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 pt-16 lg:grid-cols-[minmax(0,1fr)_360px]"><TimelineCanvas events={events} branches={branches} selectedId={selected.id} onSelect={selectEvent} /><EventDetailPanel event={selected} generating={rendering} onGenerate={generateIllustration} /></div>
    {notice && <div className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 border border-red-400/30 bg-[#241215] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-red-200 shadow-xl">{notice}</div>}
    <NexusPromptBar anchor={anchor} loading={mapping} onCreate={createBranch} />
  </main>;
}
