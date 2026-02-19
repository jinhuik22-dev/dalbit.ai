import { neon } from "@neondatabase/serverless";

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) throw new Error("DATABASE_URL or POSTGRES_URL not set");
  return neon(url);
}

let _initialized = false;

async function ensureTable() {
  if (_initialized) return;
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      tool_id TEXT NOT NULL,
      persona TEXT NOT NULL,
      email TEXT NOT NULL,
      name_or_handle TEXT,
      languages TEXT,
      region TEXT,
      niche TEXT,
      primary_goal TEXT,
      biggest_constraint TEXT,
      budget_or_rate TEXT,
      links TEXT,
      form_data TEXT NOT NULL,
      output TEXT NOT NULL,
      priority_score INTEGER DEFAULT 0,
      tags TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      ip_address TEXT
    )
  `;
  _initialized = true;
}

export interface SubmissionRow {
  id: number;
  tool_id: string;
  persona: string;
  email: string;
  name_or_handle: string | null;
  languages: string | null;
  region: string | null;
  niche: string | null;
  primary_goal: string | null;
  biggest_constraint: string | null;
  budget_or_rate: string | null;
  links: string | null;
  form_data: string;
  output: string;
  priority_score: number;
  tags: string | null;
  created_at: string;
  ip_address: string | null;
}

/**
 * Calculate a priority score (0–100) based on persona + intent signals.
 */
function calculatePriority(data: Record<string, string>, persona: string): { score: number; tags: string[] } {
  let score = 0;
  const tags: string[] = [];

  tags.push(persona);

  if (data.email) { score += 10; tags.push("has-email"); }

  if (persona === "smb") {
    const budget = data.monthlyBudget || data.monthlyRevenue || "";
    if (["5k-10k", "10k-plus"].includes(budget)) { score += 30; tags.push("high-budget"); }
    else if (["3k-5k"].includes(budget)) { score += 20; tags.push("mid-budget"); }
    else if (["1k-3k"].includes(budget)) { score += 10; tags.push("low-budget"); }

    if (data.website) { score += 10; tags.push("has-website"); }
    if (data.biggestChallenge && data.biggestChallenge.length > 30) { score += 10; tags.push("detailed-input"); }
  }

  if (persona === "creator") {
    const size = data.audienceSize || "";
    if (size === "macro") { score += 25; tags.push("macro-creator"); }
    else if (size === "mid") { score += 20; tags.push("mid-creator"); }
    else if (size === "micro") { score += 15; tags.push("micro-creator"); }
    else { score += 5; tags.push("nano-creator"); }

    const lang = data.languages || "";
    if (lang && lang !== "en") { score += 15; tags.push("bilingual"); }
  }

  const highValueNiches = ["saas", "ecommerce", "beauty", "fitness"];
  if (highValueNiches.includes(data.industry || data.niche || "")) {
    score += 10;
    tags.push("high-value-niche");
  }

  return { score: Math.min(score, 100), tags };
}

export async function insertSubmission(
  toolId: string,
  persona: "smb" | "creator",
  formData: Record<string, string>,
  output: string,
  ipAddress?: string
) {
  await ensureTable();
  const sql = getSQL();
  const { score, tags } = calculatePriority(formData, persona);

  const result = await sql`
    INSERT INTO submissions (
      tool_id, persona, email, name_or_handle, languages, region, niche,
      primary_goal, biggest_constraint, budget_or_rate, links,
      form_data, output, priority_score, tags, ip_address
    ) VALUES (
      ${toolId},
      ${persona},
      ${formData.email || ""},
      ${formData.businessName || formData.creatorName || null},
      ${formData.languages || null},
      ${formData.region || null},
      ${formData.industry || formData.niche || null},
      ${formData.primaryGoal || formData.collabGoal || formData.goal || null},
      ${formData.biggestChallenge || null},
      ${formData.monthlyBudget || formData.monthlyRevenue || formData.currentRates || null},
      ${formData.website || null},
      ${JSON.stringify(formData)},
      ${output},
      ${score},
      ${JSON.stringify(tags)},
      ${ipAddress || null}
    )
    RETURNING id
  `;

  return { id: result[0]?.id, score, tags };
}

export async function getAllSubmissions(limit = 100, offset = 0): Promise<SubmissionRow[]> {
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    SELECT * FROM submissions ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
  `;
  return rows as unknown as SubmissionRow[];
}

export async function getSubmissionStats() {
  await ensureTable();
  const sql = getSQL();
  const [total] = await sql`SELECT COUNT(*) as count FROM submissions`;
  const [smb] = await sql`SELECT COUNT(*) as count FROM submissions WHERE persona = 'smb'`;
  const [creator] = await sql`SELECT COUNT(*) as count FROM submissions WHERE persona = 'creator'`;
  const [highPriority] = await sql`SELECT COUNT(*) as count FROM submissions WHERE priority_score >= 50`;
  return {
    total: Number(total.count),
    smb: Number(smb.count),
    creator: Number(creator.count),
    highPriority: Number(highPriority.count),
  };
}
