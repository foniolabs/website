import { BarChartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const liveStatsBlock = defineType({
  name: "liveStatsBlock",
  title: "Live stats",
  type: "object",
  icon: BarChartIcon,
  description:
    "Real-time numbers (GitHub stars, npm downloads, custom JSON, static values). Editor picks the metrics, the page server-renders them with ISR.",
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
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "2 columns", value: "grid-2" },
          { title: "3 columns", value: "grid-3" },
          { title: "4 columns", value: "grid-4" },
        ],
        layout: "radio",
      },
      initialValue: "grid-3",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      validation: (rule) => rule.min(1).max(8),
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. 'GitHub stars', 'Weekly npm downloads', 'Founded'.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "source",
              title: "Data source",
              type: "string",
              options: {
                list: [
                  { title: "GitHub repo", value: "github" },
                  { title: "npm package", value: "npm" },
                  { title: "Static value", value: "static" },
                ],
                layout: "radio",
              },
              initialValue: "github",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "githubRepo",
              title: "GitHub repo",
              type: "string",
              description: "owner/name — e.g. 'foniolabs/website'.",
              hidden: ({ parent }) => parent?.source !== "github",
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const source = (ctx.parent as { source?: string } | undefined)?.source;
                  if (source !== "github") return true;
                  if (!value) return "Required for GitHub source.";
                  return /^[^/]+\/[^/]+$/.test(value as string)
                    ? true
                    : "Use the form 'owner/name'.";
                }),
            }),
            defineField({
              name: "githubMetric",
              title: "GitHub metric",
              type: "string",
              options: {
                list: [
                  { title: "Stars", value: "stars" },
                  { title: "Forks", value: "forks" },
                  { title: "Open issues", value: "openIssues" },
                  { title: "Watchers", value: "watchers" },
                ],
              },
              initialValue: "stars",
              hidden: ({ parent }) => parent?.source !== "github",
            }),
            defineField({
              name: "npmPackage",
              title: "npm package name",
              type: "string",
              description: "e.g. 'next', 'sanity'.",
              hidden: ({ parent }) => parent?.source !== "npm",
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const source = (ctx.parent as { source?: string } | undefined)?.source;
                  if (source !== "npm") return true;
                  return value ? true : "Required for npm source.";
                }),
            }),
            defineField({
              name: "npmMetric",
              title: "npm metric",
              type: "string",
              options: {
                list: [
                  { title: "Downloads, last week", value: "weekly" },
                  { title: "Downloads, last month", value: "monthly" },
                ],
              },
              initialValue: "weekly",
              hidden: ({ parent }) => parent?.source !== "npm",
            }),
            defineField({
              name: "staticValue",
              title: "Static value",
              type: "string",
              description: "Used as-is. e.g. '2024', '99.9%'.",
              hidden: ({ parent }) => parent?.source !== "static",
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const source = (ctx.parent as { source?: string } | undefined)?.source;
                  if (source !== "static") return true;
                  return value ? true : "Required for static source.";
                }),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "Appended to the number. e.g. '+', '%', 'k'.",
            }),
            defineField({
              name: "fallback",
              title: "Fallback value",
              type: "string",
              description:
                "Shown verbatim if the upstream API fails. e.g. '1k+'. If empty, the section is hidden on failure.",
            }),
          ],
          preview: {
            select: {
              label: "label",
              source: "source",
              githubRepo: "githubRepo",
              githubMetric: "githubMetric",
              npmPackage: "npmPackage",
              staticValue: "staticValue",
            },
            prepare: ({
              label,
              source,
              githubRepo,
              githubMetric,
              npmPackage,
              staticValue,
            }) => {
              const detail =
                source === "github"
                  ? `${githubRepo ?? "?"} · ${githubMetric ?? "stars"}`
                  : source === "npm"
                    ? `${npmPackage ?? "?"} · downloads`
                    : source === "static"
                      ? staticValue ?? "?"
                      : "?";
              return {
                title: label ?? "(unlabelled metric)",
                subtitle: `${source ?? "?"} · ${detail}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "revalidateSeconds",
      title: "Refresh interval (seconds)",
      type: "number",
      description:
        "How often to re-fetch upstream data. Default 3600 (1 hour). Lower this only if the data changes faster than that — rate limits on free APIs are real.",
      initialValue: 3600,
      validation: (rule) => rule.min(60).max(86400),
    }),
    defineField({
      name: "showAsOf",
      title: "Show 'as of' timestamp",
      type: "boolean",
      description: "Display when the numbers were last fetched.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "headline",
      metrics: "metrics",
      layout: "layout",
    },
    prepare: ({ title, metrics, layout }) => {
      const count = (metrics as unknown[] | undefined)?.length ?? 0;
      return {
        title: title ?? "Live stats",
        subtitle: `Live stats · ${count} metric(s) · ${layout ?? "grid-3"}`,
      };
    },
  },
});
