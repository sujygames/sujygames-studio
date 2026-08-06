'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VALUES = [
  { icon: '✨', title: 'Meaningful Themes', desc: 'We fuse cultural heritage, scripture, and mythology into every mechanic — making gameplay feel purposeful.' },
  { icon: '🎨', title: 'Premium Aesthetics', desc: 'AI-generated art at mobile game quality — every background, character, and UI element is a visual feast.' },
  { icon: '🤖', title: 'AI-Powered Speed', desc: 'Our pipeline produces games 10× faster than traditional studios, without sacrificing quality or care.' },
  { icon: '💚', title: 'Family-First Design', desc: 'Zero dark patterns. Respectful monetization. Games the whole family can feel good playing.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden" aria-label="About SUJY Games">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#D4AF37] blur-[160px] opacity-5" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#0f2040] blur-[160px] opacity-5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest uppercase rounded-full border border-[#0f2040]/20 text-[#0f2040] bg-[#0f2040]/5">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#071022] mb-6 leading-tight">
              About{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0f2040, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SUJY Games
              </span>
            </h2>

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#0f2040] to-[#D4AF37] mb-8" aria-hidden="true" />

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At <strong className="text-[#071022]">SUJY Games</strong>, our mission is to build high-quality,
              family-friendly mobile experiences that resonate on a deeper level.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              We combine standard puzzle frameworks with meaningful cultural themes — drawing from Hindu mythology,
              biblical scripture, and world heritage — to provide an oasis of calm and joy in the bustling mobile
              gaming landscape.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:sujygames@gmail.com"
                id="about-contact-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#0f2040] text-[#0f2040] font-semibold hover:bg-[#0f2040] hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </motion.div>

          {/* Right: values grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl mb-3" aria-hidden="true">{v.icon}</div>
                <h3 className="font-heading font-bold text-[#071022] mb-2 group-hover:text-[#0f2040] transition-colors">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
