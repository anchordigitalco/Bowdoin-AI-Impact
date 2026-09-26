import { Hero } from "@/components/home/Hero";
import { HeroQuote } from "@/components/home/HeroQuote";
import { HeroPitch } from "@/components/home/HeroPitch";
import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { ThreeUp } from "@/components/home/ThreeUp";
import { CurriculumTeaser } from "@/components/home/CurriculumTeaser";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { ClosingCta } from "@/components/home/ClosingCta";
import { client } from "@/lib/sanity/client";
import { CURRICULUM_SESSIONS_QUERY } from "@/lib/sanity/queries";

// See app/blogs/[slug]/page.tsx for why this is cache: "no-store" and
// not next: { revalidate } — the latter is a silent no-op for
// @sanity/client's requests, confirmed live (a Studio edit stayed
// unreflected on the deployed site well past any reasonable window).
const options = { cache: "no-store" as const };

export default async function HomePage() {
  // AcademicCalendar is a client component (state for month
  // navigation), so it can't fetch this itself — fetched here and
  // passed down. Next.js dedupes this against CurriculumTeaser's own
  // identical fetch within the same request, so this isn't a second
  // round-trip to Sanity.
  const rawSessions = await client.fetch(CURRICULUM_SESSIONS_QUERY, {}, options);
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
