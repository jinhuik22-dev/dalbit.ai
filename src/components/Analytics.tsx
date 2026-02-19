"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Analytics placeholder component.
 * Replace the trackPageView / trackEvent implementations
 * with your real analytics provider (Plausible, PostHog, GA4, etc.).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function trackPageView(url: string, _props?: Record<string, any>) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // TODO: replace with real analytics call
    console.debug("[analytics] pageview", url);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackEvent(name: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // TODO: replace with real analytics call
    console.debug("[analytics] event", name, props);
  }
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return null; // No UI — this is a side-effect-only component
}
