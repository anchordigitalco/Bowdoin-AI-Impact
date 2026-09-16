import type Lenis from "lenis";

/**
 * The active Lenis instance, when one exists — Hero.tsx owns the actual
 * instance (it only runs on the home page, alongside its GSAP
 * ScrollTrigger parallax) and keeps this in sync on mount/unmount.
 *
 * Anything outside Hero that needs to scroll the page (the header's
 * wordmark, "scroll to top" links) MUST go through this rather than
 * calling `window.scrollTo` directly. Lenis re-implements scrolling
 * itself — it drives its own raf loop and pushes the real scroll
 * position every frame — so a raw `window.scrollTo` fights it: the
 * browser starts its own scroll, Lenis's next frame overwrites it, and
 * the result is a visible stutter. That stutter shows up hardest right
 * on the hero video, since its parallax transform is driven off the
 * same scroll position Lenis and the native call are fighting over.
 */
export const lenisRef: { current: Lenis | null } = { current: null };
