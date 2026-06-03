import { TransferIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon: TransferIcon,
  description:
    "Day 9 reads these at build time and emits next.config redirects to preserve SEO.",
  fields: [
    defineField({
      name: "from",
      title: "From",
      type: "string",
      description: "Old path, starting with /. Example: /old-products",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "Required";
          if (!value.startsWith("/")) return "Must start with /";
          return true;
        }),
    }),
    defineField({
      name: "to",
      title: "To",
      type: "string",
      description:
        "New path (/new-products) or absolute URL (https://example.com).",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "Required";
          if (value.startsWith("/")) return true;
          if (/^https?:\/\//.test(value)) return true;
          return "Must start with / or http(s)://";
        }),
    }),
    defineField({
      name: "statusCode",
      title: "Status code",
      type: "number",
      description:
        "301 = permanent (preserves SEO ranking). 302 = temporary.",
      options: {
        list: [
          { title: "301 — Permanent", value: 301 },
          { title: "302 — Temporary", value: 302 },
        ],
        layout: "radio",
      },
      initialValue: 301,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Internal note",
      type: "string",
      description: "Optional reminder of why this redirect exists.",
    }),
  ],
  preview: {
    select: { title: "from", subtitle: "to", code: "statusCode" },
    prepare: ({ title, subtitle, code }) => ({
      title: `${title}  →  ${subtitle ?? ""}`,
      subtitle: code ? `${code}` : undefined,
    }),
  },
});
