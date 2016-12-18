/**
 * Created by Hey on 6 Dec 2016
 */

var Board = require('./Board');

function SnakeGame(wOrBoard, h) {
    'use strict';
    var gameStarted = false;
    var board = (wOrBoard instanceof Board) ? wOrBoard : new Board(wOrBoard, h);

    this.startGame = function () {
        if (!gameStarted) {
            gameStarted = true;
            board.initialize();
        }
    };

    this.isGameStarted = function () {
        return gameStarted;
    };

    this.getViewOfBoard = function () {
        return board;
    };

    return this;
}

SnakeGame.createWithDimensions = function (w, h) {
    "use strict";
    return new SnakeGame(w, h);
};

// SnakeGame.createWithBoard = function (board) {
//     "use strict";
//     return new SnakeGame(board);
// };
//
// module.exports = {
//     'createWithDimensions': SnakeGame.createWithDimensions,
//     'createWithBoard': SnakeGame.createWithBoard
// };

module.exports = SnakeGame.createWithDimensions;