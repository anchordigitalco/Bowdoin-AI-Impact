"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ClaudeIcon } from "@/components/ui/ClaudeIcon";
import { Button } from "@/components/ui/Button";
import { softwarePerks, type SoftwarePerk } from "@/data/softwarePerks";

interface StackCard {
  id: number;
  perk: SoftwarePerk | null;
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const exitAnimation = { y: 340, scale: 1, zIndex: 10 };
const enterAnimation = { y: -16, scale: 0.9 };

// Always a 3-deep stack, even with one real perk — blank cards fill the
// remaining slots rather than faking more perks than actually exist.
// The stack is a circular window over `total` real perks followed by
// (3 - total) blanks; "Scroll" always advances that window by one.
const VIRTUAL_LENGTH = Math.max(softwarePerks.length, 3);
function virtualItem(i: number): SoftwarePerk | null {
  const idx = ((i % VIRTUAL_LENGTH) + VIRTUAL_LENGTH) % VIRTUAL_LENGTH;
  return idx < softwarePerks.length ? softwarePerks[idx] : null;
}

/**
 * The icon panel is the real Claude/Anthropic mark (see ClaudeIcon.tsx)
 * standing in for a photo — there's no per-perk photography. A blank
 * perk renders an empty card (the shell's border/background still
 * shows, just nothing inside).
 */
function PerkCardContent({ perk }: { perk: SoftwarePerk | null }) {
  if (!perk) {
    return <div className="h-full w-full" aria-hidden="true" />;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-[200px] w-full items-center justify-center rounded-[var(--radius)] border border-border bg-background">
        <ClaudeIcon className="h-16 w-16" />
      </div>
      <div className="flex w-full items-center justify-between gap-3 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-semibold text-foreground">{perk.name}</span>
          <span className="text-sm text-muted-foreground">{perk.description}</span>
        </div>
        <Button href={perk.href} size="sm" className="shrink-0">
          {perk.ctaLabel}
        </Button>
      </div>
    </div>
  );
}

function AnimatedCard({
  card,
  index,
  reduceMotion,
}: {
  card: StackCard;
  index: number;
  reduceMotion: boolean;
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2];
  const zIndex = 3 - index;
  const exitAnim = index === 0 ? exitAnimation : undefined;
  const initialAnim = index === 2 ? enterAnimation : undefined;

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 1, bounce: 0 }}
      style={{ zIndex, left: "50%", x: "-50%", bottom: 0 }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-t-[var(--radius)] border-x border-t border-border bg-card p-1 shadow-[var(--shadow)] will-change-transform sm:w-[512px]"
    >
      <PerkCardContent perk={card.perk} />
    </motion.div>
  );
}

export function SoftwarePerks() {
  const reduceMotion = useReducedMotion();

  const [cursor, setCursor] = useState(0);
  const [cards, setCards] = useState<StackCard[]>(() =>
    [0, 1, 2].map((i) => ({ id: i, perk: virtualItem(i) }))
  );
  const [nextId, setNextId] = useState(3);

  const handleScroll = () => {
    const newCursor = cursor + 1;
    const entering = virtualItem(newCursor + 2);
    setCards((prev) => [...prev.slice(1), { id: nextId, perk: entering }]);
    setNextId((n) => n + 1);
    setCursor(newCursor);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative h-[380px] w-full overflow-hidden sm:w-[644px]">
        <AnimatePresence initial={false}>
          {cards.map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} reduceMotion={!!reduceMotion} />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-border py-4">
        <button
          type="button"
          onClick={handleScroll}
          className="flex h-9 cursor-pointer items-center justify-center gap-1 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
        >
          Scroll
        </button>
      </div>
    </div>
  );
}
