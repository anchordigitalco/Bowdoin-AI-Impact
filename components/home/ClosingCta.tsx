import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { joinHref } from "@/data/nav";
import { meeting } from "@/data/meeting";

// Left centered on purpose — a short closing line reads better centered
// than forced into asymmetry, and MeetingBlock (which always precedes
// this) already carries its own top/bottom hairline, so this stays
// unframed rather than doubling up on rules right above it.
export function ClosingCta() {
  return (
    <Section as="section" id="join" className="text-center">
      <Reveal>
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.01em] text-balance">
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
          <p className="mt-4 text-sm text-muted-foreground">
            {meeting.day}s, {meeting.displayTime} · {meeting.roomShort}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
