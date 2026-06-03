import { TextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich text",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "maxWidth",
      title: "Reading width",
      type: "string",
      options: {
        list: [
          { title: "Narrow (prose)", value: "narrow" },
          { title: "Wide", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "narrow",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  defineField({
                    name: "reference",
                    title: "Document",
                    type: "reference",
                    to: [
                      { type: "page" },
                      { type: "post" },
                      { type: "product" },
                      { type: "teamMember" },
                    ],
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            defineField({
              name: "tone",
              title: "Tone",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Success", value: "success" },
                  { title: "Warning", value: "warning" },
                  { title: "Danger", value: "danger" },
                ],
                layout: "radio",
              },
              initialValue: "info",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body", tone: "tone" },
            prepare: ({ title, subtitle, tone }) => ({
              title: title ?? "Callout",
              subtitle: [tone, subtitle].filter(Boolean).join(" · "),
            }),
          },
        }),
        defineArrayMember({
          type: "object",
          name: "codeBlock",
          title: "Code",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              description:
                "Prism language hint (e.g. ts, tsx, bash, json, sql).",
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
              rows: 8,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { lang: "language", code: "code" },
            prepare: ({ lang, code }) => ({
              title: `Code · ${lang ?? "plain"}`,
              subtitle: (code as string | undefined)?.split("\n")[0] ?? "",
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { body: "body" },
    prepare: ({ body }) => {
      const blocks = (body as unknown[] | undefined) ?? [];
      return {
        title: "Rich text",
        subtitle: `${blocks.length} block(s)`,
      };
    },
  },
});
