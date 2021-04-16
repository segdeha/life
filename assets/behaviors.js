import { Game } from './game.js'

// there's gotta be a better way, but we're using modules, so... ¯\_(ツ)_/¯
let game = null;

// based on https://stackoverflow.com/a/13419367/11577
function parseQuery() {
    const q = window.location.search
    const values = {}
    if (q) {
        const pairs = (q[0] === '?' ? q.substr(1) : q).split('&')
        for (let i = 0; i < pairs.length; i += 1) {
            const pair = pairs[i].split('=')
            values[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
        }
    }
    return values
}

function newGame() {
    if (game) {
        game.stop()
        game.clear()
        game = null // allow `game` to be garbage collected
    }
    const options = readGameOptions()
    game = new Game('#board', options)
    game.start()
    toggleGameControls('during')
}

function stopGame() {
    game && game.stop()
    toggleGameControls('before')
}

function getValueFromSelect(select) {
    return select.options[select.selectedIndex].value
}

function readGameOptions() {
    const names = ['grid-size', 'starting-density', 'refresh-interval']
    const values = {}
    names.forEach(name => {
        const select = document.querySelector(`[name="${name}"]`)
        values[name] = getValueFromSelect(select)
    })
    const queryValues = parseQuery()
    values.grid = queryValues.grid
    return values
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
