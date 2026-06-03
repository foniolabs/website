"use client";

import { Card, Stack, Text } from "@sanity/ui";
import { useMemo } from "react";
import { useFormValue } from "sanity";

import { useImageUrl } from "./helpers/useImageUrl";

type DocLike = {
  _type?: string;
  title?: string;
  name?: string;
  siteName?: string;
  excerpt?: string;
  tagline?: string;
  seo?: { title?: string; description?: string };
};

const HOSTS_BY_TYPE: Record<string, string> = {
  page: "foniolabs.xyz",
  post: "foniolabs.xyz / News",
  product: "foniolabs.xyz / Products",
};

export function OGImagePreview(props: {
  // Loose typing so this works on both the seo.ogImage field input and
  // image-typed fields elsewhere — we only need renderDefault + value.
  renderDefault: (props: object) => React.ReactNode;
  value?: { asset?: { _ref?: string } };
}) {
  const doc = useFormValue([]) as DocLike | undefined;

  const customAssetUrl = useImageUrl(props.value?.asset?._ref);

  const seoTitle = doc?.seo?.title?.trim();
  const seoDescription = doc?.seo?.description?.trim();
  const docTitle = doc?.title ?? doc?.name ?? doc?.siteName ?? "Foniolabs";
  const docDescription = doc?.excerpt ?? doc?.tagline ?? "";

  const fallbackUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("title", seoTitle || docTitle);
    if (seoDescription || docDescription) {
      params.set("subtitle", seoDescription || docDescription);
    }
    params.set(
      "eyebrow",
      HOSTS_BY_TYPE[doc?._type ?? ""] ?? "foniolabs.xyz",
    );
    return `/api/og?${params.toString()}`;
  }, [docDescription, docTitle, doc?._type, seoDescription, seoTitle]);

  const displayUrl = customAssetUrl ?? fallbackUrl;
  const isFallback = !customAssetUrl;

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} border>
        <Stack space={3}>
          <Text size={1} muted weight="semibold">
            Social share preview {isFallback && "(auto-generated fallback)"}
          </Text>
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #ebebeb",
              aspectRatio: "1200 / 630",
              maxWidth: 600,
              background: "#0a0a0f",
            }}
          >
            {/* Native img so we never hit Next/Image config issues inside Studio. */}
            <img
              src={displayUrl}
              alt={
                isFallback
                  ? "Auto-generated OG image based on current doc copy"
                  : "Uploaded OG image"
              }
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              key={displayUrl}
            />
          </div>
          <Text size={1} muted>
            {isFallback
              ? "No image uploaded — the site will render this via /api/og at share time. Upload an image below to override."
              : "Uploaded image will be used as og:image. Recommended 1200×630."}
          </Text>
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  );
}

export const ogImageInputComponents = {
  input: OGImagePreview as unknown as (props: object) => React.ReactNode,
} as const;
