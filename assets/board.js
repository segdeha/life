import { Cell } from './cell.js'

// responsible for the game board
class Board {
    constructor(selector, rows = 8, cols = 8, percentAlive = 50) {
        if (!selector) {
            throw 'No CSS selector for the game board'
        }
        this.board = document.querySelector(selector)
        this.rows = rows
        this.cols = cols
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
        for (let r = 0; r < this.rows; r += 1) {
            this.array[r] = []
            for (let c = 0; c < this.cols; c += 1) {
                const cell = new Cell([c, r])
                this.board.appendChild(cell.node)
                this.array[r][c] = cell
            }
        }
        console.log('board set up')
        return this.board
    }
    // scan the board and tell each cell to update
    update() {
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.array[r][c].update()
            }
        }
        console.log('board updated')
    }
}

export { Board }
