"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface SubmissionStats {
  total: number;
  smb: number;
  creator: number;
  highPriority: number;
}

interface Submission {
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
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const login = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setSubmissions(data.submissions);
        setAuthenticated(true);
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Failed to connect");
    } finally {
      setLoading(false);
    }
  }, [password]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setSubmissions(data.submissions);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [password]);

  const exportCSV = useCallback(() => {
    if (!submissions.length) return;
    const headers = [
      "ID", "Date", "Tool", "Persona", "Email", "Name", "Languages",
      "Region", "Niche", "Goal", "Priority Score", "Tags"
    ];
    const rows = submissions.map((s) => [
      s.id,
      s.created_at,
      s.tool_id,
      s.persona,
      s.email,
      s.name_or_handle || "",
      s.languages || "",
      s.region || "",
      s.niche || "",
      s.primary_goal || "",
      s.priority_score,
      s.tags || "",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dalbit-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [submissions]);

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card hover={false} className="w-full max-w-sm">
          <h1 className="text-xl font-bold text-foreground mb-6 text-center">Admin Access</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-pw" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button onClick={login} className="w-full" disabled={loading}>
              {loading ? "Checking…" : "Log In"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Submissions Dashboard</h1>
        <div className="flex gap-3">
          <Button onClick={refresh} variant="secondary" size="sm" disabled={loading}>
            {loading ? "Loading…" : "↻ Refresh"}
          </Button>
          <Button onClick={exportCSV} variant="secondary" size="sm" disabled={!submissions.length}>
            ↓ Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total", value: stats.total, color: "text-foreground" },
            { label: "SMB", value: stats.smb, color: "text-blue-400" },
            { label: "Creator", value: stats.creator, color: "text-purple-400" },
            { label: "High Priority", value: stats.highPriority, color: "text-accent" },
          ].map((s) => (
            <Card key={s.label} hover={false} className="text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Submissions Table */}
      {submissions.length === 0 ? (
        <Card hover={false} className="text-center py-12">
          <p className="text-muted">No submissions yet. Trial tools will populate this dashboard.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => {
            const tags: string[] = sub.tags ? JSON.parse(sub.tags) : [];
            const isExpanded = expandedId === sub.id;
            return (
              <Card key={sub.id} hover={false} className="cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : sub.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <Badge variant={sub.persona === "smb" ? "outline" : "accent"}>
                      {sub.persona.toUpperCase()}
                    </Badge>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {sub.name_or_handle || sub.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {sub.tool_id} · {new Date(sub.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-sm font-bold ${
                        sub.priority_score >= 50
                          ? "text-accent"
                          : sub.priority_score >= 30
                          ? "text-yellow-400"
                          : "text-muted"
                      }`}
                    >
                      {sub.priority_score}
                    </span>
                    <span className="text-muted text-xs">{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        <span className="text-foreground">{sub.email}</span>
                      </div>
                      {sub.languages && (
                        <div>
                          <span className="text-muted-foreground">Languages:</span>{" "}
                          <span className="text-foreground">{sub.languages}</span>
                        </div>
                      )}
                      {sub.region && (
                        <div>
                          <span className="text-muted-foreground">Region:</span>{" "}
                          <span className="text-foreground">{sub.region}</span>
                        </div>
                      )}
                      {sub.niche && (
                        <div>
                          <span className="text-muted-foreground">Niche:</span>{" "}
                          <span className="text-foreground">{sub.niche}</span>
                        </div>
                      )}
                      {sub.primary_goal && (
                        <div>
                          <span className="text-muted-foreground">Goal:</span>{" "}
                          <span className="text-foreground">{sub.primary_goal}</span>
                        </div>
                      )}
                      {sub.budget_or_rate && (
                        <div>
                          <span className="text-muted-foreground">Budget/Rate:</span>{" "}
                          <span className="text-foreground">{sub.budget_or_rate}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {sub.output && (
                      <details className="mt-3">
                        <summary className="text-xs text-accent cursor-pointer hover:underline">
                          View generated output
                        </summary>
                        <pre className="mt-2 text-xs text-muted whitespace-pre-wrap bg-surface p-3 rounded-lg border border-border max-h-[300px] overflow-auto">
                          {sub.output}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
