import { ArrowUpRight, Camera, Mail, MessageCircle, Users } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { externalLinks } from "@/data/links";

const ways = [
  {
    icon: Users,
    title: "Bowdoin Campus Groups",
    description: "Official club page — register your interest here.",
    href: externalLinks.campusGroups,
  },
  {
    icon: Mail,
    title: "Email list",
    description: "Weekly reminders and session materials.",
    href: externalLinks.emailList,
  },
  {
    icon: MessageCircle,
    title: "Group chat",
    description: "Ask questions between meetings.",
    href: externalLinks.groupChat,
  },
  {
    icon: Camera,
    title: "Instagram",
    description: "Photos from meetings and project demos.",
    href: externalLinks.instagram,
  },
] as const;

export function JoinSection() {
  return (
    <Section as="section" id="join" className="bg-muted/40">
      <SectionHeading
        eyebrow="Join us"
        title="However you'd like to stay in the loop."
        description="Pick whichever of these works for you — most members use more than one."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ways.map((way) => (
          <li key={way.title}>
            <a
              href={way.href}
              className="group flex h-full flex-col rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <way.icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-4 font-semibold">{way.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{way.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
