'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const CARDS = [
  {
    id: 'moses',
    name: 'Moses — Parting the Sea',
    era: 'Old Testament',
    rarity: 'Legendary',
    description: 'By faith, Moses stretched out his hand over the sea and the Lord drove it back — the waters parted and Israel walked through on dry ground.',
    image: '/card_moses.jpg',
    color: '#D4AF37',
    glowColor: 'rgba(212,175,55,0.6)',
  },
  {
    id: 'david',
    name: "David's Sling & Five Stones",
    era: 'Old Testament',
    rarity: 'Mythic',
    description: "Armed with faith and five smooth stones, young David stood before Goliath — and with God's strength, felled the giant with a single shot.",
    image: '/card_david.jpg',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.5)',
  },
  {
    id: 'creation',
    name: 'Dawn of Creation',
    era: 'Genesis',
    rarity: 'Divine',
    description: 'In the beginning God created the heavens and the earth. Light burst forth from darkness, and all was good.',
    image: '/card_creation.jpg',
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.5)',
  },
];

const RARITY_COLORS: Record<string, string> = {
  Legendary: '#D4AF37',
  Mythic: '#06b6d4',
  Divine: '#a78bfa',
};

export default function GachaCardReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const card = CARDS[currentIndex];

  const handleUnlock = () => {
    if (isAnimating) return;
    if (isFlipped) {
      // Go to next card
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % CARDS.length);
        setIsAnimating(false);
      }, 400);
    } else {
      // Flip current card
      setIsFlipped(true);
      setUnlocked((prev) => new Set([...prev, card.id]));
    }
  };

  return (
    <section id="gacha" className="py-24 bg-[#0a1628] relative overflow-hidden" aria-label="Gacha card reveal">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1e3a5f] blur-[120px] opacity-30 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
            Gacha Collection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Unlock Biblical Lore
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Collect beautifully illustrated 3D cards featuring legendary figures and sacred moments from scripture.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* 3D Card */}
          <div className="flex flex-col items-center gap-8">
            <div style={{ perspective: '1000px' }} className="w-64 h-96">
              <motion.div
                className="relative w-full h-full cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                onClick={handleUnlock}
                role="button"
                aria-label={isFlipped ? `${card.name} card revealed. Tap for next card.` : 'Tap to Reveal card'}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              >
                {/* Card Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0f2040] via-[#1a3060] to-[#071022]" />
                  {/* Shimmer pattern */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(212,175,55,0.03) 0px, rgba(212,175,55,0.03) 1px, transparent 1px, transparent 20px)',
                  }} />
                  <div className="absolute inset-4 rounded-xl border border-[#D4AF37]/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      aria-hidden="true"
                    >
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="38" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" />
                        <path d="M40 10 L43 30 L40 35 L37 30 Z" fill="#D4AF37" opacity="0.6" />
                        <path d="M40 70 L43 50 L40 45 L37 50 Z" fill="#D4AF37" opacity="0.6" />
                        <path d="M10 40 L30 43 L35 40 L30 37 Z" fill="#D4AF37" opacity="0.6" />
                        <path d="M70 40 L50 43 L45 40 L50 37 Z" fill="#D4AF37" opacity="0.6" />
                        <circle cx="40" cy="40" r="8" fill="none" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="40" cy="40" r="3" fill="#D4AF37" opacity="0.8" />
                      </svg>
                    </motion.div>
                    <span className="text-[#D4AF37]/60 text-sm font-medium tracking-widest uppercase">Tap to Reveal</span>
                  </div>
                  {/* Shimmer overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                    aria-hidden="true"
                  />
                </div>

                {/* Card Front */}
                <AnimatePresence>
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: isFlipped ? `0 0 40px ${card.glowColor}` : 'none',
                    }}
                  >
                    <Image src={card.image} alt={card.name} fill className="object-cover" sizes="256px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    {/* Rarity badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: RARITY_COLORS[card.rarity] + '33', color: RARITY_COLORS[card.rarity], border: `1px solid ${RARITY_COLORS[card.rarity]}66` }}>
                      {card.rarity}
                    </div>
                    {/* Card info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">{card.era}</div>
                      <div className="text-white font-bold text-lg leading-tight">{card.name}</div>
                    </div>
                  </div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Unlock button */}
            <motion.button
              id="gacha-unlock-btn"
              onClick={handleUnlock}
              disabled={isAnimating}
              className="px-8 py-3 rounded-full font-semibold text-sm disabled:opacity-50 transition-all duration-300"
              style={{
                background: isFlipped ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #D4AF37, #C5A030)',
                color: isFlipped ? '#ffffff' : '#071022',
                border: isFlipped ? '1px solid rgba(255,255,255,0.2)' : 'none',
                boxShadow: isFlipped ? 'none' : '0 0 25px rgba(212,175,55,0.5)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isFlipped ? 'Draw next card' : 'Unlock Lore card'}
            >
              {isFlipped ? '✨ Draw Next Card' : '🔮 Unlock Lore'}
            </motion.button>

            {/* Progress dots */}
            <div className="flex gap-2" role="tablist" aria-label="Card collection progress">
              {CARDS.map((c, i) => (
                <div
                  key={c.id}
                  role="tab"
                  aria-selected={i === currentIndex}
                  aria-label={`${c.name} — ${unlocked.has(c.id) ? 'unlocked' : 'locked'}`}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === currentIndex ? '#D4AF37' : unlocked.has(c.id) ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.2)',
                    width: i === currentIndex ? '24px' : '8px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Card info panel */}
          <div className="max-w-sm text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={card.id + isFlipped}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {isFlipped ? (
                  <>
                    <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: RARITY_COLORS[card.rarity] }}>
                      {card.rarity} • {card.era}
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-4">{card.name}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{card.description}</p>
                    <div className="flex gap-3 justify-center lg:justify-start">
                      {['Power', 'Wisdom', 'Faith'].map((stat, i) => (
                        <div key={stat} className="flex-1 bg-white/5 rounded-xl p-3 text-center border border-white/10">
                          <div className="text-xs text-gray-500 mb-1">{stat}</div>
                          <div className="text-white font-bold">{[95, 88, 99][i]}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-heading font-bold text-white mb-3">Divine Collection</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      Tap the card to reveal a legendary biblical moment. Each card tells the sacred story of a hero from scripture.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {CARDS.map((c) => (
                        <span key={c.id} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ borderColor: RARITY_COLORS[c.rarity] + '50', color: RARITY_COLORS[c.rarity] }}>
                          {c.rarity}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Collection count */}
        <motion.div
          className="text-center mt-12 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {unlocked.size} / {CARDS.length} cards unlocked
        </motion.div>
      </div>
    </section>
  );
}
