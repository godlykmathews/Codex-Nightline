import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { NexusBranchSchema } from "@/lib/nexus-schema";

export const runtime = "nodejs";

const dataDirectory = path.join(process.cwd(), "data");
const archivePath = path.join(dataDirectory, "nexus-timelines.json");
const ArchiveSchema = z.object({ branches: z.array(NexusBranchSchema).max(30) });

async function readArchive() {
  try {
    const content = await readFile(archivePath, "utf8");
    const parsed = ArchiveSchema.safeParse(JSON.parse(content));
    return parsed.success ? parsed.data : { branches: [] };
  } catch { return { branches: [] }; }
}

export async function GET() {
  return NextResponse.json(await readArchive());
}

export async function POST(request: NextRequest) {
  try {
    const parsed = ArchiveSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid timeline archive." }, { status: 400 });
    await mkdir(dataDirectory, { recursive: true });
    const tempPath = `${archivePath}.tmp`;
    await writeFile(tempPath, JSON.stringify(parsed.data, null, 2), "utf8");
    await rename(tempPath, archivePath);
    return NextResponse.json({ saved: parsed.data.branches.length });
  } catch (error) {
    console.error("Timeline archive save failed:", error);
    return NextResponse.json({ error: "Timeline archive could not be saved." }, { status: 500 });
  }
}
