"use client";

import { Card, Stack, Text } from "@sanity/ui";
import type { ObjectInputProps } from "sanity";
import { useFormValue } from "sanity";

type SeoValue = {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
};

type DocLike = {
  _type?: string;
  title?: string;
  name?: string;
  slug?: { current?: string };
  excerpt?: string;
  tagline?: string;
  siteName?: string;
};

const PATH_PREFIX_BY_TYPE: Record<string, string> = {
  page: "/",
  post: "/blog/",
  product: "/products/",
};

const truncate = (s: string, n: number) =>
  s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;

export function SEOPreview(props: ObjectInputProps) {
  const seo = (props.value ?? {}) as SeoValue;
  const doc = useFormValue([]) as DocLike | undefined;

  const docTitle =
    doc?.title ?? doc?.name ?? doc?.siteName ?? "Untitled";
  const docExcerpt = doc?.excerpt ?? doc?.tagline ?? "";

  const previewTitle = seo.title?.trim() || docTitle;
  const previewDescription =
    seo.description?.trim() || docExcerpt || "";

  const pathPrefix = PATH_PREFIX_BY_TYPE[doc?._type ?? ""] ?? "/";
  const slug = doc?.slug?.current ?? "";
  const previewUrl =
    seo.canonical?.trim() ||
    `https://foniolabs.xyz${pathPrefix}${slug}`.replace(/\/+/g, "/");

  const titleForDisplay = truncate(previewTitle, 60);
  const descForDisplay = truncate(previewDescription, 158);

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} border>
        <Stack space={3}>
          <Text size={1} muted weight="semibold">
            Google snippet preview
          </Text>
          <div
            style={{
              fontFamily:
                "arial, sans-serif",
              maxWidth: 600,
              padding: "12px 16px",
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #ebebeb",
            }}
          >
            <div style={{ color: "#202124", fontSize: 14, marginBottom: 2 }}>
              {previewUrl}
            </div>
            <div
              style={{
                color: "#1a0dab",
                fontSize: 20,
                lineHeight: 1.3,
                marginBottom: 4,
              }}
            >
              {titleForDisplay}
            </div>
            <div style={{ color: "#4d5156", fontSize: 14, lineHeight: 1.45 }}>
              {descForDisplay || (
                <span style={{ fontStyle: "italic", color: "#9aa0a6" }}>
                  No description set — Google may auto-generate one.
                </span>
              )}
            </div>
            {seo.noIndex && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#c1361f",
                  fontWeight: 600,
                }}
              >
                noindex — this page will be hidden from search results.
              </div>
            )}
          </div>
          <Text size={1} muted>
            Title is shown up to ~60 characters, description up to ~158.
            Empty fields fall back to the document title and excerpt.
          </Text>
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  );
}

export const seoInputComponents = {
  input: SEOPreview,
} as const;
