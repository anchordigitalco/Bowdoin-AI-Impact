import { CalendarPlus } from "lucide-react";
import { meeting } from "@/data/meeting";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

// The copy deck's reusable "Meeting block" — same wording everywhere it
// appears (Home, and the bottom of Curriculum and Projects) so it's
// unmissable. Framed with top/bottom hairlines rather than floating free —
// reads as a fixed, recurring record (the way a masthead repeats a
// publication's schedule) instead of another loose content block.
export function MeetingBlock() {
  return (
    <div className="border-y border-border bg-background">
      <Reveal>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 sm:px-8 sm:py-12 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
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
    </div>
  );
}
