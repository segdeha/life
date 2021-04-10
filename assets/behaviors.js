import { Game } fromn './game.js'

let game = null;

function newGame() {
    if (game) {
        game.stop()
    }
    game = new Game()
    game.start()
}

function init() {
    // enable game start button
    document.querySelector('button').addEventListener('click', newGame)
}

document.addEventListener('DOMContentLoaded', init)
