"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
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

function sessionFor(order: number) {
  return curriculum.find((c) => c.order === order);
}

/**
 * A read-only month calendar for the club's real Monday meetings and
 * Bowdoin's real breaks — not a full event manager (no create/edit/
 * delete UI, since any visitor-added "event" would only live in that
 * one visitor's browser tab and vanish on refresh — meaningless on a
 * static site with no backend). All dates come from
 * data/academicCalendar.ts, sourced from Bowdoin's official calendar.
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
      const session = meetingEntry ? sessionFor(meetingEntry.sessionOrder) : undefined;
      const activeBreak = academicBreaks.find((b) => iso >= b.start && iso <= b.end);
      return {
        date,
        iso,
        inCurrentMonth: date.getMonth() === cursor.getMonth(),
        isToday: iso === todayISO,
        session,
        activeBreak,
        breakStartsHere: activeBreak?.start === iso || (i === 0 && !!activeBreak),
      };
    });
  }, [cursor, todayISO]);

  // Everything worth reading out in the current month, in plain text —
  // more reliable than expecting someone to parse a tiny grid cell.
  const monthMeetings = cells.filter((c) => c.inCurrentMonth && c.session);
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
      <SectionHeading
        title="The semester at a glance"
        description="Every meeting labeled with what it covers, plus Bowdoin's real fall, Thanksgiving, winter, and spring breaks — nothing here is a placeholder date."
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-lg">
              {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToToday}
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Today
              </button>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous month"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next month"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-t border-l border-border">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="border-r border-b border-border py-2 text-center font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground uppercase"
              >
                {d}
              </div>
            ))}
            {cells.map((cell) => (
              <div
                key={cell.iso}
                className={`relative flex min-h-16 flex-col gap-1 border-r border-b border-border p-1.5 sm:min-h-20 sm:p-2 ${
                  cell.inCurrentMonth ? "" : "opacity-30"
                } ${cell.activeBreak ? "bg-muted/40" : ""}`}
              >
                <span
                  className={`font-display text-xs ${
                    cell.isToday
                      ? "flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background"
                      : "text-muted-foreground"
                  }`}
                >
                  {cell.date.getDate()}
                </span>
                {cell.session ? (
                  <span className="inline-flex items-center gap-1 text-[0.65rem] leading-tight text-foreground sm:text-xs">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                    <span className="truncate">S{cell.session.order}</span>
                  </span>
                ) : null}
                {cell.breakStartsHere ? (
                  <span className="text-[0.6rem] leading-tight text-muted-foreground sm:text-[0.65rem]">
                    {cell.activeBreak?.label}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-72 lg:shrink-0">
          <p className="mb-3 font-display text-xs tracking-[0.12em] text-muted-foreground uppercase">
            This month
          </p>
          {monthMeetings.length === 0 && monthBreaks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing scheduled this month.</p>
          ) : (
            <ul className="space-y-3">
              {monthMeetings.map((c) => (
                <li key={c.iso} className="border-t border-border pt-3 text-sm">
                  <p className="font-medium text-foreground">
                    {c.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} —{" "}
                    {c.session?.title}
                  </p>
                  <p className="mt-1 text-muted-foreground">{c.session?.description}</p>
                </li>
              ))}
              {monthBreaks.map((b) => (
                <li key={b.label} className="border-t border-border pt-3 text-sm">
                  <p className="font-medium text-foreground">{b.label}</p>
                  <p className="mt-1 text-muted-foreground">
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
    </Section>
  );
}
