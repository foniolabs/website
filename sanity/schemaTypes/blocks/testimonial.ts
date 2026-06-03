import { CommentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonial",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      description:
        "One item renders as a featured quote; multiple items render as a carousel.",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required().max(500),
            }),
            defineField({
              name: "authorName",
              title: "Author name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "authorRole",
              title: "Author role / company",
              type: "string",
            }),
            defineField({
              name: "authorAvatar",
              title: "Author avatar",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ],
            }),
            defineField({
              name: "companyLogo",
              title: "Company logo",
              type: "image",
              fields: [
                defineField({ name: "alt", title: "Alt text", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "authorName",
              subtitle: "authorRole",
              media: "authorAvatar",
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Testimonials",
      subtitle: `${(items as unknown[] | undefined)?.length ?? 0} quote(s)`,
    }),
  },
});
