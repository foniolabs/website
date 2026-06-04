"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

import { HubspotForm } from "@/app/components/sanity/HubspotForm";

// Existing /contact design preserved — left column unchanged. The right
// column swaps the prior Web3Forms-based <form> for the HubspotForm
// component, which mounts hbspt.forms.create against the portal/form/region
// values pulled from siteSettings on the server side and threaded down.
//
// If any of portalId / formId / region are missing (e.g. an editor hasn't
// finished Site Settings yet), HubspotForm renders a clear placeholder
// instead of silently breaking the page.

type Props = {
  portalId?: string;
  formId?: string;
  region?: string;
};

export function ContactPageContent({ portalId, formId, region }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#0b0f1a" }}>
        <div className="absolute top-20 right-20 ascii-art text-white/10 hidden lg:block">
          {`CCCCCCCCCC
CCCCCCCCCCCC
CCCCCCCCCCCCCC
CCCCCCCCCCCC
CCCCCCCCCC`}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // CONTACT US //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's build the{" "}
            <span className="text-gradient">future</span> together
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have a question or want to work with us? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info (left column — unchanged) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you have a question about our tools, need support, or
                want to explore partnership opportunities, our team is ready to
                help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiMail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:admin@foniolabs.xyz"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      admin@foniolabs.xyz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-600">
                      Remote-first, Building globally
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiPhone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://x.com/emmanueldoji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/foniolabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/foniolabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (right column — HubSpot embed) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <HubspotForm
                  portalId={portalId ?? ""}
                  formId={formId ?? ""}
                  region={region ?? "na1"}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
