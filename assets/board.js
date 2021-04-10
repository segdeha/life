import { Cell } from './cell.js'

// responsible for the game board
class Board {
    constructor(selector = '#board', rows = 8, cols = 8, percentAlive = 33) {
        this.node = document.querySelector(selector)
        if (!this.node) {
            throw 'No game board found'
        }
        this.rows = rows
        this.cols = cols
        this.percentAlive = percentAlive
        this.grid = []
        this.setup()
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
            this.grid[r] = []
            const html = `<div class="row row-${r}"></div>`
            this.node.insertAdjacentHTML('beforeend', html)
            const row = document.querySelector(`.row.row-${r}`)
            for (let c = 0; c < this.cols; c += 1) {
                const cell = new Cell(r, c, this.isRandomlyAlive())
                this.grid[r][c] = cell
            }
        }
    }
    // scan the board and tell each cell to update
    update() {
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.grid[r][c].update(this.grid)
            }
        }
    }
}

export { Board }
