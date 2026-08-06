'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { href: '#games', label: 'Games' },
  { href: '#gacha', label: 'Lore Cards' },
  { href: '#pipeline', label: 'AI Pipeline' },
  { href: '#about', label: 'About' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#050d1a] text-gray-400 py-16 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <Image src="/logo1.png" alt="SUJY Games logo" fill className="object-contain grayscale brightness-200" sizes="32px" />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-wide">SUJY GAMES</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Crafting meaningful mobile experiences that resonate on a deeper level through cultural lore and premium design.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2" role="list">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-500 hover:text-[#D4AF37] transition-colors duration-200 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <p className="text-sm text-gray-500 mb-2">Get in touch with us at:</p>
            <a
              href="mailto:sujygames@gmail.com"
              id="footer-email"
              className="text-[#D4AF37] hover:text-[#C5A030] transition-colors font-medium text-sm"
            >
              sujygames@gmail.com
            </a>

            <div className="mt-6">
              <a
                href="https://play.google.com/store/apps/dev?id=6841682603940949194"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-play-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#071022] bg-[#D4AF37] hover:bg-[#C5A030] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 2.6v18.8c0 .2.2.4.4.2l15.6-8.9c.2-.1.2-.4 0-.5L4.4 2.4c-.2-.2-.4 0-.4.2z" />
                </svg>
                Play on Google Play
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SUJY Games. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
