import "../style.css";
import { n } from "./game";
import { createFullBoard } from "./board";
import { Game } from "./game"

const game = new Game();
const board = createFullBoard(n, game);
document.body.append(board);
