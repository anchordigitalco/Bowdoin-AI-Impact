// This semester's seven teaching sessions, from the site copy deck.
// Hardcoded for now, not CMS-driven — worth moving into Sanity once the
// list starts changing mid-semester or the Curriculum page wants dates
// on the cards. See lib/types.ts for the shape.
//
// The home page's Curriculum teaser shows the first three, in order;
// the (future) Curriculum page shows all seven.

import type { CurriculumUnit } from "@/lib/types";

export const curriculum: CurriculumUnit[] = [
  {
    order: 1,
    title: "AI on the Job",
    description:
      "How consulting, banking, product, and law use it day to day, and what analysts still do by hand.",
  },
  {
    order: 2,
    title: "Confidently Wrong",
    description:
      "Make hallucination, sycophancy, and bias happen live, then learn how to catch them.",
  },
  {
    order: 3,
    title: "Know the Rules First",
    description:
      "Firm AI policies and disclosure. What is allowed, and what gets you cut.",
  },
  {
    order: 4,
    title: "Agents + Claude Code + Skills",
    description:
      "What agents actually are, how Claude Code and Codex work, and how to put them on real work.",
  },
  {
    order: 5,
    title: "The Entry-Level Squeeze",
    description: "What AI is doing to first jobs, and which skills still get paid for.",
  },
  {
    order: 6,
    title: "What You Paste Is What You Give Away",
    description: "Where your inputs go, and the things that should never go in.",
  },
  {
    order: 7,
    title: "Whose Work Is It?",
    description:
      "Authorship and attribution, from Bowdoin's honesty policy to cover letters and client work.",
  },
];
