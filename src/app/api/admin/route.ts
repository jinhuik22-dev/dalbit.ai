import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Authenticate via Bearer token
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Determine data type to fetch
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    if (type === "intake") {
      const data = await prisma.intakeSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ data });
    }

    if (type === "investor") {
      const data = await prisma.investorInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ data });
    }

    return NextResponse.json(
      { error: "Invalid type. Use ?type=intake or ?type=investor" },
      { status: 400 },
    );
  } catch (err) {
    console.error("Admin data fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
