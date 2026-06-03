import { CodeBlockIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const embedHtmlBlock = defineType({
  name: "embedHtmlBlock",
  title: "HTML embed",
  type: "object",
  icon: CodeBlockIcon,
  description:
    "Escape hatch for one-off iframes / third-party widgets. Only available to users with the 'editor' role or above — the site sanitises render-time.",
  fields: [
    defineField({
      name: "label",
      title: "Internal label",
      type: "string",
      description:
        "What this embed is — only shown in Studio. e.g. \"Grafana stats dashboard\".",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "html",
      title: "HTML",
      type: "text",
      rows: 10,
      description:
        "Pasted markup or <iframe>. Day 6 strips dangerous tags at render-time.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
      description:
        "Optional CSS aspect-ratio for responsive iframes (e.g. 16/9, 4/3).",
      options: {
        list: [
          { title: "16:9", value: "16/9" },
          { title: "4:3", value: "4/3" },
          { title: "1:1", value: "1/1" },
          { title: "Auto (intrinsic)", value: "auto" },
        ],
        layout: "radio",
      },
      initialValue: "16/9",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "aspectRatio" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "HTML embed",
      subtitle: subtitle ? `Embed · ${subtitle}` : "Embed",
    }),
  },
});
