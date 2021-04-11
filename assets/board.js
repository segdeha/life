import { Cell } from './cell.js'

// responsible for the game board
class Board {
    constructor(selector = '#board', rows = 8, cols = 8, density = 33) {
        this.node = document.querySelector(selector)
        if (!this.node) {
            throw 'No game board found'
        }
        this.rows = rows
        this.cols = cols
        this.density = density
        this.generations = 0
        this.generationsNode = document.getElementById('generations')
        this.grid = []
        this.setup()
    }
    // return true or false at some random interval
    isRandomlyAlive() {
        // return true or false weighted to the density number
        const weight = this.density / 100
        return Math.random() >= weight
    }
    // create the DOM nodes for the game board
    setup() {
        // create a Cell for each row x column
        for (let r = 0; r < this.rows; r += 1) {
            // create the row in the DOM
            const html = `<div class="row row-${r}"></div>`
            this.node.insertAdjacentHTML('beforeend', html)
            // create a place to store the cells in memory
            this.grid[r] = []
            // create the cells
            for (let c = 0; c < this.cols; c += 1) {
                const cell = new Cell(r, c, this.isRandomlyAlive())
                this.grid[r][c] = cell
            }
        }
        this.generations += 0
        this.updateGeneration()
    }
    // scan the board and tell each cell to update
    // we do this in three passes so we don’t interfere
    // with the values of neighbors while we determine
    // which cells will live and die in the next round
    update() {
        // first, update the state of each cell
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.grid[r][c].update(this.grid)
            }
        }
        // second commit the new values
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.grid[r][c].commit()
            }
        }
        // lastly, re-render the cells based on their new states
        for (let r = 0; r < this.rows; r += 1) {
            for (let c = 0; c < this.cols; c += 1) {
                this.grid[r][c].render()
            }
        }
        this.generations += 1
        this.updateGeneration()
    }
    // display the current generation
    updateGeneration() {
        this.generationsNode.innerHTML = this.generations
    }
}

export { Board }
