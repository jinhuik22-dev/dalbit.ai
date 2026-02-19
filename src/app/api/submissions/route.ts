// src/app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// NOTE:
// Update `prisma.submission` if your Prisma model is not `Submission`.
// Example: model TrialSubmission => prisma.trialSubmission

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const created = await prisma.submission.create({
      data: body,
    });

    return NextResponse.json({ ok: true, submission: created }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/submissions error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.submission.count();

    return NextResponse.json({ ok: true, total, submissions });
  } catch (error: any) {
    console.error("GET /api/submissions error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
