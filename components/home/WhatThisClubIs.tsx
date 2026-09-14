import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardEyebrow, CardTitle, CardDescription } from "@/components/ui/Card";

const meetingTypes = [
  {
    number: "01",
    title: "Teaching meetings",
    description:
      "A 30-minute block on one topic, then discussion. Career sessions and skills sessions alternate week to week.",
  },
  {
    number: "02",
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
        {meetingTypes.map((type) => (
          <li key={type.title}>
            <Card>
              <CardEyebrow>{type.number}</CardEyebrow>
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
