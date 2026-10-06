import { createSquare } from './components'
import '../style.css'

const n = 50;

const board = document.createElement('div')
board.style.display = 'grid'
board.style.gridTemplateColumns = `repeat(${n}, 60px)`

for (let row = 0; row < n; row++) {
  for (let col = 0; col < n; col++) {
    const square = createSquare(row, col)
    square.style.gridRow = String(row + 1)
    square.style.gridColumn = String(col + 1)
    board.append(square)
  }
}

document.body.append(board)