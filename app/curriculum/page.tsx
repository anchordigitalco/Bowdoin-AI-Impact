import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { CurriculumSessionsSection } from "@/components/curriculum/CurriculumSessionsSection";
import { CurriculumSessionsSkeleton } from "@/components/curriculum/CurriculumSessionsSkeleton";
import { MeetingSlidesSection } from "@/components/curriculum/MeetingSlidesSection";
import { MeetingSlidesSkeleton } from "@/components/curriculum/MeetingSlidesSkeleton";
import { SoftwarePerks } from "@/components/curriculum/SoftwarePerks";
import { MeetingCta } from "@/components/home/MeetingCta";
import { externalLinks } from "@/data/links";

export const metadata: Metadata = { title: "Curriculum" };

// Deliberately NOT async, and no top-level Sanity fetch here anymore —
// that used to block the whole page behind two round-trips to Sanity.
// CurriculumSessionsSection and MeetingSlidesSection do their own
// fetching and each sit behind their own <Suspense> boundary instead,
// so the page shell streams immediately and only those two sections
// show a skeleton for the brief window they're still loading.
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
        <Suspense fallback={<CurriculumSessionsSkeleton />}>
          <CurriculumSessionsSection />
        </Suspense>
      </Section>

      <Section as="div" id="meeting-slides">
        <SectionHeading
          title="Meeting Slides"
          description="The deck from each meeting, posted afterward for anyone who missed it."
        />
        <Suspense fallback={<MeetingSlidesSkeleton />}>
          <MeetingSlidesSection />
        </Suspense>
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
