import { Game } from './game.js'

// there's gotta be a better way, but we're using modules, so... ¯\_(ツ)_/¯
let game = null;

function newGame() {
    if (game) {
        game.stop()
        game.clear()
    }
    // pass in the CSS selector to the DOM node for the game board
    game = new Game(/*'#board', 8, 8, 1000*/)
    game.start()
    toggleGameControls('during')
}

function stopGame() {
    game && game.stop()
    toggleGameControls('before')
}

function toggleGameControls(state) {
    let activeControls
    let inactiveControls
    if ('during' === state) {
        activeControls = document.querySelectorAll('.active-during-game')
        inactiveControls = document.querySelectorAll('.active-before-game')
    }
    else {
        activeControls = document.querySelectorAll('.active-before-game')
        inactiveControls = document.querySelectorAll('.active-during-game')
    }
    activeControls.forEach(control => control.disabled = false)
    inactiveControls.forEach(control => control.disabled = true)
}

function init() {
    // enable game start button
    document.querySelector('#start').addEventListener('click', newGame)
    // enable stopping the game
    document.querySelector('#stop').addEventListener('click', stopGame)
}

document.addEventListener('DOMContentLoaded', init)
