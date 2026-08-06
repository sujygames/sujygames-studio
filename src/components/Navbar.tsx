'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#games', label: 'Games' },
  { href: '#micro-demos', label: 'Play Demo' },
  { href: '#gacha', label: 'Lore Cards' },
  { href: '#pipeline', label: 'AI Pipeline' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? 'rgba(7, 16, 34, 0.92)'
          : 'rgba(7, 16, 34, 0)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-3 group" aria-label="SUJY Games — home">
            <div className="relative w-10 h-10">
              <Image src="/logo1.png" alt="SUJY Games logo" fill className="object-contain" sizes="40px" />
            </div>
            <span className="font-heading font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              SUJY Games
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://play.google.com/store/apps/dev?id=6841682603940949194"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-cta"
              className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-full text-[#071022] bg-[#D4AF37] hover:bg-[#C5A030] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Play Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            id="mobile-nav-btn"
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://play.google.com/store/apps/dev?id=6841682603940949194"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-5 py-3 text-center font-semibold rounded-full text-[#071022] bg-[#D4AF37] hover:bg-[#C5A030] transition-all duration-200"
              >
                Play Now on Google Play
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
