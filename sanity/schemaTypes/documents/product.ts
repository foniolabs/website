import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { slugInputComponents } from "../../components/SlugInput";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      components: slugInputComponents,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "One-line product positioning.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
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
              name: "icon",
              title: "Icon name",
              type: "string",
              description:
                "Name from react-icons (e.g. FiShield). Optional — the site falls back to a default if blank.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      group: "content",
      description: "Button text on the product page hero. e.g. \"Learn more\".",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
      group: "content",
      description: "Absolute URL or site path starting with /.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "content",
      description: "Lower numbers show first on the products index.",
      initialValue: 100,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "heroImage" },
  },
});
