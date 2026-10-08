type Mark = "X" | "O" | null;
export const n = 50;

function isWinner(x: number, y: number, board: Mark[][]): boolean {
  // GenAI because learning algorithms is stupid
  const mark = board[y][x]
  if (mark === null) return false

  for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
    let count = 1 // latest move

    for (const sign of [-1, 1]) {
      let nx = x + dx * sign
      let ny = y + dy * sign

      while (ny >= 0 && ny < board.length &&
             nx >= 0 && nx < board[ny].length &&
             board[ny][nx] === mark) {
        count++
        nx += dx * sign
        ny += dy * sign
      }
    }

    if (count >= 5) return true
  }
  return false
}

export class Game {
  private turnNumber = 0;
  private board: Mark[][] = Array.from({ length: n }, () =>
    Array<Mark>(n).fill(null),
  );

  play(row: number, col: number): {mark: "X" | "O", winner:boolean} {
    this.turnNumber++;
    const mark = this.turnNumber % 2 === 0 ? "X" : "O";
    this.board[row][col] = mark;
    return {mark, winner: isWinner(col, row, this.board)};
  }

  reset(): void {
    this.turnNumber = 0;
  }
}
