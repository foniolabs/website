import type { Metadata } from "next";

import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { teamMembersQuery } from "@/lib/sanity/queries";

import { TeamPageContent, type TeamMemberView } from "./TeamPageContent";

const TITLE = "Team";
const DESCRIPTION =
  "Meet the people building Fonio Labs — a remote-first team based in Nigeria, working across Web3, AI, and education technology.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(TITLE)}&subtitle=${encodeURIComponent(DESCRIPTION)}&eyebrow=${encodeURIComponent("foniolabs.xyz")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/team" },
  openGraph: {
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

type TeamMemberDoc = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  // After the GROQ `asset->` dereference (see imageProjection in queries.ts),
  // the asset has `_id` + `url`, not `_ref`. The old `._ref` check left every
  // member photo as `null` and rendered the letter-avatar fallback.
  photo?: { asset?: { _id?: string; url?: string } };
  social?: {
    github?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
    website?: string;
  };
  order?: number;
};

// Fallback used when the Sanity dataset has no teamMember docs yet
// (pre-migration state). Matches the founder data that used to be hardcoded
// in the JSX. Deleted once the migration is run and Sanity is canonical.
const FALLBACK: TeamMemberView[] = [
  {
    name: "Emmanuel Doji",
    role: "Founder & CEO",
    bio: "Software Engineer and Systems Analyst with a degree in MIS. Passionate about making Web3 and AI accessible to everyone through user-friendly tools and innovative solutions.",
    imageUrl: "/images/team/Founder.jpg",
    social: {
      github: "https://github.com/web3normad",
      linkedin: "https://ng.linkedin.com/in/emmanuel-doji",
      x: "https://x.com/emmanueldoji",
    },
  },
];

const toView = (m: TeamMemberDoc): TeamMemberView => ({
  name: m.name,
  role: m.role,
  bio: m.bio,
  imageUrl: m.photo?.asset?._id
    ? urlFor(m.photo as never).width(800).url()
    : null,
  social: m.social ?? {},
});

export default async function TeamPage() {
  const docs = await sanityFetch<TeamMemberDoc[]>({
    query: teamMembersQuery,
    tags: ["type:teamMember"],
  });
  const team = docs?.length ? docs.map(toView) : FALLBACK;
  return <TeamPageContent team={team} />;
}
