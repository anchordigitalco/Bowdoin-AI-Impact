// The club's three co-presidents. Bios are from the site copy deck,
// verbatim. Hunter's isn't written yet — the deck's own placeholder for
// him is a fill-in-the-blank template ("I'm Hunter Fetterolf and I'm a
// [year] studying [major]...") that isn't meant to go on the live page,
// so his entry just omits bio/classYear/major until he sends real text.

import type { TeamMember } from "@/lib/types";

export const team: TeamMember[] = [
  {
    slug: "jackson-bleecker",
    name: "Jackson Bleecker",
    classYear: "Junior",
    major: "Government and Legal Studies, minor in Economics",
    role: "Co-President",
    group: "exec",
    bio: "I'm Jackson Bleecker, a junior from West Orange, New Jersey, studying Government and Legal Studies with a minor in Economics. I own Anchor Digital, a digital strategy studio I run for small businesses and nonprofits, and using AI every day there is what got me into this. I wanted a place on campus where students got practical with these tools instead of only arguing about them. Outside of academics I play for the men's basketball team and I'm always happy to talk to anyone thinking about starting something of their own.",
  },
  {
    slug: "henry-risch",
    name: "Henry Risch",
    classYear: "Junior",
    major: "Environmental Studies and Economics, minor in Government and Legal Studies",
    role: "Co-President",
    group: "exec",
    bio: "I'm Henry Risch and I'm a junior studying environmental studies and economics with a minor in government and legal studies. This summer I was a fellow for the Hastings Initiative for AI and Humanity. That experience is what led me here, and I'm now a student ambassador for the group. Outside of academics I'm a captain for the track team and love to hang out with friends.",
  },
  {
    slug: "hunter-fetterolf",
    name: "Hunter Fetterolf",
    role: "Co-President",
    group: "exec",
    // bio intentionally omitted — see note above.
  },
];
