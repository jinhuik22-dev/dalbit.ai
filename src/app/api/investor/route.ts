import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  fund: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = investorSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Anti-spam: honeypot check
    if (data.honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Rate limit by IP
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    await prisma.investorInquiry.create({
      data: {
        name: data.name,
        email: data.email,
        fund: data.fund ?? null,
        message: data.message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Investor inquiry error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
