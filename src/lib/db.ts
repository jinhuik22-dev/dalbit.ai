import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "dalbit.db");

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tool_id TEXT NOT NULL,
        persona TEXT NOT NULL CHECK(persona IN ('smb', 'creator')),
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
        created_at TEXT DEFAULT (datetime('now')),
        ip_address TEXT
      );
    `);
  }
  return _db;
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

  // Persona tag
  tags.push(persona);

  // Email provided
  if (data.email) { score += 10; tags.push("has-email"); }

  // SMB-specific scoring
  if (persona === "smb") {
    // Budget indicates seriousness
    const budget = data.monthlyBudget || data.monthlyRevenue || "";
    if (["5k-10k", "10k-plus"].includes(budget)) { score += 30; tags.push("high-budget"); }
    else if (["3k-5k"].includes(budget)) { score += 20; tags.push("mid-budget"); }
    else if (["1k-3k"].includes(budget)) { score += 10; tags.push("low-budget"); }

    // Has website
    if (data.website) { score += 10; tags.push("has-website"); }

    // Challenge length = engagement signal
    if (data.biggestChallenge && data.biggestChallenge.length > 30) { score += 10; tags.push("detailed-input"); }
  }

  // Creator-specific scoring
  if (persona === "creator") {
    // Audience size
    const size = data.audienceSize || "";
    if (size === "macro") { score += 25; tags.push("macro-creator"); }
    else if (size === "mid") { score += 20; tags.push("mid-creator"); }
    else if (size === "micro") { score += 15; tags.push("micro-creator"); }
    else { score += 5; tags.push("nano-creator"); }

    // Bilingual = premium
    const lang = data.languages || "";
    if (lang && lang !== "en") { score += 15; tags.push("bilingual"); }
  }

  // Industry bonus
  const highValueNiches = ["saas", "ecommerce", "beauty", "fitness"];
  if (highValueNiches.includes(data.industry || data.niche || "")) {
    score += 10;
    tags.push("high-value-niche");
  }

  return { score: Math.min(score, 100), tags };
}

export function insertSubmission(
  toolId: string,
  persona: "smb" | "creator",
  formData: Record<string, string>,
  output: string,
  ipAddress?: string
) {
  const db = getDb();
  const { score, tags } = calculatePriority(formData, persona);

  const stmt = db.prepare(`
    INSERT INTO submissions (
      tool_id, persona, email, name_or_handle, languages, region, niche,
      primary_goal, biggest_constraint, budget_or_rate, links,
      form_data, output, priority_score, tags, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    toolId,
    persona,
    formData.email || "",
    formData.businessName || formData.creatorName || null,
    formData.languages || null,
    formData.region || null,
    formData.industry || formData.niche || null,
    formData.primaryGoal || formData.collabGoal || formData.goal || null,
    formData.biggestChallenge || null,
    formData.monthlyBudget || formData.monthlyRevenue || formData.currentRates || null,
    formData.website || null,
    JSON.stringify(formData),
    output,
    score,
    JSON.stringify(tags),
    ipAddress || null
  );

  return { id: result.lastInsertRowid, score, tags };
}

export function getAllSubmissions(limit = 100, offset = 0): SubmissionRow[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM submissions ORDER BY created_at DESC LIMIT ? OFFSET ?")
    .all(limit, offset) as SubmissionRow[];
}

export function getSubmissionStats() {
  const db = getDb();
  const total = (db.prepare("SELECT COUNT(*) as count FROM submissions").get() as { count: number }).count;
  const smb = (db.prepare("SELECT COUNT(*) as count FROM submissions WHERE persona = 'smb'").get() as { count: number }).count;
  const creator = (db.prepare("SELECT COUNT(*) as count FROM submissions WHERE persona = 'creator'").get() as { count: number }).count;
  const highPriority = (db.prepare("SELECT COUNT(*) as count FROM submissions WHERE priority_score >= 50").get() as { count: number }).count;
  return { total, smb, creator, highPriority };
}
