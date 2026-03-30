"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaXTwitter, FaLinkedin, FaMedium, FaGithub, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background ASCII Decoration */}
      <div className="absolute top-10 right-20 ascii-art text-white/5 hidden lg:block">
        {`FFFFFFFFFF
FFFFFFFFFFI
FFFFFFFFIII
FFFFFFFIII
FFFFFFIII`}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/foniolabs-logo.png"
                alt="Fonio Labs Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-bold">Fonio Labs</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              A technology product studio building across gaming, education, and fintech
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <FaMedium />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Futbol Fusion
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Skoolbox
                </Link>
              </li>
              {/* <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Stacka
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>EN</span>
            <span>|</span>
            <span>CN</span>
          </div>

          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Fonio Labs. All rights reserved.
          </p>

          <p className="text-sm text-gray-400 font-mono">
            Built with passion
          </p>
        </div>

        {/* CTA Section Above Copyright */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Want to partner with us?
          </h3>
          <Link href="/contact">
            <button className="btn-primary text-lg">
              Contact us
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
