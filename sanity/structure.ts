import type { StructureResolver } from "sanity/structure";

// Day 3 will replace this with a custom desk that groups singletons separately
// (siteSettings, navigation), surfaces News sorted by publishedAt desc, and
// pins the page builder.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items(S.documentTypeListItems());
