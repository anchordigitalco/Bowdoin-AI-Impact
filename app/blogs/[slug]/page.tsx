import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Section } from "@/components/ui/Section";
import { client } from "@/lib/sanity/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { formatDate } from "@/lib/utils";

const options = { next: { revalidate: 60 } };

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POST_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client
    .withConfig({ useCdn: false })
    .fetch(POST_QUERY, { slug }, { next: { revalidate: 60 } });

  if (!post) return {};

  return {
    title: post.title ?? undefined,
    description: post.excerpt ?? undefined,
  };
}

// Sora (body font) throughout, never Michroma — Portable Text headings
// are body copy the same way the rest of the post is, not a hero
// headline or section eyebrow.
const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold text-balance">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-balance">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-border pl-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mt-6 leading-relaxed">{children}</p>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <span className="mt-8 block">
          <Image
            src={urlFor(value).width(1200).fit("max").auto("format").url()}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            className="h-auto w-full rounded-[var(--radius)]"
          />
        </span>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="underline decoration-muted-foreground/50 underline-offset-2 hover:decoration-foreground"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug }, options);

  if (!post) return notFound();

  return (
    <Section as="article" id="post" className="pt-6 sm:pt-10">
      <Link
        href="/blogs"
        className="group mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to blog
      </Link>

      <header className="max-w-2xl">
        <p className="font-display text-xs leading-[1.3] tracking-[0.12em] text-muted-foreground uppercase">
          {post.publishedAt ? formatDate(post.publishedAt.slice(0, 10)) : null}
          {post.publishedAt && post.author ? " · " : null}
          {post.author}
          {post.authorRole ? `, ${post.authorRole}` : null}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.15] tracking-[-0.01em] text-balance">
          {post.title}
        </h1>
      </header>

      {post.coverImage?.asset ? (
        <Image
          src={urlFor(post.coverImage).width(1600).height(900).fit("crop").auto("format").url()}
          alt={post.coverImage.alt ?? ""}
          width={1600}
          height={900}
          priority
          className="mt-8 h-auto w-full rounded-[var(--radius)]"
        />
      ) : null}

      <div className="mt-8 max-w-2xl text-lg text-pretty">
        {post.body ? (
          <PortableText value={post.body} components={portableTextComponents} />
        ) : null}
      </div>
    </Section>
  );
}
