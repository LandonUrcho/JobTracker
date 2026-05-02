import { NextResponse } from "next/server";
import { getApplicationsByUser } from "@/lib/commands";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId query parameter." },
      { status: 400 },
    );
  }

  const userIdNum = Number(userId);
  if (!Number.isFinite(userIdNum) || userIdNum <= 0) {
    return NextResponse.json(
      { error: "Invalid userId query parameter." },
      { status: 400 },
    );
  }

  const applications = await getApplicationsByUser(userIdNum);
  return NextResponse.json({ applications });
}