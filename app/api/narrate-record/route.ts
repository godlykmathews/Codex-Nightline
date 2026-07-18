import { createHash } from "crypto";
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openai } from "@/lib/openai";

export const runtime = "nodejs";
export const maxDuration = 120;
const RequestSchema = z.object({ eventId: z.string().min(1), narration: z.string().min(20).max(4000) });
const audioDirectory = path.join(process.cwd(), "public", "generated", "audio");

export async function POST(request: NextRequest) {
  try {
    const parsed = RequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid narration request." }, { status: 400 });
    const key = createHash("sha256").update(`${parsed.data.eventId}:${parsed.data.narration}`).digest("hex");
    const filename = `${key}.mp3`; const outputPath = path.join(audioDirectory, filename); const audioUrl = `/generated/audio/${filename}`;
    try { await access(outputPath); return NextResponse.json({ audioUrl, cached: true }); } catch { /* Generate only when uncached. */ }
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured and no archived narration exists." }, { status: 500 });
    const speech = await openai.audio.speech.create({ model: process.env.OPENAI_TTS_MODEL ?? "tts-1", voice: "onyx", input: parsed.data.narration, response_format: "mp3", speed: 0.92 });
    await mkdir(audioDirectory, { recursive: true });
    await writeFile(outputPath, Buffer.from(await speech.arrayBuffer()));
    return NextResponse.json({ audioUrl, cached: false });
  } catch (error) {
    console.error("Record narration failed:", error);
    return NextResponse.json({ error: "Temporal narration failed." }, { status: 500 });
  }
}
