"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ClaudeIcon } from "@/components/ui/ClaudeIcon";
import { Button } from "@/components/ui/Button";
import { softwarePerks, type SoftwarePerk } from "@/data/softwarePerks";

interface StackCard {
  id: number;
  perk: SoftwarePerk;
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
];

const exitAnimation = { y: 340, scale: 1, zIndex: 10 };
const enterAnimation = { y: -16, scale: 0.9 };

/**
 * Right now there's only one software perk (Claude Max), so — unlike
 * the source component this was adapted from, which always renders a
 * 3-deep stack of placeholder content — this only stacks as many cards
 * as actually exist (min(items, 3)), so it never fakes having more
 * perks than it really has. The icon panel is the real Claude/Anthropic
 * mark (see ClaudeIcon.tsx) standing in for a photo, since there isn't
 * one. "Scroll" (renamed from the source's "Animate") only appears once
 * a second perk is added — with one item there's nothing to scroll to.
 */
function PerkCardContent({ perk }: { perk: SoftwarePerk }) {
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
  const total = softwarePerks.length;
  const stackDepth = Math.min(total, 3);

  const [cards, setCards] = useState<StackCard[]>(() =>
    softwarePerks.slice(0, stackDepth).map((perk, i) => ({ id: i, perk }))
  );
  const [nextId, setNextId] = useState(stackDepth);
  const [nextIndex, setNextIndex] = useState(stackDepth % total);

  const handleScroll = () => {
    const perk = softwarePerks[nextIndex];
    setCards((prev) => [...prev.slice(1), { id: nextId, perk }]);
    setNextId((n) => n + 1);
    setNextIndex((i) => (i + 1) % total);
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

      {total > 1 ? (
        <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-border py-4">
          <button
            type="button"
            onClick={handleScroll}
            className="flex h-9 cursor-pointer items-center justify-center gap-1 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
          >
            Scroll
          </button>
        </div>
      ) : null}
    </div>
  );
}
