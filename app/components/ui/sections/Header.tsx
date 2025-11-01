'use client'
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className=" mx-56 px-6 md:px-12 lg:px-20 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/foniolabs-logo.png"
              alt="Fonio Labs Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">Fonio Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8 font-medium">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-blue-600 transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:text-blue-600 transition-colors">
                Docs
              </Link>
            </li>
            <li>
              <Link href="/transparency" className="hover:text-blue-600 transition-colors">
                Transparency
              </Link>
            </li>
          </ul>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="px-6 py-2 font-semibold hover:text-blue-600 transition-colors">
              Launch App
            </button>
            <Link href="/contact">
              <button className="btn-primary">
                Contact
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-6 pb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-col gap-4 font-medium">
              <li>
                <Link
                  href="/"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency"
                  className="block py-2 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transparency
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-3 mt-6">
              <button className="px-6 py-3 font-semibold border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all">
                Launch App
              </button>
              <Link href="/contact">
                <button className="btn-primary w-full">
                  Contact
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;