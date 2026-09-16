import { defineQuery } from "next-sanity";

/** Blog index — everything the cards need, nothing else. */
export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    authorRole,
    publishedAt,
    tags,
    coverImage
  }
`);

/** One post, by slug — everything the index gives plus the body. */
export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    authorRole,
    publishedAt,
    tags,
    coverImage,
    body
  }
`);

/** Slugs only, for generateStaticParams. */
export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);
