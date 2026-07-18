"use client";

import { TimelineBranch, TimelineEvent } from "@/lib/types";

type Props = { events: TimelineEvent[]; branches: TimelineBranch[]; selectedId?: string; onSelect: (event: TimelineEvent) => void };

const MAIN_X = 154;
const TOP = 62;
const STEP = 66;

export function TimelineCanvas({ events, branches, selectedId, onSelect }: Props) {
  const eventY = (event: TimelineEvent) => TOP + event.position * STEP;
  return (
    <section className="relative h-full min-h-[720px] overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_28%_28%,rgba(241,166,67,.08),transparent_27%)]" aria-label="Timeline map">
      <div className="absolute left-7 top-7 z-10 font-mono text-[10px] uppercase tracking-[.28em] text-mist">Chronology / prime record</div>
      <svg viewBox="0 0 600 740" className="h-full min-h-[720px] w-full" preserveAspectRatio="xMinYMin meet">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(145,163,165,.10)" strokeWidth=".5" /></pattern>
        </defs>
        <rect width="600" height="740" fill="url(#grid)" />
        <path d={`M ${MAIN_X} 38 V ${TOP + (events.length - 1) * STEP + 42}`} stroke="rgba(212,221,216,.45)" strokeWidth="1.5" />
        <path d={`M ${MAIN_X} 38 V ${TOP + (events.length - 1) * STEP + 42}`} stroke="#f1a643" strokeWidth="1" strokeDasharray="2 9" className="animate-pulse-signal" />
        {branches.map((branch, branchIndex) => {
          const anchor = events.find((event) => event.id === branch.anchorId);
          if (!anchor) return null;
          const anchorY = eventY(anchor);
          const direction = branchIndex % 2 === 0 ? 1 : -1;
          const x = MAIN_X + direction * 210;
          return <g key={branch.id}>
            <path d={`M ${MAIN_X} ${anchorY} C ${MAIN_X + direction * 115} ${anchorY + 6}, ${x} ${anchorY + 34}, ${x} ${anchorY + 142}`} fill="none" stroke="#f1a643" strokeWidth="1.4" filter="url(#glow)" />
            {branch.events.map((event, index) => {
              const y = anchorY + 48 + index * 47;
              return <g key={event.id} className="cursor-pointer" onClick={() => onSelect(event)}>
                <circle cx={x} cy={y} r={selectedId === event.id ? 11 : 7} fill="#10151a" stroke="#f1a643" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="2.5" fill="#f1a643" />
                <text x={x + 15 * direction} y={y + 4} textAnchor={direction === 1 ? "start" : "end"} fill="#d9ddd7" fontSize="10" fontFamily="monospace">{event.year}</text>
              </g>;
            })}
          </g>;
        })}
        {events.map((event) => {
          const y = eventY(event);
          const selected = selectedId === event.id;
          return <g key={event.id} className="cursor-pointer" onClick={() => onSelect(event)}>
            {selected && <circle cx={MAIN_X} cy={y} r="16" fill="none" stroke="#f1a643" opacity=".3" className="animate-pulse-signal" />}
            <circle cx={MAIN_X} cy={y} r={selected ? 8 : 6} fill={selected ? "#f1a643" : "#10151a"} stroke="#f1a643" strokeWidth="1.5" filter={selected ? "url(#glow)" : undefined} />
            <text x={MAIN_X + 21} y={y + 4} fill={selected ? "#f4d09d" : "#a9b4b3"} fontSize="11" fontFamily="monospace">{event.year}</text>
            <text x={MAIN_X + 67} y={y + 4} fill={selected ? "#f6f4ec" : "#d3d8d2"} fontSize="11">{event.title}</text>
          </g>;
        })}
      </svg>
      <div className="absolute bottom-7 left-7 font-mono text-[9px] uppercase tracking-[.2em] text-mist">10 fixed points / {branches.length} nexus branch{branches.length === 1 ? "" : "es"}</div>
    </section>
  );
}
