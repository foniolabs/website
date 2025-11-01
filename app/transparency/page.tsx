"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiShieldCheck, HiDocumentText, HiUserGroup, HiChartBar } from "react-icons/hi";

export default function TransparencyPage() {
  const principles = [
    {
      icon: HiShieldCheck,
      title: "Open Development",
      description:
        "We believe in building in public. Our development process, roadmap, and decisions are shared openly with our community.",
    },
    {
      icon: HiDocumentText,
      title: "Clear Documentation",
      description:
        "Every feature, API, and process is thoroughly documented and accessible to everyone who uses our tools.",
    },
    {
      icon: HiUserGroup,
      title: "Community Driven",
      description:
        "Our community's feedback shapes our direction. We actively listen and respond to user needs and suggestions.",
    },
    {
      icon: HiChartBar,
      title: "Data Privacy",
      description:
        "We're transparent about how we collect, use, and protect your data. Your privacy is our priority.",
    },
  ];

  const reports = [
    {
      title: "Q4 2024 Progress Report",
      date: "December 2024",
      description: "Development milestones, user growth, and platform updates",
      status: "Coming Soon",
    },
    {
      title: "Security Audit",
      date: "November 2024",
      description: "Third-party security assessment and findings",
      status: "Coming Soon",
    },
    {
      title: "Platform Metrics",
      date: "Monthly",
      description: "User statistics, transaction volumes, and performance data",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-dark pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-20 left-20 ascii-art text-white/10 hidden lg:block">
          {`TTTTTTTTTT
TTTTTTTTTTT
TTTTTTTTTTTT
TTTTTTTTTTT
TTTTTTTTTT`}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // TRANSPARENCY //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building with{" "}
            <span className="text-gradient">openness</span> and trust
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transparency is at the core of everything we do. We believe in being
            open about our processes, decisions, and progress.
          </motion.p>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Transparency Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide how we operate and communicate with our
              community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <principle.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{principle.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports & Updates */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Reports & Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regular updates on our progress, metrics, and platform health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={report.title}
                className="bg-white rounded-2xl p-8 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-sm text-blue-600 font-semibold mb-2">
                  {report.date}
                </div>
                <h3 className="text-xl font-bold mb-3">{report.title}</h3>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="inline-block px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm font-semibold">
                  {report.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source & Community */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Open Source Commitment
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe in the power of open source. Many of our tools and
                libraries are open source, allowing the community to contribute,
                audit, and improve our codebase.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Check out our GitHub to see what we're building, contribute to
                our projects, or learn from our code.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/web3normad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg"
                >
                  Visit Our GitHub
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-dark rounded-3xl p-12 relative overflow-hidden">
                <div className="ascii-art text-white/20 text-center">
                  {`OOOOOOOOOO
OOOOOOOOOOOO
OOOOOOOOOOOOOO
OOOOOOOOOOOO
OOOOOOOOOO`}
                </div>
                <div className="relative z-10 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <p className="text-white font-mono text-sm">
                      "Transparency builds trust. Trust enables adoption. Adoption
                      drives innovation."
                    </p>
                    <p className="text-gray-300 text-sm mt-4">- Fonio Labs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Handle Data */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How We Handle Your Data
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy and security are paramount to us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Data Collection",
                description:
                  "We only collect data necessary for providing our services. No unnecessary tracking or data mining.",
              },
              {
                title: "Data Storage",
                description:
                  "All data is encrypted and stored securely using industry-standard practices and protocols.",
              },
              {
                title: "Data Usage",
                description:
                  "Your data is never sold to third parties. We use it solely to improve your experience.",
              },
              {
                title: "Data Access",
                description:
                  "You have full access to your data and can request exports or deletion at any time.",
              },
              {
                title: "Third-Party Services",
                description:
                  "We're transparent about which third-party services we use and why we need them.",
              },
              {
                title: "Compliance",
                description:
                  "We comply with GDPR, CCPA, and other relevant data protection regulations.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Questions About Our Transparency?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're here to answer any questions you have about how we operate,
            handle data, or make decisions.
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
              <button className="btn-outline text-lg">Learn More About Us</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
