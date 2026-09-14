import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { Card, CardEyebrow, CardTitle, CardDescription } from "@/components/ui/Card";
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
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((session) => (
            <li key={session.order}>
              <Card>
                <CardEyebrow>{String(session.order).padStart(2, "0")}</CardEyebrow>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription>{session.description}</CardDescription>
              </Card>
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
