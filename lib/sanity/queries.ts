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

/** All curriculum sessions, in teaching order. */
export const CURRICULUM_SESSIONS_QUERY = defineQuery(`
  *[_type == "curriculumSession"] | order(order asc) {
    _id,
    order,
    title,
    description
  }
`);

/** Posted meeting slide decks, most recent meeting first. */
export const MEETING_SLIDES_QUERY = defineQuery(`
  *[_type == "meetingSlides" && defined(url)] | order(date desc) {
    _id,
    title,
    date,
    url
  }
`);
