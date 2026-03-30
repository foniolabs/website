"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    name: "Futbol Fusion",
    tag: "Web3 Gaming",
    color: "#34d399",
    description:
      "A Web3-powered football gaming platform that merges the excitement of fantasy sports with blockchain ownership. Players collect, trade, and compete with digital assets in a decentralized gaming ecosystem.",
    features: ["NFT Player Cards", "Play-to-Earn Mechanics", "Live Match Integration", "Community Tournaments"],
    status: "In Development",
  },
  {
    name: "Skoolbox",
    tag: "EdTech",
    color: "#fb923c",
    description:
      "A comprehensive education platform designed for African schools and institutions. Skoolbox streamlines learning management, student tracking, and communication between teachers, students, and parents.",
    features: ["Learning Management System", "Student Progress Tracking", "Parent-Teacher Communication", "Offline-First Design"],
    status: "In Development",
  },
  // {
  //   name: "Stacka",
  //   tag: "Fintech",
  //   color: "#60a5fa",
  //   description:
  //     "A modern investment platform that makes stocks, crypto, and DeFi accessible to everyone. Stacka simplifies portfolio management with AI-powered insights and seamless USDC settlements.",
  //   features: ["Stock & Crypto Trading", "DeFi Protocol Access", "AI Portfolio Insights", "USDC Settlements"],
  //   status: "In Development",
  // },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: "#0b0f1a" }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // OUR PRODUCTS //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Products that{" "}
            <span className="text-gradient">change industries</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We build apps and platforms across gaming, education, and fintech —
            each designed to solve real problems and create lasting impact.
          </motion.p>
        </div>
      </section>

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
                    {product.name}
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
                  <div className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-semibold">
                    {product.status}
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div
                    className="rounded-3xl p-16 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}20 0%, ${product.color}08 100%)`,
                      border: `1px solid ${product.color}25`,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center"
                        style={{
                          background: product.color,
                          boxShadow: `0 0 40px ${product.color}40`,
                        }}
                      >
                        <span className="font-mono font-bold text-white text-2xl">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-32 px-6 md:px-12 lg:px-20"
        style={{ background: "#0b0f1a" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Interested in our products?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Whether you want to partner, invest, or simply learn more — we'd
            love to connect.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/contact">
              <button className="btn-primary text-lg">Get in Touch</button>
            </Link>
            <Link href="/about">
              <button className="btn-outline text-lg">About Fonio Labs</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
