import { Board } from './board.js'

// responsible for the game loop
class Game {
    /**
     * @param selector String CSS selector for the DOM node of the game board
     * @param rows Number Number of rows on the board
     * @param cols Number Number of columns on the board
     * @param interval Number Interval between board refreshes, in milliseconds
     */
    constructor(selector = '#board', rows = 8, cols = 8, interval = 1000) {
        this.selector = selector
        this.rows = rows
        this.cols = cols
        this.interval = interval
        this.timer = null
        this.setup()
    }
    // create the DOM nodes that represent the game board
    setup() {
        this.board = new Board(this.selector, this.rows, this.cols)
    }
    // start the game loop
    start() {
        this.timer = setInterval(this.board.update, this.interval)
        console.log('game started')
    }
    // stop the game loop
    stop () {
        clearInterval(this.timer)
        console.log('game stopped')
    }
    // clear the board
    clear() {
        this.board.innerHTML = ''
    }
}

export { Game }
