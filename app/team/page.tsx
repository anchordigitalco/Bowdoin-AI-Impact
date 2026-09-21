import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { TeamGrid } from "@/components/team/TeamGrid";
import { MeetingCta } from "@/components/home/MeetingCta";
import { team } from "@/data/team";
import { externalLinks } from "@/data/links";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  const presidents = team.filter((m) => m.group === "president");
  const rest = team.filter((m) => m.group === "team");

  return (
    <>
      <Section as="div" id="team" className="pt-6 sm:pt-10">
        <PageIntro title="Leadership Team">
          <p>
            Come say hi at a meeting or{" "}
            <a
              href={externalLinks.campusGroups}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              contact us on Campus Groups
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
