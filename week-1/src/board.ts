import { createSquare } from "./components";
import { Game } from "./game";

function createOverlay(game: Game): {element: HTMLDivElement, handleWinner: (winner: "X" | "O") => void} {
  // create hidable/mutable element
  const overlay = document.createElement('div');
  overlay.className = 'winner-overlay'
  overlay.hidden = true

  const message = document.createElement("h2");
  const close = document.createElement("button");
  close.textContent = 'x';
  close.addEventListener('click', () => { overlay.hidden = true})

  const reset = document.createElement('button')
  reset.textContent = 'Reset game'
  reset.addEventListener('click', () => {
    game.reset()
    overlay.hidden = true
    //hacking this
    const board = document.getElementById("game-board")
    if (!board) return;
    for (const square of board.children) {
      square.textContent = ""
    }
  })

  const panel = document.createElement("div");
  panel.className = "winner-panel";
  panel.append(close, message, reset);
  overlay.append(panel);


  // callbacks to manage state
  function handleWinner(winner: "X" | "O" | null) {
    if (winner != null) {
      message.textContent = `Winner: ${winner}`
      overlay.hidden = false
      
    } else if (!overlay.hidden) {
      overlay.hidden = true
    }
  } 

  return { element: overlay, handleWinner: handleWinner}
}

function createBoard(n: number, game: Game, handleWinner: (winner: "X" | "O") => void): HTMLDivElement {
  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${n}, 60px)`;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const square = createSquare(row, col);
      square.style.gridRow = String(row + 1);
      square.style.gridColumn = String(col + 1);
      square.addEventListener("click", () => {
        const result = game.play(row, col)
        square.textContent = result.mark
        if (result.winner) {
          handleWinner(result.mark)

        }
      });
      board.append(square);
    }
  }
  return board;
}

export function createFullBoard(n: number, game: Game) {
  // parent that's in charge of managing callbacks and hiding/showing the overlay
  const wrapper = document.createElement('div')
  wrapper.className = 'board-wrapper'

  // children of the wrapper that react to callbacks
  const overlay = createOverlay(game)
  const board = createBoard(n, game, overlay.handleWinner)
  board.id = "game-board"

  wrapper.append(board, overlay.element)

  return wrapper

}