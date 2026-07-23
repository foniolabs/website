"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { PageHero } from "@/app/components/ui/sections/PageHero";
import { PageCTA, CTAPrimaryButton, CTASecondaryButton } from "@/app/components/ui/sections/PageCTA";

const NAVY = "#001842";

// Decorative brand panel used beside the Story / Vision copy.
function BrandPanel({ gradient }: { gradient: string }) {
  return (
    <div className="rounded-3xl p-12 relative overflow-hidden aspect-[4/3] flex items-center justify-center" style={{ background: gradient }}>
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(0,218,242,0.25)" }} />
      <Image src="/images/logo.svg" alt="" width={140} height={140} className="w-32 h-32 object-contain opacity-90 relative z-10" />
    </div>
  );
}

// Hardcoded fallback rendering for /about. Used when the corresponding
// Sanity `page` doc has no sections yet.
export function AboutPageContent() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About"
        title={
          <>
            Building the future, one <span className="text-gradient">tool</span> at a time
          </>
        }
        subtitle="Fonio Labs is a Nigerian technology product studio on a mission to build products that change industries — starting with education, powered by AI."
      />

      {/* Quick facts */}
      <section className="bg-white px-6 md:px-12 lg:px-20 pb-4">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
          {[
            { value: "2025", label: "Founded" },
            { value: "Remote", label: "First team" },
            { value: "Nigeria", label: "Built here, for the world" },
          ].map((f, i) => (
            <div key={f.label} className={`text-center ${i > 0 ? "pl-4" : ""}`} style={i > 0 ? { borderLeft: `1px solid ${NAVY}12` } : undefined}>
              <div className="text-3xl md:text-4xl font-bold text-gradient">{f.value}</div>
              <div className="text-sm mt-1" style={{ color: "#6b7280" }}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: NAVY }}>Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Fonio Labs was founded with a clear mission: to build technology products
                that solve real problems. We saw opportunities to create meaningful impact
                through thoughtful product development — and set out to build them.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We&apos;re a product studio — not an agency. We conceive, design, build,
                and launch our own products. Each one is crafted to serve a specific
                market need, combining cutting-edge technology with user-centered
                design to deliver real value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BrandPanel gradient="linear-gradient(135deg, #0a6cff 0%, #001842 100%)" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 md:py-28 px-6 md:px-12 lg:px-20" style={{ background: "#f6f8fc" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BrandPanel gradient="linear-gradient(135deg, #001842 0%, #00daf2 100%)" />
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: NAVY }}>Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We envision a future where technology products built in Africa
                compete on the global stage. Where innovation isn&apos;t limited by
                geography, and where Nigerian-built platforms serve millions of
                users worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With Skoolbox, our offline-first AI learning platform, we&apos;re
                proving that world-class technology can come from anywhere. Each product
                we launch is a step toward a more connected, empowered, and
                innovative world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: NAVY }}>Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Research-First", description: "Every decision we make is backed by thorough research and data. We don't build on assumptions—we build on evidence." },
              { title: "User-Centric", description: "The user experience is at the heart of everything we create. Complex technology should feel simple and intuitive." },
              { title: "Transparent", description: "We believe in building in public, sharing our learnings, and being open about our processes and decisions." },
              { title: "Collaborative", description: "Great innovation happens when diverse minds come together. We actively seek partnerships and community input." },
              { title: "Quality-Driven", description: "We never compromise on quality. Every line of code, every design decision is made with excellence in mind." },
              { title: "Future-Focused", description: "We're not just solving today's problems—we're anticipating tomorrow's challenges and building solutions today." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: `1px solid ${NAVY}12`, boxShadow: "0 8px 24px rgba(0,24,66,0.05)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <h3 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Want to join us on this journey?"
        subtitle="We're always looking for talented individuals who share our vision and values."
      >
        <Link href="/team"><CTAPrimaryButton>Meet the Team</CTAPrimaryButton></Link>
        <Link href="/contact"><CTASecondaryButton>Get in Touch</CTASecondaryButton></Link>
      </PageCTA>
    </div>
  );
}
