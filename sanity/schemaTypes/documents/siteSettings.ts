import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General" },
    { name: "seo", title: "SEO defaults" },
    { name: "integrations", title: "Integrations" },
    { name: "social", title: "Social" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
      initialValue: "Foniolabs",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "general",
      description: "Short descriptor used in <title> templates and OG fallback.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
      options: { hotspot: false },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
      description: "Square. Used as the browser tab icon.",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default social share image",
      type: "image",
      group: "seo",
      description:
        "Fallback for pages that don't set their own SEO ogImage. 1200×630.",
      options: { hotspot: true },
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
      description: "Used as fallback for any page that has no SEO of its own.",
    }),
    defineField({
      name: "ga4MeasurementId",
      title: "GA4 Measurement ID",
      type: "string",
      group: "integrations",
      description: "Format: G-XXXXXXXXXX",
      validation: (rule) =>
        rule.regex(/^G-[A-Z0-9]+$/, {
          name: "GA4 ID",
          invert: false,
        }).warning("Expected format: G-XXXXXXXXXX"),
    }),
    defineField({
      name: "hubspotPortalId",
      title: "HubSpot Portal ID",
      type: "string",
      group: "integrations",
      description: "Numeric portal ID from your HubSpot account (visible in the URL when logged in).",
    }),
    defineField({
      name: "hubspotRegion",
      title: "HubSpot region",
      type: "string",
      group: "integrations",
      description:
        "HubSpot's data center for this account. Check your HubSpot URL: app.hubspot.com → na1; app-eu1.hubspot.com → eu1; etc. Forms silently won't load with the wrong region.",
      options: {
        list: [
          { title: "na1 — North America (default)", value: "na1" },
          { title: "eu1 — Europe", value: "eu1" },
          { title: "ap1 — Asia Pacific", value: "ap1" },
          { title: "au1 — Australia", value: "au1" },
          { title: "ca1 — Canada", value: "ca1" },
          { title: "jp1 — Japan", value: "jp1" },
        ],
        layout: "dropdown",
      },
      initialValue: "na1",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "general",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "social",
      title: "Social profiles",
      type: "socialLinks",
      group: "social",
    }),
  ],
  preview: {
    select: { title: "siteName" },
    prepare: ({ title }) => ({ title: title ?? "Site Settings" }),
  },
});
