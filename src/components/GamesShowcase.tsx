'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const JigsawDemo = dynamic(() => import('./JigsawDemo'), { ssr: false });
const WordConnectionDemo = dynamic(() => import('./WordConnectionDemo'), { ssr: false });

const FEATURES = [
  { icon: '🗺️', title: 'Journey Through the Bible', desc: 'Navigate a magical Saga Map across chapters and books.' },
  { icon: '🎴', title: 'Collect 3D Lore Cards', desc: 'Beautifully illustrated cards featuring scripture heroes.' },
  { icon: '🕊️', title: 'Divine Power-Ups', desc: 'Use heavenly helpers and strategic boosters.' },
  { icon: '🏆', title: 'Heavenly Leaderboard', desc: 'Compete with players worldwide in faith-based puzzles.' },
];

export default function GamesShowcase() {
  return (
    <section id="games" className="py-24 bg-white" aria-label="Games showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full border border-[#0f2040]/20 text-[#0f2040] bg-[#0f2040]/5">
            Our Games
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#071022] mb-4">
            Crafted Worlds to Explore
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Beautiful, family-friendly games bringing peace, joy, and meaningful challenge to your day.
          </p>
        </motion.div>

        {/* Words of Bible card */}
        <motion.article
          className="rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 bg-gray-50 flex flex-col lg:flex-row mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          aria-label="Words of Bible game"
        >
          {/* Left: visual */}
          <div className="w-full lg:w-5/12 bg-[#0f2040] p-8 lg:p-10 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#D4AF37] rounded-full blur-[80px] opacity-20 pointer-events-none" aria-hidden="true" />

            <Image
              src="/gamelogo1.png"
              alt="Words of Bible game logo"
              width={160}
              height={160}
              className="rounded-[2rem] shadow-2xl shadow-black/50 mb-8 border-2 border-gray-100 bg-white p-2 z-10"
            />

            <div className="flex flex-row justify-between gap-3 w-full z-10">
              {['/feature1.png', '/feature2.png', '/feature3.png'].map((src, i) => (
                <motion.div key={i} className="flex-1" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Image
                    src={src}
                    alt={`Words of Bible gameplay screenshot ${i + 1}`}
                    width={200}
                    height={356}
                    className="w-full h-auto aspect-[9/16] object-cover rounded-xl shadow-lg border border-white/20"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="w-full lg:w-7/12 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0f2040] text-sm font-bold tracking-wide mb-6 w-max border border-blue-100">
              ✨ New Release
            </div>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2">Words of Bible</h3>
            <p className="text-xl text-[#D4AF37] font-medium mb-6">Embark on an Ethereal Puzzle Journey!</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              The ultimate Christian word puzzle game where brain-training meets spiritual peace. Immerse yourself in
              breathtaking heavenly landscapes, read inspiring daily scriptures, and find hidden words within a
              gorgeous, tactile puzzle grid.
            </p>

            <ul className="space-y-4 mb-10 text-gray-700" role="list">
              {FEATURES.map((f) => (
                <motion.li
                  key={f.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{f.icon}</span>
                  <div>
                    <strong className="text-gray-900">{f.title}</strong>{' '}
                    <span className="text-gray-500">{f.desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=words.of.bible"
                target="_blank"
                rel="noopener noreferrer"
                id="games-play-btn"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-full text-white bg-[#0f2040] hover:bg-[#1e3a5f] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 2.6v18.8c0 .2.2.4.4.2l15.6-8.9c.2-.1.2-.4 0-.5L4.4 2.4c-.2-.2-.4 0-.4.2z" />
                </svg>
                Download on Google Play
              </a>
            </div>
          </div>
        </motion.article>

        {/* Micro-Demos Section */}
        <section id="micro-demos" aria-label="Interactive game demos">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full border border-[#0f2040]/20 text-[#0f2040] bg-[#0f2040]/5">
              Try It Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#071022] mb-4">
              Live Game Demos
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Experience the core mechanics of our games — right here, in your browser.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jigsaw Demo */}
            <motion.div
              className="rounded-3xl bg-[#0a1628] border border-white/10 p-8 flex flex-col items-center text-center shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              aria-label="Devlok Jigpuzzle demo"
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                🧩 Devlok Jigpuzzle
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Drag & Drop Puzzle</h3>
              <p className="text-gray-400 text-sm mb-6">Rearrange the pieces to complete the scene. Drag tiles between slots!</p>
              <JigsawDemo />
            </motion.div>

            {/* Word Connection Demo */}
            <motion.div
              className="rounded-3xl bg-[#0a1628] border border-white/10 p-8 flex flex-col items-center text-center shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              aria-label="Words of Bible demo"
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase">
                📖 Words of Bible
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Word Search Puzzle</h3>
              <p className="text-gray-400 text-sm mb-6">Select connected letters to find hidden biblical words!</p>
              <WordConnectionDemo />
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
