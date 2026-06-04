import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/image";

import { LiveStatsBlock } from "./blocks/LiveStatsBlock";
import { HubspotForm } from "./HubspotForm";
import { PortableText } from "./PortableText";

// Cross-section globals — currently the HubSpot Portal ID + region coming
// from siteSettings, used by ContactFormSection when a block doesn't
// override. Region matters: forms from an EU portal silently fail to load
// with the default na1 script.
type RenderGlobals = {
  hubspotPortalId?: string;
  hubspotRegion?: string;
};

// Day 5 ships *visually-rough* placeholders so editors can see each section
// type render with real data from Sanity. Day 6 swaps each branch out for
// the production components (Hero.tsx, Features.tsx, CTA.tsx, etc. — most
// already exist under app/components/ui/sections/ and just need their props
// wired through).

type SanityImage = {
  asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number }; lqip?: string } };
  alt?: string;
} | undefined;

const renderImage = (image: SanityImage, fallbackAlt = "") => {
  if (!image?.asset) return null;
  const builder = urlFor(image as never);
  const src = builder.width(1600).url();
  const dims = image.asset.metadata?.dimensions;
  return (
    <Image
      src={src}
      alt={image.alt ?? fallbackAlt}
      width={dims?.width ?? 1600}
      height={dims?.height ?? 900}
      placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={image.asset.metadata?.lqip}
      className="w-full h-auto rounded-xl"
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
    />
  );
};

const renderCtaLinks = (
  ctas: Array<{ label?: string; href?: string; variant?: string; external?: boolean }> | undefined,
) => {
  if (!ctas?.length) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {ctas.map((cta, i) => {
        const cls =
          cta.variant === "secondary"
            ? "border border-white/30 text-white hover:bg-white/10"
            : cta.variant === "ghost"
              ? "text-orange-400 hover:underline underline-offset-4"
              : "bg-orange-500 text-white hover:bg-orange-400";
        const inner = (
          <span className={`inline-block px-5 py-3 rounded-md text-sm font-semibold ${cls}`}>
            {cta.label ?? "Learn more"}
          </span>
        );
        if (!cta.href) return <span key={i}>{inner}</span>;
        return cta.external || cta.href.startsWith("http") ? (
          <a key={i} href={cta.href} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <Link key={i} href={cta.href}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
};

type Section = { _key?: string; _type?: string; [k: string]: unknown };

function HeroSection({ s }: { s: Section }) {
  const variant = (s.variant as string) ?? "centered";
  const media = s.media as { image?: SanityImage } | undefined;
  return (
    <section
      className={`relative py-20 px-6 md:px-12 ${
        variant === "videoBg" ? "bg-neutral-950 text-white" : ""
      }`}
    >
      <div className={`max-w-6xl mx-auto ${variant === "split" ? "grid md:grid-cols-2 gap-12 items-center" : "text-center"}`}>
        <div>
          {!!s.eyebrow && (
            <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-3">
              {s.eyebrow as string}
            </div>
          )}
          {!!s.headline && (
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              {s.headline as string}
            </h1>
          )}
          {!!s.subheadline && (
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {s.subheadline as string}
            </p>
          )}
          {renderCtaLinks(
            s.ctas as Array<{ label?: string; href?: string; variant?: string }>,
          )}
        </div>
        {variant === "split" && renderImage(media?.image, s.headline as string)}
      </div>
    </section>
  );
}

function FeatureGridSection({ s }: { s: Section }) {
  const cols = (s.columns as number) ?? 3;
  const items = (s.items as Array<{ title?: string; body?: string; href?: string; icon?: string }>) ?? [];
  const colsClass =
    cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {!!s.eyebrow && (
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 mb-2 text-center">
            {s.eyebrow as string}
          </div>
        )}
        {!!s.headline && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {s.headline as string}
          </h2>
        )}
        {!!s.intro && (
          <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
            {s.intro as string}
          </p>
        )}
        <div className={`grid gap-6 ${colsClass}`}>
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
            >
              {it.icon && (
                <div className="text-orange-500 font-mono text-sm mb-2">
                  {it.icon}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
              {it.body && (
                <p className="text-neutral-400 text-sm leading-relaxed">{it.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RichTextSection({ s }: { s: Section }) {
  const maxW = s.maxWidth === "wide" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section className="py-16 px-6 md:px-12">
      <div className={`${maxW} mx-auto prose prose-invert prose-headings:tracking-tight`}>
        <PortableText value={s.body as never} />
      </div>
    </section>
  );
}

function CtaSection({ s }: { s: Section }) {
  const tone = (s.tone as string) ?? "default";
  const bg =
    tone === "accent"
      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
      : tone === "dark"
        ? "bg-neutral-950 text-white"
        : "bg-neutral-900 text-white";
  return (
    <section className={`py-16 px-6 md:px-12 ${bg}`}>
      <div className="max-w-4xl mx-auto text-center">
        {!!s.eyebrow && (
          <div className="font-mono text-xs uppercase tracking-widest opacity-70 mb-3">
            {s.eyebrow as string}
          </div>
        )}
        {!!s.headline && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{s.headline as string}</h2>
        )}
        {!!s.body && <p className="opacity-80 max-w-2xl mx-auto">{s.body as string}</p>}
        {renderCtaLinks(
          s.buttons as Array<{ label?: string; href?: string; variant?: string }>,
        )}
      </div>
    </section>
  );
}

function TestimonialSection({ s }: { s: Section }) {
  const items =
    (s.items as Array<{
      quote?: string;
      authorName?: string;
      authorRole?: string;
      authorAvatar?: SanityImage;
    }>) ?? [];
  return (
    <section className="py-20 px-6 md:px-12 bg-neutral-950/50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <figure
            key={i}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
          >
            <blockquote className="text-neutral-200 leading-relaxed mb-4">
              “{it.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {it.authorAvatar?.asset && (
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  {renderImage(it.authorAvatar, it.authorName ?? "")}
                </div>
              )}
              <div>
                <div className="font-semibold text-sm">{it.authorName}</div>
                {it.authorRole && (
                  <div className="text-neutral-400 text-xs">{it.authorRole}</div>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function LogoCloudSection({ s }: { s: Section }) {
  const logos =
    (s.logos as Array<{ image?: SanityImage; href?: string }>) ?? [];
  const grayscale = (s.grayscale as boolean) ?? true;
  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {!!s.title && (
          <div className="text-center text-sm uppercase tracking-widest text-neutral-500 mb-8">
            {s.title as string}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((l, i) => {
            const img = (
              <div
                className={`h-10 w-auto ${grayscale ? "grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition" : ""}`}
              >
                {renderImage(l.image, "")}
              </div>
            );
            return l.href ? (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
                {img}
              </a>
            ) : (
              <div key={i}>{img}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EmbedHtmlSection({ s }: { s: Section }) {
  // NOTE: Day 6 wires server-side sanitisation before this renders raw HTML
  // into the page. Until then we render in a sandboxed iframe so an embed
  // can't escape its container.
  const html = (s.html as string) ?? "";
  const aspect = (s.aspectRatio as string) ?? "16/9";
  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div
          className="w-full overflow-hidden rounded-xl border border-neutral-800"
          style={{ aspectRatio: aspect === "auto" ? undefined : aspect }}
        >
          <iframe
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="w-full h-full"
            title={(s.label as string) ?? "Embedded content"}
          />
        </div>
      </div>
    </section>
  );
}

function ContactFormSection({
  s,
  globals,
}: {
  s: Section;
  globals?: RenderGlobals;
}) {
  const portalId =
    (s.portalIdOverride as string) ?? globals?.hubspotPortalId ?? "";
  const formId = (s.hubspotFormId as string) ?? "";
  const region = globals?.hubspotRegion ?? "na1";
  const redirectOnSuccess = s.redirectOnSuccess as string | undefined;
  return (
    <section className="py-20 px-6 md:px-12 bg-neutral-950/50">
      <div className="max-w-2xl mx-auto">
        <HubspotForm
          portalId={portalId}
          formId={formId}
          region={region}
          redirectUrl={redirectOnSuccess}
          headline={s.headline as string | undefined}
          body={s.body as string | undefined}
        />
      </div>
    </section>
  );
}

type SectionComponent = (props: {
  s: Section;
  globals?: RenderGlobals;
}) => React.ReactNode | Promise<React.ReactNode>;

const SECTION_RENDERERS: Record<string, SectionComponent> = {
  heroBlock: HeroSection,
  featureGridBlock: FeatureGridSection,
  richTextBlock: RichTextSection,
  ctaBlock: CtaSection,
  testimonialBlock: TestimonialSection,
  logoCloudBlock: LogoCloudSection,
  embedHtmlBlock: EmbedHtmlSection,
  contactFormBlock: ContactFormSection,
  liveStatsBlock: ({ s }) => <LiveStatsBlock s={s as never} />,
};

export function SectionRenderer({
  sections,
  globals,
}: {
  sections: Array<{ _type?: string; _key?: string } & Record<string, unknown>> | null | undefined;
  globals?: RenderGlobals;
}) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((s) => {
        const Cmp = SECTION_RENDERERS[s._type ?? ""];
        if (!Cmp) {
          return (
            <div
              key={s._key ?? Math.random()}
              className="px-6 py-4 text-xs font-mono text-neutral-500"
            >
              [unknown section type: {s._type ?? "?"}]
            </div>
          );
        }
        return (
          <Cmp
            key={s._key ?? Math.random()}
            s={s as Section}
            globals={globals}
          />
        );
      })}
    </>
  );
}
