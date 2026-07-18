import { z } from "zod";

const domain = z.enum(["politics", "science", "technology", "medicine", "economy", "society", "culture", "military"]);
const primeEvent = z.object({ id: z.string(), year: z.number().int(), title: z.string(), description: z.string(), actualOutcome: z.string(), causalDependencies: z.array(z.string()), historicalImpact: z.array(z.string()), domains: z.array(domain), demoNexusPrompt: z.string(), nexusGuardrails: z.array(z.string()), imagePrompt: z.string(), position: z.number().int() });

export const GenerateNexusRequestSchema = z.object({ anchorEvent: primeEvent, userPrompt: z.string().min(8).max(3000), clarificationContext: z.string().max(2000).optional() });
export const NexusBranchSchema = z.object({
  status: z.enum(["ready", "needs_clarification", "invalid"]), clarificationQuestion: z.string().nullable(), branchName: z.string(), anchorEventId: z.string(), normalizedDivergence: z.string(), divergenceYear: z.number().int().nullable(), divergenceReason: z.string(), assumptions: z.array(z.string()), counterforces: z.array(z.string()), historicalContinuities: z.array(z.string()),
  events: z.array(z.object({ id: z.string(), year: z.number().int(), phase: z.enum(["divergence", "immediate", "short_term", "medium_term", "long_term", "present_day"]), title: z.string(), description: z.string(), causalMechanism: z.string(), causedBy: z.array(z.string()), affectedDomains: z.array(domain), confidence: z.enum(["low", "medium", "high"]), imagePrompt: z.string() })),
  branchSeverity: z.enum(["minor", "moderate", "major", "critical"]), timelineStabilityScore: z.number().int().min(0).max(100), overallPlausibility: z.enum(["weak", "moderate", "strong"]), uncertaintyNote: z.string(),
});
