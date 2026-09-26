import { Hero } from "@/components/home/Hero";
import { HeroQuote } from "@/components/home/HeroQuote";
import { HeroPitch } from "@/components/home/HeroPitch";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { ThreeUp } from "@/components/home/ThreeUp";
import { CurriculumTeaser } from "@/components/home/CurriculumTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";
import { sanityFetch } from "@/lib/sanity/fetch";
import { CURRICULUM_SESSIONS_QUERY } from "@/lib/sanity/queries";
import type { CURRICULUM_SESSIONS_QUERY_RESULT } from "@/lib/sanity/sanity.types";

// See app/blogs/[slug]/page.tsx for why this is cache: "no-store" via
// the raw sanityFetch() helper, not client.fetch() with next: {
// revalidate } — the latter is a silent no-op, confirmed live (a
// Studio edit stayed unreflected on the deployed site well past any
// reasonable window).
const options = { cache: "no-store" as const };

export default async function HomePage() {
  // AcademicCalendar is a client component (state for month
  // navigation), so it can't fetch this itself — fetched here and
  // passed down. Next.js dedupes this against CurriculumTeaser's own
  // identical fetch within the same request, so this isn't a second
  // round-trip to Sanity.
  const rawSessions = await sanityFetch<CURRICULUM_SESSIONS_QUERY_RESULT>(
    CURRICULUM_SESSIONS_QUERY,
    {},
    options
  );
  const sessions = rawSessions.filter(
    (session): session is typeof session & { order: number; title: string; description: string } =>
      session.order != null && session.title != null && session.description != null
  );

  return (
    <>
      <Hero />
      <HeroQuote />
      <HeroPitch />
      <AcademicCalendar sessions={sessions} />
      <ThreeUp />
      <CurriculumTeaser />
      <ProjectsTeaser />
      <ClosingCta />
    </>
  );
}
