import { isWinner, getMarkType } from "./game-rules";
import type { Mark } from "./types";

export const n = 50;
const winLength = 3;

export class Game {
  // state for the game - just a data object
  private turnNumber = 0;
  private board: Mark[][] = Array.from({ length: n }, () =>
    Array<Mark>(n).fill(null),
  );

  play(row: number, col: number): { mark: Mark; winner: boolean } {
    if (this.board[row][col] !== null) return { mark: null, winner: false };
    this.turnNumber++;
    const mark = getMarkType(this.turnNumber, this.board[row][col]);
    this.board[row][col] = mark;
    return { mark, winner: isWinner(col, row, this.board, winLength) };
  }

  reset(): void {
    this.turnNumber = 0;
    this.board = Array.from({ length: n }, () => Array<Mark>(n).fill(null));
  }
}
