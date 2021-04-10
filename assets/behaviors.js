import { Game } fromn './game.js'

// there's gotta be a better way, but we're using modules, so... ¯\_(ツ)_/¯
let game = null;

function newGame() {
    if (game) {
        game.stop()
        game.clear()
    }
    // pass in the CSS selector to the DOM node for the game board
    game = new Game('#board')
    game.start()
}

function init() {
    // enable game start button
    document.querySelector('button').addEventListener('click', newGame)
}

document.addEventListener('DOMContentLoaded', init)
