import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteName } from "@/data/site";
import { joinHref } from "@/data/nav";

// The copy deck's hero eyebrow/headline/subhead/CTAs — kept as its own
// block directly under the video hero rather than overlaid on the video
// itself. The video already carries the big wordmark and the bear
// portrait; stacking a headline, a paragraph, and two buttons on top of
// that footage read as cluttered and fought the video for legibility.
// This reads as one continuous "hero moment" instead — video first, then
// immediately the pitch and the ways in — with no section break between
// them.
export function HeroPitch() {
  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center sm:px-8 sm:py-24">
        <p className="mb-3 font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
          Bowdoin College
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] tracking-[-0.01em] text-balance">
          Get good at the tools everyone is about to expect you to know.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
          {siteName} is a student club for learning how AI is actually used in real work, testing
          where it fails, and building projects with it. We meet every Monday and anyone can walk
          in.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
  );
}
