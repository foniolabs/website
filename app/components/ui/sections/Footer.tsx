"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaMedium, FaGithub } from "react-icons/fa6";

const Footer = () => {
  const socials = [
    { href: "https://linkedin.com/company/foniolabs", label: "LinkedIn", Icon: FaLinkedin },
    { href: "https://github.com/foniolabs", label: "GitHub", Icon: FaGithub },
    { href: "https://medium.com", label: "Medium", Icon: FaMedium },
  ];

  return (
    <footer className="relative text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#001842" }}>
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,218,242,0.5), rgba(10,108,255,0.5), transparent)" }} />
      {/* soft brand glow */}
      <div className="absolute -top-24 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(10,108,255,0.12)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA */}
        <div className="text-center pb-16 mb-16 border-b border-white/10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Want to partner with us?
          </h3>
          <Link href="/contact">
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-base text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#0a6cff" }}
            >
              Contact us
            </button>
          </Link>
        </div>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.svg"
                alt="Fonio Labs Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-bold">Fonio Labs</h3>
            </div>
            <p className="text-white/55 mb-6 leading-relaxed">
              A technology product studio building across gaming, education, and fintech.
            </p>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0a6cff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://skoolbox.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white transition-colors"
                >
                  Skoolbox
                </a>
              </li>
              <li>
                <a
                  href="https://rabitwallet.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white transition-colors"
                >
                  Rabit Wallet
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/team", label: "Team" },
                { href: "/news", label: "News" },
                { href: "/careers", label: "Careers" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Products" },
                { href: "/news", label: "News" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/55 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 text-sm text-white/45">
            <span>EN</span>
            <span>|</span>
            <span>CN</span>
          </div>

          <p className="text-sm text-white/45 text-center">
            &copy; {new Date().getFullYear()} Fonio Labs. All rights reserved.
          </p>

          <p className="text-sm text-white/45 font-mono">
            Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
