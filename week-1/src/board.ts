import { createSquare } from "./components";
import { Game } from "./game";

const game = new Game();

export function createBoard(n: number): HTMLDivElement {
  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${n}, 60px)`;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const square = createSquare(row, col);
      square.style.gridRow = String(row + 1);
      square.style.gridColumn = String(col + 1);
      square.addEventListener("click", () => {
        square.textContent = game.play(row, col);
      });
      board.append(square);
    }
  }
  return board;
}
