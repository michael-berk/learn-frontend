import "../style.css";
import { Game, n } from "./game";
import { createBoard, createOverlay } from "./board";

// Parent: owns the game state and wires the UI pieces together via callbacks.
const game = new Game();

// Overlay first: its reset callback only reads `board` when clicked, by which
// point `board` exists.
const overlay = createOverlay(() => {
  game.reset();
  board.clear();
});

const board = createBoard(
  n,
  (row, col) => game.play(row, col), // arrow keeps `this` bound to game
  overlay.show,
);

const wrapper = document.createElement("div");
wrapper.className = "board-wrapper";
wrapper.append(board.element, overlay.element);
document.body.append(wrapper);
