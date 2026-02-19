"use client";

import { useState, FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type FormState = "idle" | "loading" | "success" | "error";

export function InvestorForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    fund: "",
    message: "",
    _hp: "", // honeypot
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!fields.name.trim()) errors.name = "Name is required";
    if (!fields.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!fields.message.trim()) errors.message = "Message is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          fund: fields.fund.trim() || undefined,
          message: fields.message.trim(),
          honeypot: fields._hp,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setState("success");
      track("investor_deck_request", { fund: fields.fund || "none" });
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (state === "success") {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center shadow-warm">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          Request received
        </h3>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
          Thank you for your interest in Dalbit. We will send the investor deck
          to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-warm space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Name"
          name="name"
          required
          value={fields.name}
          onChange={handleChange}
          error={fieldErrors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={fields.email}
          onChange={handleChange}
          error={fieldErrors.email}
          placeholder="you@fund.com"
          autoComplete="email"
        />
      </div>

      <Input
        label="Fund / Organization"
        name="fund"
        value={fields.fund}
        onChange={handleChange}
        placeholder="Optional"
        autoComplete="organization"
      />

      <Textarea
        label="Message"
        name="message"
        required
        value={fields.message}
        onChange={handleChange}
        error={fieldErrors.message}
        placeholder="What would you like to learn about Dalbit?"
        rows={4}
      />

      {/* Honeypot - hidden from humans */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={fields._hp}
          onChange={handleChange}
        />
      </div>

      {state === "error" && (
        <p className="text-red-500 text-sm" role="alert">
          {errorMsg}
        </p>
      )}

      <Button type="submit" size="lg" loading={state === "loading"}>
        {state === "loading" ? "Sending..." : "Request Investor Deck"}
      </Button>
    </form>
  );
}
