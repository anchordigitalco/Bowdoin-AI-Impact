import { Suspense } from "react";
import { preload } from "react-dom";
import { Hero } from "@/components/home/Hero";
import { HERO_PORTRAIT_SRC, HERO_POSTER_SRC } from "@/data/hero";
import { HeroQuote } from "@/components/home/HeroQuote";
import { HeroPitch } from "@/components/home/HeroPitch";
import { AcademicCalendarSection } from "@/components/home/AcademicCalendarSection";
import { AcademicCalendarSkeleton } from "@/components/home/AcademicCalendarSkeleton";
import { ThreeUp } from "@/components/home/ThreeUp";
import { CurriculumTeaser } from "@/components/home/CurriculumTeaser";
import { CurriculumTeaserSkeleton } from "@/components/home/CurriculumTeaserSkeleton";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";

// Deliberately NOT async, and no top-level Sanity fetch here anymore —
// that used to block the entire page (Hero included) behind the
// round-trip to Sanity, which read as a loading-screen flash before
// the hero ever painted. AcademicCalendarSection and CurriculumTeaser
// do their own fetching and sit behind their own <Suspense> boundary
// instead, so Hero and everything else stream in immediately and only
// those two sections show a skeleton for the brief window they're
// still loading.
export default function HomePage() {
  // Both hero images are in the very first paint, so fetch them alongside
  // the CSS rather than after the parser reaches the <video>/<img>.
  preload(HERO_POSTER_SRC, { as: "image", fetchPriority: "high" });
  preload(HERO_PORTRAIT_SRC, { as: "image", fetchPriority: "high" });

  return (
    <>
      <Hero />
      <HeroQuote />
      <HeroPitch />
      <Suspense fallback={<AcademicCalendarSkeleton />}>
        <AcademicCalendarSection />
      </Suspense>
      <ThreeUp />
      <Suspense fallback={<CurriculumTeaserSkeleton />}>
        <CurriculumTeaser />
      </Suspense>
      <ProjectsTeaser />
      <ClosingCta />
    </>
  );
}
