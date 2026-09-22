import { meeting } from "@/data/meeting";
import { externalLinks } from "@/data/links";
import { siteName } from "@/data/site";
import { LogoMark } from "@/components/ui/LogoMark";

// Left / center / right, per the copy deck's Global elements > Footer spec —
// no site nav list, no "Get involved" grid. The meeting time here should
// always read the same as the Meeting block component elsewhere: same
// wording everywhere so it's unmissable.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center text-sm text-muted-foreground sm:px-8 md:flex-row md:justify-between md:text-left">
        <p className="flex items-center gap-2">
          <LogoMark className="h-4 w-4 shrink-0" />
          <span>
            © {year} {siteName}. All rights reserved.
          </span>
        </p>

        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            Meetings {meeting.day}s {meeting.displayTime}, {meeting.roomShort}
          </span>
          <span aria-hidden="true">·</span>
          <a
            href={externalLinks.campusGroups}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Join on Campus Groups
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </p>

        {/* Anchor Digital's own credit tag — icon (masked so it follows
            text color/hover, same asset as their real site's mark) next
            to their tracked-out monospace wordmark, matching how they tag
            every site they build. Since Footer is rendered once from the
            root layout, this appears on every page automatically. */}
        <a
          href={externalLinks.anchorDigital}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 font-mono text-xs whitespace-nowrap tracking-[0.15em] text-muted-foreground uppercase hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="h-4 shrink-0 bg-current"
            style={{
              aspectRatio: "240 / 127",
              WebkitMaskImage: "url(/anchor-digital-icon.png)",
              maskImage: "url(/anchor-digital-icon.png)",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          Built by Anchor Digital
        </a>
      </div>
    </footer>
  );
}
