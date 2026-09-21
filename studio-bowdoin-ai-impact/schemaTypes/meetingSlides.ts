import { defineField, defineType } from "sanity";
import { PresentationIcon } from "@sanity/icons/Presentation";

// The slide deck from a given week's meeting, posted afterward for
// anyone who missed it. Separate from curriculumSession (the planned
// teaching topic) since a real meeting's slides don't always map
// 1:1 to a single planned session — Speaker Sphere weeks, for one,
// replace the session block entirely but still get slides.
export const meetingSlides = defineType({
  name: "meetingSlides",
  title: "Meeting Slides",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'What the meeting covered, e.g. "Week 1: AI on the Job".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Meeting date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Slides link",
      type: "url",
      description: "Google Slides, a PDF export, or similar — wherever the deck actually lives.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
  ],
  orderings: [
    {
      title: "Meeting date, new first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date" },
    prepare({ title, date }) {
      return { title, subtitle: date };
    },
  },
});
