'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NODES = [
  {
    id: 'idea',
    label: 'Idea & Research',
    icon: '💡',
    color: '#D4AF37',
    glow: 'rgba(212,175,55,0.4)',
    description: 'Market research, cultural theme ideation, and game concept validation using player data signals.',
    detail: '⚡ 48h concept-to-prototype · Player data from 50K+ sessions drives theme selection.',
    x: 50, y: 10,
  },
  {
    id: 'ai-art',
    label: 'AI Art Generation',
    icon: '🎨',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.4)',
    description: 'Generative AI pipelines produce 100+ unique character illustrations, backgrounds & UI assets per sprint.',
    detail: '🖼 Stable Diffusion + ControlNet · Style-locked to each game\'s cultural theme.',
    x: 50, y: 32,
  },
  {
    id: 'levels',
    label: 'Auto Level Design',
    icon: '⚙️',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.4)',
    description: 'Algorithmic level generator creates thousands of balanced puzzles. Difficulty curves tuned by engagement metrics.',
    detail: '🧮 1,000+ levels generated per game · Adaptive difficulty via real-time retention data.',
    x: 50, y: 54,
  },
  {
    id: 'liveops',
    label: 'Live-Ops & Analytics',
    icon: '📊',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.4)',
    description: 'Real-time retention loops, A/B tests, seasonal events and gacha drops — all automated and data-driven.',
    detail: '📈 A/B tested push cadence · Seasonal gacha events auto-scheduled 30 days out.',
    x: 50, y: 76,
  },
];

const CONNECTIONS = [
  { from: 'idea', to: 'ai-art' },
  { from: 'ai-art', to: 'levels' },
  { from: 'levels', to: 'liveops' },
];

export default function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pipeline" className="py-24 bg-[#071022] relative overflow-hidden" aria-label="AI production pipeline">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a5f] blur-[150px] opacity-20 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full border border-[#60a5fa]/30 text-[#60a5fa]">
            Our AI Moat
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Automated Production Pipeline
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From concept to live game in days, not months — powered by a fully integrated AI workflow.
          </p>
        </motion.div>

        {/* Pipeline nodes */}
        <div ref={ref} className="relative flex flex-col items-center gap-0">
          {NODES.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center w-full max-w-sm">
              {/* Node */}
              <motion.div
                className="group relative w-full"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div
                  className="relative rounded-2xl border p-5 cursor-default transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  style={{
                    borderColor: node.color + '40',
                    backgroundColor: node.color + '10',
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label} — hover for more details`}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 30px ${node.glow}` }}
                    aria-hidden="true"
                  />
                  
                  <div className="flex items-center gap-4">
                    {/* Pulsing icon */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: node.glow }}
                        animate={inView ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        aria-hidden="true"
                      />
                      <div
                        className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl border"
                        style={{ borderColor: node.color + '50', backgroundColor: node.color + '20' }}
                      >
                        {node.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-white text-lg">{node.label}</div>
                      <div className="text-xs text-gray-400 leading-relaxed mt-1">{node.description}</div>
                    </div>

                    {/* Step number */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: node.color + '20', color: node.color }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>

                {/* Hover tooltip — shows unique detail NOT in the card body */}
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-60 p-3 rounded-xl bg-[#0f2040] border border-white/10 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 hidden lg:block"
                  role="tooltip"
                  aria-hidden="true"
                >
                  <div className="font-bold mb-1.5" style={{ color: node.color }}>{node.label}</div>
                  <div className="text-xs leading-relaxed">{node.detail}</div>
                </div>
              </motion.div>

              {/* Animated connector */}
              {i < NODES.length - 1 && (
                <div className="flex flex-col items-center py-2 gap-1" aria-hidden="true">
                  {/* Animated dots */}
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: NODES[i].color }}
                      animate={inView ? {
                        y: [0, 6, 0],
                        opacity: [0.3, 1, 0.3],
                      } : {}}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: dot * 0.2 + i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Live data packet animation */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white z-20 pointer-events-none"
            style={{ top: 0 }}
            animate={inView ? {
              top: ['5%', '95%'],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
            } : {}}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
            aria-hidden="true"
          />
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: '10×', label: 'Faster Production', color: '#D4AF37' },
            { value: '1000+', label: 'AI-Generated Levels', color: '#60a5fa' },
            { value: '∞', label: 'Live-Op Campaigns', color: '#34d399' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-heading font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
