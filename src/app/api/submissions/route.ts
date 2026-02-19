import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";


/* ── POST /api/submissions — save a trial tool submission ── */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"; // or: import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const created = await prisma.submission.create({
      data: body,
    });

    return NextResponse.json({ ok: true, submission: created }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to create submission" },
      { status: 500 }
    );
  }
}

    // Basic spam protection: honeypot check
    if (formData._hp) {
      // Bot filled the honeypot field
      return NextResponse.json({ ok: true, id: 0 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const result = insertSubmission(toolId, persona, formData, output, ip);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ── GET /api/submissions — admin: list submissions ── */
export async function GET(req: NextRequest) {
  // Check admin password
  const authHeader = req.headers.get("authorization");
  const adminPassword = process.env.ADMIN_PASSWORD || "dalbit-admin-2024";

  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "100");
  const offset = parseInt(url.searchParams.get("offset") || "0");

  const submissions = getAllSubmissions(limit, offset);
  const stats = getSubmissionStats();

  return NextResponse.json({ stats, submissions });
}
