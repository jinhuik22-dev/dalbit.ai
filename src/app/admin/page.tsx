"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/* ─── Types ─── */

interface IntakeSubmission {
  id: number;
  createdAt: string;
  accessCode: string;
  refCode: string | null;
  role: string;
  industries: string;
  primaryLanguage: string;
  otherLanguages: string;
  locationCountry: string;
  locationCity: string;
  audience: string;
  tone: string;
  goal: string;
  portfolioUrl: string | null;
  challenge: string | null;
  rawJson: string;
}

interface InvestorInquiry {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  fund: string | null;
  message: string;
}

type Tab = "intake" | "investor";

/* ─── Helpers ─── */

function parseJsonSafe(str: string): string[] {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return str ? [str] : [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [
    headers.map(escape).join(","),
    ...rows.map((r) => r.map(escape).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Component ─── */

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("intake");

  const [intakeData, setIntakeData] = useState<IntakeSubmission[]>([]);
  const [investorData, setInvestorData] = useState<InvestorInquiry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Filters for intake
  const [roleFilter, setRoleFilter] = useState("All");
  const [langFilter, setLangFilter] = useState("All");

  /* ─── Auth ─── */

  const login = useCallback(async () => {
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthenticated(true);
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Failed to connect");
    } finally {
      setLoginLoading(false);
    }
  }, [password]);

  /* ─── Data fetching ─── */

  const fetchData = useCallback(
    async (type: Tab) => {
      setDataLoading(true);
      try {
        const res = await fetch(`/api/admin?type=${type}`, {
          headers: { Authorization: `Bearer ${password}` },
        });
        if (res.ok) {
          const json = await res.json();
          if (type === "intake") setIntakeData(json.data ?? []);
          else setInvestorData(json.data ?? []);
        }
      } catch {
        // silently fail
      } finally {
        setDataLoading(false);
      }
    },
    [password],
  );

  useEffect(() => {
    if (authenticated) {
      fetchData("intake");
      fetchData("investor");
    }
  }, [authenticated, fetchData]);

  /* ─── Filtered intake data ─── */

  const filteredIntake = intakeData.filter((s) => {
    if (roleFilter !== "All" && s.role.toLowerCase() !== roleFilter.toLowerCase()) return false;
    if (langFilter !== "All" && s.primaryLanguage.toLowerCase() !== langFilter.toLowerCase()) return false;
    return true;
  });

  const uniqueRoles = Array.from(new Set(intakeData.map((s) => s.role)));
  const uniqueLangs = Array.from(new Set(intakeData.map((s) => s.primaryLanguage)));

  /* ─── CSV exports ─── */

  const exportIntakeCsv = useCallback(() => {
    const headers = [
      "ID", "Access Code", "Created", "Role", "Industries", "Primary Language",
      "Other Languages", "Country", "City", "Audience", "Tone", "Goal",
      "Portfolio URL", "Challenge", "Ref Code",
    ];
    const rows = intakeData.map((s) => [
      String(s.id),
      s.accessCode,
      s.createdAt,
      s.role,
      parseJsonSafe(s.industries).join("; "),
      s.primaryLanguage,
      parseJsonSafe(s.otherLanguages).join("; "),
      s.locationCountry,
      s.locationCity,
      s.audience,
      s.tone,
      s.goal,
      s.portfolioUrl ?? "",
      s.challenge ?? "",
      s.refCode ?? "",
    ]);
    downloadCsv(`dalbit-intake-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  }, [intakeData]);

  const exportInvestorCsv = useCallback(() => {
    const headers = ["ID", "Name", "Email", "Fund", "Message", "Created"];
    const rows = investorData.map((s) => [
      String(s.id),
      s.name,
      s.email,
      s.fund ?? "",
      s.message,
      s.createdAt,
    ]);
    downloadCsv(`dalbit-investor-${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  }, [investorData]);

  /* ─── Login screen ─── */

  if (!authenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <h1 className="font-serif text-xl font-semibold text-foreground mb-6 text-center">
            Admin Access
          </h1>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-pw"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="admin-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors duration-200"
                placeholder="Enter admin password"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <Button
              onClick={login}
              className="w-full"
              loading={loginLoading}
              disabled={!password}
            >
              Log In
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  /* ─── Authenticated dashboard ─── */

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Admin Dashboard
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setAuthenticated(false);
            setPassword("");
            setIntakeData([]);
            setInvestorData([]);
          }}
        >
          Log Out
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab("intake")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
            activeTab === "intake"
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Intake Submissions
          <Badge
            variant={activeTab === "intake" ? "accent" : "muted"}
            className="ml-2"
          >
            {intakeData.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab("investor")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
            activeTab === "investor"
              ? "border-accent text-accent"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Investor Inquiries
          <Badge
            variant={activeTab === "investor" ? "accent" : "muted"}
            className="ml-2"
          >
            {investorData.length}
          </Badge>
        </button>
      </div>

      {/* ─── Intake Tab ─── */}
      {activeTab === "intake" && (
        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-muted">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm bg-surface border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="All">All Roles</option>
                {uniqueRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-muted">
                Primary Language
              </label>
              <select
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-sm bg-surface border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              >
                <option value="All">All Languages</option>
                {uniqueLangs.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-auto flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fetchData("intake")}
                loading={dataLoading}
              >
                Refresh
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={exportIntakeCsv}
                disabled={!intakeData.length}
              >
                Export CSV
              </Button>
            </div>
          </div>

          {/* Submissions list */}
          {filteredIntake.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-muted">
                {intakeData.length === 0
                  ? "No intake submissions yet."
                  : "No submissions match the current filters."}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredIntake.map((sub) => {
                const industries = parseJsonSafe(sub.industries);
                const isExpanded = expandedId === sub.id;
                return (
                  <Card
                    key={sub.id}
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : sub.id)
                    }
                  >
                    {/* Summary row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <Badge variant="accent">{sub.role}</Badge>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {sub.accessCode}
                          </p>
                          <p className="text-xs text-muted">
                            {formatDate(sub.createdAt)} &middot;{" "}
                            {sub.primaryLanguage} &middot; {sub.locationCountry}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {industries.slice(0, 2).map((ind) => (
                          <Badge key={ind} variant="outline" className="hidden sm:inline-flex">
                            {ind}
                          </Badge>
                        ))}
                        <span className="text-muted text-xs ml-1">
                          {isExpanded ? "\u25B2" : "\u25BC"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div
                        className="mt-4 pt-4 border-t border-border space-y-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-muted">Access Code:</span>{" "}
                            <span className="text-foreground font-medium">{sub.accessCode}</span>
                          </div>
                          <div>
                            <span className="text-muted">Role:</span>{" "}
                            <span className="text-foreground">{sub.role}</span>
                          </div>
                          <div>
                            <span className="text-muted">Primary Language:</span>{" "}
                            <span className="text-foreground">{sub.primaryLanguage}</span>
                          </div>
                          <div>
                            <span className="text-muted">Country:</span>{" "}
                            <span className="text-foreground">{sub.locationCountry}</span>
                          </div>
                          <div>
                            <span className="text-muted">City:</span>{" "}
                            <span className="text-foreground">{sub.locationCity}</span>
                          </div>
                          {sub.refCode && (
                            <div>
                              <span className="text-muted">Ref Code:</span>{" "}
                              <span className="text-foreground">{sub.refCode}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-sm space-y-2">
                          <div>
                            <span className="text-muted">Industries:</span>{" "}
                            <span className="text-foreground">
                              {industries.join(", ")}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted">Other Languages:</span>{" "}
                            <span className="text-foreground">
                              {parseJsonSafe(sub.otherLanguages).join(", ") || "None"}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted">Audience:</span>{" "}
                            <span className="text-foreground">{sub.audience}</span>
                          </div>
                          <div>
                            <span className="text-muted">Tone:</span>{" "}
                            <span className="text-foreground">{sub.tone}</span>
                          </div>
                          <div>
                            <span className="text-muted">Goal:</span>{" "}
                            <span className="text-foreground">{sub.goal}</span>
                          </div>
                          {sub.portfolioUrl && (
                            <div>
                              <span className="text-muted">Portfolio:</span>{" "}
                              <a
                                href={sub.portfolioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                {sub.portfolioUrl}
                              </a>
                            </div>
                          )}
                          {sub.challenge && (
                            <div>
                              <span className="text-muted">Challenge:</span>{" "}
                              <span className="text-foreground">{sub.challenge}</span>
                            </div>
                          )}
                        </div>

                        <details className="mt-3">
                          <summary className="text-xs text-accent cursor-pointer hover:underline">
                            View raw JSON
                          </summary>
                          <pre className="mt-2 text-xs text-muted whitespace-pre-wrap bg-surface p-3 rounded-lg border border-border max-h-[300px] overflow-auto">
                            {(() => {
                              try {
                                return JSON.stringify(JSON.parse(sub.rawJson), null, 2);
                              } catch {
                                return sub.rawJson;
                              }
                            })()}
                          </pre>
                        </details>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── Investor Tab ─── */}
      {activeTab === "investor" && (
        <div>
          {/* Toolbar */}
          <div className="flex items-center justify-end gap-2 mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fetchData("investor")}
              loading={dataLoading}
            >
              Refresh
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={exportInvestorCsv}
              disabled={!investorData.length}
            >
              Export CSV
            </Button>
          </div>

          {investorData.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-muted">No investor inquiries yet.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {investorData.map((inv) => (
                <Card key={inv.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {inv.name}
                      </p>
                      <p className="text-xs text-muted mt-0.5">
                        {inv.email}
                        {inv.fund && (
                          <>
                            {" "}
                            &middot; <span className="text-foreground">{inv.fund}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-xs text-muted flex-shrink-0">
                      {formatDate(inv.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-foreground mt-3 leading-relaxed">
                    {inv.message}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
