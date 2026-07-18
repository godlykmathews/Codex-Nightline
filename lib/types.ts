export type TimelineDomain = "politics" | "science" | "technology" | "medicine" | "economy" | "society" | "culture" | "military";
export type NexusPhase = "divergence" | "immediate" | "short_term" | "medium_term" | "long_term" | "present_day";
export type SimulationConfidence = "low" | "medium" | "high";
export type BranchSeverity = "minor" | "moderate" | "major" | "critical";

export interface TimelineEvent { id: string; year: number; title: string; description: string; actualOutcome: string; causalDependencies: string[]; historicalImpact: string[]; domains: TimelineDomain[]; demoNexusPrompt: string; nexusGuardrails: string[]; imagePrompt: string; position: number; }
export interface NexusBranchEvent { id: string; year: number; phase: NexusPhase; title: string; description: string; causalMechanism: string; causedBy: string[]; affectedDomains: TimelineDomain[]; confidence: SimulationConfidence; imagePrompt: string; }
export interface NexusBranch { status: "ready" | "needs_clarification" | "invalid"; clarificationQuestion: string | null; branchName: string; anchorEventId: string; normalizedDivergence: string; divergenceYear: number | null; divergenceReason: string; assumptions: string[]; counterforces: string[]; historicalContinuities: string[]; events: NexusBranchEvent[]; branchSeverity: BranchSeverity; timelineStabilityScore: number; overallPlausibility: "weak" | "moderate" | "strong"; uncertaintyNote: string; }
export type SelectedRecord = { kind: "prime"; event: TimelineEvent } | { kind: "branch"; event: NexusBranchEvent; branch: NexusBranch };
export interface GeneratedImageCache { [eventId: string]: string; }
