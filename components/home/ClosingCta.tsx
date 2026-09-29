import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { joinHref } from "@/data/nav";
import { meeting } from "@/data/meeting";
import { externalLinks } from "@/data/links";
import { siteName } from "@/data/site";

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
          {/* Same treatment as the leader cards' LinkedIn icons on the Team page, scaled up. */}
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteName} on LinkedIn`}
            className="mt-10 inline-flex text-muted-foreground transition-[color,transform] duration-200 ease-out hover:-rotate-12 hover:scale-110 hover:text-[#0A66C2]"
          >
            <LinkedinIcon className="h-14 w-14 sm:h-16 sm:w-16" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
