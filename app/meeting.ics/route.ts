import { generateMeetingIcs } from "@/lib/ics";

// Statically generated at build time — the meeting is fixed data, not
// per-request, so this route needs no dynamic behavior.
export const dynamic = "force-static";

export async function GET() {
  const body = generateMeetingIcs();

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bowdoin-ai-club-meeting.ics"',
    },
  });
}
