"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiBookOpen, HiCode, HiLightningBolt, HiQuestionMarkCircle } from "react-icons/hi";

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics and get up and running quickly",
      icon: HiLightningBolt,
      links: [
        { name: "Introduction", href: "#introduction" },
        { name: "Quick Start Guide", href: "#quick-start" },
        { name: "Installation", href: "#installation" },
        { name: "Configuration", href: "#configuration" },
      ],
    },
    {
      title: "Stacka Documentation",
      description: "Complete guide to using Stacka investment platform",
      icon: HiBookOpen,
      links: [
        { name: "What is Stacka?", href: "#stacka-intro" },
        { name: "Creating an Account", href: "#create-account" },
        { name: "Investing in Stocks", href: "#stocks" },
        { name: "Crypto Trading", href: "#crypto" },
        { name: "DeFi Protocols", href: "#defi" },
        { name: "USDC Settlements", href: "#usdc" },
      ],
    },
    {
      title: "API Reference",
      description: "Technical documentation for developers",
      icon: HiCode,
      links: [
        { name: "Authentication", href: "#authentication" },
        { name: "Endpoints", href: "#endpoints" },
        { name: "Rate Limits", href: "#rate-limits" },
        { name: "Webhooks", href: "#webhooks" },
      ],
    },
    {
      title: "Support & FAQ",
      description: "Get help and find answers to common questions",
      icon: HiQuestionMarkCircle,
      links: [
        { name: "Frequently Asked Questions", href: "#faq" },
        { name: "Troubleshooting", href: "#troubleshooting" },
        { name: "Contact Support", href: "/contact" },
        { name: "Community", href: "#community" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-dark pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-20 right-20 ascii-art text-white/10 hidden lg:block">
          {`DDDDDDDDDD
DDDDDDDDDDDD
DDDDDDDDDDDDDD
DDDDDDDDDDDD
DDDDDDDDDD`}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // DOCUMENTATION //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to{" "}
            <span className="text-gradient">get started</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive guides and documentation to help you use our tools
            effectively.
          </motion.p>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {link.name} →
                    </Link>
                  ))}
                </div>
              </motion.div>
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
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiBookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Documentation Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're currently working on detailed documentation for all our
              tools. In the meantime, if you have any questions or need
              assistance, please don't hesitate to reach out to our team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary text-lg">Contact Support</button>
              </Link>
              <Link href="/about">
                <button className="px-8 py-3 border-2 border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Popular Resources</h2>
            <p className="text-xl text-gray-600">
              Quick access to our most visited documentation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Stacka Platform Guide",
                description: "Learn how to invest in stocks, crypto, and DeFi",
                link: "#stacka-intro",
              },
              {
                title: "API Integration",
                description: "Integrate our tools into your applications",
                link: "#api",
              },
              {
                title: "Security Best Practices",
                description: "Keep your account and investments secure",
                link: "#security",
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  href={resource.link}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Read more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
