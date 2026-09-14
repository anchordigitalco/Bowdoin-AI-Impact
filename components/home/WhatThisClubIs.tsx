import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

const meetingTypes = [
  {
    order: 1,
    title: "Teaching meetings",
    description:
      "A 30-minute block on one topic, then discussion. Career sessions and skills sessions alternate week to week.",
  },
  {
    order: 2,
    title: "Build meetings",
    description:
      "Work time. You bring an idea or join someone else's, and we ship something small enough to finish.",
  },
] as const;

export function WhatThisClubIs() {
  return (
    <Section as="section" id="about">
      <SectionHeading
        title="What this club is"
        description="Most of what students hear about AI is either hype or panic. We do neither. Every meeting gives you something you can use the next day, whether that is a workflow for your job search, a clearer sense of what these tools get wrong, or a project you built yourself."
      />
      <ul className="grid gap-6 sm:grid-cols-2">
        {meetingTypes.map((type, i) => (
          <li key={type.title}>
            <Reveal delay={i * 80}>
              <Card>
                {/* A real, large numeral rather than a small-caps eyebrow —
                    there are genuinely only two kinds of meetings, so the
                    number carries weight instead of being decoration. */}
                <CountUp
                  to={type.order}
                  padTo={2}
                  className="mb-4 block font-display text-4xl text-muted-foreground/50 sm:text-5xl"
                />
                <CardTitle>{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
