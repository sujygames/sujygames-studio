'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 6;
const WORDS = ['FAITH', 'GRACE', 'PSALM', 'LOVE', 'EDEN'];

// 6×6 grid — all 5 words in straight lines
// FAITH → row 0, cols 0–4 (→ horizontal)
// GRACE → col 5, rows 1–5 (↓ vertical)
// PSALM → row 5, cols 0–4 (→ horizontal)
// LOVE  → col 0, rows 1–4 (↓ vertical)
// EDEN  → row 2, cols 1–4 (→ horizontal)
const INITIAL_GRID: string[][] = [
  ['F', 'A', 'I', 'T', 'H', 'K'],
  ['L', 'Q', 'X', 'B', 'Z', 'G'],
  ['O', 'E', 'D', 'E', 'N', 'R'],
  ['V', 'W', 'J', 'M', 'Y', 'A'],
  ['E', 'U', 'R', 'K', 'B', 'C'],
  ['P', 'S', 'A', 'L', 'M', 'E'],
];

const WORD_CELLS: Record<string, Set<string>> = {
  FAITH: new Set(['0,0','0,1','0,2','0,3','0,4']),
  GRACE: new Set(['1,5','2,5','3,5','4,5','5,5']),
  PSALM: new Set(['5,0','5,1','5,2','5,3','5,4']),
  LOVE:  new Set(['1,0','2,0','3,0','4,0']),
  EDEN:  new Set(['2,1','2,2','2,3','2,4']),
};

const WORD_COLORS: Record<string, string> = {
  FAITH: '#D4AF37',
  GRACE: '#34d399',
  PSALM: '#60a5fa',
  LOVE:  '#f472b6',
  EDEN:  '#a78bfa',
};

const WORD_HINTS: Record<string, string> = {
  FAITH: 'Row 1 →',
  LOVE:  'Col 1 ↓',
  EDEN:  'Row 3 →',
  GRACE: 'Col 6 ↓',
  PSALM: 'Row 6 →',
};

export default function WordConnectionDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [found, setFound] = useState<Set<string>>(new Set());
  const [shake, setShake] = useState(false);
  const [sparkle, setSparkle] = useState<string | null>(null);
  const [showHints, setShowHints] = useState(false);

  // Refs for drag-to-select — avoids stale closure issues
  const isDragging = useRef(false);
  const dragCells = useRef<string[]>([]);
  const foundRef = useRef<Set<string>>(new Set());

  // Keep foundRef in sync
  useEffect(() => { foundRef.current = found; }, [found]);

  const getWordForCells = useCallback((cells: string[]): string | null => {
    const cellSet = new Set(cells);
    for (const word of WORDS) {
      if (foundRef.current.has(word)) continue;
      const wCells = WORD_CELLS[word];
      if (wCells.size === cellSet.size && [...cellSet].every(c => wCells.has(c))) return word;
    }
    return null;
  }, []);

  const submitSelection = useCallback(() => {
    const cells = dragCells.current;
    if (cells.length === 0) return;

    const word = getWordForCells(cells);
    if (word) {
      setFound(prev => new Set([...prev, word]));
      setSparkle(word);
      setTimeout(() => setSparkle(null), 1000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setSelected(new Set());
    dragCells.current = [];
    isDragging.current = false;
  }, [getWordForCells]);

  // Global pointerup — fires even if pointer leaves the component
  useEffect(() => {
    const onUp = () => {
      if (isDragging.current) submitSelection();
    };
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  }, [submitSelection]);

  const getCellColor = (r: number, c: number): string => {
    const key = `${r},${c}`;
    for (const word of found) {
      if (WORD_CELLS[word].has(key)) return WORD_COLORS[word];
    }
    if (selected.has(key)) return '#D4AF37';
    return 'transparent';
  };

  const handlePointerDown = (r: number, c: number, e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    const key = `${r},${c}`;
    dragCells.current = [key];
    setSelected(new Set([key]));
  };

  const handlePointerEnter = (r: number, c: number) => {
    if (!isDragging.current) return;
    const key = `${r},${c}`;
    // Only add if not already in the list
    if (!dragCells.current.includes(key)) {
      dragCells.current = [...dragCells.current, key];
      setSelected(new Set(dragCells.current));
    }
  };

  const allFound = found.size === WORDS.length;

  return (
    <div className="flex flex-col items-center gap-3" style={{ userSelect: 'none' }}>
      <div className="text-sm text-gray-400 text-center">
        Swipe to trace <span className="text-[#D4AF37] font-bold">{WORDS.length}</span> biblical words
        {' · '}
        <span className="text-[#D4AF37]">{found.size}</span> found
      </div>

      {/* Grid */}
      <motion.div
        animate={shake ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        role="group"
        aria-label="Word search grid"
      >
        <div
          className="grid p-2 rounded-xl bg-[#071022] border border-white/10"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '5px',
            touchAction: 'none',
          }}
        >
          {INITIAL_GRID.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r},${c}`;
              const bg = getCellColor(r, c);
              const isSelected = selected.has(key);
              const isFound = [...found].some(w => WORD_CELLS[w].has(key));

              return (
                <div
                  key={key}
                  aria-label={`Letter ${letter}`}
                  className="relative flex items-center justify-center rounded-lg font-bold text-sm cursor-pointer select-none transition-all duration-150"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: bg !== 'transparent' ? bg + '30' : 'rgba(255,255,255,0.05)',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: bg !== 'transparent' ? bg : 'rgba(255,255,255,0.08)',
                    color: bg !== 'transparent' ? bg : '#9ca3af',
                    transform: isSelected && !isFound ? 'scale(1.12)' : 'scale(1)',
                    boxShadow: isSelected && !isFound ? `0 0 12px ${bg !== 'transparent' ? bg : '#D4AF37'}60` : 'none',
                    touchAction: 'none',
                    fontFamily: 'var(--font-poppins), sans-serif',
                  }}
                  onPointerDown={e => handlePointerDown(r, c, e)}
                  onPointerEnter={() => handlePointerEnter(r, c)}
                >
                  {letter}
                </div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Word badges */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]" role="list">
        {WORDS.map(word => (
          <motion.div
            key={word}
            role="listitem"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider"
            style={{
              backgroundColor: found.has(word) ? WORD_COLORS[word] + '20' : 'rgba(255,255,255,0.04)',
              color: found.has(word) ? WORD_COLORS[word] : '#374151',
              border: `1.5px solid ${found.has(word) ? WORD_COLORS[word] + '70' : 'rgba(255,255,255,0.08)'}`,
            }}
            animate={sparkle === word ? { scale: [1, 1.25, 1], y: [0, -5, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {found.has(word) ? (
              <><span>✓</span> {word}</>
            ) : (
              <>{showHints ? <span className="opacity-60">{WORD_HINTS[word]}</span> : '• '.repeat(word.length).trim()}</>
            )}
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          id="word-clear-btn"
          onClick={() => { setSelected(new Set()); dragCells.current = []; isDragging.current = false; }}
          className="px-4 py-1.5 text-xs rounded-full border border-white/20 text-gray-400 hover:text-white transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => setShowHints(h => !h)}
          className="px-4 py-1.5 text-xs rounded-full border border-white/20 text-gray-400 hover:text-white transition-colors"
        >
          {showHints ? 'Hide Hints' : '💡 Hints'}
        </button>
      </div>

      {/* Win state */}
      <AnimatePresence>
        {allFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-2"
          >
            <div className="text-3xl mb-1" aria-hidden="true">✨</div>
            <p className="text-[#D4AF37] font-bold text-sm">All words found! Praise the Lord!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
