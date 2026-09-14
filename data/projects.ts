// PLACEHOLDER CONTENT — replace with real club projects.
// Each project is one object. See CONTENT.md for the exact fields to edit.
// `featured: true` surfaces a project in the homepage preview strip
// (the first two featured projects, in array order, are shown).

import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "study-buddy",
    title: "Study Buddy",
    description:
      "A retrieval-augmented chatbot that answers questions from a course's syllabus and readings.",
    body: [
      "Study Buddy started as a two-week hack during our RAG session and turned into an ongoing project. Members upload a course syllabus and reading list, and the app builds a small vector index it can search when answering questions.",
      "The current focus is citation accuracy — making sure every answer points back to the specific reading it came from, rather than a plausible-sounding paraphrase.",
    ],
    people: [
      { name: "Placeholder Member", role: "Lead" },
      { name: "Placeholder Member" },
      { name: "Placeholder Member" },
    ],
    stack: ["Python", "FastAPI", "pgvector", "Claude API"],
    status: "in-progress",
    tags: ["RAG", "education", "agents"],
    links: [
      { label: "Repo", href: "#TODO-github-repo" },
      { label: "Demo", href: "#TODO-demo-url" },
    ],
    featured: true,
  },
  {
    slug: "campus-events-agent",
    title: "Campus Events Agent",
    description:
      "An agent that reads Bowdoin's event listings and drafts a personalized weekly digest.",
    body: [
      "This project came out of the agents-and-tools unit. The agent scrapes public campus event pages, classifies events by interest area, and drafts a short weekly email digest for anyone who signs up.",
      "It's a good example of tool use in practice: the model doesn't generate the digest from memory, it calls a small set of tools (fetch page, parse listing, rank by interest) and only writes the final summary.",
    ],
    people: [{ name: "Placeholder Member", role: "Lead" }, { name: "Placeholder Member" }],
    stack: ["TypeScript", "Node.js", "Claude API", "cron"],
    status: "in-progress",
    tags: ["agents", "automation"],
    links: [{ label: "Repo", href: "#TODO-github-repo" }],
    featured: true,
  },
  {
    slug: "intro-fine-tuning-workshop",
    title: "Intro Fine-Tuning Workshop Kit",
    description:
      "A self-contained notebook and dataset used to teach fine-tuning basics in a single session.",
    body: [
      "Built for the fine-tuning session, this kit walks through preparing a small labeled dataset, running a lightweight fine-tuning job, and comparing outputs before and after.",
      "It's intentionally scoped to run in a single 60-minute session on a free-tier notebook environment.",
    ],
    people: [{ name: "Placeholder Member", role: "Lead" }],
    stack: ["Python", "Jupyter"],
    status: "completed",
    tags: ["fine-tuning", "education"],
    links: [{ label: "Repo", href: "#TODO-github-repo" }],
    featured: false,
  },
];
