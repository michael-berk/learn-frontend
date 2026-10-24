import type { Mark } from "./types";

// The board is a flat array: cell (x, y) lives at index y * n + x.
export function isWinner(
  index: number,
  board: Mark[],
  n: number,
  winLength: number,
): boolean {
  const mark = board[index];
  if (mark === null) return false;
  const x = index % n;
  const y = Math.floor(index / n);

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
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        board[ny * n + nx] === mark
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

export function getMarkType(turnNumber: number): Mark {
  return turnNumber % 2 === 0 ? "X" : "O";
}
