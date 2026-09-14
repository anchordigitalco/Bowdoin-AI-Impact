"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
  /** Zero-pad the displayed number to this many digits (e.g. 2 -> "07"). */
  padTo?: number;
  className?: string;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Counts up from 0 to a real number once it scrolls into view — used
 * only on genuine sequence numbers (curriculum session count, meeting
 * type count), never a decorative/meaningless stat. Skips straight to
 * the final value under prefers-reduced-motion (decided once, in the
 * initial state, rather than via a setState call inside the effect).
 */
export function CountUp({ to, duration = 700, padTo, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0));
  const startedRef = useRef(false);
  const display = padTo ? String(value).padStart(padTo, "0") : String(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -2% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  // Decorative in every current use (the surrounding title/label already
  // conveys the meaning) — always hidden from assistive tech rather than
  // making each call site remember to add it.
  return (
    <span ref={ref} className={className} aria-hidden="true">
      {display}
    </span>
  );
}
