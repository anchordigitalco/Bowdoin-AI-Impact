"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms — keep grid/list items 30–80ms apart. */
  delay?: number;
  className?: string;
}

/**
 * Fades/lifts content in once it scrolls into view, via
 * IntersectionObserver — no scroll library, fires once, then
 * disconnects. Duration/easing match the rest of the site's motion
 * tokens (custom ease-out, not bare CSS `ease`).
 *
 * prefers-reduced-motion is handled globally (app/globals.css collapses
 * every transition to ~0ms under that media query), so this component
 * doesn't need its own reduced-motion branch — content still ends up
 * visible, just without the animated approach.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Generous margins on purpose: a fast mobile flick-scroll can jump
      // an element through a tight intersection window in one frame — a
      // permissive threshold/rootMargin trades a slightly earlier reveal
      // for never leaving content stuck at opacity 0.
      { threshold: 0.05, rootMargin: "0px 0px -2% 0px" }
    );
    observer.observe(el);

    // Belt-and-suspenders: content staying permanently invisible is a far
    // worse failure than revealing without the animation, so force it
    // visible after a few seconds regardless of whether the observer ever
    // fired (an odd scroll-jacking interaction, an observer edge case).
    const fallback = window.setTimeout(() => setVisible(true), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
      }}
    >
      {children}
    </div>
  );
}
