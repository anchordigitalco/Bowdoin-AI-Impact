import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardEyebrow, CardTitle, CardDescription } from "@/components/ui/Card";
import { curriculum } from "@/data/curriculum";

export function CurriculumTeaser() {
  const preview = curriculum.slice(0, 3);

  return (
    <Section as="section" id="curriculum-preview">
      <SectionHeading
        title="What we're covering this semester"
        description="Seven sessions on how AI is changing the work you are heading into and the skills you need to use it well."
      />
      <ul className="grid gap-6 sm:grid-cols-3">
        {preview.map((session) => (
          <li key={session.order}>
            <Card>
              <CardEyebrow>{String(session.order).padStart(2, "0")}</CardEyebrow>
              <CardTitle>{session.title}</CardTitle>
              <CardDescription>{session.description}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
      <Link
        href="/curriculum"
        className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        See the full curriculum <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </Section>
  );
}
