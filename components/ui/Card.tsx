import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground",
        "transition-[transform,box-shadow,border-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-foreground/20",
        // Resting shadow is the theme's --shadow token; hover just pushes
        // the same color/opacity out further for more depth.
        "shadow-[var(--shadow)] hover:shadow-[0_16px_32px_hsl(var(--shadow-color)/var(--shadow-opacity))]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
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
