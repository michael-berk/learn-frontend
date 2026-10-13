import type { Mark } from "./types";

// Pure UI: nothing in this file knows about Game. The parent (main.ts) owns
// state and wires these pieces together through callbacks.

type MoveResult = { mark: Mark; winner: boolean };

function createSquare(row: number, col: number): HTMLDivElement {
  const square = document.createElement("div");
  square.className = `square ${(row + col) % 2 === 1 ? "light" : "dark"}`;
  return square;
}

export function createOverlay(onReset: () => void): {
  element: HTMLDivElement;
  show: (winner: Mark) => void;
} {
  const overlay = document.createElement("div");
  overlay.className = "winner-overlay";
  overlay.hidden = true;

  const message = document.createElement("h2");

  const close = document.createElement("button");
  close.textContent = "x";
  close.addEventListener("click", () => {
    overlay.hidden = true;
  });

  const reset = document.createElement("button");
  reset.textContent = "Reset game";
  reset.addEventListener("click", () => {
    onReset();
    overlay.hidden = true;
  });

  const panel = document.createElement("div");
  panel.className = "winner-panel";
  panel.append(close, message, reset);
  overlay.append(panel);

  function show(winner: Mark) {
    message.textContent = `Winner: ${winner}`;
    overlay.hidden = false;
  }

  return { element: overlay, show };
}

export function createBoard(
  n: number,
  onMove: (row: number, col: number) => MoveResult,
  onWinner: (winner: Mark) => void,
): { element: HTMLDivElement; clear: () => void } {
  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${n}, 60px)`;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const square = createSquare(row, col);
      square.addEventListener("click", () => {
        const result = onMove(row, col);
        if (result.mark === null) return; // square already taken
        square.textContent = result.mark;
        if (result.winner) onWinner(result.mark);
      });
      board.append(square);
    }
  }

  function clear() {
    for (const square of board.children) square.textContent = "";
  }

  return { element: board, clear };
}
