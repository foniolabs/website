import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const logoCloudBlock = defineType({
  name: "logoCloudBlock",
  title: "Logo cloud",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description: "e.g. \"Trusted by\" or \"Powered by\".",
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "logo",
          fields: [
            defineField({
              name: "image",
              title: "Logo image",
              type: "image",
              description: "Use SVG or transparent PNG.",
              validation: (rule) => rule.required(),
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: "href",
              title: "Optional link",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "image.alt", media: "image" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "grayscale",
      title: "Render logos in grayscale",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", logos: "logos" },
    prepare: ({ title, logos }) => ({
      title: title ?? "Logo cloud",
      subtitle: `${(logos as unknown[] | undefined)?.length ?? 0} logo(s)`,
    }),
  },
});
