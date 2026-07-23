"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { FaGithub, FaGlobe, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import { PageHero } from "@/app/components/ui/sections/PageHero";

export type TeamMemberView = {
  name: string;
  role: string;
  bio?: string;
  imageUrl: string | null;
  social: {
    github?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
    website?: string;
  };
};

export function TeamPageContent({ team }: { team: TeamMemberView[] }) {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Our Team"
        title={<>Meet the minds behind <span className="text-gradient">Fonio Labs</span></>}
        subtitle="A passionate team building products that change industries."
      />

      {/* Team Grid */}
      <section className="pb-24 pt-8 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={
              team.length === 1
                ? "flex justify-center"
                : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            }
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group max-w-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative h-96 overflow-hidden">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      // First card on the page is the most likely LCP element
                      // on /team. Priority preloads it; sizes lets Next pick
                      // the right CDN variant for the viewport.
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="relative h-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex gap-3">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.x && (
                      <a
                        href={member.social.x}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="X / Twitter"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.youtube && (
                      <a
                        href={member.social.youtube}
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="YouTube"
                      >
                        <FaYoutube />
                      </a>
                    )}
                    {member.social.website && (
                      <a
                        href={member.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                        aria-label="Personal website"
                      >
                        <FaGlobe />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Want to join our team?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're always looking for talented, passionate individuals who
                share our vision of building products that change industries.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're a researcher, engineer, designer, or community
                builder, if you're excited about pushing the boundaries of
                technology while keeping users at the center, we'd love to hear
                from you.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary text-base">
                  View Open Positions
                </button>
                <a href="/contact">
                  <button
                    className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
                    style={{ border: "1.5px solid #001842", color: "#001842" }}
                  >
                    Get in Touch
                  </button>
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
              <div
                className="rounded-3xl p-16 relative overflow-hidden aspect-[4/3] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0a6cff 0%, #001842 100%)" }}
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl" style={{ background: "rgba(0,218,242,0.25)" }} />
                <Image src="/images/logo.svg" alt="" width={140} height={140} className="w-32 h-32 object-contain opacity-90 relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What it's like to work at Fonio Labs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Remote-First",
                description:
                  "Work from anywhere in the world. We believe in flexibility and trust our team to do great work regardless of location.",
              },
              {
                title: "Learning & Growth",
                description:
                  "Continuous learning is in our DNA. We provide resources, time, and support for professional development.",
              },
              {
                title: "Work-Life Balance",
                description:
                  "We're building for the long term, and that means taking care of our team. Flexible hours and unlimited PTO.",
              },
              {
                title: "Open Communication",
                description:
                  "Transparency and honest feedback are core to how we operate. Everyone's voice matters here.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white border border-gray-200 rounded-2xl p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
