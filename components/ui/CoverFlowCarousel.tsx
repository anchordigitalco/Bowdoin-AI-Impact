"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type TouchEvent,
  type KeyboardEvent,
} from "react";

const ChevronLeftIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export interface CoverFlowSlide {
  index: number;
  title: string;
  description?: string;
}

export interface CoverFlowCarouselProps {
  items: CoverFlowSlide[];
  autoplayDelay?: number;
  className?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/**
 * A 3D coverflow carousel — center slide full size and sharp, neighbors
 * receding in scale/rotation/opacity on either side.
 *
 * Adapted from a photo-driven restaurant-menu component someone shared —
 * the coverflow math (per-slot transform/opacity/z-index) is kept, but
 * everything else was rebuilt to actually fit this site:
 *   - real design tokens (border/card/foreground/shadow vars) instead of
 *     hardcoded hex and a gold accent color (this site reserves color
 *     for buttons only)
 *   - the site's own fonts instead of system-ui
 *   - a large Michroma numeral standing in for photography — there is
 *     no per-session imagery, and inventing stock photos for "AI on the
 *     Job" etc. isn't real content
 *   - card size and offsets computed from viewport width instead of
 *     fixed pixels, so it doesn't overflow under ~700px wide
 *   - the arrow-key handler is scoped to this element (focus/hover)
 *     instead of a global `window` listener that would hijack arrow
 *     keys anywhere on the page
 *   - a visible pause control (WCAG requires a way to stop content that
 *     auto-advances) and autoplay is off entirely under
 *     prefers-reduced-motion
 */
export function CoverFlowCarousel({
  items,
  autoplayDelay = 5000,
  className = "",
}: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const touchStartX = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const total = items.length;

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const nextSlide = useCallback(() => setCurrentIndex((p) => (p + 1) % total), [total]);
  const prevSlide = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % total), [total]);
  const goToSlide = (idx: number) => setCurrentIndex(idx % total);

  const autoplayActive = !reducedMotion && !isHovered && !isFocused && !isPaused && total > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplayActive, autoplayDelay, nextSlide]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  // Sized from the viewport instead of the source's fixed 330px cards /
  // 285px+510px offsets, which would badly overflow a phone screen.
  const cardWidth = Math.min(viewportWidth * 0.7, 300);
  const cardHeight = cardWidth * 1.4;
  const offset1 = cardWidth * 0.82;
  const offset2 = cardWidth * 1.5;
  const stageHeight = cardHeight + 40;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Curriculum sessions"
      tabIndex={0}
      className={`relative w-full overflow-hidden outline-none select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative mx-auto flex w-full items-center justify-center"
        style={{ height: `${stageHeight}px`, perspective: "1400px" }}
      >
        {items.map((item, idx) => {
          const offset = (idx - currentIndex + total) % total;

          let x = 0;
          let scale = 0.4;
          let rotateY = 0;
          let opacity = 0;
          let zIndex = 0;
          let blur = 2;
          let isCenter = false;

          if (offset === 0) {
            isCenter = true;
            scale = 1;
            opacity = 1;
            zIndex = 30;
            blur = 0;
          } else if (offset === 1) {
            x = offset1;
            scale = 0.82;
            rotateY = -24;
            opacity = 0.55;
            zIndex = 20;
          } else if (offset === 2) {
            x = offset2;
            scale = 0.66;
            rotateY = -36;
            opacity = 0.3;
            zIndex = 10;
            blur = 1;
          } else if (offset === total - 1) {
            x = -offset1;
            scale = 0.82;
            rotateY = 24;
            opacity = 0.55;
            zIndex = 20;
          } else if (offset === total - 2) {
            x = -offset2;
            scale = 0.66;
            rotateY = 36;
            opacity = 0.3;
            zIndex = 10;
            blur = 1;
          }

          return (
            <div
              key={item.index}
              onClick={() => !isCenter && goToSlide(idx)}
              aria-hidden={!isCenter}
              className="absolute flex flex-col justify-between border border-border bg-card p-6 transition-[transform,opacity,filter] duration-700 ease-out"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: "var(--radius)",
                transform: `translateX(${x}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
                filter: blur ? `blur(${blur}px)` : "none",
                transformOrigin: "center center",
                cursor: isCenter ? "default" : "pointer",
                boxShadow: isCenter ? "var(--shadow)" : "none",
              }}
            >
              <span
                className="font-display text-5xl text-muted-foreground/40 sm:text-6xl"
                aria-hidden="true"
              >
                {String(item.index).padStart(2, "0")}
              </span>
              <div
                className="transition-opacity duration-300"
                style={{ opacity: isCenter ? 1 : 0, pointerEvents: isCenter ? "auto" : "none" }}
              >
                <p className="text-xl font-semibold text-foreground">{item.title}</p>
                {item.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous session"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.index}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to session ${idx + 1}`}
              aria-current={idx === currentIndex}
              className="h-2 rounded-full bg-foreground transition-[width,opacity] duration-300"
              style={{
                width: idx === currentIndex ? "24px" : "8px",
                opacity: idx === currentIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        {total > 1 ? (
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
            aria-pressed={isPaused}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        ) : null}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next session"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
}

export default CoverFlowCarousel;
