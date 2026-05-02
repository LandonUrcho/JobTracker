import { NextResponse } from "next/server";
import { getApplicationsByUser, updateApplication, deleteApplication } from "@/lib/commands";

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, jobTitle, jobLocation, status, dateApplied } = body;

    if (!applicationId || !jobTitle || !jobLocation || !status) {
      return NextResponse.json(
        { error: "Missing required fields: applicationId, jobTitle, jobLocation, status." },
        { status: 400 },
      );
    }

    await updateApplication(applicationId, jobTitle, jobLocation, status, dateApplied);
    return NextResponse.json({ message: "Application updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const applicationId = url.searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        { error: "Missing applicationId query parameter." },
        { status: 400 },
      );
    }

    const applicationIdNum = Number(applicationId);
    if (!Number.isFinite(applicationIdNum) || applicationIdNum <= 0) {
      return NextResponse.json(
        { error: "Invalid applicationId query parameter." },
        { status: 400 },
      );
    }

    await deleteApplication(applicationIdNum);
    return NextResponse.json({ message: "Application deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application." },
      { status: 500 },
    );
  }
}