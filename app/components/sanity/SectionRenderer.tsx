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

// Each *Section renderer matches the site's light-theme design language —
// white sections, gray-bordered cards, blue accents — so editor-composed
// pages visually belong with the hardcoded AboutPageContent / TeamPageContent
// / ProductsPageContent that haven't (yet) been migrated to Sanity sections.
// Dark variants (hero videoBg, cta tone=dark) opt in via the section data.

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
  opts: { dark?: boolean } = {},
) => {
  if (!ctas?.length) return null;
  const { dark = false } = opts;
  return (
    <div className="flex flex-wrap gap-4 mt-8 justify-center">
      {ctas.map((cta, i) => {
        // Site design language (see TeamPageContent / ProductsPageContent /
        // AboutPageContent): .btn-primary is blue/primary; secondary is an
        // outlined button whose colour flips depending on the background.
        const isPrimary = !cta.variant || cta.variant === "primary";
        const isGhost = cta.variant === "ghost";
        const cls = isGhost
          ? dark
            ? "text-blue-300 font-semibold hover:underline underline-offset-4"
            : "text-blue-600 font-semibold hover:underline underline-offset-4"
          : isPrimary
            ? "btn-primary text-lg"
            : dark
              ? "btn-outline text-lg"
              : "px-8 py-3 border-2 border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300";
        const inner = isGhost ? (
          <span className={cls}>{cta.label ?? "Learn more"}</span>
        ) : (
          <button className={cls} type="button">
            {cta.label ?? "Learn more"}
          </button>
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
  const dark = variant === "videoBg";
  return (
    <section
      className="relative py-32 px-6 md:px-12 lg:px-20"
      style={dark ? { background: "#0b0f1a" } : undefined}
    >
      <div className={`max-w-6xl mx-auto ${variant === "split" ? "grid md:grid-cols-2 gap-12 items-center" : "text-center"}`}>
        <div>
          {!!s.eyebrow && (
            <div className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full mb-8 border ${dark ? "bg-blue-600/20 border-blue-500/30" : "bg-blue-50 border-blue-200"}`}>
              <span className={`font-mono text-sm font-semibold tracking-wider ${dark ? "text-blue-300" : "text-blue-600"}`}>
                {s.eyebrow as string}
              </span>
            </div>
          )}
          {!!s.headline && (
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
              {s.headline as string}
            </h1>
          )}
          {!!s.subheadline && (
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`}>
              {s.subheadline as string}
            </p>
          )}
          {renderCtaLinks(
            s.ctas as Array<{ label?: string; href?: string; variant?: string }>,
            { dark },
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
    cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {Boolean(s.eyebrow || s.headline || s.intro) && (
          <div className="text-center mb-20">
            {!!s.eyebrow && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 backdrop-blur-sm rounded-full mb-8 border border-blue-200">
                <span className="font-mono text-sm font-semibold tracking-wider text-blue-600">
                  {s.eyebrow as string}
                </span>
              </div>
            )}
            {!!s.headline && (
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {s.headline as string}
              </h2>
            )}
            {!!s.intro && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {s.intro as string}
              </p>
            )}
          </div>
        )}
        <div className={`grid gap-8 ${colsClass}`}>
          {items.map((it, i) => {
            const card = (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 h-full">
                {it.icon && (
                  <div className="text-blue-600 font-mono text-sm font-semibold tracking-wider uppercase mb-3">
                    {it.icon}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{it.title}</h3>
                {it.body && (
                  <p className="text-gray-600 leading-relaxed">{it.body}</p>
                )}
              </div>
            );
            return it.href ? (
              <Link key={i} href={it.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RichTextSection({ s }: { s: Section }) {
  const maxW = s.maxWidth === "wide" ? "max-w-5xl" : "max-w-3xl";
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div
        className={`${maxW} mx-auto prose prose-lg prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600`}
      >
        <PortableText value={s.body as never} />
      </div>
    </section>
  );
}

function CtaSection({ s }: { s: Section }) {
  const tone = (s.tone as string) ?? "default";
  const dark = tone === "dark" || tone === "accent";
  // accent: blue gradient ramp; dark: matches the site's #0b0f1a hero
  // background; default: light bg-gray-50 strip used between white sections.
  const sectionStyle =
    tone === "accent"
      ? { background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }
      : tone === "dark"
        ? { background: "#0b0f1a" }
        : undefined;
  const sectionClass =
    tone === "default"
      ? "py-32 px-6 md:px-12 lg:px-20 bg-gray-50"
      : "py-32 px-6 md:px-12 lg:px-20";
  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="max-w-4xl mx-auto text-center">
        {!!s.eyebrow && (
          <div className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full mb-8 border ${dark ? "bg-white/10 border-white/20" : "bg-blue-50 border-blue-200"}`}>
            <span className={`font-mono text-sm font-semibold tracking-wider ${dark ? "text-blue-200" : "text-blue-600"}`}>
              {s.eyebrow as string}
            </span>
          </div>
        )}
        {!!s.headline && (
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${dark ? "text-white" : "text-gray-900"}`}>
            {s.headline as string}
          </h2>
        )}
        {!!s.body && (
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {s.body as string}
          </p>
        )}
        {renderCtaLinks(
          s.buttons as Array<{ label?: string; href?: string; variant?: string }>,
          { dark },
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
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <figure
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
              “{it.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {it.authorAvatar?.asset && (
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  {renderImage(it.authorAvatar, it.authorName ?? "")}
                </div>
              )}
              <div>
                <div className="font-semibold text-gray-900">{it.authorName}</div>
                {it.authorRole && (
                  <div className="text-gray-500 text-sm">{it.authorRole}</div>
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
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {!!s.title && (
          <div className="text-center text-sm uppercase tracking-widest text-gray-500 mb-12 font-mono font-semibold">
            {s.title as string}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {logos.map((l, i) => {
            const img = (
              <div
                className={`h-12 w-auto ${grayscale ? "grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition" : ""}`}
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
  // Sandboxed iframe so a third-party embed can't escape its container.
  const html = (s.html as string) ?? "";
  const aspect = (s.aspectRatio as string) ?? "16/9";
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div
          className="w-full overflow-hidden rounded-2xl border border-gray-200"
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
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
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
      {sections.map((s, i) => {
        const Cmp = SECTION_RENDERERS[s._type ?? ""];
        if (!Cmp) {
          return (
            <div
              key={s._key ?? `unknown-${i}`}
              className="px-6 py-4 text-xs font-mono text-gray-500"
            >
              [unknown section type: {s._type ?? "?"}]
            </div>
          );
        }
        return (
          <Cmp
            key={s._key ?? `section-${i}`}
            s={s as Section}
            globals={globals}
          />
        );
      })}
    </>
  );
}
