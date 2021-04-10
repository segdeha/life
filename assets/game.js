import { Board } from './board.js'

// responsible for the game loop
class Game {
    /**
     * @param selector String CSS selector for the DOM node of the game board
     * @param options Object Game options: grid-size, starting-density, refresh-interval
     */
    constructor(selector, options) {
        this.selector = selector
        this.rows = options['grid-size']
        this.cols = options['grid-size']
        this.density = options['starting-density']
        this.interval = options['refresh-interval']
        this.timer = null
        this.setup()
    }
    // create the DOM nodes that represent the game board
    setup() {
        this.board = new Board(this.selector, this.rows, this.cols, this.density)
    }
    // start the game loop
    start() {
        this.timer = setInterval(this.board.update.bind(this.board), this.interval)
    }
    // stop the game loop
    stop () {
        clearInterval(this.timer)
    }
    // clear the board
    clear() {
        this.board.node.innerHTML = ''
    }
}

export { Game }
