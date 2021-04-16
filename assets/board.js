import { Cell } from './cell.js'

// responsible for the game board
class Board {
    /**
     * @param selector String CSS selector to query for the DOM node containing the board
     * @param rows Number Number of rows in the board grid
     * @param cols Number Number of columns in the board grid
     * @param density Number Percentage of the board that should contain live cells in the first generation
     * @param startGrid String Optional string of 1s and 0s defining the initial grid
     */
    constructor(selector = '#board', rows = 8, cols = 8, density = 33, startGrid) {
        this.node = document.querySelector(selector)
        if (!this.node) {
            throw 'No game board found'
        }
        this.rows = rows
        this.cols = cols
        this.density = density
        this.startGrid = startGrid
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
        // if startGrid is set, transform it into an array of values
        const startGrid = this.startGrid && this.startGrid.split('')
        // create a Cell for each row x column
        for (let r = 0; r < this.rows; r += 1) {
            // create the row in the DOM
            const html = `<div class="row row-${r}"></div>`
            this.node.insertAdjacentHTML('beforeend', html)
            // create a place to store the cells in memory
            this.grid[r] = []
            // create the cells
            for (let c = 0; c < this.cols; c += 1) {
                let isAlive
                let cFlat = c + (r * this.cols)
                // if startGrid is an array (i.e. not undefined) and there is a value at the
                // position we need, use it to determine whether the cell is alive or not
                if (Array.isArray(startGrid) && 'undefined' !== typeof startGrid[cFlat]) {
                    isAlive = startGrid[cFlat] == 1
                }
                // if we have a startGrid, but it doesn’t have enough values, default to not alive
                else if (Array.isArray(startGrid) && 'undefined' === typeof startGrid[cFlat]) {
                    isAlive = false
                }
                // assign alive or not randomly, weighted by density setting
                else {
                    isAlive = this.isRandomlyAlive()
                }
                const cell = new Cell(r, c, isAlive)
                this.grid[r][c] = cell
            }
        }
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
    }
}

export { Board }
