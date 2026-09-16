import { createClient } from "next-sanity";

// The `production` dataset is public (confirmed via an unauthenticated
// query against the data API), so a plain CDN-backed client is enough
// for reading published posts — no read token required. useCdn: true
// is the default for runtime fetches per the Next.js integration
// guide; callers that need guaranteed-fresh data (generateStaticParams,
// webhook-triggered revalidation) opt out with .withConfig({ useCdn:
// false }) instead of flipping this default.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-09-16", // Hard-coded to the date this client was wired up.
  useCdn: true,
});
