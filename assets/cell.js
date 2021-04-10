// responsible for the behavior of a single cell
class Cell {
    /**
     * @param row Number Number representing the row of this cell on the board
     * @param col Number Number representing the column of this cell on the board
     * @param alive Boolean Optional initial state of this cell (true === alive, false === dead)
     */
    constructor(row, col, alive = false) {
        this.position = [row, col]
        this.alive = alive
        this.create()
    }
    // for the 4 neighboring cells, how many are alive?
    numberOfLivingNeighbors(grid) {
        const [ row, col ] = this.position

        const north = grid[row - 1] && grid[row - 1][col]
        const south = grid[row + 1] && grid[row + 1][col]
        const east = grid[row][col + 1]
        const west = grid[row][col - 1]

        let count = 0

        count += north && north.alive ? 1 : 0
        count += south && south.alive ? 1 : 0
        count += east && east.alive ? 1 : 0
        count += west && west.alive ? 1 : 0

        return count
    }
    satisfiesBirthRule(grid) {
        // We only get here if this.alive is false
        // An empty, or “dead,” cell with precisely three “live” neighbors
        // (full cells) becomes live.
        return 3 === this.numberOfLivingNeighbors(grid)
    }
    satisfiesDeathRule(grid) {
        // We only get here if this.alive is true
        // A live cell with zero or one neighbors dies of isolation;
        // a live cell with four or more neighbors dies of overcrowding.
        const count = this.numberOfLivingNeighbors(grid)
        return count < 2 || count > 3
    }
    /* this rule isn't needed because the other 2 rules imply this rule
    meetsSurvivalRule() {
        // A live cell with two or three neighbors remains alive.
        // NEVER GETS CALLED, COVERED BY THE OTHER 2 RULES
    }
    */
    getSelector() {
        return `.cell.row-${this.position[0]}.col-${this.position[1]}`
    }
    getClassName() {
        return `cell row-${this.position[0]} col-${this.position[1]} ${this.alive ? 'alive' : 'dead'}`
    }
    /**
     * Create the DOM node for this cell, insert it into the proper row
     */
    create() {
        const row = document.querySelector(`.row.row-${this.position[0]}`)
        const html = `<div class="${this.getClassName()}"></div>`
        row.insertAdjacentHTML('beforeend', html)
        const selector = this.getSelector()
        this.node = document.querySelector(selector)
    }
    /**
     * Update the state of this cell
     * @param grid Array Array of arrays representing the state of the board
     */
    update(grid) {
        if (this.alive) {
            if (this.satisfiesDeathRule(grid)) {
                this.alive = false
            }
        }
        // this.alive === false
        else {
            if (this.satisfiesBirthRule(grid)) {
                this.alive = true
            }
        }
        this.node.className = this.getClassName()
    }
}

export { Cell }
