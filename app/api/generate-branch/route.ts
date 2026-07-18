import { NextRequest, NextResponse } from "next/server";
import { BranchResponse } from "@/lib/types";

const schema = {
  name: "nexus_branch",
  strict: true,
  schema: {
    type: "object", additionalProperties: false,
    properties: {
      premise: { type: "string" },
      events: { type: "array", minItems: 3, maxItems: 5, items: { type: "object", additionalProperties: false, properties: { year: { type: "string" }, title: { type: "string" }, description: { type: "string" } }, required: ["year", "title", "description"] } },
    }, required: ["premise", "events"],
  },
};

export async function POST(request: NextRequest) {
  const { prompt, anchor } = await request.json();
  if (!prompt || !anchor) return NextResponse.json({ error: "A prompt and anchor event are required." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 503 });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: "gpt-4.1-mini", input: `You are a speculative historian. Anchor event: ${anchor.year}, ${anchor.title}. User divergence: ${prompt}. Create a plausible, original alternate timeline after this anchor. Keep each description concise and factual in tone.`, text: { format: { type: "json_schema", ...schema } } }),
  });
  if (!response.ok) return NextResponse.json({ error: "Timeline synthesis failed." }, { status: 502 });
  const data = await response.json();
  try { return NextResponse.json(JSON.parse(data.output_text) as BranchResponse); }
  catch { return NextResponse.json({ error: "The generated timeline was unreadable." }, { status: 502 }); }
}
