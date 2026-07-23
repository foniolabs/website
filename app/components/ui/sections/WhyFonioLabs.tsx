"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiBeaker, HiUsers, HiLightBulb } from "react-icons/hi";

const NAVY = "#001842";

const WhyFonioLabs = () => {
  const features = [
    {
      title: "Problem-First Thinking",
      description:
        "We start with real problems — not trends. Every product we build targets a gap that matters, validated by on-the-ground research before a line of code is written.",
      Icon: HiBeaker,
      gradient: "linear-gradient(135deg, #0a6cff, #00daf2)",
    },
    {
      title: "Built for Real Users",
      description:
        "Our products are designed for the people who need them most — from rural students with no internet access to crypto-native users in emerging markets.",
      Icon: HiUsers,
      gradient: "linear-gradient(135deg, #001842, #0a6cff)",
    },
    {
      title: "Ship Fast, Iterate Bold",
      description:
        "We move quickly from idea to product. We build, launch, and improve in the open — using user feedback and data to shape every iteration.",
      Icon: HiLightBulb,
      gradient: "linear-gradient(135deg, #00daf2, #0a6cff)",
    },
  ];

  return (
    <section
      className="relative py-28 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #ffffff 72%, #001842 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 35% at 88% 92%, rgba(0,218,242,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0a6cff" }}>
              Why Fonio Labs
            </span>
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: NAVY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How we build at{" "}
            <span className="text-gradient">Fonio Labs</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "#4b5563" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A product studio is only as good as its principles. Here&apos;s what drives every product we build.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group"
              style={{ border: `1px solid ${NAVY}12`, boxShadow: "0 8px 24px rgba(0,24,66,0.05)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative z-10">
                <div
                  className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-white"
                  style={{ background: feature.gradient }}
                >
                  <feature.Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "#4b5563" }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #001842 0%, #0a6cff 100%)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* soft accent glows */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(0,218,242,0.25)" }} />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(10,108,255,0.25)" }} />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in what we&apos;re building?
            </h3>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a potential user, investor, or partner — we&apos;d love to connect and share what&apos;s coming next.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <button
                  className="px-8 py-3.5 rounded-lg font-semibold text-base bg-white transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ color: NAVY }}
                >
                  Explore Our Products
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-3.5 rounded-lg font-semibold text-base text-white border border-white/40 hover:bg-white/10 transition-colors duration-200">
                  Get In Touch
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyFonioLabs;
