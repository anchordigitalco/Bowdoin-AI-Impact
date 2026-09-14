import { CalendarPlus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { meeting } from "@/data/meeting";

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

// On Home, the meeting time/place lives inside this section instead of
// its own standalone block — the "what this club is" pitch and "when/
// where to show up" belong together as one read. MeetingBlock itself
// stays a separate reusable component for Curriculum/Projects/Team,
// where there's no "What this club is" section to fold it into.
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
                <span
                  className="mb-4 block font-display text-4xl text-muted-foreground/50 sm:text-5xl"
                  aria-hidden="true"
                >
                  {String(type.order).padStart(2, "0")}
                </span>
                <CardTitle>{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={160}>
        <div className="mt-14 flex flex-col gap-8 border-t border-border pt-10 sm:mt-20 md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
            <p className="font-display text-[clamp(1.5rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              {meeting.day}s, {meeting.displayTime}
            </p>
            <p className="font-display text-[clamp(1.5rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              {meeting.building}, {meeting.room}
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Open to everyone. No experience needed, no application, no dues.
            </p>
          </div>

          <Button href="/meeting.ics" size="lg" className="w-full md:w-auto">
            <CalendarPlus className="h-5 w-5" aria-hidden="true" />
            Add to calendar
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
