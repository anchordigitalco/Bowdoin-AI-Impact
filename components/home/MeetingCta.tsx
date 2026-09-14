import { CalendarPlus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { joinHref } from "@/data/nav";
import { meeting } from "@/data/meeting";

// The bottom-of-page block for Curriculum/Projects/Team — combines what
// used to be two separate sections (MeetingBlock, then ClosingCta) into
// one, as two centered blue cards side by side instead of two stacked
// banners.
export function MeetingCta() {
  return (
    <Section as="section" id="join">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center rounded-[var(--radius)] bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              {meeting.day}s, {meeting.displayTime}
            </p>
            <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              {meeting.building}, {meeting.room}
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Open to everyone. No experience needed, no application, no dues.
            </p>

            <div className="mt-6">
              <Button
                href="/meeting.ics"
                size="lg"
                className="border-0 bg-white text-black hover:bg-white/90"
              >
                <CalendarPlus className="h-5 w-5" aria-hidden="true" />
                Add to calendar
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center rounded-[var(--radius)] bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.01em] text-balance">
              Come to a meeting.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              No sign-up required to show up. Join on Campus Groups so you get the weekly email
              with what we&rsquo;re covering.
            </p>
            <div className="mt-8">
              <Button href={joinHref} size="lg" className="bg-white text-black hover:bg-white/90">
                Join on Campus Groups
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
