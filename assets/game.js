import { Board } from './board.js'

// responsible for the game loop
class Game() {
    /**
     * @param selector String CSS selector for the DOM node of the game board
     * @param cols Number Number of columns on the board
     * @param rows Number Number of rows on the board
     */
    constructor(selector = '#board', cols = 8, rows = 8, interval = 1000) {
        this.selector = selector
        this.cols = cols
        this.rows = rows
        this.interval = interval
        this.timer = null
        this.setup()
    }
    // create the DOM nodes that represent the game board
    setup() {
        this.board = new Board(this.selector, this.cols, this.rows)
    }
    // start the game loop
    start() {
        this.timer = setInterval(this.board.update, this.interval)
    }
    // stop the game loop
    stop () {
        cancelInterval(this.timer)
    }
    // clear the board
    clear() {
        this.board.innerHTML = ''
    }
}

export { Game }
