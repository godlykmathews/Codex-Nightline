import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { year, title, description } = await request.json();
  if (!year || !title || !description) return NextResponse.json({ error: "Event details are required." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 503 });
  const prompt = `Original editorial illustration for an alternate-history archive: ${year}, ${title}. ${description}. Retro-futurist archival diagram, dark ink, warm amber highlights, grainy paper texture, no text, no logos, no copyrighted characters.`;
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size: "1024x1024", quality: "medium", output_format: "webp" }),
  });
  if (!response.ok) return NextResponse.json({ error: "Illustration generation failed." }, { status: 502 });
  const data = await response.json();
  const image = data.data?.[0]?.b64_json;
  if (!image) return NextResponse.json({ error: "No illustration was returned." }, { status: 502 });
  return NextResponse.json({ image: `data:image/webp;base64,${image}` });
}
