import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactFormBlock = defineType({
  name: "contactFormBlock",
  title: "Contact form",
  type: "object",
  icon: EnvelopeIcon,
  description:
    "Embeds a HubSpot form. Portal ID falls back to Site Settings → HubSpot Portal ID.",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hubspotFormId",
      title: "HubSpot form ID",
      type: "string",
      description:
        "GUID of the HubSpot form (e.g. \"abc12345-…\"). Find it in HubSpot → Forms → form URL.",
      validation: (rule) =>
        rule
          .required()
          .regex(
            /^[a-f0-9-]{20,}$/i,
            { name: "HubSpot form ID" },
          )
          .warning("Expected a GUID-like value."),
    }),
    defineField({
      name: "portalIdOverride",
      title: "Portal ID override",
      type: "string",
      description:
        "Only set this if the form lives in a different HubSpot portal than the site default.",
    }),
    defineField({
      name: "redirectOnSuccess",
      title: "Redirect on success",
      type: "string",
      description:
        "Optional path/URL to send the visitor to after successful submission.",
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "hubspotFormId" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Contact form",
      subtitle: subtitle ? `HubSpot · ${subtitle}` : "HubSpot form",
    }),
  },
});
