import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { client } from "@/lib/sanity/client";
import { CURRICULUM_SESSIONS_QUERY } from "@/lib/sanity/queries";

const options = { next: { revalidate: 60 } };

export async function CurriculumTeaser() {
  const sessions = await client.fetch(CURRICULUM_SESSIONS_QUERY, {}, options);
  const preview = sessions.slice(0, 3);

  return (
    <Section as="section" id="curriculum-preview">
      <SectionHeading
        title="What we're covering this semester"
        description="Seven sessions on how AI is changing the work you are heading into and the skills you need to use it well."
      />
      <ul className="grid gap-6 sm:grid-cols-3">
        {preview.map((session, i) => (
          <li key={session.order}>
            <Reveal delay={i * 60}>
              <Card>
                <span
                  className="mb-4 block font-display text-4xl text-muted-foreground/50"
                  aria-hidden="true"
                >
                  {String(session.order).padStart(2, "0")}
                </span>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription>{session.description}</CardDescription>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
      <Link
        href="/curriculum"
        className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        See the full curriculum
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </Section>
  );
}
