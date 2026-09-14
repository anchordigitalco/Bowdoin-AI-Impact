import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { siteName } from "@/data/site";
import { joinHref } from "@/data/nav";

/**
 * The copy deck's hero eyebrow/headline/subhead/CTAs — kept as its own
 * block directly under the video hero rather than overlaid on the video
 * itself (the video already carries the wordmark and the bear portrait;
 * stacking more text on that footage fought it for legibility).
 *
 * Split into an asymmetric two-column editorial layout on larger
 * screens — headline left, subhead + CTAs right — rather than one
 * centered column of text, which is the single most common "AI
 * template" tell for a page's supporting copy block.
 */
export function HeroPitch() {
  return (
    <div className="bg-background">
      <Section as="div">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="mb-3 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
                Bowdoin College
              </p>
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] tracking-[-0.01em] text-balance">
                Get good at the tools everyone is about to expect you to know.
              </h2>
            </div>

            <div>
              <p className="text-lg text-muted-foreground text-pretty">
                {siteName} is a student club for learning how AI is actually used in real work,
                testing where it fails, and building projects with it. We meet every Monday and
                anyone can walk in.
              </p>
              {/* Stays stacked once the grid splits into columns at lg —
                  the right column is only ~40% of the content width there,
                  not enough room for both buttons on one line without
                  wrapping inside their fixed height (sm:flex-row is safe
                  below lg, since the layout is still single-column then). */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href={joinHref} size="lg">
                  Join on Campus Groups
                </Button>
                <Button href="/curriculum" size="lg" variant="outline">
                  See what we&rsquo;re covering
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
