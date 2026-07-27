import {
  CogIcon,
  DocumentsIcon,
  DocumentTextIcon,
  MenuIcon,
  PackageIcon,
  TransferIcon,
  UserIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// Custom desk:
//  - Singletons (Site Settings, Navigation) pinned at the top.
//  - Blog defaults to publishedAt desc so editors land on the latest.
//  - Other content types each get their own list item with a custom icon so
//    the rail reads as a content map, not a flat alphabetised dump.
//  - Day 4's presentation tool will sit beside this in the tool bar.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .icon(CogIcon)
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(
          S.editor()
            .id("navigation")
            .schemaType("navigation")
            .documentId("navigation"),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .icon(DocumentsIcon)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Blog")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Products")
        .icon(PackageIcon)
        .schemaType("product")
        .child(
          S.documentTypeList("product")
            .title("Products")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .schemaType("teamMember")
        .child(
          S.documentTypeList("teamMember")
            .title("Team")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("Authors")
        .icon(UserIcon)
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
      S.divider(),
      S.listItem()
        .title("Redirects")
        .icon(TransferIcon)
        .schemaType("redirect")
        .child(S.documentTypeList("redirect").title("Redirects")),
    ]);
