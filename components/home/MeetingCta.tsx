import { CalendarPlus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { joinHref } from "@/data/nav";
import { meeting } from "@/data/meeting";

// The bottom-of-page block for Curriculum/Projects/Team — combines what
// used to be two separate sections (MeetingBlock, then ClosingCta) into
// one. Those two repeated the meeting time/place (once as the big
// display line, again as ClosingCta's small trailing caption); this
// says it once.
export function MeetingCta() {
  return (
    <Section as="section" id="join" className="text-center">
      <Reveal>
        <div className="mx-auto max-w-xl">
          <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-balance">
            {meeting.day}s, {meeting.displayTime}
          </p>
          <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-balance">
            {meeting.building}, {meeting.room}
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Open to everyone. No experience needed, no application, no dues.
          </p>

          <div className="mt-6 flex justify-center">
            <Button href="/meeting.ics" size="lg" variant="outline">
              <CalendarPlus className="h-5 w-5" aria-hidden="true" />
              Add to calendar
            </Button>
          </div>

          <h2 className="mt-14 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.01em] text-balance">
            Come to a meeting.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            No sign-up required to show up. Join on Campus Groups so you get the weekly email
            with what we&rsquo;re covering.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={joinHref} size="lg">
              Join on Campus Groups
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
