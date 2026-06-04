import type { SchemaTypeDefinition } from "sanity";

import { contactFormBlock } from "./blocks/contactForm";
import { ctaBlock } from "./blocks/cta";
import { embedHtmlBlock } from "./blocks/embedHtml";
import { featureGridBlock } from "./blocks/featureGrid";
import { heroBlock } from "./blocks/hero";
import { liveStatsBlock } from "./blocks/liveStats";
import { logoCloudBlock } from "./blocks/logoCloud";
import { richTextBlock } from "./blocks/richText";
import { testimonialBlock } from "./blocks/testimonial";
import { ctaLink } from "./blocks/_shared";
import { author } from "./documents/author";
import { navigation } from "./documents/navigation";
import { page } from "./documents/page";
import { post } from "./documents/post";
import { product } from "./documents/product";
import { redirect } from "./documents/redirect";
import { siteSettings } from "./documents/siteSettings";
import { teamMember } from "./documents/teamMember";
import { seo } from "./objects/seo";
import { socialLinks } from "./objects/socialLinks";

// Order matters: any type referenced by another (objects, shared link types,
// block members) must be registered before the type that references it.
// Day 4 adds custom Studio components (SlugInput, ColorVariantInput, SEOPreview,
// OGImagePreview) and the presentation tool.
export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable objects
  seo,
  socialLinks,
  ctaLink,

  // Section blocks (used inside page.sections)
  heroBlock,
  featureGridBlock,
  richTextBlock,
  ctaBlock,
  testimonialBlock,
  logoCloudBlock,
  embedHtmlBlock,
  contactFormBlock,
  liveStatsBlock,

  // Singletons
  siteSettings,
  navigation,

  // Content documents
  page,
  post,
  author,
  product,
  teamMember,
  redirect,
];
