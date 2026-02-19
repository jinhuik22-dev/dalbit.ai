// src/app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Prisma models in your schema:
// - model IntakeSubmission  => prisma.intakeSubmission
// - model InvestorInquiry   => prisma.investorInquiry
//
// This route uses IntakeSubmission.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const created = await prisma.intakeSubmission.create({
      data: body as any,
    });

    return NextResponse.json(
      { ok: true, submission: created },
      { status: 201 }
    );
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
    // If your model doesn't have createdAt, remove orderBy.
    const submissions = await prisma.intakeSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.intakeSubmission.count();

    return NextResponse.json({ ok: true, total, submissions });
  } catch (error: any) {
    console.error("GET /api/submissions error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
