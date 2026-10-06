// this should be managed with react, but for this tutorial we'll handle state management manually
let turnNumber = 0
type Mark = 'X' | 'O' | null
export const n = 50

export class Game {
    private turnNumber = 0
    private board: Mark[][] = Array.from( {length: 8}, () => Array<Mark>(n).fill(null))

    play(row: number, col: number): 'X' | 'O' {
        this.turnNumber++
        const mark = this.turnNumber % 2 === 0 ? 'X' : 'O'
        this.board[row][col] = mark 
        return mark 
    }

    reset(): void {
        this.turnNumber = 0
    }
}