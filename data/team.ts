// Presidents section: the club's three co-presidents. Bios are from the
// site copy deck, rewritten to third person (facts unchanged). Hunter's
// isn't written yet — the deck's own placeholder for him is a
// fill-in-the-blank template that isn't meant to go on the live page, so
// his entry omits bio/classYear/major until he sends real text.
//
// Team section: everyone else.

import type { TeamMember } from "@/lib/types";

export const team: TeamMember[] = [
  {
    slug: "jackson-bleecker",
    name: "Jackson Bleecker",
    classYear: "Junior",
    major: "Government and Legal Studies, minor in Economics",
    role: "Co-President",
    group: "president",
    bio: "Jackson Bleecker is a junior from West Orange, New Jersey, studying Government and Legal Studies with a minor in Economics. He owns Anchor Digital, a digital strategy studio he runs for small businesses and nonprofits, and using AI every day there is what got him into this. He wanted a place on campus where students got practical with these tools instead of only arguing about them. Outside of academics he plays for the men's basketball team and is always happy to talk to anyone thinking about starting something of their own.",
  },
  {
    slug: "henry-risch",
    name: "Henry Risch",
    classYear: "Junior",
    major: "Environmental Studies and Economics, minor in Government and Legal Studies",
    role: "Co-President",
    group: "president",
    bio: "Henry Risch is a junior studying environmental studies and economics with a minor in government and legal studies. This past summer he was a fellow for the Hastings Initiative for AI and Humanity. That experience is what led him here, and he's now a student ambassador for the group. Outside of academics he's a captain for the track team and loves to hang out with friends.",
  },
  {
    slug: "hunter-fetterolf",
    name: "Hunter Fetterolf",
    role: "Co-President",
    group: "president",
    // bio intentionally omitted — see note above.
  },
  {
    slug: "adam-bello",
    name: "Adam Bello",
    classYear: "Junior",
    major: "Government and Legal Studies, minor in Economics",
    role: "Head of Creative Development",
    group: "team",
    bio: "Adam Evans Bello is a junior from the Bronx, New York, studying Government and Legal Studies with a minor in Economics. He co-founded Anchor Digital, a digital strategy studio he runs with Jackson Bleecker for small businesses, nonprofits, and individuals, and using AI every day there is what got him into this. He has taken AI courses through Google, The Wharton School, and Anthropic, earning certifications in data analysis, marketing and finance, and AI fluency. He wanted a place on campus where students got practical with these tools instead of only arguing about them. Outside of academics he plays point guard for the men's basketball team and is always happy to talk to anyone thinking about starting something of their own.",
  },
];
