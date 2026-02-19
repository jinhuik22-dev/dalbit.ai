"use client";

import { useState, useCallback } from "react";
import { smbTools, creatorTools, type PromptTool } from "@/data/trial-tools";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { trackEvent } from "@/components/Analytics";

type Track = "smb" | "creator";

export function TrialClient() {
  const [track, setTrack] = useState<Track>("smb");
  const [selectedTool, setSelectedTool] = useState<PromptTool | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tools = track === "smb" ? smbTools : creatorTools;

  const resetTool = useCallback(() => {
    setSelectedTool(null);
    setFormValues({});
    setOutput(null);
    setSaved(false);
    setCopied(false);
    setErrors({});
  }, []);

  const selectTool = useCallback((tool: PromptTool) => {
    setSelectedTool(tool);
    setFormValues({});
    setOutput(null);
    setSaved(false);
    setCopied(false);
    setErrors({});
    trackEvent("trial_tool_selected", { toolId: tool.id, track });
  }, [track]);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    if (!selectedTool) return false;
    const newErrors: Record<string, string> = {};
    for (const field of selectedTool.fields) {
      if (field.required && !formValues[field.name]?.trim()) {
        newErrors[field.name] = "This field is required";
      }
      if (field.type === "email" && formValues[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValues[field.name])) {
          newErrors[field.name] = "Please enter a valid email";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedTool, formValues]);

  const generateOutput = useCallback(() => {
    if (!selectedTool || !validate()) return;
    const result = selectedTool.outputTemplate(formValues);
    setOutput(result);
    trackEvent("trial_output_generated", { toolId: selectedTool.id, track });
  }, [selectedTool, formValues, validate, track]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent("trial_output_copied", { toolId: selectedTool?.id, track });
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [output, selectedTool, track]);

  const saveSubmission = useCallback(async () => {
    if (!selectedTool || !output || !formValues.email) return;
    setSaving(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: selectedTool.id,
          persona: track,
          formData: formValues,
          output,
        }),
      });
      if (res.ok) {
        setSaved(true);
        trackEvent("trial_submission_saved", { toolId: selectedTool.id, track });
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }, [selectedTool, output, formValues, track]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Track Tabs */}
      <div className="flex gap-2 mb-10" role="tablist" aria-label="Track selection">
        {([
          { key: "smb" as Track, label: "SMB Track", icon: "🏢" },
          { key: "creator" as Track, label: "Creator Track", icon: "🌐" },
        ]).map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={track === t.key}
            onClick={() => { setTrack(t.key); resetTool(); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              track === t.key
                ? "bg-accent/10 text-accent border border-accent/30"
                : "bg-card text-muted border border-border hover:border-accent/20"
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tool Selection or Active Tool */}
      {!selectedTool ? (
        /* Tool Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => selectTool(tool)}
              className="text-left cursor-pointer"
            >
              <Card className="h-full hover:border-accent/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-muted text-sm">{tool.subtitle}</p>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        /* Active Tool */
        <div>
          {/* Back button */}
          <button
            onClick={resetTool}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6 cursor-pointer"
          >
            <span>&larr;</span>
            <span className="text-sm">Back to tools</span>
          </button>

          {/* Tool header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedTool.icon}</span>
              <h2 className="text-2xl font-bold text-foreground">{selectedTool.title}</h2>
            </div>
            <p className="text-muted">{selectedTool.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card hover={false}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Your Details</h3>

              {/* Honeypot field for spam protection */}
              <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
                <input
                  type="text"
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formValues._hp || ""}
                  onChange={(e) => handleFieldChange("_hp", e.target.value)}
                />
              </div>

              <div className="space-y-5">
                {selectedTool.fields.map((field) => (
                  <div key={field.name} className="space-y-1.5">
                    <label
                      htmlFor={`field-${field.name}`}
                      className="block text-sm font-medium text-foreground"
                    >
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        id={`field-${field.name}`}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={`field-${field.name}`}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y"
                      />
                    ) : (
                      <input
                        id={`field-${field.name}`}
                        type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      />
                    )}

                    {errors[field.name] && (
                      <p className="text-red-400 text-xs">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button onClick={generateOutput} className="w-full">
                  Generate Output
                </Button>
              </div>
            </Card>

            {/* Output Panel */}
            <div className="space-y-4">
              <Card hover={false} className={`min-h-[400px] ${output ? "" : "flex items-center justify-center"}`}>
                {output ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Your Output</h3>
                      <Badge variant="accent">Generated</Badge>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-muted leading-relaxed font-sans bg-surface p-4 rounded-lg border border-border overflow-auto max-h-[500px]">
                        {output}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted">
                    <span className="text-4xl block mb-3">✨</span>
                    <p className="text-sm">Fill in the form and click Generate to see your output here.</p>
                  </div>
                )}
              </Card>

              {/* Action buttons */}
              {output && (
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={copyOutput}
                    variant="secondary"
                    size="sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Output"}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      // Email placeholder
                      trackEvent("trial_email_clicked", { toolId: selectedTool.id });
                      alert("Email functionality coming soon! For now, copy the output and paste it into your email.");
                    }}
                  >
                    📧 Email Output
                  </Button>

                  <Button
                    onClick={saveSubmission}
                    variant={saved ? "ghost" : "primary"}
                    size="sm"
                    disabled={saving || saved || !formValues.email}
                  >
                    {saved ? "✓ Saved!" : saving ? "Saving…" : "💾 Save Answers"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <p className="text-muted mb-4">
          Want a deeper, personalized analysis?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/services" variant="primary">
            View Full Services
          </Button>
          <Button href="/about" variant="ghost">
            Learn More About Dalbit
          </Button>
        </div>
      </div>
    </section>
  );
}
