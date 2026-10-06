export function createSquare(row: number, col: number): HTMLDivElement {
    const square = document.createElement('div')
    square.className = `square ${((row + col) % 2) === 1 ? 'light': 'dark'}`
    return square
}