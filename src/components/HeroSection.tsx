'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

const PARALLAX_LAYERS = [
  { depth: 0.02, className: 'absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.15),transparent)]' },
  { depth: 0.04, className: 'absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-900/20 blur-3xl' },
  { depth: 0.06, className: 'absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl' },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const layer1X = useTransform(springX, [-0.5, 0.5], ['-20px', '20px']);
  const layer1Y = useTransform(springY, [-0.5, 0.5], ['-20px', '20px']);
  const layer2X = useTransform(springX, [-0.5, 0.5], ['-40px', '40px']);
  const layer2Y = useTransform(springY, [-0.5, 0.5], ['-40px', '40px']);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const [particles, setParticles] = useState<Array<{id:number;x:number;y:number;size:number;duration:number;delay:number}>>([]);

  useEffect(() => {
    // Generate particles client-side only to prevent SSR hydration mismatch
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071022]"
      style={{ perspective: '1000px' }}
      aria-label="Hero section — SUJY Games"
    >
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-400/60"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: `rgba(212,175,55,${Math.random() * 0.4 + 0.2})`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Background glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#1e3a5f] blur-[120px] opacity-40 pointer-events-none"
        style={{ x: layer1X, y: layer1Y }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#D4AF37] blur-[140px] opacity-10 pointer-events-none"
        style={{ x: layer2X, y: layer2Y }}
        aria-hidden="true"
      />

      {/* Hero image with 3D depth effect */}
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        aria-hidden="true"
      >
        <Image
          src="/hero_lore.png"
          alt="Matsya Avatar and Moses — SUJY Games cultural lore"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071022]/30 via-transparent to-[#071022]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full border border-[#D4AF37]/40 text-[#D4AF37] bg-[#D4AF37]/10">
            Indie Game Studio
          </span>
        </motion.div>

        <motion.h1
          className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-8xl tracking-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span
            className="block"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Crafting Meaningful
          </span>
          <span
            className="block mt-2"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mobile Experiences
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Beautiful, family-friendly games filled with cultural lore, relaxing gameplay,
          and deeply rewarding mechanics — powered by AI.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://play.google.com/store/apps/dev?id=6841682603940949194"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-play"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full text-[#071022] bg-[#D4AF37] hover:bg-[#C5A030] shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 2.6v18.8c0 .2.2.4.4.2l15.6-8.9c.2-.1.2-.4 0-.5L4.4 2.4c-.2-.2-.4 0-.4.2z" />
            </svg>
            View on Google Play
          </a>
          <a
            href="#games"
            id="hero-cta-games"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full text-white border border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            Explore Games
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
