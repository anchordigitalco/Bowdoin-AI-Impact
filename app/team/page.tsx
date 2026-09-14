import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { MeetingBlock } from "@/components/home/MeetingBlock";
import { ClosingCta } from "@/components/home/ClosingCta";
import { team } from "@/data/team";
import { contactEmail } from "@/data/links";
import { initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <Section as="div" id="team">
        <PageIntro title="Who runs this">
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
        <ul className="space-y-10 sm:space-y-14">
          {team.map((member) => {
            const meta = [member.classYear, member.major].filter(Boolean).join(", ");
            return (
              <li
                key={member.slug}
                className="flex flex-col gap-4 border-b border-border pb-10 last:border-0 sm:flex-row sm:gap-8"
              >
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted font-display text-lg"
                  aria-hidden="true"
                >
                  {initials(member.name)}
                </div>
                <div>
                  <p className="text-xl font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                    {meta ? ` · ${meta}` : ""}
                  </p>
                  <p className="mt-4 max-w-2xl text-muted-foreground text-pretty">
                    {member.bio ?? "Bio coming soon."}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <MeetingBlock />
      <ClosingCta />
    </>
  );
}
