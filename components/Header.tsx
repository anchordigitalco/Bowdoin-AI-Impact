"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { navLinks, joinHref } from "@/data/nav";
import { siteName } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/LogoMark";
import { lenisRef } from "@/lib/lenis";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);

  // Close on route change (but not on the initial mount).
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    setOpen(false);
  }, [pathname]);

  // Manage focus and body scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overlay = overlayRef.current;
    const focusables = overlay
      ? Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-header)]">
      <a
        href="#main-content"
        className="sr-only-focusable fixed top-2 left-2 z-[var(--z-overlay)] rounded-[var(--radius)] bg-primary font-semibold text-primary-foreground"
      >
        Skip to content
      </a>
      {/*
        No bar — three separate floating pills instead, so whatever's
        behind the header (the hero video, or just the page background on
        other routes) shows through the gaps between them. That only works
        if the header itself is taken out of normal document flow (fixed,
        not sticky/static) — a plain in-flow header, even with a
        transparent background, still reserves its own block of space
        *above* the hero, and the black page background shows through
        that reserved space as a solid bar. `<main>` below carries
        matching top padding to keep page content clear of these floating
        pills; the home page's Hero cancels that padding with a negative
        margin so its video still bleeds up to the real top edge.

        Mobile: plain flex, two pills (wordmark, hamburger), spaced apart.
        md+: a 1fr/auto/1fr grid instead — the nav pill's middle column is
        exactly its own width, so it can never overlap the wordmark or
        controls, and the two equal 1fr side columns keep it centered in
        whatever space is left over (not just "the midpoint of two
        unequal-width siblings", which a flex "middle child" would give).
      */}
      {/* Full-bleed, not max-w-6xl like the rest of the page — these are
          floating pills meant to sit near the actual screen edges, not
          inside the centered reading-width column everything else uses. */}
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          href="/"
          // A route change to "/" already scrolls to top on its own —
          // this only matters when you're already on the home page,
          // where Next.js treats it as a no-op navigation and leaves
          // the scroll position untouched otherwise. Goes through Lenis
          // (see lib/lenis.ts) rather than window.scrollTo — the hero's
          // video parallax is also driven by Lenis, and a raw native
          // scroll fights it, which is what read as a "glitch" in the
          // video. Lenis instance only exists while Hero is mounted
          // (home page only), hence the fallback.
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              if (lenisRef.current) {
                lenisRef.current.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }
          }}
          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black px-4 font-display text-sm tracking-tight text-white transition-colors [--logo-fg:white] [--logo-bg:black] hover:bg-white hover:text-black hover:[--logo-fg:black] hover:[--logo-bg:white] sm:h-11 sm:gap-2.5 sm:px-5 sm:text-base md:justify-self-start"
        >
          {/* Tied to the same hover flip as the pill itself (via the
              --logo-fg/--logo-bg custom properties LogoMark reads) so the
              mark is always the same two colors as the pill, not a fixed
              badge sitting on top of it. */}
          <LogoMark className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
          {siteName}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 justify-self-center rounded-full border border-white/10 bg-black p-1.5 md:flex"
        >
          {navLinks.map((link) => {
            // None of these routes are "/" (the wordmark covers Home), so
            // a plain prefix check is enough — no special-case needed.
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground hover:text-background",
                  isActive && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:justify-self-end">
          <Button
            href={joinHref}
            size="sm"
            className="hidden rounded-full border border-white/10 bg-black text-white hover:bg-foreground hover:text-background md:inline-flex"
          >
            Join the club
          </Button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black text-white hover:bg-black/85 md:hidden"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open
        ? createPortal(
            <div
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-0 z-[var(--z-overlay)] flex flex-col bg-background md:hidden"
            >
              <div className="flex h-18 w-full items-center justify-between px-6">
                <span className="inline-flex items-center gap-2 font-display text-base">
                  {/* Defaults are enough here: currentColor for the ink
                      (matches this text), --background for the gaps (this
                      overlay's own solid bg) — no hover state to track. */}
                  <LogoMark className="h-6 w-6 shrink-0" />
                  {siteName}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] text-foreground hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label="Primary"
                className="flex flex-1 flex-col justify-center gap-2 px-6 pb-24"
              >
                {navLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-[var(--radius)] py-3 text-3xl font-semibold text-muted-foreground",
                        isActive && "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button href={joinHref} size="lg" className="mt-6 w-full">
                  Join the club
                </Button>
              </nav>
            </div>,
            document.body
          )
        : null}
    </header>
  );
}
