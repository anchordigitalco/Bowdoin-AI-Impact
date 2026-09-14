import { BookOpen, Hammer, ShieldQuestion, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { curriculum } from "@/data/curriculum";
import { projects } from "@/data/projects";

const sessionCount = new Set(curriculum.map((u) => u.order)).size;
const projectCount = projects.length;

const items = [
  {
    icon: BookOpen,
    title: "Teach the fundamentals",
    description: `A ${sessionCount}-session curriculum covering how LLMs work, prompting, and the ideas underneath the hype — built for beginners and CS majors alike.`,
    href: "/curriculum",
  },
  {
    icon: Hammer,
    title: "Build with real tools",
    description:
      "Hands-on sessions with the same APIs and agent frameworks used in industry, not just slides.",
    href: "/curriculum",
  },
  {
    icon: Users,
    title: "Ship member projects",
    description: `Members build and maintain ${projectCount} active projects together, from research tools to campus apps.`,
    href: "/projects",
  },
  {
    icon: ShieldQuestion,
    title: "Take ethics seriously",
    description:
      "A full session on bias, misuse, and risk — because building responsibly is part of building at all.",
    href: "/curriculum",
  },
] as const;

export function WhatWeDo() {
  return (
    <Section as="section" id="what-we-do">
      <SectionHeading
        eyebrow="What we actually do"
        title="Not just another speaker series."
        description="Every week is hands-on. Here's the shape of a semester."
      />
      <ul className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              className="group flex h-full flex-col rounded-[var(--radius)] border border-border bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <item.icon className="h-6 w-6 text-foreground" aria-hidden="true" />
              <p className="mt-4 text-xl font-semibold">{item.title}</p>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
