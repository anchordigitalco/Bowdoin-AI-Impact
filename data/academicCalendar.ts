// Real Bowdoin College academic-calendar dates for 2026–2027, sourced
// from the College's official calendar (bowdoin.edu/academic-affairs/
// calendar and bowdoin.edu/registrar/registrars-calendar, cross-checked
// against each other), fetched 2026-09-14. Update this file if Bowdoin
// republishes the calendar with different dates.
//
// A break's `end` is the last day the club genuinely can't meet — not
// necessarily the College's own literal end date. Thanksgiving break
// officially "ends 8:00 a.m." on Nov 30, well before an 8:30pm meeting
// that same evening, so Nov 30 is treated as a normal meeting day, not
// part of the break.

export interface AcademicBreak {
  label: string;
  /** ISO date, inclusive. */
  start: string;
  /** ISO date, inclusive — the last day with no meeting. */
  end: string;
}

export const academicBreaks: AcademicBreak[] = [
  { label: "Fall Break", start: "2026-10-09", end: "2026-10-14" },
  { label: "Thanksgiving Break", start: "2026-11-20", end: "2026-11-29" },
  { label: "Winter Break", start: "2026-12-15", end: "2027-01-24" },
  { label: "Spring Break", start: "2027-03-12", end: "2027-03-29" },
];

export interface ScheduledMeeting {
  /** ISO date, always a Monday. */
  date: string;
  /** Ties to CurriculumUnit.order in data/curriculum.ts. */
  sessionOrder: number;
}

// Every Monday meeting through the end of the 7-session curriculum
// cycle — two consecutive meetings per session ("2 weeks per part of
// the curriculum"), skipping any Monday inside a real break above.
// Only 12 Mondays (not 14) fall within Fall semester once Fall Break
// and Thanksgiving are excluded, so Session 7's second meeting lands
// just after Spring semester begins (Jan 25, 2027) rather than before
// winter break — this is what the real calendar actually allows, not
// an approximation.
export const scheduledMeetings: ScheduledMeeting[] = [
  { date: "2026-09-14", sessionOrder: 1 },
  { date: "2026-09-21", sessionOrder: 1 },
  { date: "2026-09-28", sessionOrder: 2 },
  { date: "2026-10-05", sessionOrder: 2 },
  // 2026-10-12 skipped — Fall Break
  { date: "2026-10-19", sessionOrder: 3 },
  { date: "2026-10-26", sessionOrder: 3 },
  { date: "2026-11-02", sessionOrder: 4 },
  { date: "2026-11-09", sessionOrder: 4 },
  { date: "2026-11-16", sessionOrder: 5 },
  // 2026-11-23 skipped — Thanksgiving Break
  { date: "2026-11-30", sessionOrder: 5 },
  { date: "2026-12-07", sessionOrder: 6 },
  { date: "2026-12-14", sessionOrder: 6 },
  // Winter Break: 2026-12-15 – 2027-01-24 (no meetings)
  { date: "2027-01-25", sessionOrder: 7 },
  { date: "2027-02-01", sessionOrder: 7 },
];
