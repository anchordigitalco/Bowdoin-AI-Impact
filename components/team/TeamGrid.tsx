"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { cn, initials } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

/**
 * Real headshots where they exist; the initials-avatar treatment used
 * elsewhere on the site as an honest fallback where they don't (Hunter,
 * for now) — never a fabricated image of a real person.
 */
function MemberPhoto({ name, photo, className }: { name: string; photo?: string; className: string }) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- fixed-size avatar crop, not worth next/image's responsive-srcset machinery
      <img
        src={photo}
        alt=""
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full bg-muted font-display", className)}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}

function MemberCard({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  const meta = [member.classYear, member.major].filter(Boolean).join(", ");
  return (
    <motion.div
      layoutId={`team-card-${member.slug}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      // A real <a> for LinkedIn lives inside this card (see below), so
      // the card itself is a div acting as a button (not a real
      // <button>) — nesting an <a> inside a <button> is invalid HTML.
      // A fixed height rather than h-full — Adam sits alone in his own
      // "Team" grid (a separate <ul> from "Presidents"), so grid
      // row-stretching alone wouldn't match his card to the others.
      // line-clamp on the meta line keeps Henry's longer major/minor
      // from growing the card past this height.
      className="group flex h-64 w-full cursor-pointer flex-col items-start gap-4 border border-border p-6 text-left transition-colors hover:border-foreground/40"
    >
      <MemberPhoto name={member.name} photo={member.photo} className="h-20 w-20 text-2xl" />
      <div className="flex flex-1 flex-col">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
        {meta ? <p className="line-clamp-2 text-sm text-muted-foreground">{meta}</p> : null}
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-flex w-fit pt-3 text-muted-foreground transition-[color,transform] duration-200 ease-out hover:-rotate-12 hover:scale-110 hover:text-[#0A66C2]"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

function MemberDetail({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const meta = [member.classYear, member.major].filter(Boolean).join(", ");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // A tint over the real page, not a near-opaque cover — the page
      // underneath should still read through, just dimmed.
      className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center bg-background/50 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <motion.div
        layoutId={`team-card-${member.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-4xl flex-col border border-border bg-background sm:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-start gap-4 border-b border-border p-8 sm:w-72 sm:shrink-0 sm:border-r sm:border-b-0">
          <MemberPhoto name={member.name} photo={member.photo} className="h-24 w-24 text-3xl sm:h-28 sm:w-28" />
          <div>
            <p className="text-xl font-semibold text-foreground">{member.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            {meta ? <p className="mt-1 text-sm text-muted-foreground">{meta}</p> : null}
          </div>
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="inline-flex text-muted-foreground transition-[color,transform] duration-200 ease-out hover:-rotate-12 hover:scale-110 hover:text-[#0A66C2]"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>

        <div className="flex-1 p-8">
          <p className="text-muted-foreground text-pretty">{member.bio ?? "Bio coming soon."}</p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeMember = members.find((m) => m.slug === activeSlug) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.slug}>
            <MemberCard member={member} onOpen={() => setActiveSlug(member.slug)} />
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {activeMember ? <MemberDetail member={activeMember} onClose={() => setActiveSlug(null)} /> : null}
      </AnimatePresence>
    </MotionConfig>
  );
}
