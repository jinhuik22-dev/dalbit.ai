type EventPayload = Record<string, string | number | boolean | null>;

export function track(eventName: string, payload?: EventPayload): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${eventName}`, payload ?? {});
  }
  // Stub: integrate your analytics vendor here (e.g., PostHog, Plausible, GA4)
}
