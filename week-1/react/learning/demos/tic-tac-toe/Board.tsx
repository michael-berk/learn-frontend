import { useState } from "react";
import type { Mark } from "./types";

// Pure UI: nothing in this file knows the game rules. The parent (App) owns
// state and passes values + callbacks down.

function Square({ index, n, mark, onClick }: { index: number; n: number; mark: Mark; onClick: () => void }) {
  const row = Math.floor(index / n);
  const col = index % n;
  return (
    <div className={`square ${(row + col) % 2 === 1 ? "light" : "dark"}`} onClick={onClick}>
      {mark}
    </div>
  );
}

export function Board({ n, board, onPlay }: { n: number; board: Mark[]; onPlay: (index: number) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 60px)` }}>
      {/* Index keys are fine here: cells never get inserted or reordered */}
      {board.map((mark, i) => (
        <Square key={i} index={i} n={n} mark={mark} onClick={() => onPlay(i)} />
      ))}
    </div>
  );
}

export function WinnerOverlay({ winner, onReset }: { winner: Mark; onReset: () => void }) {
  // Local UI state: only the overlay cares whether it's open
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="winner-overlay">
      <div className="winner-panel">
        <button onClick={() => setOpen(false)}>x</button>
        <h2>Winner: {winner}</h2>
        <button onClick={onReset}>Reset game</button>
      </div>
    </div>
  );
}
