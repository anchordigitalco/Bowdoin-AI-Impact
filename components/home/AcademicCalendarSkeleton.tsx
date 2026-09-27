import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { meeting } from "@/data/meeting";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Suspense fallback for AcademicCalendarSection, shown for the brief
 * window while the session titles/descriptions are still in flight from
 * Sanity. Everything that ISN'T Sanity-dependent (the heading, the
 * weekly meeting time/place, the white card's shell and grid shape)
 * renders for real here — only the calendar's actual day numbers and
 * "This month" list are pulsing placeholders — so swapping in the real
 * AcademicCalendar never shifts layout or re-paints anything that was
 * already correct.
 */
export function AcademicCalendarSkeleton() {
  return (
    <Section as="section" id="calendar">
      <SectionHeading title="Meetings and Events" />

      <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <p className="mb-2 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
            Weekly Meeting Time
          </p>
          <p className="font-display text-xl leading-[1.25] tracking-[-0.01em] text-balance sm:text-2xl">
            {meeting.day}s, {meeting.displayTime}
          </p>
          <p className="font-display text-xl leading-[1.25] tracking-[-0.01em] text-balance sm:text-2xl">
            {meeting.building}, {meeting.room}
          </p>
        </div>

        <Button href="/meeting.ics" size="lg" className="w-full md:w-auto">
          <CalendarPlus className="h-5 w-5" aria-hidden="true" />
          Add to calendar
        </Button>
      </div>

      <p className="mb-3 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
        Club Calendar
      </p>
      <div
        className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8"
        aria-hidden="true"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full lg:flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 animate-pulse rounded-full border border-gray-200" />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-300">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-300">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 border-t border-l border-gray-200">
              {DAY_LABELS.map((d) => (
                <div
                  key={d}
                  className="border-r border-b border-gray-200 py-2 text-center font-mono text-[0.65rem] tracking-[0.1em] text-gray-400 uppercase"
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 42 }, (_, i) => (
                <div
                  key={i}
                  className="min-h-20 animate-pulse border-r border-b border-gray-200 bg-gray-50 p-1.5 sm:min-h-24 sm:p-2"
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 lg:shrink-0">
            <p className="mb-3 font-display text-xs tracking-[0.12em] text-gray-400 uppercase">
              This month
            </p>
            <ul className="space-y-3">
              {[0, 1].map((i) => (
                <li key={i} className="animate-pulse border-t border-gray-200 pt-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-full rounded bg-gray-100" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
