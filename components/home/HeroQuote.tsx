import { cn } from "@/lib/utils";

/**
 * A short, real, verified quote right under the hero video — not the
 * full h-screen "Introducing..." landing hero this glow technique
 * originally came from (that's a different job than this page already
 * does; the actual Hero component owns that moment). What's kept is
 * the illuminated-glow effect itself: an SVG blur+color filter behind
 * a gradient-clipped duplicate of the same text, faded in on load.
 * Quote text stays in Sora — Michroma is reserved for the wordmark/
 * hero headline/eyebrows/numeric indices/stat callouts, and a multi-
 * word quote isn't any of those.
 *
 * Quote verified against reporting on Jensen Huang's January 2025
 * appearance on "Huge Conversations" with Cleo Abram (as covered by
 * CNBC) before publishing it as an attributed quote.
 */
export function HeroQuote() {
  return (
    <div className="relative w-full bg-background px-6 pt-24 pb-16 text-center sm:pt-36 sm:pb-24">
      <svg
        className="absolute h-0 w-0"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="glow-quote"
            colorInterpolationFilters="sRGB"
            x="-50%"
            y="-200%"
            width="200%"
            height="500%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="19" result="blur19" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur9" />
            <feColorMatrix
              in="blur4"
              result="color-0-blur"
              type="matrix"
              values="1 0 0 0 0
                      0 0.9803921568627451 0 0 0
                      0 0 0.9647058823529412 0 0
                      0 0 0 0.8 0"
            />
            <feColorMatrix
              in="blur19"
              result="color-1-blur"
              type="matrix"
              values="0.8156862745098039 0 0 0 0
                      0 0.49411764705882355 0 0 0
                      0 0 0.2627450980392157 0 0
                      0 0 0 1 0"
            />
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" />
            <feColorMatrix
              in="blur9"
              result="color-2-blur"
              type="matrix"
              values="1 0 0 0 0
                      0 0.6666666666666666 0 0 0
                      0 0 0.36470588235294116 0 0
                      0 0 0 0.65 0"
            />
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" />
            <feMerge>
              <feMergeNode in="color-0-blur" />
              <feMergeNode in="layer-1-offsetted" />
              <feMergeNode in="layer-2-offsetted" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <blockquote className="mx-auto max-w-3xl">
        <p className="text-[clamp(1.35rem,3.6vw,2.5rem)] leading-[1.3] tracking-[-0.01em] text-pretty">
          &ldquo;If I were a student today, the first thing I would do is to{" "}
          <span
            className={cn(
              "relative inline-block text-[#fffaf6] [filter:url(#glow-quote)]",
              "before:absolute before:inset-0 before:animate-[onloadopacity_1.1s_ease-out_forwards] before:opacity-0 before:content-[attr(data-text)]",
              "before:bg-[linear-gradient(0deg,#dfe5ee_0%,#fffaf6_50%)] before:bg-clip-text before:text-transparent"
            )}
            data-text="learn AI."
          >
            learn AI.
          </span>
          &rdquo;
        </p>
        <footer className="mt-6 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
          Jensen Huang, CEO of NVIDIA
        </footer>
      </blockquote>
    </div>
  );
}
