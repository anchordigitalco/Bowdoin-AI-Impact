import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

// The club's blog — short pieces from leadership on what they're
// reading, testing, or teaching. Field names mirror the site's old
// local-MDX post shape (title/slug/excerpt/author/authorRole/tags) so
// the frontend port stays close to what it already expected; the one
// real upgrade is `body` moving from MDX to Portable Text, and
// `publishedAt` replacing the old date-only string with a real
// datetime. `author` stays a plain string rather than a reference —
// this is a small club blog with a handful of known writers, not a
// multi-author publication that needs its own Author document type.
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Shows on the blog index card. Keep it short.",
      validation: (rule) =>
        rule
          .required()
          .max(240)
          .warning("Keep excerpts short — they show on the blog index cards."),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Important for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorRole",
      title: "Author role",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternative text", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published date, new first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", author: "author", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author, media };
    },
  },
});
