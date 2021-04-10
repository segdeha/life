import { Cell } from './cell.js'

// responsible for the game board
class Board() {
    constructor(selector, cols = 8, rows = 8, percentAlive = 50) {
        if (!selector) {
            throw 'No CSS selector for the game board'
        }
        this.board = document.querySelector(selector)
        this.cols = cols
        this.rows = rows
        this.percentAlive = percentAlive
        this.array = []
    }
    // return true or false at some random interval
    isRandomlyAlive() {
        // return true or false weighted to the percentAlive number
        const weight = this.percentAlive / 100
        return Math.random() >= weight
    }
    // create the DOM nodes for the game board
    setup() {
        // create a Cell for each column x row
        for (let c = 0; c < this.cols; c += 1) {
            this.array[c] = []
            for (let r = 0; r < this.rows; r += 1) {
                const cell = new Cell([c, r])
                this.board.appendChild(cell.node)
                this.array[c][r] = cell
            }
        }
        return this.board
    }
    // scan the board and tell each cell to update
    scan() {
        for (let c = 0; c < this.cols; c += 1) {
            for (let r = 0; r < this.rows; r += 1) {
                this.array[c][r].update()
            }
        }
    }
}

export { Board }
