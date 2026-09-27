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
      name: "file",
      title: "Slides file",
      type: "file",
      description: "Upload the deck directly (PDF, PPTX, or Keynote export).",
      options: {
        accept:
          ".pdf,.ppt,.pptx,.key,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
    }),
    defineField({
      name: "url",
      title: "Slides link",
      type: "url",
      description:
        "Or link out instead, e.g. Google Slides — only needed if you're not uploading a file above.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      if (!doc?.file && !doc?.url) {
        return "Add either an uploaded file or a link.";
      }
      return true;
    }),
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
