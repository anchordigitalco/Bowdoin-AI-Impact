import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

export function ProjectsTeaser() {
  return (
    <Section as="section" id="projects-preview" className="bg-muted/40">
      <SectionHeading
        title="What students are building"
        description="Build meetings turn into real things. Here is what has come out of them so far."
      />
      {/* No projects have been posted yet — this is the Projects page's own
          empty-state copy, reused here rather than inventing placeholder
          project cards. Swap for real cards once the first ones exist. */}
      <p className="max-w-xl text-muted-foreground text-pretty">
        First build meetings are underway. Projects will be posted here as they finish. Come to a
        Monday meeting if you want yours to be one of them.
      </p>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        See all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
