import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostFrontmatter, PostMeta } from "@/lib/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string) {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as PostFrontmatter, content };
}

/** All post metadata, sorted newest first. Does not include MDX body. */
export function getAllPosts(): PostMeta[] {
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
    : [];

  const posts = files.map((filename) => {
    const { data, content } = readPostFile(filename);
    return {
      ...data,
      readingTime: readingTime(content).text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPosts(count = 2): PostMeta[] {
  return getAllPosts().slice(0, count);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}

/** Full post (metadata + raw MDX content) for a single slug. */
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
    : [];

  for (const filename of files) {
    const { data, content } = readPostFile(filename);
    if (data.slug === slug) {
      return {
        meta: { ...data, readingTime: readingTime(content).text },
        content,
      };
    }
  }
  return null;
}
