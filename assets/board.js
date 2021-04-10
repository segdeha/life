import { Cell } from './cell.js'

// responsible for the game board
class Board {
    constructor(selector = '#board', rows = 8, cols = 8, percentAlive = 33) {
        this.board = document.querySelector(selector)
        if (!this.board) {
            throw 'No game board found'
        }
        this.rows = rows
        this.cols = cols
        this.percentAlive = percentAlive
        this.array = []
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
            this.array[r] = []
            const html = `<div class="row row-${r}"></div>`
            this.board.insertAdjacentHTML('beforeend', html)
            const row = document.querySelector(`.row.row-${r}`)

console.log('board:setup:row', row)

            for (let c = 0; c < this.cols; c += 1) {
                const cell = new Cell([r, c], this.isRandomlyAlive())

console.log('board:setup:cell', cell)

                row.appendChild(cell.node)
                this.array[r][c] = cell
            }
        }

console.log('✅ board set up')

        return this.board
    }
    // scan the board and tell each cell to update
    update() {
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.array[r][c].update()
            }
        }

console.log('✅ board updated')

    }
}

export { Board }
