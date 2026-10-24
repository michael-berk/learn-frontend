import "./style.css";
import { useState } from "react";
import { Board, WinnerOverlay } from "./Board";
import { getMarkType, isWinner } from "./game-rules";
import type { Mark } from "./types";

const n = 50;
const winLength = 3;
const emptyBoard = (): Mark[] => Array<Mark>(n * n).fill(null);

// Parent: owns the game state and passes values + callbacks down.
export default function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [lastMove, setLastMove] = useState<number | null>(null);

  // Derived during render, never stored
  const turnNumber = board.filter((mark) => mark !== null).length;
  const winner = lastMove !== null && isWinner(lastMove, board, n, winLength) ? board[lastMove] : null;

  function play(index: number) {
    if (board[index] !== null) return; // square already taken
    const next = [...board]; // new array, so React sees the change
    next[index] = getMarkType(turnNumber);
    setBoard(next);
    setLastMove(index);
  }

  function reset() {
    setBoard(emptyBoard());
    setLastMove(null);
  }

  return (
    <div className="board-wrapper">
      <Board n={n} board={board} onPlay={play} />
      {/* key: a new win remounts the overlay, so it opens again even if you closed the last one */}
      {winner && <WinnerOverlay key={lastMove} winner={winner} onReset={reset} />}
    </div>
  );
}
