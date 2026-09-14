import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

/**
 * A hairline-rule entry, not a boxed drop-shadow card. The default
 * rounded-xl + soft-shadow + full-border treatment is the single most
 * common "AI template" tell — this instead reads as a line in a spec
 * sheet or field-notes dossier: a top rule that brightens on hover, no
 * radius, no shadow, no box. Blue stays reserved for buttons per the
 * site's color rule, so the hover state moves toward foreground (white),
 * never primary.
 */
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col border-t border-border pt-6",
        "transition-colors duration-200 hover:border-foreground/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase transition-colors duration-200 group-hover:text-foreground">
      {children}
    </p>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-muted-foreground">{children}</p>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="mt-auto pt-6">{children}</div>;
}
