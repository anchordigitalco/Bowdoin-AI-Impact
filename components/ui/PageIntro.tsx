import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  /** One or more paragraphs of intro body copy. */
  children?: ReactNode;
  className?: string;
}

/**
 * The page-level heading + intro copy for a top-level page (Curriculum,
 * Projects, Blog, Team). Unlike SectionHeading (always an h2, meant for
 * repeated sections within a page), this renders an h1 — these pages
 * don't have a wordmark or hero acting as their h1 the way Home does.
 */
export function PageIntro({ title, children, className }: PageIntroProps) {
  return (
    <div className={cn("mb-10 max-w-2xl sm:mb-14", className)}>
      <h1 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-balance">
        {title}
      </h1>
      {children ? (
        <div className="mt-4 space-y-4 text-lg text-muted-foreground text-pretty">{children}</div>
      ) : null}
    </div>
  );
}
