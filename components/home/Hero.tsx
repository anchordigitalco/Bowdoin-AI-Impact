"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { siteName } from "@/data/site";
import { lenisRef } from "@/lib/lenis";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven parallax hero, three stacked layers (back to front):
 * the video, the club's wordmark, and the bear portrait —
 * each drifting at its own rate as the section scrolls past, so the
 * portrait reads as sitting in front of the type, which sits in front of
 * the video. Built with GSAP ScrollTrigger + Lenis (adapted from Osmo's
 * parallax-scrolling pattern). Layer order is DOM order: none of the three
 * has an explicit z-index, so plain document order decides what's on top.
 * The whole section also fades out over the last part of that same
 * scroll, so it dissolves into the section below rather than hard-cutting
 * when it scrolls out of view. A static gradient at the very bottom edge
 * backs that up so there's never a hard line even before the user scrolls.
 *
 * The video restarts on its native `loop` — its last frame doesn't quite
 * match its first, so there's a small cut every cycle, but no fade/dip/
 * crossfade layered on top of it (tried a couple of those; every version
 * read as a blur or a flash, which looked worse than the plain cut).
 *
 * Respects prefers-reduced-motion: we never call .play() and the video is
 * `preload="none"`, so the browser never fetches the video file at all —
 * it just displays the poster image (which already shows the same scene),
 * with no Lenis/ScrollTrigger set up, the layers left in their static CSS
 * position, and the portrait layer hidden so it doesn't duplicate the
 * poster's bear.
 *
 * That same duplicate-bear problem also showed up for everyone else, just
 * briefly: `preload="none"` means the video doesn't start fetching until
 * this effect calls .play(), so there's a real window — worse on a slow
 * connection — where the poster (which already has its own bear baked in)
 * is the only thing painted, while the separate portrait layer is already
 * sitting on top of it at full opacity. Same fix as the reduced-motion
 * case, just gated on actual playback instead of the media query: the
 * portrait layer stays hidden until the video's `onPlaying` fires, i.e.
 * until real frames are on screen and it's no longer competing with the
 * poster's own bear for the same spot. If autoplay gets blocked entirely,
 * `onPlaying` just never fires and the poster alone covers it, same as
 * the .catch() below already assumes.
 */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    videoRef.current?.play().catch(() => {
      // Autoplay can still be blocked in some browsers/contexts — the
      // poster frame covers that case visually.
    });

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const layers = self.selector as (sel: string) => Element[];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      tl.to(layers('[data-parallax-layer="video"]'), { yPercent: 70, ease: "none", duration: 1 }, 0)
        .to(layers('[data-parallax-layer="text"]'), { yPercent: 40, ease: "none", duration: 1 }, 0)
        .to(layers('[data-parallax-layer="portrait"]'), { yPercent: 10, ease: "none", duration: 1 }, 0)
        // Dissolve into the next section over the last 40% of the scroll
        // instead of hard-cutting when the section scrolls out of view.
        .to(sectionRef.current, { opacity: 0, ease: "none", duration: 0.4 }, 0.6);
    }, sectionRef);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenisRef.current = null;
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      // Cancels <main>'s top padding (reserved for the now-fixed header)
      // so the video still bleeds all the way up to the real top edge —
      // the floating header pills sit directly on top of it, not above it.
      className="relative -mt-[var(--header-height)] h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <div data-parallax-layer="video" className="absolute inset-0">
        {/* object-cover alone already shows the full frame at most
            viewport ratios, but the mountains sit low in it — scaling up
            and nudging the crop upward trades some sky for more mountain. */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.3) translateY(-15%)" }}
          src="/hero-agent.mp4"
          poster="/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setVideoPlaying(true)}
        />
      </div>

      {/* A slight, uniform tint across the whole video — not localized
          like the old radial scrim, just enough to settle the footage
          down a touch. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/15" />

      <div
        data-parallax-layer="text"
        className="pointer-events-none absolute inset-0 flex items-start justify-center px-6 pt-48 sm:pt-60"
      >
        <div
          className="text-center"
          style={{
            // No scrim behind this anymore — just enough shadow to hold up
            // against a bright cloud or the bear's own light fur.
            textShadow: "0 2px 18px rgba(0,0,0,0.55)",
          }}
        >
          <h1
            className="font-display text-white whitespace-nowrap text-[clamp(2rem,7vw,5.5rem)] leading-[1.15] tracking-[-0.01em]"
            style={{
              // Michroma only ships one weight — font-bold here would
              // trigger the browser's synthetic bold, which distorts its
              // geometric letterforms. A matching text-stroke thickens it
              // instead, without touching font-weight.
              WebkitTextStroke: "1.5px white",
            }}
          >
            {siteName}
          </h1>
        </div>
      </div>

      <div
        data-parallax-layer="portrait"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-300 motion-reduce:hidden",
          videoPlaying && "opacity-100"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative hero art GSAP transforms directly; next/image's wrapper fights that. */}
        <img
          src="/hero-agent.png"
          alt=""
          className="block h-auto w-full"
          style={{ translate: "0 5%" }}
        />
      </div>

      {/* Dissolves the bottom of the photo into the page background. The
          rock is dark enough that a short gradient reads as barely-there,
          so this needs real height and a mid stop to actually be visible
          rather than just theoretically present. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-background/70 to-background sm:h-56"
      />
    </div>
  );
}
