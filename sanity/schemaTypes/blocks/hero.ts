import { StarIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      description:
        "How the hero is rendered. Day 4 replaces this with a visual ColorVariantInput-style picker.",
      options: {
        list: [
          { title: "Split — text left, media right", value: "split" },
          { title: "Centered — text + CTA stack", value: "centered" },
          { title: "Video background — full-bleed", value: "videoBg" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the headline.",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "object",
      description:
        "Image is used for split / centered layouts. Video URL is used for the videoBg variant.",
      fields: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
        defineField({
          name: "videoUrl",
          title: "Video URL (MP4 or HLS)",
          type: "url",
          description: "Required for the videoBg variant.",
        }),
        defineField({
          name: "posterImage",
          title: "Video poster",
          type: "image",
          description: "Shown while the video loads.",
        }),
      ],
    }),
    defineField({
      name: "ctas",
      title: "Call-to-action buttons",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    select: { title: "headline", variant: "variant", media: "media.image" },
    prepare: ({ title, variant, media }) => ({
      title: title ?? "Hero",
      subtitle: `Hero · ${variant ?? "centered"}`,
      media,
    }),
  },
});
