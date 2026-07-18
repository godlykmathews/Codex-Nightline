import { createHash } from "crypto";
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openai, OPENAI_IMAGE_MODEL } from "@/lib/openai";

export const runtime = "nodejs";
export const maxDuration = 120;

const ImageRequestSchema = z.object({ eventId: z.string().min(1), year: z.number().int(), title: z.string().min(1).max(200), description: z.string().min(1).max(2000), imagePrompt: z.string().min(10).max(4000), branchName: z.string().max(200).optional(), isSpeculative: z.boolean() });
const generatedDirectory = path.join(process.cwd(), "public", "generated");

function imageCacheKey(event: z.infer<typeof ImageRequestSchema>) {
  return createHash("sha256").update(JSON.stringify({ eventId: event.eventId, year: event.year, title: event.title, imagePrompt: event.imagePrompt, branchName: event.branchName, isSpeculative: event.isSpeculative })).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const parsed = ImageRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid image-generation request.", details: parsed.error.flatten() }, { status: 400 });
    const event = parsed.data;
    const cacheKey = imageCacheKey(event);
    const filename = `${cacheKey}.png`;
    const imagePath = path.join(generatedDirectory, filename);
    const imageUrl = `/generated/${filename}`;

    try {
      await access(imagePath);
      return NextResponse.json({ eventId: event.eventId, imageUrl, isSpeculative: event.isSpeculative, cached: true });
    } catch { /* Image has not been generated locally yet. */ }

    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured and no local archive image exists." }, { status: 500 });
    const quality = process.env.OPENAI_IMAGE_QUALITY === "medium" || process.env.OPENAI_IMAGE_QUALITY === "high" ? process.env.OPENAI_IMAGE_QUALITY : "low";
    const result = await openai.images.generate({ model: OPENAI_IMAGE_MODEL, prompt: `Create a ${event.isSpeculative ? "fictional alternate-history reconstruction" : "historical archival reconstruction"} for an original temporal records bureau. YEAR: ${event.year}. EVENT: ${event.title}. DESCRIPTION: ${event.description}. SCENE: ${event.imagePrompt}. Cinematic archival realism, charcoal, aged paper and restrained amber illumination; period-appropriate materials; no text, logos, watermark, franchise, interface screenshot, or recognisable character.`, size: "1536x1024", quality });
    const image = result.data?.[0]?.b64_json;
    if (!image) return NextResponse.json({ error: "The image model returned no image." }, { status: 502 });
    await mkdir(generatedDirectory, { recursive: true });
    await writeFile(imagePath, Buffer.from(image, "base64"));
    return NextResponse.json({ eventId: event.eventId, imageUrl, isSpeculative: event.isSpeculative, cached: false });
  } catch (error) {
    console.error("Event image generation failed:", error);
    return NextResponse.json({ error: "Temporal image reconstruction failed." }, { status: 500 });
  }
}
