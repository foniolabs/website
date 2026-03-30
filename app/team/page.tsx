"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

export default function TeamPage() {
  const team = [
    {
      name: "Emmanuel Doji",
      role: "Founder & CEO",
      bio: "Software Engineer and Systems Analyst with a degree in MIS. Passionate about making Web3 and AI accessible to everyone through user-friendly tools and innovative solutions.",
      image: "/images/team/Founder.jpg",
      social: {
        github: "https://github.com/web3normad",
        linkedin: "https://ng.linkedin.com/in/emmanuel-doji",
        twitter: "https://x.com/emmanueldoji",
      },
    },
    // Uncomment and update these as you build your team
    // {
    //   name: "Team Member 2",
    //   role: "Head of Research",
    //   bio: "PhD in Computer Science with focus on blockchain scalability and AI systems. Published researcher in leading journals.",
    //   image: null,
    //   social: {
    //     github: "#",
    //     linkedin: "#",
    //     twitter: "#",
    //   },
    // },
    // {
    //   name: "Team Member 3",
    //   role: "Lead Designer",
    //   bio: "Award-winning designer passionate about creating intuitive interfaces for complex systems. 10+ years in UX/UI.",
    //   image: null,
    //   social: {
    //     github: "#",
    //     linkedin: "#",
    //     twitter: "#",
    //   },
    // },
    // {
    //   name: "Team Member 4",
    //   role: "Engineering Lead",
    //   bio: "Full-stack engineer with expertise in distributed systems and smart contracts. Core contributor to multiple open-source projects.",
    //   image: null,
    //   social: {
    //     github: "#",
    //     linkedin: "#",
    //     twitter: "#",
    //   },
    // },
    // {
    //   name: "Team Member 5",
    //   role: "AI Research Engineer",
    //   bio: "Specializing in machine learning and natural language processing. Former researcher at leading AI labs.",
    //   image: null,
    //   social: {
    //     github: "#",
    //     linkedin: "#",
    //     twitter: "#",
    //   },
    // },
    // {
    //   name: "Team Member 6",
    //   role: "Community Manager",
    //   bio: "Building and nurturing developer communities. Connecting people and fostering collaboration across the ecosystem.",
    //   image: null,
    //   social: {
    //     github: "#",
    //     linkedin: "#",
    //     twitter: "#",
    //   },
    // },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#0b0f1a" }}>
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
              // OUR TEAM //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet the minds behind{" "}
            <span className="text-gradient">Fonio Labs</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A passionate team building products that change industries.
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group max-w-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Avatar/Photo */}
                <div className="relative h-96 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="relative h-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                      {/* ASCII Art Overlay */}
                      <div className="absolute bottom-5 right-5 ascii-art text-white/20">
                        {`LLLLLL
LLLLLLL
LLLLLLLL
LLLLLLL
LLLLLL`}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      <FaTwitter />
                    </a>
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
                <button className="btn-primary text-lg">
                  View Open Positions
                </button>
                <a href="/contact">
                  <button className="px-8 py-3 border-2 border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
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
              <div className="bg-gradient-primary rounded-3xl p-16 relative overflow-hidden">
                <div className="ascii-art text-white/30 text-center text-sm">
                  {`::::::::::::::::
::::::::::::::::::
::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::
::::::::::::::::::
::::::::::::::::
::::::::::::::`}
                </div>
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
                description: "Work from anywhere in the world. We believe in flexibility and trust our team to do great work regardless of location.",
              },
              {
                title: "Learning & Growth",
                description: "Continuous learning is in our DNA. We provide resources, time, and support for professional development.",
              },
              {
                title: "Work-Life Balance",
                description: "We're building for the long term, and that means taking care of our team. Flexible hours and unlimited PTO.",
              },
              {
                title: "Open Communication",
                description: "Transparency and honest feedback are core to how we operate. Everyone's voice matters here.",
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
