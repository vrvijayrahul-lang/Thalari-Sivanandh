import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const contentPath = join(process.cwd(), "data", "content.json");

function readContent(): Record<string, unknown> {
  try {
    const raw = readFileSync(contentPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeContent(data: Record<string, unknown>): void {
  writeFileSync(contentPath, JSON.stringify(data, null, 2), "utf-8");
}

function verifyAuth(request: Request): boolean {
  const auth = request.headers.get("authorization");
  if (!auth) return false;
  try {
    const token = auth.replace("Bearer ", "");
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.startsWith("admin:");
  } catch {
    return false;
  }
}

export async function GET() {
  const content = readContent();
  return NextResponse.json({ success: true, data: content });
}

export async function PUT(request: Request) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = readContent();
    const updated = { ...current, ...body };
    writeContent(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to update content" },
      { status: 500 }
    );
  }
}