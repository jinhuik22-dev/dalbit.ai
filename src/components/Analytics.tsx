"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Client-side analytics component.
 * Fires a `page_view` event on mount and whenever the route changes.
 * Renders no UI -- this is a side-effect-only component.
 */
export function Analytics() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Track the initial page view and subsequent navigations
    if (isInitialMount.current) {
      isInitialMount.current = false;
      track("page_view", { path: pathname });
    } else {
      track("page_view", { path: pathname });
    }
  }, [pathname]);

  return null;
}
