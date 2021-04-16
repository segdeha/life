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
        this.startGrid = options['grid'] // optional, defaults to `undefined`
        this.generations = 0
        this.generationsNode = document.getElementById('generations')
        this.history = [[], []]
        this.timer = null
        this.setup()
    }
    // create the DOM nodes that represent the game board
    setup() {
        this.board = new Board(this.selector, this.rows, this.cols, this.density, this.startGrid)
        this.generations += 0
        this.updateGeneration()
    }
    // start the game loop
    start() {
        const updater = this.board.update.bind(this.board)
        this.timer = setInterval(() => {
            updater()
            this.generations += 1
            this.updateGeneration()
            if (this.isGameDone()) {
                this.stop()
            }
            else {
                this.save()
            }
        }, this.interval)
    }
    // stop the game loop
    stop () {
        clearInterval(this.timer)
    }
    // display the current generation
    updateGeneration() {
        this.generationsNode.innerHTML = this.generations
    }
    // convert an array of objects, each with an `alive` property
    // set to either true or false to a string of 1s and 0s
    reduce(array) {
        const reducer = (accumulator, currentValue) => {
            return [accumulator, currentValue.alive ? 1 : 0].join('')
        }
        return array.reduce(reducer, '')
    }
    // save history
    save() {
        // reduce the current grid to a string of 1s and 0s and
        // save in either the 0 or 1 index of the history array
        // based on whether the current generation is odd or even
        this.history[this.generations % 2] = this.reduce(this.board.grid.flat())
    }
    isGameDone() {
        // short circuit if we only have 1 history entry
        if (this.history[0].length < 1) {
            return false
        }
        // reduce the current grid to a string of 1s and 0s
        const reduced = this.reduce(this.board.grid.flat())
        // if the current grid is the same as either history, the game is done
        return reduced === this.history[0] || reduced === this.history[1]
    }
    // clear the board
    clear() {
        this.board.node.innerHTML = ''
    }
}

export { Game }
