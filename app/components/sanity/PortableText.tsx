import {
  PortableText as BasePortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/image";

type InternalLinkRef = {
  reference?: { _type?: string; slug?: { current?: string } };
};

const PATH_PREFIX_BY_TYPE: Record<string, string> = {
  page: "/",
  post: "/blog/",
  product: "/products/",
  teamMember: "/team/",
};

const internalHref = (ref?: InternalLinkRef["reference"]) => {
  if (!ref?._type || !ref.slug?.current) return "#";
  const prefix = PATH_PREFIX_BY_TYPE[ref._type] ?? "/";
  return `${prefix}${ref.slug.current}`.replace(/\/+/g, "/");
};

const calloutToneStyles: Record<string, string> = {
  info: "border-blue-400 bg-blue-50 text-blue-900",
  success: "border-emerald-400 bg-emerald-50 text-emerald-900",
  warning: "border-amber-400 bg-amber-50 text-amber-900",
  danger: "border-red-400 bg-red-50 text-red-900",
};

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-semibold tracking-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-orange-500 pl-4 italic text-neutral-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-sm text-orange-300">
        {children}
      </code>
    ),
    underline: ({ children }) => <u>{children}</u>,
    "strike-through": ({ children }) => <s>{children}</s>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const external = !!value?.openInNewTab;
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-orange-400 underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => (
      <Link
        href={internalHref(value?.reference)}
        className="text-orange-400 underline-offset-4 hover:underline"
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const builder = urlFor(value);
      const src = builder.width(1200).url();
      const lqip = value.asset?.metadata?.lqip as string | undefined;
      const dims = value.asset?.metadata?.dimensions as
        | { width?: number; height?: number }
        | undefined;
      return (
        <figure className="my-8 flex flex-col items-center">
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={dims?.width ?? 1200}
            height={dims?.height ?? 800}
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            className="rounded-lg h-auto w-auto max-h-[420px]"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-neutral-400 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const tone = (value?.tone as string) ?? "info";
      const classes = calloutToneStyles[tone] ?? calloutToneStyles.info;
      return (
        <aside className={`my-6 rounded-lg border-l-4 p-4 ${classes}`}>
          {value?.title && (
            <div className="mb-1 font-semibold">{value.title}</div>
          )}
          <div className="text-sm leading-relaxed">{value?.body}</div>
        </aside>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm">
        {value?.language && (
          <div className="mb-2 text-xs uppercase tracking-wider text-neutral-500">
            {value.language}
          </div>
        )}
        <code className="font-mono text-neutral-100">{value?.code}</code>
      </pre>
    ),
  },
};

export function PortableText(
  props: Omit<PortableTextProps, "components"> & {
    components?: PortableTextComponents;
  },
) {
  return (
    <BasePortableText
      {...props}
      components={props.components ?? portableTextComponents}
    />
  );
}
