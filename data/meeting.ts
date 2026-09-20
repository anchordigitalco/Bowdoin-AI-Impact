// Single source of truth for the club's weekly meeting.
// Edit this file to change the meeting time, location, or links —
// the home page, footer, and the "Add to calendar" .ics file all read
// from here.

export const meeting = {
  day: "Monday" as const,
  /** 24-hour "HH:MM", used to build the .ics file. Assumed to be evening (PM). */
  startTime: "19:30",
  endTime: "20:30",
  /** Human-readable time range shown on the page. */
  displayTime: "7:30 – 8:30 PM",
  building: "Sills Hall",
  room: "Room 010",
  /** Compact form for tight spaces — the footer, meta description. */
  roomShort: "Sills 010",
  timezone: "America/New_York",
  /** First occurrence used to seed the recurring calendar event (a Monday). */
  firstOccurrence: "2026-09-14",
};
