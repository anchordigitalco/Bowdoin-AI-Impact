import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "default" | "lg" | "sm";

// transform is its own transition (separate from the color one below) so
// the press feedback stays snappy even when a variant's color transition
// runs at a different duration.
const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // --primary-foreground is tuned per theme/mode for AA contrast on
  // --primary (see the note in app/globals.css) — use it, not a
  // hardcoded white/black, so that stays true if the theme changes.
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  link: "bg-transparent text-foreground underline underline-offset-4 decoration-2 decoration-primary hover:decoration-3",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-5 text-base",
  lg: "h-14 px-8 text-lg",
  sm: "h-9 px-4 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "link" ? "h-auto p-0" : sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    // Anything that isn't an internal page — an external URL, a mailto/tel
    // link, a TODO placeholder, or a static file (e.g. /meeting.ics) — gets
    // a plain <a> instead of next/link, so the browser (not the client
    // router) handles the request.
    const isPlainAnchor =
      /^https?:\/\//.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#TODO") ||
      /\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(href);
    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
