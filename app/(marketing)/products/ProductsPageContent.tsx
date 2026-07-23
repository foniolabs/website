"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { PageHero } from "@/app/components/ui/sections/PageHero";
import { PageCTA, CTAPrimaryButton, CTASecondaryButton } from "@/app/components/ui/sections/PageCTA";

export type ProductView = {
  slug: string | null;
  name: string;
  tag: string;
  color: string;
  description: string;
  features: string[];
  status: string;
};

// Line-art "app window" illustration tinted with the product's accent color.
function ProductArt({ color, initial }: { color: string; initial: string }) {
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto max-w-[420px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      {/* soft shadow */}
      <ellipse cx="180" cy="236" rx="120" ry="16" fill={color} opacity="0.10" />
      {/* back card */}
      <rect x="70" y="34" width="240" height="150" rx="16" fill="#ffffff" stroke={color} strokeWidth="2" opacity="0.35" />
      {/* main window */}
      <rect x="40" y="60" width="240" height="150" rx="16" fill="#ffffff" stroke={color} strokeWidth="2.5" />
      {/* title bar dots */}
      <circle cx="60" cy="80" r="4" fill={color} />
      <circle cx="76" cy="80" r="4" fill={color} opacity="0.5" />
      <circle cx="92" cy="80" r="4" fill={color} opacity="0.3" />
      {/* accent tile with initial */}
      <rect x="56" y="100" width="52" height="52" rx="12" fill={color} />
      <text x="82" y="134" textAnchor="middle" fontSize="26" fontWeight="700" fill="#ffffff" fontFamily="system-ui, sans-serif">{initial}</text>
      {/* content lines */}
      <line x1="124" y1="110" x2="256" y2="110" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="124" y1="124" x2="224" y2="124" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <line x1="124" y1="138" x2="240" y2="138" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      {/* mini bar chart */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={64 + i * 22} y={186 - [16, 30, 22, 38][i]} width="12" height={[16, 30, 22, 38][i]} rx="3" fill={color} opacity={i === 3 ? 1 : 0.4} />
      ))}
      {/* floating pill card */}
      <g>
        <rect x="212" y="150" width="118" height="46" rx="12" fill="#ffffff" stroke={color} strokeWidth="2.5" />
        <circle cx="234" cy="173" r="11" stroke={color} strokeWidth="2.5" fill="none" />
        <path d="M229 173 l4 4 l7 -8" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="252" y1="168" x2="318" y2="168" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="252" y1="180" x2="300" y2="180" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      </g>
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const tone = s === "live"
    ? { dot: "#10b981", bg: "rgba(16,185,129,0.1)", text: "#047857" }
    : s.includes("develop")
      ? { dot: "#f59e0b", bg: "rgba(245,158,11,0.12)", text: "#b45309" }
      : { dot: "#6b7280", bg: "rgba(107,114,128,0.12)", text: "#374151" };
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold" style={{ background: tone.bg, color: tone.text }}>
      <span className="w-2 h-2 rounded-full" style={{ background: tone.dot }} />
      {status}
    </div>
  );
}

export function ProductsPageContent({ products }: { products: ProductView[] }) {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Our Products"
        title={<>Products that <span className="text-gradient">change industries</span></>}
        subtitle="We build products designed to solve real problems and create lasting impact — starting with Skoolbox, our offline-first AI learning platform."
      />

      {/* Products Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-20">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                className="grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: product.color }}
                    />
                    <span
                      className="text-sm font-mono font-semibold tracking-wider uppercase"
                      style={{ color: product.color }}
                    >
                      {product.tag}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {product.slug ? (
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                    ) : (
                      product.name
                    )}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-4 py-2 rounded-full text-sm font-medium"
                        style={{
                          background: `${product.color}15`,
                          color: product.color,
                          border: `1px solid ${product.color}30`,
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <StatusBadge status={product.status} />
                  {product.slug && (
                    <div className="mt-6">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-block text-blue-600 font-semibold hover:underline underline-offset-4"
                      >
                        Learn more →
                      </Link>
                    </div>
                  )}
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div
                    className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}18 0%, ${product.color}06 100%)`,
                      border: `1px solid ${product.color}25`,
                    }}
                  >
                    <ProductArt color={product.color} initial={product.name.charAt(0)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Interested in our products?"
        subtitle="Whether you want to partner, invest, or simply learn more — we'd love to connect."
      >
        <Link href="/contact"><CTAPrimaryButton>Get in Touch</CTAPrimaryButton></Link>
        <Link href="/about"><CTASecondaryButton>About Fonio Labs</CTASecondaryButton></Link>
      </PageCTA>
    </div>
  );
}
