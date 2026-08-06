'use client';
import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 3;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;
const IMAGE_SRC = '/feature1.png'; // Words of Bible screenshot

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  const checkSolved = (arr: number[]) => arr.every((v, i) => v === i);

  const handleDragStart = (slotIndex: number) => {
    setDraggedIndex(slotIndex);
  };

  const handleDrop = (targetSlotIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetSlotIndex) {
      setDraggedIndex(null);
      return;
    }
    const next = [...pieces];
    [next[draggedIndex], next[targetSlotIndex]] = [next[targetSlotIndex], next[draggedIndex]];
    setPieces(next);
    setMoves((m) => m + 1);
    setDraggedIndex(null);
    if (checkSolved(next)) setSolved(true);
  };

  const reset = () => {
    setPieces(shuffle(Array.from({ length: TOTAL_PIECES }, (_, i) => i)));
    setSolved(false);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm text-gray-400 mb-2">
        Drag pieces to solve • Moves: <span className="text-[#D4AF37] font-bold">{moves}</span>
      </div>

      <div
        className="relative grid gap-1 bg-[#071022] rounded-xl p-2 border border-white/10"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, width: '240px', height: '240px' }}
        role="grid"
        aria-label="Jigsaw puzzle grid"
      >
        {pieces.map((pieceId, slotIndex) => {
          const col = pieceId % GRID_SIZE;
          const row = Math.floor(pieceId / GRID_SIZE);
          const isCorrect = pieceId === slotIndex;
          const isDragging = draggedIndex === slotIndex;

          return (
            <motion.div
              key={`slot-${slotIndex}`}
              role="gridcell"
              aria-label={`Slot ${slotIndex + 1}, piece ${pieceId + 1}${isCorrect ? ', correct position' : ''}`}
              draggable
              onDragStart={() => handleDragStart(slotIndex)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(slotIndex)}
              className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing border-2 transition-all duration-200"
              style={{
                borderColor: isDragging ? '#D4AF37' : isCorrect ? 'rgba(34,197,94,0.6)' : 'rgba(255,255,255,0.1)',
                opacity: isDragging ? 0.5 : 1,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              animate={isCorrect && !isDragging ? { boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 8px rgba(34,197,94,0.6)', '0 0 0px rgba(34,197,94,0)'] } : {}}
              transition={{ duration: 1.5, repeat: isCorrect ? Infinity : 0 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${IMAGE_SRC})`,
                  backgroundSize: `${GRID_SIZE * 100}%`,
                  backgroundPosition: `${col * 50}% ${row * 50}%`,
                }}
              />
            </motion.div>
          );
        })}

        {/* Win overlay */}
        <AnimatePresence>
          {solved && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-4xl mb-2"
                aria-hidden="true"
              >
                🏆
              </motion.div>
              <p className="text-white font-bold text-sm">Solved in {moves} moves!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        id="jigsaw-reset-btn"
        onClick={reset}
        className="px-4 py-2 text-sm rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/40 transition-all duration-200"
        aria-label="Reset jigsaw puzzle"
      >
        {solved ? '🔄 Play Again' : '🔀 Shuffle'}
      </button>
    </div>
  );
}
