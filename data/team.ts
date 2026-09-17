// Presidents section: the club's three co-presidents. All bios are
// written/rewritten to third person for a consistent voice across the
// page (facts unchanged from what each person sent).
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
    bio: "Jackson Bleecker is a junior from West Orange, New Jersey, studying Government and Legal Studies with a minor in Economics. He co-founded Anchor Digital, a digital strategy studio he runs with Adam Bello for small businesses and nonprofits, and using AI every day there is what got him into this. He wanted a place on campus where students got practical with these tools instead of only arguing about them. Outside of academics he plays for the men's basketball team and is always happy to talk to anyone thinking about starting something of their own.",
    linkedin: "https://www.linkedin.com/in/jackson-bleecker/",
    photo: "/Team Photos/jackson-bleecker.png",
  },
  {
    slug: "henry-risch",
    name: "Henry Risch",
    classYear: "Junior",
    major: "Environmental Studies and Economics, minor in Government and Legal Studies",
    role: "Co-President",
    group: "president",
    bio: "Henry Risch is a junior studying environmental studies and economics with a minor in government and legal studies. This past summer he was a fellow for the Hastings Initiative for AI and Humanity. That experience is what led him here, and he's now a student ambassador for the group. Outside of academics he's a captain for the track team and loves to hang out with friends.",
    linkedin: "https://www.linkedin.com/in/henry-risch-969052354/",
    photo: "/Team Photos/henry photo.jpeg",
  },
  {
    slug: "hunter-fetterolf",
    name: "Hunter Fetterolf",
    classYear: "Junior",
    major: "Math and Economics, minor in Computer Science",
    role: "Co-President",
    group: "president",
    bio: "Hunter Fetterolf is a junior at Bowdoin College double majoring in Math and Economics with a Computer Science minor, and a member of the hockey team. He was first captivated by how AI was influencing geopolitics, and that got him into learning everything he could about the technology. Today, he is largely focused on AI from an investing and economic perspective while also using technical skills to build agents and tools that solve real problems. His goal is to help prepare others for life after college in a world of AI, where they will have extraordinary potential through the combination of AI skills and a Bowdoin education.",
    linkedin: "https://www.linkedin.com/in/hunter-fetterolf-0578bb220/",
  },
  {
    slug: "adam-bello",
    name: "Adam Evans Bello",
    classYear: "Junior",
    major: "Government and Legal Studies, minor in Economics",
    // A non-breaking space sits between "Creative" and "Development"
    // below — at the card's width, a plain space let "Development"
    // wrap alone onto its own line; this keeps the two words together.
    role: "Head of Creative Development",
    group: "team",
    bio: "Adam Evans Bello is a junior from the Bronx, New York, studying Government and Legal Studies with a minor in Economics. He co-founded Anchor Digital, a digital strategy studio he runs with Jackson Bleecker for small businesses, nonprofits, and individuals, and using AI every day there is what got him into this. He has taken AI courses through Google, The Wharton School, and Anthropic, earning certifications in data analysis, marketing and finance, and AI fluency. He wanted a place on campus where students got practical with these tools instead of only arguing about them. Outside of academics he plays point guard for the men's basketball team and is always happy to talk to anyone thinking about starting something of their own.",
    linkedin: "https://www.linkedin.com/in/adam-evans-bello-57067231a/",
    photo: "/Team Photos/adam-bello.jpg",
  },
];
