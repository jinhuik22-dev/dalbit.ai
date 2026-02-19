"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { track } from "@/lib/analytics";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface IntakeAnswers {
  role: string;
  industries: string[];
  primaryLanguage: string;
  otherLanguages: string[];
  locationCountry: string;
  locationCity: string;
  audience: string;
  tone: string;
  goal: string;
  portfolioUrl: string;
  challenge: string;
}

type StepType =
  | "single-select"
  | "multi-select"
  | "text"
  | "text-pair"
  | "language"
  | "textarea";

interface StepDef {
  id: string;
  level: 1 | 2 | 3;
  type: StepType;
  dalbitMessage: string;
  /** Follow-up message shown after the first answer in a compound step */
  dalbitFollowUp?: string;
  options?: string[];
  placeholder?: string;
  placeholderSecond?: string;
  labelFirst?: string;
  labelSecond?: string;
  optional?: boolean;
  answerKey: keyof IntakeAnswers;
  answerKeySecond?: keyof IntakeAnswers;
}

interface ChatMessage {
  id: string;
  sender: "dalbit" | "user";
  text: string;
}

/* ──────────────────────────────────────────────
   Step definitions
   ────────────────────────────────────────────── */

const STEPS: StepDef[] = [
  // Level 1 — Identity
  {
    id: "role",
    level: 1,
    type: "single-select",
    dalbitMessage:
      "Welcome to Dalbit. Let\u2019s learn a bit about you. What best describes your role?",
    options: ["Creator", "Brand", "Agency", "Investor", "Other"],
    answerKey: "role",
  },
  {
    id: "industries",
    level: 1,
    type: "multi-select",
    dalbitMessage:
      "Great choice. What industries are you involved in? Select all that apply.",
    options: [
      "Art",
      "Music",
      "Film",
      "Design",
      "Fashion",
      "Gaming",
      "Writing",
      "Photography",
      "Other",
    ],
    answerKey: "industries",
  },
  {
    id: "language",
    level: 1,
    type: "language",
    dalbitMessage:
      "Language is at the heart of what we do. What\u2019s your primary language?",
    dalbitFollowUp: "Any additional languages?",
    options: ["Korean", "Japanese", "Chinese", "English", "Other"],
    answerKey: "primaryLanguage",
    answerKeySecond: "otherLanguages",
  },
  // Level 2 — Culture
  {
    id: "location",
    level: 2,
    type: "text-pair",
    dalbitMessage:
      "Where are you based? This helps us understand your local context.",
    placeholder: "Country",
    placeholderSecond: "City",
    labelFirst: "Country",
    labelSecond: "City",
    answerKey: "locationCountry",
    answerKeySecond: "locationCity",
  },
  {
    id: "audience",
    level: 2,
    type: "single-select",
    dalbitMessage: "Who are you trying to reach?",
    options: ["Local", "Global", "Specific regions"],
    answerKey: "audience",
  },
  {
    id: "tone",
    level: 2,
    type: "single-select",
    dalbitMessage:
      "How would you describe the tone you prefer in communications?",
    options: ["Warm", "Direct", "Playful", "Formal"],
    answerKey: "tone",
  },
  // Level 3 — Vision
  {
    id: "goal",
    level: 3,
    type: "single-select",
    dalbitMessage:
      "Almost there. What\u2019s your primary goal with Dalbit?",
    options: [
      "Collaborate",
      "Get clients",
      "Hire creators",
      "Build global audience",
      "Investor research",
      "Other",
    ],
    answerKey: "goal",
  },
  {
    id: "portfolio",
    level: 3,
    type: "text",
    dalbitMessage:
      "Got a portfolio or website? Drop the link here \u2014 or skip if you\u2019d prefer.",
    placeholder: "https://yoursite.com",
    optional: true,
    answerKey: "portfolioUrl",
  },
  {
    id: "challenge",
    level: 3,
    type: "textarea",
    dalbitMessage:
      "Last one. What\u2019s the biggest challenge you face working across cultures or borders?",
    placeholder: "Tell us in a few sentences...",
    optional: true,
    answerKey: "challenge",
  },
];

const TOTAL_STEPS = STEPS.length;

const LEVEL_LABELS: Record<number, string> = {
  1: "Identity",
  2: "Culture",
  3: "Vision",
};

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */

function emptyAnswers(): IntakeAnswers {
  return {
    role: "",
    industries: [],
    primaryLanguage: "",
    otherLanguages: [],
    locationCountry: "",
    locationCity: "",
    audience: "",
    tone: "",
    goal: "",
    portfolioUrl: "",
    challenge: "",
  };
}

let msgCounter = 0;
function nextId(): string {
  return `msg-${++msgCounter}`;
}

function formatUserAnswer(step: StepDef, answers: IntakeAnswers): string {
  const val = answers[step.answerKey];
  if (Array.isArray(val)) return val.join(", ");
  return val as string;
}

/* ──────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────── */

function DalbitAvatar() {
  return (
    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center">
      <span className="text-white text-xs font-bold leading-none">D</span>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <DalbitAvatar />
      <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-warm">
        <div className="flex gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-warm-400" />
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.sender === "dalbit") {
    return (
      <div className="flex items-start gap-3 animate-fade-in-up">
        <DalbitAvatar />
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-warm max-w-[80%]">
          <p className="text-foreground text-sm leading-relaxed">
            {message.text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end animate-fade-in-up">
      <div className="bg-foreground text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Inner component (needs useSearchParams inside Suspense)
   ────────────────────────────────────────────── */

function IntakeChatInner() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const prefilledRole = searchParams.get("role") || "";

  // Check if a valid role was passed from the homepage chat teaser
  const validRoles = STEPS[0].options ?? [];
  const hasPrefilledRole =
    prefilledRole !== "" && validRoles.includes(prefilledRole);

  /* ── State ── */
  const [stepIndex, setStepIndex] = useState(hasPrefilledRole ? 1 : 0);
  const [answers, setAnswers] = useState<IntakeAnswers>(() => {
    const base = emptyAnswers();
    if (hasPrefilledRole) base.role = prefilledRole;
    return base;
  });
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (!hasPrefilledRole) return [];
    // Pre-fill the welcome message + user's role answer
    return [
      { id: nextId(), sender: "dalbit", text: STEPS[0].dalbitMessage },
      { id: nextId(), sender: "user", text: prefilledRole },
    ];
  });
  const [isTyping, setIsTyping] = useState(true);
  const [showInput, setShowInput] = useState(false);

  // For language compound step: tracks whether we've asked the follow-up
  const [languagePhase, setLanguagePhase] = useState<"primary" | "additional">(
    "primary",
  );

  // Multi-select temp selections
  const [multiSelection, setMultiSelection] = useState<string[]>([]);

  // Text input values
  const [textValue, setTextValue] = useState("");
  const [textValueSecond, setTextValueSecond] = useState("");

  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  // Completion
  const [completed, setCompleted] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentStep = STEPS[stepIndex] as StepDef | undefined;
  const currentLevel = currentStep?.level ?? 3;

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showInput]);

  /* ── Track start ── */
  useEffect(() => {
    track("intake_started", { ref: refCode || null });
  }, [refCode]);

  /* ── Show initial Dalbit message ── */
  useEffect(() => {
    if (!currentStep || completed) return;

    setIsTyping(true);
    setShowInput(false);

    const delay = messages.length === 0 ? 800 : 1000;
    const timer = setTimeout(() => {
      const text =
        currentStep.type === "language" && languagePhase === "additional"
          ? currentStep.dalbitFollowUp!
          : currentStep.dalbitMessage;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), sender: "dalbit", text },
      ]);
      setIsTyping(false);
      setShowInput(true);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, languagePhase, completed]);

  /* ── Focus text input when it shows ── */
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
    if (showInput && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showInput]);

  /* ── Advance to next step ── */
  const advance = useCallback(
    (updatedAnswers: IntakeAnswers) => {
      // Track level completion
      const prevLevel = STEPS[stepIndex]?.level;
      const nextStep = STEPS[stepIndex + 1];
      if (prevLevel && (!nextStep || nextStep.level !== prevLevel)) {
        track("intake_level_completed", { level: prevLevel });
      }

      if (stepIndex + 1 >= TOTAL_STEPS) {
        // All steps done — submit
        submitIntake(updatedAnswers);
      } else {
        setStepIndex((i) => i + 1);
        setMultiSelection([]);
        setTextValue("");
        setTextValueSecond("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepIndex],
  );

  /* ── Submit intake ── */
  const submitIntake = useCallback(
    async (finalAnswers: IntakeAnswers) => {
      setShowInput(false);
      setSubmitting(true);
      setSubmitError("");

      // Show a brief "typing" state
      setIsTyping(true);

      try {
        const res = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...finalAnswers,
            refCode: refCode || undefined,
            _hp: honeypot || undefined,
          }),
        });

        if (!res.ok) {
          throw new Error("Submission failed");
        }

        const data = await res.json();
        setAccessCode(data.accessCode);
        track("intake_completed", { ref: refCode || null });

        // Brief delay for polish
        setTimeout(() => {
          setIsTyping(false);
          setCompleted(true);
        }, 600);
      } catch {
        setIsTyping(false);
        setSubmitting(false);
        setSubmitError(
          "Something went wrong. Please try again.",
        );
      }
    },
    [refCode, honeypot],
  );

  /* ── Handle single-select ── */
  const handleSingleSelect = useCallback(
    (value: string) => {
      if (!currentStep) return;

      // Show user's answer
      setMessages((prev) => [
        ...prev,
        { id: nextId(), sender: "user", text: value },
      ]);
      setShowInput(false);

      const updated = { ...answers, [currentStep.answerKey]: value };
      setAnswers(updated);

      // Small delay for natural feel before advancing
      setTimeout(() => advance(updated), 400);
    },
    [answers, currentStep, advance],
  );

  /* ── Handle multi-select confirm ── */
  const handleMultiConfirm = useCallback(() => {
    if (!currentStep || multiSelection.length === 0) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: multiSelection.join(", ") },
    ]);
    setShowInput(false);

    const updated = {
      ...answers,
      [currentStep.answerKey]: multiSelection,
    };
    setAnswers(updated);

    setTimeout(() => advance(updated), 400);
  }, [answers, currentStep, multiSelection, advance]);

  /* ── Handle language step ── */
  const handleLanguagePrimary = useCallback(
    (value: string) => {
      if (!currentStep) return;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), sender: "user", text: value },
      ]);
      setShowInput(false);

      setAnswers((prev) => ({ ...prev, primaryLanguage: value }));
      setLanguagePhase("additional");
    },
    [currentStep],
  );

  const handleLanguageAdditionalConfirm = useCallback(() => {
    const selected = multiSelection.length > 0 ? multiSelection : [];
    const label = selected.length > 0 ? selected.join(", ") : "None";

    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: label },
    ]);
    setShowInput(false);

    const updated = { ...answers, otherLanguages: selected };
    setAnswers(updated);
    setLanguagePhase("primary"); // Reset for potential back navigation
    setMultiSelection([]);

    setTimeout(() => advance(updated), 400);
  }, [answers, multiSelection, advance]);

  /* ── Handle text input ── */
  const handleTextSubmit = useCallback(() => {
    if (!currentStep) return;

    const val = textValue.trim();
    if (!val && !currentStep.optional) return;

    const displayText = val || "Skipped";
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: displayText },
    ]);
    setShowInput(false);

    const updated = { ...answers, [currentStep.answerKey]: val };
    setAnswers(updated);
    setTextValue("");

    setTimeout(() => advance(updated), 400);
  }, [answers, currentStep, textValue, advance]);

  /* ── Handle text-pair input ── */
  const handleTextPairSubmit = useCallback(() => {
    if (!currentStep) return;

    const first = textValue.trim();
    const second = textValueSecond.trim();
    if (!first) return;

    const displayText = second ? `${first}, ${second}` : first;
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: displayText },
    ]);
    setShowInput(false);

    const updated = {
      ...answers,
      [currentStep.answerKey]: first,
      ...(currentStep.answerKeySecond
        ? { [currentStep.answerKeySecond]: second }
        : {}),
    };
    setAnswers(updated);
    setTextValue("");
    setTextValueSecond("");

    setTimeout(() => advance(updated), 400);
  }, [answers, currentStep, textValue, textValueSecond, advance]);

  /* ── Handle textarea submit ── */
  const handleTextareaSubmit = useCallback(() => {
    if (!currentStep) return;

    const val = textValue.trim();
    if (!val && !currentStep.optional) return;

    const displayText = val || "Skipped";
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: displayText },
    ]);
    setShowInput(false);

    const updated = { ...answers, [currentStep.answerKey]: val };
    setAnswers(updated);
    setTextValue("");

    setTimeout(() => advance(updated), 400);
  }, [answers, currentStep, textValue, advance]);

  /* ── Handle skip ── */
  const handleSkip = useCallback(() => {
    if (!currentStep) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: "user", text: "Skipped" },
    ]);
    setShowInput(false);

    const updated = { ...answers, [currentStep.answerKey]: "" };
    setAnswers(updated);
    setTextValue("");

    setTimeout(() => advance(updated), 400);
  }, [answers, currentStep, advance]);

  /* ── Handle back ── */
  const handleBack = useCallback(() => {
    if (stepIndex === 0) return;

    // If we're in the language follow-up phase, go back to primary
    if (currentStep?.type === "language" && languagePhase === "additional") {
      // Remove the last two messages (dalbit follow-up + user primary answer)
      setMessages((prev) => prev.slice(0, -2));
      setLanguagePhase("primary");
      setMultiSelection([]);
      return;
    }

    // Remove the last dalbit message + user answer (2 messages per step)
    // But for compound steps we may have more
    setMessages((prev) => {
      // Find last user message and the dalbit message before it
      const lastUserIdx = prev.findLastIndex((m) => m.sender === "user");
      if (lastUserIdx === -1) return prev.slice(0, -1);
      const dalbitBeforeUser = prev
        .slice(0, lastUserIdx)
        .findLastIndex((m) => m.sender === "dalbit");
      if (dalbitBeforeUser === -1) return prev.slice(0, lastUserIdx);
      return prev.slice(0, dalbitBeforeUser);
    });

    const prevStep = STEPS[stepIndex - 1];
    if (prevStep?.type === "language") {
      setLanguagePhase("primary");
    }

    setStepIndex((i) => i - 1);
    setMultiSelection([]);
    setTextValue("");
    setTextValueSecond("");
  }, [stepIndex, currentStep, languagePhase]);

  /* ── Copy access code ── */
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = accessCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [accessCode]);

  /* ── Progress calc ── */
  const stepsInLevel = STEPS.filter((s) => s.level === currentLevel).length;
  const stepInLevel =
    STEPS.filter((s) => s.level === currentLevel)
      .findIndex((s) => s.id === currentStep?.id) + 1;
  const progressPercent = ((stepIndex + 1) / TOTAL_STEPS) * 100;

  /* ──────────────────────────────────────────────
     Render: Completion screen
     ────────────────────────────────────────────── */
  if (completed) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            You&rsquo;re In
          </h1>
          <p className="text-muted text-lg mb-8">
            Welcome to Dalbit. Here&rsquo;s your access code.
          </p>

          {/* Access code box */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-warm-md mb-8">
            <p className="text-xs text-muted uppercase tracking-wider mb-3">
              Access Code
            </p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl font-mono font-bold text-foreground tracking-widest">
                {accessCode}
              </code>
              <button
                type="button"
                onClick={copyCode}
                className="text-sm text-accent hover:text-accent-dark transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Enter Dalbit CTA */}
          <Button href="/app" size="lg" className="w-full mb-6">
            Enter Dalbit
          </Button>

          {/* Next step card */}
          <div className="bg-surface border border-border rounded-xl p-5 text-left">
            <p className="text-xs text-muted uppercase tracking-wider mb-2">
              Your next step
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Build your profile and connect with the global creative community.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────
     Render: Chat
     ────────────────────────────────────────────── */

  const renderInputArea = () => {
    if (!showInput || !currentStep) return null;

    // Language compound step
    if (currentStep.type === "language") {
      if (languagePhase === "primary") {
        return (
          <div className="flex flex-wrap gap-2 animate-fade-in-up">
            {currentStep.options!.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                selected={false}
                onClick={() => handleLanguagePrimary(opt)}
              />
            ))}
          </div>
        );
      }

      // Additional languages — multi-select
      const remainingOptions = currentStep.options!.filter(
        (o) => o !== answers.primaryLanguage,
      );
      return (
        <div className="space-y-3 animate-fade-in-up">
          <div className="flex flex-wrap gap-2">
            {remainingOptions.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                selected={multiSelection.includes(opt)}
                onClick={() =>
                  setMultiSelection((prev) =>
                    prev.includes(opt)
                      ? prev.filter((o) => o !== opt)
                      : [...prev, opt],
                  )
                }
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleLanguageAdditionalConfirm}>
              {multiSelection.length > 0 ? "Continue" : "None \u2014 Continue"}
            </Button>
          </div>
        </div>
      );
    }

    // Single select
    if (currentStep.type === "single-select") {
      return (
        <div className="flex flex-wrap gap-2 animate-fade-in-up">
          {currentStep.options!.map((opt) => (
            <Pill
              key={opt}
              label={opt}
              selected={false}
              onClick={() => handleSingleSelect(opt)}
            />
          ))}
        </div>
      );
    }

    // Multi select
    if (currentStep.type === "multi-select") {
      return (
        <div className="space-y-3 animate-fade-in-up">
          <div className="flex flex-wrap gap-2">
            {currentStep.options!.map((opt) => (
              <Pill
                key={opt}
                label={opt}
                selected={multiSelection.includes(opt)}
                onClick={() =>
                  setMultiSelection((prev) =>
                    prev.includes(opt)
                      ? prev.filter((o) => o !== opt)
                      : [...prev, opt],
                  )
                }
              />
            ))}
          </div>
          {multiSelection.length > 0 && (
            <Button size="sm" onClick={handleMultiConfirm}>
              Continue
            </Button>
          )}
        </div>
      );
    }

    // Text input
    if (currentStep.type === "text") {
      return (
        <div className="animate-fade-in-up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTextSubmit();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={currentStep.placeholder}
              className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
            />
            <Button
              size="sm"
              type="submit"
              disabled={!textValue.trim() && !currentStep.optional}
            >
              Send
            </Button>
            {currentStep.optional && (
              <Button size="sm" variant="ghost" onClick={handleSkip} type="button">
                Skip
              </Button>
            )}
          </form>
        </div>
      );
    }

    // Text pair (country + city)
    if (currentStep.type === "text-pair") {
      return (
        <div className="animate-fade-in-up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTextPairSubmit();
            }}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="sr-only">{currentStep.labelFirst}</label>
                <input
                  ref={inputRef}
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder={currentStep.placeholder}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="sr-only">{currentStep.labelSecond}</label>
                <input
                  type="text"
                  value={textValueSecond}
                  onChange={(e) => setTextValueSecond(e.target.value)}
                  placeholder={currentStep.placeholderSecond}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm"
                />
              </div>
            </div>
            <Button
              size="sm"
              type="submit"
              disabled={!textValue.trim()}
            >
              Continue
            </Button>
          </form>
        </div>
      );
    }

    // Textarea
    if (currentStep.type === "textarea") {
      return (
        <div className="animate-fade-in-up">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTextareaSubmit();
            }}
            className="space-y-3"
          >
            <textarea
              ref={textareaRef}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={currentStep.placeholder}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-y text-sm min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                type="submit"
                disabled={!textValue.trim() && !currentStep.optional}
              >
                Send
              </Button>
              {currentStep.optional && (
                <Button size="sm" variant="ghost" onClick={handleSkip} type="button">
                  Skip
                </Button>
              )}
            </div>
          </form>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="min-h-[80vh] max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col">
      {/* ── Progress header ── */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="accent">
              Level {currentLevel} of 3
            </Badge>
            <span className="text-sm text-muted">
              {LEVEL_LABELS[currentLevel]} &mdash; Step {stepInLevel} of{" "}
              {stepsInLevel}
            </span>
          </div>
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-warm-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Chat messages ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-[300px]"
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* ── Input area ── */}
      <div className="pt-4 border-t border-border">
        {submitError && (
          <p className="text-red-500 text-sm mb-3">{submitError}</p>
        )}
        {submitting && !completed && (
          <div className="flex items-center gap-2 text-muted text-sm animate-fade-in-up">
            <svg
              className="animate-spin h-4 w-4 text-accent"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Setting things up for you...
          </div>
        )}
        {renderInputArea()}
      </div>

      {/* Honeypot — hidden from humans */}
      <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Exported wrapper with Suspense for useSearchParams
   ────────────────────────────────────────────── */

export function IntakeChat() {
  return (
    <Suspense
      fallback={
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="text-muted text-sm">Loading...</div>
        </section>
      }
    >
      <IntakeChatInner />
    </Suspense>
  );
}
