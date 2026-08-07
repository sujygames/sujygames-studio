'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 3;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;
const IMAGE_SRC = '/jigsaw_noahs_ark.png';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function JigsawDemo() {
  const [pieces, setPieces] = useState<number[]>(() => shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [swapFlash, setSwapFlash] = useState<number | null>(null);

  const checkSolved = (arr: number[]) => arr.every((v, i) => v === i);

  const handlePieceClick = (slotIndex: number) => {
    if (solved) return;

    if (selected === null) {
      // First tap: select this piece
      setSelected(slotIndex);
    } else if (selected === slotIndex) {
      // Tap same piece: deselect
      setSelected(null);
    } else {
      // Second tap: swap with previously selected
      const next = [...pieces];
      [next[selected], next[slotIndex]] = [next[slotIndex], next[selected]];
      setPieces(next);
      setMoves(m => m + 1);
      setSwapFlash(slotIndex);
      setTimeout(() => setSwapFlash(null), 400);
      setSelected(null);
      if (checkSolved(next)) setSolved(true);
    }
  };

  const reset = () => {
    setPieces(shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
    setSolved(false);
    setMoves(0);
    setSelected(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-400 mb-1 text-center">
        {selected === null
          ? <>Tap a piece to select it · <span className="text-[#D4AF37] font-bold">{moves}</span> swaps</>
          : <span className="text-[#D4AF37] font-semibold">✦ Now tap another piece to swap!</span>
        }
      </div>

      <div
        className="relative rounded-xl p-1.5 border border-white/10 bg-[#071022]"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: '4px', width: '252px', height: '252px' }}
        role="group"
        aria-label="Jigsaw puzzle grid"
      >
        {pieces.map((pieceId, slotIndex) => {
          const col = pieceId % GRID_SIZE;
          const row = Math.floor(pieceId / GRID_SIZE);
          const isCorrect = pieceId === slotIndex;
          const isSelected = selected === slotIndex;
          const isFlashing = swapFlash === slotIndex;

          return (
            <motion.button
              key={`slot-${slotIndex}`}
              aria-label={`Puzzle piece ${slotIndex + 1}${isCorrect ? ' — correct' : ''}${isSelected ? ' — selected' : ''}`}
              onClick={() => handlePieceClick(slotIndex)}
              className="relative overflow-hidden rounded-lg cursor-pointer focus:outline-none"
              style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isSelected
                  ? '#D4AF37'
                  : isCorrect
                  ? 'rgba(34,197,94,0.7)'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: isSelected
                  ? '0 0 16px rgba(212,175,55,0.8), inset 0 0 8px rgba(212,175,55,0.2)'
                  : isCorrect
                  ? '0 0 8px rgba(34,197,94,0.4)'
                  : 'none',
              }}
              animate={{
                scale: isSelected ? 1.06 : isFlashing ? [1, 1.1, 1] : 1,
                zIndex: isSelected ? 10 : 1,
              }}
              transition={{ duration: 0.15 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Puzzle piece image */}
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${IMAGE_SRC})`,
                  backgroundSize: `${GRID_SIZE * 100}%`,
                  backgroundPosition: `${col * (100 / (GRID_SIZE - 1))}% ${row * (100 / (GRID_SIZE - 1))}%`,
                }}
              />
              {/* Selected shimmer overlay */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-[#D4AF37]/15"
                  animate={{ opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
              {/* Correct piece glow */}
              {isCorrect && !isSelected && (
                <motion.div
                  className="absolute inset-0 bg-green-400/10 rounded-lg"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}

        {/* Win overlay */}
        <AnimatePresence>
          {solved && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 rounded-xl backdrop-blur-sm z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.6 }}
                className="text-5xl mb-3"
                aria-hidden="true"
              >
                🏆
              </motion.div>
              <p className="text-white font-bold text-base">Solved in {moves} swaps!</p>
              <p className="text-[#D4AF37] text-xs mt-1">Noah's Ark complete!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 items-center">
        <button
          id="jigsaw-reset-btn"
          onClick={reset}
          className="px-5 py-2 text-sm rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-all duration-200"
          aria-label="Shuffle and reset jigsaw puzzle"
        >
          {solved ? '🔄 Play Again' : '🔀 Shuffle'}
        </button>
        {selected !== null && (
          <button
            onClick={() => setSelected(null)}
            className="px-4 py-2 text-xs rounded-full border border-[#D4AF37]/30 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors duration-200"
          >
            ✕ Deselect
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
        {pieces.map((pieceId, slotIndex) => (
          <div
            key={slotIndex}
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: pieceId === slotIndex ? '#22c55e' : 'rgba(255,255,255,0.15)' }}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        {pieces.filter((p, i) => p === i).length}/{TOTAL_PIECES} pieces correct
      </p>
    </div>
  );
}
