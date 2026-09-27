import { AcademicCalendar } from "@/components/home/AcademicCalendar";
import { sanityFetch } from "@/lib/sanity/fetch";
import { CURRICULUM_SESSIONS_QUERY } from "@/lib/sanity/queries";
import type { CURRICULUM_SESSIONS_QUERY_RESULT } from "@/lib/sanity/sanity.types";

// See app/blogs/[slug]/page.tsx for why this is cache: "no-store" via
// the raw sanityFetch() helper, not client.fetch() with next: {
// revalidate } — the latter is a silent no-op, confirmed live (a
// Studio edit stayed unreflected on the deployed site well past any
// reasonable window).
const options = { cache: "no-store" as const };

// Split out from app/page.tsx so this fetch can sit behind its own
// <Suspense> boundary (see AcademicCalendarSkeleton) instead of
// blocking the whole home page — including the Hero, which has no
// data dependency of its own — behind a round-trip to Sanity.
export async function AcademicCalendarSection() {
  const rawSessions = await sanityFetch<CURRICULUM_SESSIONS_QUERY_RESULT>(
    CURRICULUM_SESSIONS_QUERY,
    {},
    options
  );
  const sessions = rawSessions.filter(
    (session): session is typeof session & { order: number; title: string; description: string } =>
      session.order != null && session.title != null && session.description != null
  );

  return <AcademicCalendar sessions={sessions} />;
}
