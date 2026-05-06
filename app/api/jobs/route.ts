import { NextResponse } from "next/server";

import {
  getApplicationsByUser,
  getApplicationsByUserAndStatus,
  updateApplication,
  deleteApplication,
} from "@/lib/commands";

// handles the get request to retrieve all applications for a user
// accepts an optional `status` query param to filter results

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const status = url.searchParams.get("status");

  // if userID is missing return error

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId query parameter." },
      { status: 400 },
    );
  }

  // if userID is not a valid number return error

  const userIdNum = Number(userId);
  if (!Number.isFinite(userIdNum) || userIdNum <= 0) {
    return NextResponse.json(
      { error: "Invalid userId query parameter." },
      { status: 400 },
    );
  }

  // if a status filter is provided, use the filtered JOIN query; otherwise fetch all

  const applications = status
    ? await getApplicationsByUserAndStatus(userIdNum, status)
    : await getApplicationsByUser(userIdNum);

  return NextResponse.json({ applications });
}

// handles the put request to update an application

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, jobTitle, jobLocation, status, dateApplied } = body;

    // validate required field are present

    if (!applicationId || !jobTitle || !jobLocation || !status) {
      return NextResponse.json(
        { error: "Missing required fields: applicationId, jobTitle, jobLocation, status." },
        { status: 400 },
      );
    }

    // update the application with the provided data and return success message
    // return error message if update fails
    
    await updateApplication(applicationId, jobTitle, jobLocation, status, dateApplied);
    return NextResponse.json({ message: "Application updated successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update application." },
      { status: 500 },
    );
  }
}

// handles the delete request for an application

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const applicationId = url.searchParams.get("applicationId");

    // check if applicatioID is present and valid

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

    // delete the application and return success message, return error message if it fails

    await deleteApplication(applicationIdNum);
    return NextResponse.json({ message: "Application deleted successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete application." },
      { status: 500 },
    );
  }
}