import type { Metadata } from "next";
import { Presentation } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { CoverFlowCarousel } from "@/components/ui/CoverFlowCarousel";
import { SoftwarePerks } from "@/components/curriculum/SoftwarePerks";
import { MeetingCta } from "@/components/home/MeetingCta";
import { Reveal } from "@/components/ui/Reveal";
import { client } from "@/lib/sanity/client";
import { CURRICULUM_SESSIONS_QUERY, MEETING_SLIDES_QUERY } from "@/lib/sanity/queries";
import { scheduledMeetings } from "@/data/academicCalendar";
import { externalLinks } from "@/data/links";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Curriculum" };

const options = { next: { revalidate: 60 } };

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

export default async function CurriculumPage() {
  const [rawSessions, slides] = await Promise.all([
    client.fetch(CURRICULUM_SESSIONS_QUERY, {}, options),
    client.fetch(MEETING_SLIDES_QUERY, {}, options),
  ]);
  // `required()` in the Studio schema keeps these filled in practice —
  // TypeGen still types every field nullable since that's a Studio-only
  // constraint, not a schema-level one, so this filter is what actually
  // narrows the type (and quietly excludes any session someone left
  // mid-edit rather than crashing the page on it).
  const sessions = rawSessions.filter(
    (session): session is typeof session & { order: number; title: string; description: string } =>
      session.order != null && session.title != null && session.description != null
  );

  return (
    <>
      <Section as="div" id="curriculum" className="pt-6 sm:pt-10">
        <PageIntro title="Our Curriculum">
          <p>
            Seven sessions, each a 30-minute block plus discussion. No order required, no
            technical background assumed.
          </p>
        </PageIntro>
        <CoverFlowCarousel
          items={sessions.map((session) => ({
            index: session.order,
            title: session.title,
            description: session.description,
            date: dateForSession(session.order),
          }))}
        />
      </Section>

      <Section as="div" id="meeting-slides">
        <SectionHeading
          title="Meeting Slides"
          description="The deck from each meeting, posted afterward for anyone who missed it."
        />
        {slides.length === 0 ? (
          <div className="flex items-start gap-3 border-t border-border pt-6">
            <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground/70" />
            </span>
            <div>
              <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
                Status: coming soon
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                First set of slides goes up after the next meeting.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-border border-t border-border">
            {slides.map((slide, i) => (
              <li key={slide._id}>
                <Reveal delay={i * 60}>
                  <a
                    href={slide.url ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <Presentation
                        className="h-5 w-5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span className="truncate font-medium group-hover:underline">
                        {slide.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {slide.date ? formatDate(slide.date) : null}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section as="div" id="speaker-sphere" className="rounded-3xl bg-muted/40">
        <SectionHeading
          title="Speaker Sphere"
          description="Speaker Sphere is our guest series. A few times a semester we bring in someone doing this work outside the classroom, an alum, a faculty member, or a practitioner, and they replace the teaching block for that week. The format is short and direct: 20 minutes on how AI shows up in their actual job, then open Q&A. No panels, no slides you could have read yourself."
        />
        <p className="text-muted-foreground">
          Know someone who should speak?{" "}
          <a
            href={externalLinks.campusGroups}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            Contact us on Campus Groups
          </a>
          .
        </p>
      </Section>

      <Section as="div" id="software-perks">
        <SectionHeading
          title="Free for members"
          description="Software the club gives every member access to at no cost."
        />
        <div className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8">
          <SoftwarePerks />
        </div>
      </Section>

      <MeetingCta />
    </>
  );
}
