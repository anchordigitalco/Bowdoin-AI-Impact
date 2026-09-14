# Bowdoin A.I. Impact

The Bowdoin A.I. Impact website — Next.js (App Router), TypeScript, Tailwind CSS.
Static-first: all content lives in local MDX and TypeScript data files, no
database or CMS. See [CONTENT.md](./CONTENT.md) *(coming once the rest of the
site is built)* for exactly which files to edit to add a post, project, or
team member.

> **Status:** Home page built and passing review. Curriculum, Blogs, Team,
> and Projects pages are next, pending feedback on the home page.

## Local development

Requires Node.js 20.9+ (Next.js 16's minimum).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

## Domain

Three name shapes are worth checking, roughly in order of preference:

| Domain | Notes |
| --- | --- |
| `bowdoinaiclub.org` | Clearest, most "official student org" read. `.org` is the conventional choice for a nonprofit/student group and is rarely contested. |
| `bowdoinaiclub.com` | Same name, `.com`, if `.org` availability or price is a problem. |
| `bowdoinai.club` | Short and a little clever (the TLD *is* the last word). `.club` domains are inexpensive but less immediately trusted than `.org`/`.com`. |
| `ai.bowdoin.club` | Only if the club (or someone on campus) already owns `bowdoin.club` — then this is just a free subdomain, not a new purchase. |
| `bowdoinaiclub.io` | Only if the others are taken. `.io` costs more, renews at a higher price, and carries no particular meaning here — it's a fallback, not a first choice. |

Check current availability and pricing directly with a registrar before
deciding — availability changes and I have not registered or reserved
anything.

**Registrar recommendation:** [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).
It sells at wholesale cost with no markup (roughly $10–14/yr for `.org`/`.com`,
more like $20–25/yr for `.club`/`.io`), includes free WHOIS privacy, and its
DNS is fast and simple to point at Vercel. [Namecheap](https://www.namecheap.com/)
is a fine, more traditional alternative if you'd rather not set up a
Cloudflare account — similar price range, also free WHOIS privacy.

**DNS records to point the domain at Vercel** (add the project on
[vercel.com](https://vercel.com) first, then add the domain under
Project → Settings → Domains — Vercel will show you these same records):

For the apex/root domain (e.g. `bowdoinaiclub.org`):

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |

For a `www` subdomain (recommended, so both work):

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `cname.vercel-dns.com` |

For a subdomain-only setup (e.g. `ai.bowdoin.club`), skip the `A` record and
just add:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `ai` | `cname.vercel-dns.com` |

After adding the domain in Vercel and the records at the registrar, set
`NEXT_PUBLIC_SITE_URL` in the Vercel project's environment variables to the
final `https://` URL (used for the metadata/Open Graph base URL in
[app/layout.tsx](./app/layout.tsx)).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** — theme tokens live in [app/globals.css](./app/globals.css)
  as CSS custom properties; swap colors there and every component updates
  (see the comment at the top of that file for a contrast-related rule to
  keep in mind if you do).
- **next-mdx-remote** + **gray-matter** for blog posts (once built)
- **lucide-react** for icons

## Deploying

Push to a Git remote, import the repo on [vercel.com](https://vercel.com),
and deploy — no `vercel.json` is needed, the defaults handle this project
correctly. Then follow the [Domain](#domain) section above to attach a real
domain.
