import { MenuIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const navLink = defineField({
  name: "link",
  title: "Link",
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
        "Use an absolute URL (https://…) or a site path starting with / (e.g. /about).",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          if (value.startsWith("/")) return true;
          if (/^https?:\/\//.test(value)) return true;
          return "Must start with / or http(s)://";
        }),
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

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header links",
      type: "array",
      group: "header",
      of: [defineArrayMember(navLink)],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "headerCta",
      title: "Header call-to-action",
      type: "object",
      group: "header",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({
          name: "href",
          type: "string",
          title: "URL or path",
        }),
      ],
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "column",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [defineArrayMember(navLink)],
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${(links as unknown[] | undefined)?.length ?? 0} link(s)`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "footerBottomNote",
      title: "Footer bottom note",
      type: "string",
      group: "footer",
      description:
        "Small text at the very bottom of the footer (copyright, etc.). Year is appended automatically by the site.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Navigation" }),
  },
});
