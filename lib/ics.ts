import { meeting } from "@/data/meeting";
import { siteName } from "@/data/site";

function toIcsDateTime(dateIso: string, time24: string) {
  // "2026-09-14" + "20:30" -> "20260914T203000"
  const [hh, mm] = time24.split(":");
  return `${dateIso.replace(/-/g, "")}T${hh}${mm}00`;
}

function fold(line: string) {
  // RFC 5545 line folding at 75 octets, continuation lines start with a space.
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

/**
 * Builds a recurring weekly .ics calendar for the club meeting, defined in
 * data/meeting.ts. Includes a standard America/New_York VTIMEZONE block so
 * the event stays correct across the daylight-saving-time transition.
 */
export function generateMeetingIcs(): string {
  const now = new Date();
  const dtstamp = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteName}//Weekly Meeting//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "X-LIC-LOCATION:America/New_York",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "UID:weekly-meeting@bowdoinaiclub",
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=America/New_York:${toIcsDateTime(meeting.firstOccurrence, meeting.startTime)}`,
    `DTEND;TZID=America/New_York:${toIcsDateTime(meeting.firstOccurrence, meeting.endTime)}`,
    "RRULE:FREQ=WEEKLY;BYDAY=MO",
    `SUMMARY:${siteName} Weekly Meeting`,
    `LOCATION:${meeting.building} ${meeting.room}\\, Bowdoin College`,
    `DESCRIPTION:Weekly meeting of ${siteName}. All majors and skill levels welcome\\, no experience required.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(fold).join("\r\n") + "\r\n";
}
