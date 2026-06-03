"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  {
    title: "Introducing Futbol Fusion — Web3 Meets Fantasy Sports",
    excerpt:
      "We're building a new kind of football gaming experience powered by blockchain. Here's what we're working on and why it matters.",
    date: "Coming Soon",
    tag: "Product",
    color: "#34d399",
  },
  {
    title: "Why We're Building Skoolbox for African Schools",
    excerpt:
      "Education technology in Africa needs a different approach. Skoolbox is designed from the ground up for the realities of African classrooms.",
    date: "Coming Soon",
    tag: "Product",
    color: "#fb923c",
  },
  // {
  //   title: "Stacka: Making Investing Accessible to Everyone",
  //   excerpt:
  //     "From stocks to crypto to DeFi — Stacka brings modern investing tools to users who have been underserved by traditional platforms.",
  //   date: "Coming Soon",
  //   tag: "Product",
  //   color: "#60a5fa",
  // },
  {
    title: "The Fonio Labs Story — From Idea to Product Studio",
    excerpt:
      "How a passion for building technology products grew into a multi-industry studio tackling gaming, education, and fintech.",
    date: "Coming Soon",
    tag: "Company",
    color: "#818cf8",
  },
];

export default function NewsPage() {
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
              // NEWS & UPDATES //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Latest from{" "}
            <span className="text-gradient">Fonio Labs</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Updates on our products, insights from our team, and news from the
            studio.
          </motion.p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: `${post.color}15`,
                      color: post.color,
                      border: `1px solid ${post.color}30`,
                    }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-2xl p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              More Content Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're just getting started. Follow us to stay updated on product
              launches, behind-the-scenes insights, and industry perspectives.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary text-lg">Stay Updated</button>
              </Link>
              <Link href="/products">
                <button className="px-8 py-3 border-2 border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                  View Our Products
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
