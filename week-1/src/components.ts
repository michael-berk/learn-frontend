function isLight(row: number, col: number): boolean {
    if ((row + col) % 2 === 1) {
        return false
    }
    return true 
}

export function createSquare(row: number, col: number): HTMLDivElement {
    const square = document.createElement('div')
    square.className = `square ${isLight(row, col) ? 'light': 'dark'}`
    return square
}