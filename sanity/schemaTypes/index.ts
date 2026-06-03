import type { SchemaTypeDefinition } from "sanity";

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

// Day 3 will add reusable section blocks (hero, featureGrid, richText, cta,
// testimonial, logoCloud, embedHtml, contactForm) and wire them into
// `page.sections`. Day 4 adds custom Studio components.
export const schemaTypes: SchemaTypeDefinition[] = [
  // Reusable objects (must come before documents that reference them)
  seo,
  socialLinks,

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
