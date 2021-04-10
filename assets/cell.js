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
    // for the 8 neighboring cells, how many are alive?
    /*

    |----|---|----|
    | NW | N | NE |
    |----|---|----|
    | W  | C |  E |
    |----|---|----|
    | SW | S | SE |
    |----|---|----|

    */
    numberOfLivingNeighbors(grid) {
        const [ row, col ] = this.position

        const row_minus = row - 1
        const col_minus = col - 1

        const row_plus = row + 1
        const col_plus = col + 1

        const north = grid[row_minus] && grid[row_minus][col]
        const south = grid[row_plus] && grid[row_plus][col]
        const east = grid[row][col_plus]
        const west = grid[row][col_minus]

        const nw = grid[row_minus] && grid[row_minus][col_minus]
        const ne = grid[row_minus] && grid[row_minus][col_plus]
        const sw = grid[row_plus] && grid[row_plus][col_minus]
        const se = grid[row_plus] && grid[row_plus][col_plus]

        let count = 0

        count += north && north.alive ? 1 : 0
        count += south && south.alive ? 1 : 0
        count += east && east.alive ? 1 : 0
        count += west && west.alive ? 1 : 0

        count += nw && nw.alive ? 1 : 0
        count += ne && ne.alive ? 1 : 0
        count += sw && sw.alive ? 1 : 0
        count += se && se.alive ? 1 : 0

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
