import { DocumentsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description:
        "URL path (without leading slash). The home page should use the slug \"home\".",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "content",
      description:
        "Optional. Page-level hero. Day 3 introduces a richer reusable Hero block; this stays for simple pages that don't compose from sections.",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "backgroundImage",
          title: "Background image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      group: "content",
      description:
        "Compose the page from reusable sections. Drag to reorder. Each section is an inline block, not a reference — copies are page-specific.",
      of: [
        defineArrayMember({ type: "heroBlock" }),
        defineArrayMember({ type: "featureGridBlock" }),
        defineArrayMember({ type: "richTextBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
        defineArrayMember({ type: "testimonialBlock" }),
        defineArrayMember({ type: "logoCloudBlock" }),
        defineArrayMember({ type: "embedHtmlBlock" }),
        defineArrayMember({ type: "contactFormBlock" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/${slug}` : undefined,
    }),
  },
});
