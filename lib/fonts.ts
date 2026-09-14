import { Michroma, Sora } from "next/font/google";

// Body copy, nav, buttons, forms, footers — everything under 14px and
// every paragraph. See app/globals.css for the full split.
export const bodyFont = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// Display face: wordmark, hero headline, section eyebrows/indices, large
// stat callouts. Only one weight exists — never force 600/700 on this.
export const displayFont = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-runtime",
  display: "swap",
});
