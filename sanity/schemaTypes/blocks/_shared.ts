import { defineField, defineType } from "sanity";

// A reusable CTA link object used inside section blocks (hero, cta, etc.).
// Day 4's custom Studio components may swap href for a smarter input.
export const ctaLink = defineType({
  name: "ctaLink",
  title: "Call-to-action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL or path",
      type: "string",
      description:
        "Absolute URL (https://…) or site path starting with / (e.g. /contact).",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "Required";
          if (value.startsWith("/")) return true;
          if (/^https?:\/\//.test(value)) return true;
          return "Must start with / or http(s)://";
        }),
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Ghost (text link)", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "external",
      title: "Opens in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
