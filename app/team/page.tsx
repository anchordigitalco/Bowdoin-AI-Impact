import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { TeamGrid } from "@/components/team/TeamGrid";
import { MeetingCta } from "@/components/home/MeetingCta";
import { team } from "@/data/team";
import { contactEmail } from "@/data/links";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  const presidents = team.filter((m) => m.group === "president");
  const rest = team.filter((m) => m.group === "team");

  return (
    <>
      <Section as="div" id="team">
        <PageIntro title="Leadership Team">
          <p>
            Three co-presidents who use these tools daily and wanted a place on campus to figure
            them out together. Come say hi at a meeting or email us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              {contactEmail}
            </a>
            .
          </p>
        </PageIntro>

        <SectionHeading title="Presidents" className="mb-6 sm:mb-8" />
        <TeamGrid members={presidents} />

        {rest.length > 0 ? (
          <>
            <SectionHeading title="Team" className="mt-14 mb-6 sm:mt-20 sm:mb-8" />
            <TeamGrid members={rest} />
          </>
        ) : null}
      </Section>

      <MeetingCta />
    </>
  );
}
