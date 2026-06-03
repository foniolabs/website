import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description:
        "Overrides the document title in <title> and og:title. Aim for 50–60 characters.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "Aim for 140–160 characters. Used for meta + og:description.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      description:
        "1200×630 recommended. Falls back to the site default OG image set in Site Settings.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "canonical",
      title: "Canonical URL",
      type: "url",
      description:
        "Use only if this content also lives at another URL and should not compete for ranking.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "If on, emits <meta name=\"robots\" content=\"noindex\">.",
      initialValue: false,
    }),
  ],
});
