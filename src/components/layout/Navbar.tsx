"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/#who-we-serve", label: "Who We Serve" },
  { href: "/trial", label: "BETWEEN Trial" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-200 bg-white"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[1.75rem] font-semibold tracking-tight text-black transition-colors hover:text-accent"
          >
            <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="h-9 w-9"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
              >
                <defs>
                  <linearGradient id="dalbitMarkRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4A45" />
                    <stop offset="100%" stopColor="#E10600" />
                  </linearGradient>
                </defs>
                <path
                  d="M25 8C14 8 6 18 6 30s8 22 19 22c-7-4-12-12-12-22S18 12 25 8z"
                  fill="url(#dalbitMarkRed)"
                />
                <path
                  d="M37 3c14 0 25 12 25 27S51 57 37 57c9-5 15-15 15-27S46 8 37 3z"
                  fill="url(#dalbitMarkRed)"
                />
              </svg>
            </span>
            dalbit.ai
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(href) ? "text-black" : "text-gray-600 hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-black md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-[320px] opacity-100 bg-white" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-accent/10 text-accent"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="px-4 pt-3">
            <Link
              href="/start"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-lg bg-accent px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
