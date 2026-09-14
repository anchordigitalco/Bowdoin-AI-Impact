import { CalendarPlus } from "lucide-react";
import { meeting } from "@/data/meeting";
import { Button } from "@/components/ui/Button";

// The copy deck's reusable "Meeting block" — same wording everywhere it
// appears (Home, and eventually the bottom of Curriculum and Projects) so
// it's unmissable.
export function MeetingBlock() {
  return (
    <div className="bg-background">
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
    </div>
  );
}
