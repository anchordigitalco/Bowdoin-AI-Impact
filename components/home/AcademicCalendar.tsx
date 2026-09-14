"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { academicBreaks, scheduledMeetings } from "@/data/academicCalendar";
import { curriculum } from "@/data/curriculum";
import { meeting } from "@/data/meeting";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISO(iso: string) {
  return new Date(`${iso}T00:00:00`);
}

function sessionFor(order: number | undefined) {
  if (order === undefined) return undefined;
  return curriculum.find((c) => c.order === order);
}

/**
 * "Meetings and Events" — the recurring meeting time/place, and below
 * it a read-only month calendar for the club's real Monday meetings
 * and Bowdoin's real breaks. Not a full event manager (no create/edit/
 * delete UI, since any visitor-added "event" would only live in that
 * one visitor's browser tab and vanish on refresh — meaningless on a
 * static site with no backend). All calendar dates come from
 * data/academicCalendar.ts, sourced from Bowdoin's official calendar.
 *
 * The calendar itself is deliberately a white card on the dark page
 * (not the site's usual dark/hairline surface) — every color inside it
 * is an explicit gray-scale value rather than the theme's dark-tuned
 * tokens (--foreground, --border, etc.), since those would be invisible
 * or low-contrast on a white background.
 */
export function AcademicCalendar() {
  // Starts on the first scheduled meeting's month rather than today's,
  // so a visitor in, say, July still lands on a month with something to
  // see.
  const initialMonth = parseISO(scheduledMeetings[0]?.date ?? meeting.firstOccurrence);
  const [cursor, setCursor] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));

  const todayISO = toISO(new Date());

  const goToToday = () => {
    const now = new Date();
    setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
  };
  const goPrev = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  const goNext = () => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));

  const cells = useMemo(() => {
    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = new Date(firstOfMonth);
    start.setDate(start.getDate() - start.getDay());

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const iso = toISO(date);
      const meetingEntry = scheduledMeetings.find((m) => m.date === iso);
      const session = sessionFor(meetingEntry?.sessionOrder);
      const activeBreak = academicBreaks.find((b) => iso >= b.start && iso <= b.end);
      return {
        date,
        iso,
        inCurrentMonth: date.getMonth() === cursor.getMonth(),
        isToday: iso === todayISO,
        hasMeeting: !!meetingEntry,
        session,
        activeBreak,
        breakStartsHere: activeBreak?.start === iso || (i === 0 && !!activeBreak),
      };
    });
  }, [cursor, todayISO]);

  // Everything worth reading out in the current month, in plain text —
  // more reliable than expecting someone to parse a tiny grid cell.
  const monthMeetings = cells.filter((c) => c.inCurrentMonth && c.hasMeeting);
  const monthBreaks = academicBreaks.filter((b) => {
    const s = parseISO(b.start);
    const e = parseISO(b.end);
    return (
      (s.getFullYear() === cursor.getFullYear() && s.getMonth() === cursor.getMonth()) ||
      (e.getFullYear() === cursor.getFullYear() && e.getMonth() === cursor.getMonth())
    );
  });

  return (
    <Section as="section" id="calendar">
      <SectionHeading title="Meetings and Events" />

      <Reveal>
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
      </Reveal>

      <p className="mb-3 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
        Club Calendar
      </p>
      <div className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full lg:flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg text-gray-900">
                {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="rounded-full border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous month"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-colors hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next month"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-colors hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
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
              {cells.map((cell) => (
                <div
                  key={cell.iso}
                  className={`relative flex min-h-20 flex-col gap-1 border-r border-b border-gray-200 p-1.5 sm:min-h-24 sm:p-2 ${
                    cell.inCurrentMonth ? "" : "opacity-30"
                  } ${cell.activeBreak ? "bg-gray-100" : ""}`}
                >
                  <span
                    className={`font-display ${
                      cell.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[0.65rem] text-white"
                        : "text-xs text-gray-400"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>
                  {cell.hasMeeting ? (
                    <span className="text-[0.62rem] leading-tight font-medium text-gray-900 sm:text-[0.68rem]">
                      {cell.session ? `L${cell.session.order}: ${cell.session.title}` : "Meeting"}
                    </span>
                  ) : null}
                  {cell.breakStartsHere ? (
                    <span className="text-[0.6rem] leading-tight text-gray-500 sm:text-[0.65rem]">
                      {cell.activeBreak?.label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-72 lg:shrink-0">
            <p className="mb-3 font-display text-xs tracking-[0.12em] text-gray-400 uppercase">
              This month
            </p>
            {monthMeetings.length === 0 && monthBreaks.length === 0 ? (
              <p className="text-sm text-gray-500">Nothing scheduled this month.</p>
            ) : (
              <ul className="space-y-3">
                {monthMeetings.map((c) => (
                  <li key={c.iso} className="border-t border-gray-200 pt-3 text-sm">
                    <p className="font-medium text-gray-900">
                      {c.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} —{" "}
                      {c.session ? `L${c.session.order}: ${c.session.title}` : "Meeting"}
                    </p>
                    {c.session?.description ? (
                      <p className="mt-1 text-gray-500">{c.session.description}</p>
                    ) : null}
                  </li>
                ))}
                {monthBreaks.map((b) => (
                  <li key={b.label} className="border-t border-gray-200 pt-3 text-sm">
                    <p className="font-medium text-gray-900">{b.label}</p>
                    <p className="mt-1 text-gray-500">
                      {parseISO(b.start).toLocaleDateString("en-US", { month: "short", day: "numeric" })} –{" "}
                      {parseISO(b.end).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      , no meeting
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
