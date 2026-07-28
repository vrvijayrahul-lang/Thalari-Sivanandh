import { NextResponse } from "next/server";

// In production, use environment variables and JWT
const ADMIN_PASSWORD = "admin123";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

      return NextResponse.json({
        success: true,
        token,
        message: "Authenticated successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}