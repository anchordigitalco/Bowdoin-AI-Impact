import { meeting } from "@/data/meeting";
import { externalLinks, contactEmail } from "@/data/links";
import { siteName } from "@/data/site";

// Left / center / right, per the copy deck's Global elements > Footer spec —
// no site nav list, no "Get involved" grid. The meeting time here should
// always read the same as the Meeting block component elsewhere: same
// wording everywhere so it's unmissable.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center text-sm text-muted-foreground sm:px-8 md:flex-row md:justify-between md:text-left">
        <p>© {year} {siteName}. All rights reserved.</p>

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
            href={externalLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Instagram
          </a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${contactEmail}`} className="hover:text-foreground">
            {contactEmail}
          </a>
        </p>

        {/* No mark yet — the Anchor Digital SVG hasn't been added to the
            repo, so this is text-only for now. Swap in the logo once it's
            supplied. */}
        <a
          href={externalLinks.anchorDigital}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          Built by Anchor Digital
        </a>
      </div>
    </footer>
  );
}
