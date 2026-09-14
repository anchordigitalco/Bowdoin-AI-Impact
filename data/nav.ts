import { externalLinks } from "@/data/links";

// No "Home" entry — the wordmark on the left already links to "/". Order
// and labels match the copy deck's Global elements > Nav spec (Curriculum
// · Projects · Blog · Team); the Blog route itself stays "/blogs" — an
// existing convention (see content/posts, lib/posts.ts) not worth a
// routing change just for the label swap.
export const navLinks = [
  { label: "Curriculum", href: "/curriculum" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Team", href: "/team" },
] as const;

export const joinHref = externalLinks.campusGroups;
