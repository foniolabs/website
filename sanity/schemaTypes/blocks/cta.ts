import { RocketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { variantChipInputComponents } from "../../components/VariantChipInput";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call-to-action",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      description: "Visual treatment.",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Accent", value: "accent" },
          { title: "Dark", value: "dark" },
        ],
      },
      components: variantChipInputComponents,
      initialValue: "default",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "ctaLink" })],
      validation: (rule) => rule.min(1).max(2),
    }),
  ],
  preview: {
    select: { title: "headline", tone: "tone" },
    prepare: ({ title, tone }) => ({
      title: title ?? "Call-to-action",
      subtitle: `CTA · ${tone ?? "default"}`,
    }),
  },
});
