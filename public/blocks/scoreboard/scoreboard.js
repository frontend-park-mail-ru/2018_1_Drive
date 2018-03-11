(function () {
    'use strict';

    const BaseComponent = window.BaseComponent;
    // const pug = require('pug');
    const players = [
        ['Name1', 10000],
        ['Name2', 1000],
        ['Name3', 100],
        ['Name4', 11],
        ['Name5', 10],
        ['Name6', 1]
    ];


    class Scoreboard extends BaseComponent{
        constructor() {
            const element = document.createElement('form');
            super(element);

            //const compiledBoard = pug.compileFile('scoreboard.pug');
            //element.innerHTML = compiledBoard(players);

        }
    }

    window.Scoreboard = Scoreboard;
})();