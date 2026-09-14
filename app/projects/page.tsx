import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { MeetingCta } from "@/components/home/MeetingCta";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Section as="div" id="projects" className="pt-6 sm:pt-10">
        <PageIntro title="Our Projects">
          <p>
            Build meetings are work sessions. You come in with an idea or join someone
            else&rsquo;s, and the goal is to finish something small rather than start something
            ambitious. Tools, sites, scripts, research, art. Anything where AI did real work in
            the process counts.
          </p>
          <p>
            Projects are showcased here with the student&rsquo;s name on them. If you want
            something to point at in an interview, this is the fastest way to get it.
          </p>
        </PageIntro>
        {/* No projects have been posted yet — real cards (Sanity-driven,
            once connected) will replace this once the first build
            meetings ship something. */}
        <div className="flex items-start gap-3 border-t border-border pt-6">
          <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground/70" />
          </span>
          <div>
            <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
              Status: in progress
            </p>
            <p className="mt-2 max-w-xl text-lg text-muted-foreground text-pretty">
              First build meetings are underway. Projects will be posted here as they finish. Come
              to a Monday meeting if you want yours to be one of them.
            </p>
          </div>
        </div>
      </Section>

      <MeetingCta />
    </>
  );
}
