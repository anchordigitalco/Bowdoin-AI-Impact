import { Presentation } from "lucide-react";

/** Suspense fallback for MeetingSlidesSection — three pulsing rows in the same shape as a real slide-deck link. */
export function MeetingSlidesSkeleton() {
  return (
    <ul className="divide-y divide-border border-t border-border" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i}>
          <div className="flex animate-pulse items-center justify-between gap-4 py-5">
            <span className="flex min-w-0 items-center gap-3">
              <Presentation className="h-5 w-5 shrink-0 text-muted-foreground/40" />
              <span className="h-4 w-40 rounded bg-muted" />
            </span>
            <span className="h-4 w-16 shrink-0 rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  );
}
