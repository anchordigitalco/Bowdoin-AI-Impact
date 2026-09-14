import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  as?: ElementType;
  id?: string;
  className?: string;
  /** Adds vertical rhythm consistent with other sections. Set false to opt out. */
  padded?: boolean;
  children: ReactNode;
}

/**
 * Page-width wrapper with consistent max-width, side gutters, and vertical
 * rhythm. Use for every top-level page section so spacing stays uniform.
 */
export function Section({
  as: Tag = "section",
  id,
  className,
  padded = true,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full max-w-6xl px-6 sm:px-8",
        padded && "py-16 sm:py-24",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.01em] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
