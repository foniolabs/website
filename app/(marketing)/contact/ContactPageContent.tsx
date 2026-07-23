"use client";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

import { ContactForm } from "@/app/components/ui/ContactForm";
import { PageHero } from "@/app/components/ui/sections/PageHero";

// /contact — left column is contact info, right column is a custom form
// (ContactForm) that emails the team through /api/contact.
export function ContactPageContent() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contact Us"
        title={<>Let&apos;s build the <span className="text-gradient">future</span> together</>}
        subtitle="Have a question or want to work with us? We'd love to hear from you."
      />

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
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiLocationMarker className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-600">
                      Remote-first, Building globally
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,24,66,0.08)" }}>
                    <HiPhone className="w-6 h-6" style={{ color: "#001842" }} />
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
              <div className="rounded-2xl p-8" style={{ background: "#f6f8fc", border: "1px solid rgba(0,24,66,0.08)" }}>
                <h3 className="text-2xl font-bold mb-1" style={{ color: "#001842" }}>Send us a message</h3>
                <p className="text-gray-500 mb-6">We&apos;ll get back to you within 24–48 hours.</p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
