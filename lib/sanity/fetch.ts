/**
 * A hand-rolled replacement for `client.fetch()`, calling Sanity's
 * HTTP query API directly via the platform's native `fetch()` instead
 * of going through `@sanity/client` (which makes its requests via the
 * `get-it` library, not a call Next.js's fetch-cache instrumentation
 * reliably sees or keys the same way it would a plain `fetch()` call).
 *
 * Confirmed live: after wiring `cache: "no-store"` into
 * `client.fetch()`'s options, an edit in Sanity Studio still didn't
 * show up on the deployed site — while the exact same query, run as a
 * plain `fetch()` against Sanity's REST API, picked up the edit
 * immediately. Since every reason this project chose next-sanity in
 * the first place (typed queries via `defineQuery`, TypeGen,
 * `useCdn`) is unaffected by *how* the HTTP call itself is made, this
 * swaps only that one part out.
 *
 * Talks to the non-CDN API (not apicdn.sanity.io) — this project
 * chose to trade `useCdn`'s speed for guaranteed-fresh reads on every
 * one of these calls already (`cache: "no-store"` at the call site),
 * so there's no reason to also carry the CDN's own eventual-consistency
 * window on top of that.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2026-09-16"; // Matches lib/sanity/client.ts.

export async function sanityFetch<Result>(
  query: string,
  params: Record<string, unknown> = {},
  fetchOptions: RequestInit = {}
): Promise<Result> {
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url.toString(), fetchOptions);
  if (!res.ok) {
    throw new Error(`Sanity query failed (${res.status}): ${await res.text()}`);
  }
  const json = (await res.json()) as { result: Result };
  return json.result;
}
