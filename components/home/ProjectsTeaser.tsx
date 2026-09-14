import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsTeaser() {
  return (
    <Section as="section" id="projects-preview" className="bg-muted/40">
      <SectionHeading
        title="What students are building"
        description="Build meetings turn into real things. Here is what has come out of them so far."
      />
      {/* No projects have been posted yet — real cards (Sanity-driven,
          once connected) will replace this once the first build meetings
          ship something. A status line rather than a bare paragraph
          reads as a real system state, not filler copy. */}
      <Reveal>
        <div className="flex items-start gap-3 border-t border-border pt-6">
          <span
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/50"
            aria-hidden="true"
          />
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
      </Reveal>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        See all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
