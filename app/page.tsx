import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
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
