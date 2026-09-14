import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { Card, CardEyebrow, CardTitle, CardDescription } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog" };

// No Meeting block / Join CTA at the bottom here — the copy deck doesn't
// call for one on the Blog index the way it does on Curriculum, Projects,
// and Team.
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section as="div" id="blog-intro" className={posts.length > 0 ? "pb-0" : undefined}>
        <PageIntro title="Writing">
          <p>
            Notes from the club leadership on what we&rsquo;re reading, what we tested, and what
            came out of recent meetings. Short pieces, published when we have something worth
            saying.
          </p>
        </PageIntro>

        {posts.length === 0 ? (
          <div className="flex items-start gap-3 border-t border-border pt-6">
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/50"
              aria-hidden="true"
            />
            <div>
              <p className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
                Status: coming soon
              </p>
              <p className="mt-2 text-lg text-muted-foreground">
                First posts are coming soon.
              </p>
            </div>
          </div>
        ) : null}
      </Section>

      {posts.length > 0 ? (
        <Section as="div" id="blog-posts">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={i * 60}>
                  <Link href={`/blogs/${post.slug}`} className="block h-full">
                    <Card>
                      <CardEyebrow>
                        {formatDate(post.date)} · {post.author}
                      </CardEyebrow>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </Card>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
