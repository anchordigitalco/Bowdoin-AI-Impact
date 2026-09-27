import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

/**
 * Suspense fallback for CurriculumTeaser. The heading/description and
 * "See the full curriculum" link are static copy, not Sanity data, so
 * they render for real here too — only the three session cards (title
 * + description come from Sanity) are pulsing placeholders.
 */
export function CurriculumTeaserSkeleton() {
  return (
    <Section as="section" id="curriculum-preview">
      <SectionHeading
        title="What we're covering this semester"
        description="Seven sessions on how AI is changing the work you are heading into and the skills you need to use it well."
      />
      <ul className="grid gap-6 sm:grid-cols-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <li key={i}>
            <div className="relative flex h-full animate-pulse flex-col pt-6">
              <span className="absolute inset-x-0 top-0 h-px bg-border" />
              <span className="mb-4 block h-9 w-9 rounded bg-muted" />
              <span className="h-5 w-3/4 rounded bg-muted" />
              <span className="mt-3 h-4 w-full rounded bg-muted/60" />
              <span className="mt-2 h-4 w-2/3 rounded bg-muted/60" />
            </div>
          </li>
        ))}
      </ul>
      <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
        See the full curriculum
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Section>
  );
}
