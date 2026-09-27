/**
 * Suspense fallback for CurriculumSessionsSection. CoverFlowCarousel
 * sizes its cards from the viewport at runtime (client-only), so this
 * can't match exactly — a centered pulsing card at roughly the same
 * footprint as the real carousel's stage is enough to avoid a jarring
 * layout jump when the real one swaps in.
 */
export function CurriculumSessionsSkeleton() {
  return (
    <div className="flex h-[420px] items-center justify-center sm:h-[460px]" aria-hidden="true">
      <div className="h-[300px] w-[210px] animate-pulse rounded-3xl bg-muted sm:h-[420px] sm:w-[300px]" />
    </div>
  );
}
