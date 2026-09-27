import { CoverFlowCarousel } from "@/components/ui/CoverFlowCarousel";
import { sanityFetch } from "@/lib/sanity/fetch";
import { CURRICULUM_SESSIONS_QUERY } from "@/lib/sanity/queries";
import type { CURRICULUM_SESSIONS_QUERY_RESULT } from "@/lib/sanity/sanity.types";
import { scheduledMeetings } from "@/data/academicCalendar";

const options = { cache: "no-store" as const };

// The real date each session is actually taught, from the same
// schedule the home page calendar reads — not a separate guess.
function dateForSession(order: number) {
  const entry = scheduledMeetings.find((m) => m.sessionOrder === order);
  if (!entry) return undefined;
  return new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// Split out from app/curriculum/page.tsx so this fetch sits behind its
// own <Suspense> boundary (CurriculumSessionsSkeleton) instead of
// blocking the whole page load.
export async function CurriculumSessionsSection() {
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
    <CoverFlowCarousel
      items={sessions.map((session) => ({
        index: session.order,
        title: session.title,
        description: session.description,
        date: dateForSession(session.order),
      }))}
    />
  );
}
