import { groq } from "next-sanity";

// Shared projections — kept small and re-used so query shapes stay consistent.
const imageProjection = groq`{
  ...,
  asset->{ _id, url, metadata { dimensions, lqip } }
}`;

const seoProjection = groq`{
  title,
  description,
  canonical,
  noIndex,
  "ogImage": ogImage ${imageProjection}
}`;

const ctaLinkProjection = groq`{
  label,
  href,
  variant,
  external
}`;

const sectionProjection = groq`{
  _type,
  _key,
  ...,
  _type == "heroBlock" => {
    variant,
    eyebrow,
    headline,
    subheadline,
    "media": media{
      "image": image ${imageProjection},
      videoUrl,
      "posterImage": posterImage ${imageProjection}
    },
    "ctas": ctas[] ${ctaLinkProjection}
  },
  _type == "featureGridBlock" => {
    eyebrow,
    headline,
    intro,
    columns,
    "items": items[]{ icon, title, body, href }
  },
  _type == "richTextBlock" => {
    maxWidth,
    body
  },
  _type == "ctaBlock" => {
    tone,
    eyebrow,
    headline,
    body,
    "buttons": buttons[] ${ctaLinkProjection}
  },
  _type == "testimonialBlock" => {
    eyebrow,
    "items": items[]{
      quote,
      authorName,
      authorRole,
      "authorAvatar": authorAvatar ${imageProjection},
      "companyLogo": companyLogo ${imageProjection}
    }
  },
  _type == "logoCloudBlock" => {
    title,
    grayscale,
    "logos": logos[]{ "image": image ${imageProjection}, href }
  },
  _type == "embedHtmlBlock" => {
    label,
    html,
    aspectRatio
  },
  _type == "contactFormBlock" => {
    headline,
    body,
    hubspotFormId,
    portalIdOverride,
    redirectOnSuccess
  }
}`;

// ---- Singletons --------------------------------------------------------

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  "logo": logo ${imageProjection},
  "favicon": favicon ${imageProjection},
  "defaultOgImage": defaultOgImage ${imageProjection},
  "defaultSeo": defaultSeo ${seoProjection},
  ga4MeasurementId,
  hubspotPortalId,
  hubspotContactFormId,
  hubspotRegion,
  contactEmail,
  social
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  "headerLinks": headerLinks[]{ label, href, external },
  headerCta,
  "footerColumns": footerColumns[]{
    title,
    "links": links[]{ label, href, external }
  },
  footerBottomNote
}`;

// ---- Pages -------------------------------------------------------------

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  "hero": hero{
    eyebrow,
    headline,
    subheadline,
    "backgroundImage": backgroundImage ${imageProjection}
  },
  "sections": sections[] ${sectionProjection},
  "seo": seo ${seoProjection}
}`;

export const allPageSlugsQuery = groq`*[_type == "page" && defined(slug.current)][].slug.current`;

// ---- News (posts) -----------------------------------------------------

export const postsListQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  tags,
  "coverImage": coverImage ${imageProjection},
  "author": author->{
    name,
    role,
    "slug": slug.current,
    "avatar": avatar ${imageProjection}
  }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  tags,
  "coverImage": coverImage ${imageProjection},
  body,
  "author": author->{
    name,
    role,
    bio,
    "slug": slug.current,
    "avatar": avatar ${imageProjection},
    social
  },
  "seo": seo ${seoProjection}
}`;

export const allPostSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

// ---- Products ---------------------------------------------------------

export const productsListQuery = groq`*[_type == "product" && defined(slug.current)] | order(coalesce(order, 100) asc){
  _id,
  name,
  "slug": slug.current,
  tagline,
  "heroImage": heroImage ${imageProjection},
  order
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  "slug": slug.current,
  tagline,
  description,
  "heroImage": heroImage ${imageProjection},
  "features": features[]{ icon, title, body, href },
  ctaLabel,
  ctaUrl,
  "seo": seo ${seoProjection}
}`;

export const allProductSlugsQuery = groq`*[_type == "product" && defined(slug.current)][].slug.current`;

// ---- Team -------------------------------------------------------------

export const teamMembersQuery = groq`*[_type == "teamMember"] | order(coalesce(order, 100) asc){
  _id,
  name,
  role,
  bio,
  "slug": slug.current,
  "photo": photo ${imageProjection},
  social,
  order
}`;

// ---- Redirects (build-time consumer in Day 9) -------------------------

export const allRedirectsQuery = groq`*[_type == "redirect"]{
  from,
  to,
  statusCode
}`;
