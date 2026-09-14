import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { CoverFlowCarousel } from "@/components/ui/CoverFlowCarousel";
import { SoftwarePerks } from "@/components/curriculum/SoftwarePerks";
import { MeetingCta } from "@/components/home/MeetingCta";
import { curriculum } from "@/data/curriculum";
import { scheduledMeetings } from "@/data/academicCalendar";
import { contactEmail } from "@/data/links";

export const metadata: Metadata = { title: "Curriculum" };

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

export default function CurriculumPage() {
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
          items={curriculum.map((session) => ({
            index: session.order,
            title: session.title,
            description: session.description,
            date: dateForSession(session.order),
          }))}
        />
      </Section>

      <Section as="div" id="speaker-sphere" className="rounded-3xl bg-muted/40">
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
