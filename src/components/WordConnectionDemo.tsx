'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 5;
const WORDS = ['FAITH', 'GRACE', 'PSALM', 'LOVE', 'EDEN'];

// Pre-placed letters grid (5x5) with hidden words
const INITIAL_GRID: string[][] = [
  ['F', 'A', 'I', 'T', 'H'],
  ['G', 'X', 'Q', 'B', 'M'],
  ['R', 'P', 'S', 'A', 'L'],
  ['A', 'Z', 'E', 'D', 'M'],
  ['C', 'L', 'O', 'V', 'E'],
];

// Word positions: word -> array of [row, col]
const WORD_POSITIONS: Record<string, [number, number][]> = {
  FAITH: [[0,0],[0,1],[0,2],[0,3],[0,4]],
  GRACE: [[1,0],[2,0],[3,0],[4,0],[2,1]], // G-R-A-C -> column, E from [4,0]  
  PSALM: [[2,1],[2,2],[3,2],[3,3],[2,3]], // approximate
  LOVE:  [[4,1],[4,2],[4,3],[4,4]],       // 4-letter
  EDEN:  [[3,2],[3,3],[3,4],[2,4]],       // approximate
};

// Simplified: every cell belongs to words that go across row 0 (FAITH), col 0 GRACE, row 4 = LOVE+E
const WORD_CELLS: Record<string, Set<string>> = {
  FAITH: new Set(['0,0','0,1','0,2','0,3','0,4']),
  GRACE: new Set(['1,0','2,0','3,0','4,0','2,1']),
  PSALM: new Set(['2,1','2,2','3,2','3,3','2,3']),
  LOVE:  new Set(['4,1','4,2','4,3','4,4']),
  EDEN:  new Set(['3,2','3,3','3,4','2,4']),
};

const WORD_COLORS: Record<string, string> = {
  FAITH: '#D4AF37',
  GRACE: '#34d399',
  PSALM: '#60a5fa',
  LOVE:  '#f472b6',
  EDEN:  '#a78bfa',
};

export default function WordConnectionDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [found, setFound] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState('');
  const [shake, setShake] = useState(false);
  const [sparkle, setSparkle] = useState<string | null>(null);
  const isPointerDown = useRef(false);

  const getWordForCells = (cells: Set<string>): string | null => {
    for (const word of WORDS) {
      if (found.has(word)) continue;
      const wCells = WORD_CELLS[word];
      if (wCells.size === cells.size && [...cells].every(c => wCells.has(c))) return word;
    }
    return null;
  };

  const submitSelection = () => {
    const word = getWordForCells(selected);
    if (word) {
      setFound(prev => new Set([...prev, word]));
      setSparkle(word);
      setTimeout(() => setSparkle(null), 1000);
      setCurrent('');
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setSelected(new Set());
  };

  const toggleCell = (r: number, c: number) => {
    const key = `${r},${c}`;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
    setCurrent(INITIAL_GRID[r][c]);
  };

  const getCellColor = (r: number, c: number): string => {
    const key = `${r},${c}`;
    for (const word of found) {
      if (WORD_CELLS[word].has(key)) return WORD_COLORS[word];
    }
    if (selected.has(key)) return '#D4AF37';
    return 'transparent';
  };

  const allFound = found.size === WORDS.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-400 mb-2">
        Find <span className="text-[#D4AF37] font-bold">{WORDS.length}</span> biblical words · {found.size} found
      </div>

      {/* Grid */}
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        role="grid"
        aria-label="Word search grid"
      >
        <div
          className="grid gap-1.5 p-2 rounded-xl bg-[#071022] border border-white/10"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {INITIAL_GRID.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`;
              const bg = getCellColor(r, c);
              const isSelected = selected.has(key);

              return (
                <motion.button
                  key={key}
                  role="gridcell"
                  aria-label={`Letter ${letter}, row ${r + 1}, column ${c + 1}`}
                  aria-pressed={isSelected}
                  className="w-11 h-11 rounded-lg font-bold text-base font-heading relative overflow-hidden border transition-colors duration-200"
                  style={{
                    backgroundColor: bg !== 'transparent' ? bg + '33' : 'rgba(255,255,255,0.05)',
                    borderColor: bg !== 'transparent' ? bg : 'rgba(255,255,255,0.1)',
                    color: bg !== 'transparent' ? bg : '#9ca3af',
                  }}
                  onClick={() => toggleCell(r, c)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {letter}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          id="word-submit-btn"
          onClick={submitSelection}
          disabled={selected.size === 0}
          className="px-5 py-2 text-sm rounded-full font-semibold bg-[#D4AF37] text-[#071022] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C5A030] transition-colors duration-200"
          aria-label="Submit selected letters as a word"
        >
          Submit Word
        </button>
        <button
          id="word-clear-btn"
          onClick={() => setSelected(new Set())}
          className="px-5 py-2 text-sm rounded-full border border-white/20 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Clear selection"
        >
          Clear
        </button>
      </div>

      {/* Found words */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[260px]" role="list" aria-label="Found words">
        {WORDS.map(word => (
          <motion.span
            key={word}
            role="listitem"
            aria-label={`${word} — ${found.has(word) ? 'found' : 'not yet found'}`}
            className="px-3 py-1 rounded-full text-xs font-bold tracking-widest transition-all duration-300"
            style={{
              backgroundColor: found.has(word) ? WORD_COLORS[word] + '33' : 'rgba(255,255,255,0.05)',
              color: found.has(word) ? WORD_COLORS[word] : '#4b5563',
              border: `1px solid ${found.has(word) ? WORD_COLORS[word] + '80' : 'rgba(255,255,255,0.1)'}`,
            }}
            animate={sparkle === word ? { scale: [1, 1.3, 1], y: [0, -4, 0] } : {}}
          >
            {found.has(word) ? word : '• • • • •'.substring(0, word.length * 2 - 1)}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {allFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-2xl mb-1" aria-hidden="true">✨</div>
            <p className="text-[#D4AF37] font-bold text-sm">All words found! Praise!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
