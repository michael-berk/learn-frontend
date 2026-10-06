import '../style.css'
import { n } from './game'
import { createBoard } from './board'

const board = createBoard(n)
document.body.append(board)