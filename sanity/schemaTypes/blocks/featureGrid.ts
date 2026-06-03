import { ThLargeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const featureGridBlock = defineType({
  name: "featureGridBlock",
  title: "Feature grid",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "headline",
      title: "Section headline",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { title: "2 columns", value: 2 },
          { title: "3 columns", value: 3 },
          { title: "4 columns", value: 4 },
        ],
        layout: "radio",
      },
      initialValue: 3,
      validation: (rule) => rule.required().integer().min(2).max(4),
    }),
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "icon",
              title: "Icon name",
              type: "string",
              description:
                "react-icons name (e.g. FiShield) — or leave blank for a default.",
            }),
            defineField({
              name: "title",
              title: "Title",
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
              name: "href",
              title: "Optional link",
              type: "string",
              description: "Absolute URL or site path starting with /.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "headline",
      items: "items",
      columns: "columns",
    },
    prepare: ({ title, items, columns }) => {
      const count = (items as unknown[] | undefined)?.length ?? 0;
      return {
        title: title ?? "Feature grid",
        subtitle: `Feature grid · ${count} item(s), ${columns ?? 3} col`,
      };
    },
  },
});
