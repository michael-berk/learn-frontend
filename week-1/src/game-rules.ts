import type { Mark } from "./types";

export function isWinner(
  x: number,
  y: number,
  board: Mark[][],
  winLength: number,
): boolean {
  const mark = board[y][x];
  if (mark === null) return false;

  for (const [dx, dy] of [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ]) {
    let count = 1; // latest move

    for (const sign of [-1, 1]) {
      let nx = x + dx * sign;
      let ny = y + dy * sign;

      while (
        ny >= 0 &&
        ny < board.length &&
        nx >= 0 &&
        nx < board[ny].length &&
        board[ny][nx] === mark
      ) {
        count++;
        nx += dx * sign;
        ny += dy * sign;
      }
    }

    if (count >= winLength) return true;
  }
  return false;
}

export function getMarkType(
  turnNumber: number,
  currentSquareValue: Mark,
): Mark {
  if (currentSquareValue === null) {
    return turnNumber % 2 === 0 ? "X" : "O";
  }

  return null;
}
