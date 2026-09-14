// Software members get free access to through the club. Just one entry
// right now — the array (rather than a single object) is deliberate so
// adding the next one later is a one-line edit, not a rewrite of
// components/curriculum/SoftwarePerks.tsx.

export interface SoftwarePerk {
  slug: string;
  name: string;
  description: string;
  /** Where the perk's own CTA links out to. */
  href: string;
  ctaLabel: string;
}

export const softwarePerks: SoftwarePerk[] = [
  {
    slug: "claude-max",
    name: "Claude Max",
    description: "Anthropic's top-tier plan — a $100/month value, free for members.",
    href: "https://claude.ai",
    ctaLabel: "Try Claude",
  },
];
