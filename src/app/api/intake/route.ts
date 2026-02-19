import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateAccessCode } from "@/lib/access-code";

const intakeSchema = z.object({
  role: z.string().min(1, "Role is required"),
  industries: z.array(z.string()).min(1, "At least one industry is required"),
  primaryLanguage: z.string().min(1, "Primary language is required"),
  otherLanguages: z.array(z.string()),
  locationCountry: z.string().min(1, "Country is required"),
  locationCity: z.string().min(1, "City is required"),
  audience: z.string().min(1, "Audience is required"),
  tone: z.string().min(1, "Tone is required"),
  goal: z.string().min(1, "Goal is required"),
  portfolioUrl: z.string().optional(),
  challenge: z.string().optional(),
  refCode: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = intakeSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Anti-spam: honeypot field filled means bot submission
    if (data.honeypot) {
      return NextResponse.json({ ok: true, accessCode: "DALBIT-XXXXX" });
    }

    // Rate limit by IP
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const accessCode = generateAccessCode();

    await prisma.intakeSubmission.create({
      data: {
        accessCode,
        refCode: data.refCode ?? null,
        role: data.role,
        industries: JSON.stringify(data.industries),
        primaryLanguage: data.primaryLanguage,
        otherLanguages: JSON.stringify(data.otherLanguages),
        locationCountry: data.locationCountry,
        locationCity: data.locationCity,
        audience: data.audience,
        tone: data.tone,
        goal: data.goal,
        portfolioUrl: data.portfolioUrl ?? null,
        challenge: data.challenge ?? null,
        rawJson: JSON.stringify(body),
      },
    });

    // Set access code cookie (30 days)
    const cookieStore = await cookies();
    cookieStore.set("dalbit_access", accessCode, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ ok: true, accessCode });
  } catch (err) {
    console.error("Intake submission error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
