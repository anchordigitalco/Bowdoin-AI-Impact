import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons/Book";

// One of the semester's seven teaching sessions — shown on the home
// page teaser (first three) and the full Curriculum page carousel.
// Was hardcoded in data/curriculum.ts; moved here so the list can
// change mid-semester without a code deploy, and so real per-session
// dates (data/academicCalendar.ts, matched by `order`) keep working.
export const curriculumSession = defineType({
  name: "curriculumSession",
  title: "Curriculum Session",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "order",
      title: "Session number",
      type: "number",
      description: "1-indexed. Matches the sessionOrder used in the academic calendar schedule.",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One-line description shown on the session card.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Session number",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", order: "order" },
    prepare({ title, order }) {
      return { title: `${order}. ${title}` };
    },
  },
});
