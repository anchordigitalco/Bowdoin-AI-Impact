import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { TeamGrid } from "@/components/team/TeamGrid";
import { MeetingCta } from "@/components/home/MeetingCta";
import { team } from "@/data/team";
import { externalLinks } from "@/data/links";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  // One combined grid (lg:grid-cols-4 in TeamGrid) instead of two
  // stacked ones — presidents first, everyone else filling the
  // remaining slots in the same row rather than a separate section
  // below. Each card already shows its own role (Co-President,
  // Programming Director, ...), so a "Presidents"/"Team" split
  // heading isn't the only place that distinction lives.
  const presidents = team.filter((m) => m.group === "president");
  const rest = team.filter((m) => m.group === "team");
  const members = [...presidents, ...rest];

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

        <TeamGrid members={members} />
      </Section>

      <MeetingCta />
    </>
  );
}
