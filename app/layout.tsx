import type { Metadata } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteName } from "@/data/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bowdoinaiclub.org";

// Description is the copy deck's Global elements > Meta/SEO text,
// verbatim. Title uses siteName instead of the deck's literal "AI
// Impact" (branding call: keep "Bowdoin A.I. Impact" everywhere) — and
// subpages get "| Bowdoin College" rather than "| Bowdoin A.I. Impact",
// since the club name already contains "Bowdoin".
const metaDescription =
  "A student club at Bowdoin for learning how AI actually gets used in work and building things with it. Mondays 8:30–9:30 PM in Mills 127.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Bowdoin College",
  },
  description: metaDescription,
  openGraph: {
    title: siteName,
    description: metaDescription,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: metaDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Next 16 no longer auto-overrides scroll-behavior during route
      // transitions by default (it used to force an instant jump, then
      // restore it). This site sets `scroll-behavior: smooth` globally
      // in globals.css, so without this attribute a route change (e.g.
      // clicking the header wordmark from another page back to "/")
      // itself plays a smooth scroll-to-top *during* the navigation —
      // right as the hero mounts and Lenis takes over its own scroll,
      // which is what read as a glitch in the hero video. This restores
      // the instant-jump-then-restore behavior for navigations, so the
      // hero always starts clean at position 0 before Lenis takes over;
      // in-page anchor links still get the smooth CSS behavior.
      data-scroll-behavior="smooth"
      className={`dark ${bodyFont.variable} ${displayFont.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Header />
        {/* The header floats fixed over the page now (see Header.tsx), so
            it no longer reserves its own space in flow — this padding
            keeps ordinary page content clear of those pills. The home
            page's Hero cancels it with a matching negative margin so its
            video still bleeds up to the real top edge, right behind the
            floating pills. */}
        <main id="main-content" className="flex-1 pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
