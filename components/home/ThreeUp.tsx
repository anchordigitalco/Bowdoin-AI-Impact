import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  {
    icon: GraduationCap,
    title: "Open to every major.",
    description:
      "Government, biology, art history, CS. The point is what you do with the tools in your own field, not writing code.",
  },
  {
    icon: Briefcase,
    title: "Built around real use.",
    description:
      "Firm AI policies, disclosure rules, hiring, privacy. The things that actually come up at an internship.",
  },
  {
    icon: Rocket,
    title: "You leave with work.",
    description: "Projects get showcased on this site, not just talked about.",
  },
] as const;

// Carries the "What this club is" heading/intro — previously its own
// section with a two-card grid (Teaching meetings / Build meetings)
// above this one, now folded into one box.
export function ThreeUp() {
  return (
    <Section as="section" id="why-join" className="rounded-3xl bg-muted/40">
      <SectionHeading
        title="What this club is"
        description="Most of what students hear about AI is either hype or panic. We do neither. Every meeting gives you something you can use the next day, whether that is a workflow for your job search, a clearer sense of what these tools get wrong, or a project you built yourself."
      />
      <ul className="grid gap-8 sm:grid-cols-3">
        {points.map((point, i) => (
          <li key={point.title}>
            <Reveal delay={i * 60}>
              <div className="flex flex-col items-start gap-3 border-t border-border pt-6">
                <point.icon className="h-6 w-6 text-foreground" aria-hidden="true" />
                <p className="text-lg font-semibold text-balance">{point.title}</p>
                <p className="text-muted-foreground text-pretty">{point.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
