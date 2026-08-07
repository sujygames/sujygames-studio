'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 6;
const WORDS = ['FAITH', 'GRACE', 'PSALM', 'LOVE', 'EDEN'];

// 6×6 grid — all 5 words hidden in straight lines (horizontal or vertical)
// FAITH  → row 0, cols 0-4 (horizontal)
// GRACE  → col 5, rows 1-5 (vertical ↓)
// PSALM  → row 5, cols 0-4 (horizontal)
// LOVE   → col 0, rows 1-4 (vertical ↓)
// EDEN   → row 2, cols 1-4 (horizontal)
const INITIAL_GRID: string[][] = [
  ['F', 'A', 'I', 'T', 'H', 'K'],
  ['L', 'Q', 'X', 'B', 'Z', 'G'],
  ['O', 'E', 'D', 'E', 'N', 'R'],
  ['V', 'W', 'J', 'M', 'Y', 'A'],
  ['E', 'U', 'R', 'K', 'B', 'C'],
  ['P', 'S', 'A', 'L', 'M', 'E'],
];

const WORD_CELLS: Record<string, Set<string>> = {
  FAITH: new Set(['0,0', '0,1', '0,2', '0,3', '0,4']),
  GRACE: new Set(['1,5', '2,5', '3,5', '4,5', '5,5']),
  PSALM: new Set(['5,0', '5,1', '5,2', '5,3', '5,4']),
  LOVE:  new Set(['1,0', '2,0', '3,0', '4,0']),
  EDEN:  new Set(['2,1', '2,2', '2,3', '2,4']),
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
  const [shake, setShake] = useState(false);
  const [sparkle, setSparkle] = useState<string | null>(null);
  const isDragging = useRef(false);
  const dragCells = useRef<Set<string>>(new Set());

  const getWordForCells = (cells: Set<string>): string | null => {
    for (const word of WORDS) {
      if (found.has(word)) continue;
      const wCells = WORD_CELLS[word];
      if (wCells.size === cells.size && [...cells].every(c => wCells.has(c))) return word;
    }
    return null;
  };

  const submitSelection = useCallback((cells: Set<string>) => {
    const word = getWordForCells(cells);
    if (word) {
      setFound(prev => new Set([...prev, word]));
      setSparkle(word);
      setTimeout(() => setSparkle(null), 1000);
    } else if (cells.size > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setSelected(new Set());
    dragCells.current = new Set();
  }, [found]);

  const getCellColor = (r: number, c: number): string => {
    const key = `${r},${c}`;
    for (const word of found) {
      if (WORD_CELLS[word].has(key)) return WORD_COLORS[word];
    }
    if (selected.has(key)) return '#D4AF37';
    return 'transparent';
  };

  // Pointer events for drag-to-select (mimics real game swiping)
  const handlePointerDown = (r: number, c: number) => {
    isDragging.current = true;
    const key = `${r},${c}`;
    dragCells.current = new Set([key]);
    setSelected(new Set([key]));
  };

  const handlePointerEnter = (r: number, c: number) => {
    if (!isDragging.current) return;
    const key = `${r},${c}`;
    if (!dragCells.current.has(key)) {
      dragCells.current.add(key);
      setSelected(new Set(dragCells.current));
    }
  };

  const handlePointerUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      submitSelection(new Set(dragCells.current));
    }
  };

  const allFound = found.size === WORDS.length;

  return (
    <div
      className="flex flex-col items-center gap-4"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="text-sm text-gray-400 mb-2">
        Drag to find <span className="text-[#D4AF37] font-bold">{WORDS.length}</span> biblical words · {found.size} found
      </div>

      {/* Grid */}
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        role="group"
        aria-label="Word search grid"
        style={{ touchAction: 'none', userSelect: 'none' }}
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
                <motion.div
                  key={key}
                  aria-label={`${isSelected ? 'Selected: ' : ''}Letter ${letter}`}
                  className="w-10 h-10 rounded-lg font-bold text-sm font-heading relative overflow-hidden border transition-colors duration-200 flex items-center justify-center cursor-pointer select-none"
                  style={{
                    backgroundColor: bg !== 'transparent' ? bg + '33' : 'rgba(255,255,255,0.05)',
                    borderColor: bg !== 'transparent' ? bg : 'rgba(255,255,255,0.1)',
                    color: bg !== 'transparent' ? bg : '#9ca3af',
                    touchAction: 'none',
                  }}
                  onPointerDown={() => handlePointerDown(r, c)}
                  onPointerEnter={() => handlePointerEnter(r, c)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {letter}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg"
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ duration: 0.1 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Clear */}
      <button
        id="word-clear-btn"
        onClick={() => { setSelected(new Set()); dragCells.current = new Set(); }}
        className="px-5 py-2 text-xs rounded-full border border-white/20 text-gray-400 hover:text-white transition-colors duration-200"
        aria-label="Clear selection"
      >
        Clear Selection
      </button>

      {/* Found words */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]" role="list" aria-label="Found words">
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
