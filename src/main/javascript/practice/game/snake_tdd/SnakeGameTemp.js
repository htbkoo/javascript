/**
 * Created by Hey on 6 Dec 2016
 */

var Board = require('./Board');

function SnakeGame() {
    'use strict';
    var gameStarted = false;
    this.startGame = function () {
        gameStarted = true;
    };

    this.isGameStarted = function () {
        return gameStarted;
    };

    this.getViewOfBoard = function(){
        return new Board();
    };

    return this;
}

module.exports = SnakeGame;