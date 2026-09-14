import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { MeetingBlock } from "@/components/home/MeetingBlock";
import { ClosingCta } from "@/components/home/ClosingCta";
import { curriculum } from "@/data/curriculum";
import { contactEmail } from "@/data/links";

export const metadata: Metadata = { title: "Curriculum" };

export default function CurriculumPage() {
  return (
    <>
      <Section as="div" id="curriculum">
        <PageIntro title="The curriculum">
          <p>
            Teaching meetings run a 30-minute block on one topic, then open discussion. Seven
            sessions this semester, mixing how AI is changing the work you&rsquo;re heading into
            with the skills to use it without getting burned. You do not need to attend in order,
            and nothing here assumes a technical background.
          </p>
        </PageIntro>
        {/* A numbered row-list rather than a card grid — seven items
            doesn't divide evenly into three columns, so a grid always
            leaves an orphaned card in the last row. This also reads more
            like a real syllabus than a feature-grid template. */}
        <ul className="divide-y divide-border border-t border-border">
          {curriculum.map((session, i) => (
            <li key={session.order}>
              <Reveal delay={Math.min(i, 6) * 50}>
                <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-10">
                  <CountUp
                    to={session.order}
                    padTo={2}
                    className="font-display text-2xl text-muted-foreground/50 sm:w-14 sm:shrink-0"
                  />
                  <div>
                    <p className="text-xl font-semibold">{session.title}</p>
                    <p className="mt-2 max-w-2xl text-muted-foreground text-pretty">
                      {session.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section as="div" id="speaker-sphere" className="bg-muted/40">
        <SectionHeading
          title="Speaker Sphere"
          description="Speaker Sphere is our guest series. A few times a semester we bring in someone doing this work outside the classroom, an alum, a faculty member, or a practitioner, and they replace the teaching block for that week. The format is short and direct: 20 minutes on how AI shows up in their actual job, then open Q&A. No panels, no slides you could have read yourself."
        />
        <p className="text-muted-foreground">
          Know someone who should speak? Email us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-foreground underline underline-offset-4 hover:no-underline"
          >
            {contactEmail}
          </a>
          .
        </p>
      </Section>

      <MeetingBlock />
      <ClosingCta />
    </>
  );
}
