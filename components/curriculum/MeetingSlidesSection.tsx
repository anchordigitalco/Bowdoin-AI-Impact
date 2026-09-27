import { Presentation } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { sanityFetch } from "@/lib/sanity/fetch";
import { MEETING_SLIDES_QUERY } from "@/lib/sanity/queries";
import type { MEETING_SLIDES_QUERY_RESULT } from "@/lib/sanity/sanity.types";
import { formatDate } from "@/lib/utils";

const options = { cache: "no-store" as const };

// Split out from app/curriculum/page.tsx so this fetch sits behind its
// own <Suspense> boundary (MeetingSlidesSkeleton) instead of blocking
// the whole page load.
export async function MeetingSlidesSection() {
  const slides = await sanityFetch<MEETING_SLIDES_QUERY_RESULT>(MEETING_SLIDES_QUERY, {}, options);

  if (slides.length === 0) {
    return (
      <div className="flex items-start gap-3 border-t border-border pt-6">
        <span className="relative mt-1.5 flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground/70" />
        </span>
        <div>
          <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            Status: coming soon
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            First set of slides goes up after the next meeting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border border-t border-border">
      {slides.map((slide, i) => (
        <li key={slide._id}>
          <Reveal delay={i * 60}>
            <a
              href={slide.fileUrl ?? slide.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span className="flex items-center gap-3 min-w-0">
                <Presentation className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="truncate font-medium group-hover:underline">{slide.title}</span>
              </span>
              <span className="shrink-0 text-sm text-muted-foreground">
                {slide.date ? formatDate(slide.date) : null}
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
