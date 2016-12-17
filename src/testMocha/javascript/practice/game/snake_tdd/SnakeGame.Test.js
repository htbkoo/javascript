/**
 * Created by Hey on 6 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

// var SnakeGame = srcDirRequire(__dirname, 'SnakeGame');
var createSnakeGameWithDimensions = srcDirRequire(__dirname, 'SnakeGame');
var Board = srcDirRequire(__dirname, 'Board');

describe("SnakeGame (by TDD)", function () {
    "use strict";
    describe("construct game engine", function () {
        it("should expose game engine", function () {
            Test.expect(createSnakeGameWithDimensions).to.not.be.undefined;
            Test.expect(createSnakeGameWithDimensions()).to.not.be.undefined;
        });

        it("should accept width and height and has a board of those dimensions in the game", function () {
            var game = createSnakeGameWithDimensions(40, 50);
            var board = game.getViewOfBoard();
            Test.expect(board).to.be.an.instanceOf(Board);
            Test.expect(board.getWidth()).to.equal(40);
            Test.expect(board.getHeight()).to.equal(50);
        });

        it("should expose game status and start game", function () {
            var game = createSnakeGameWithDimensions();
            Test.expect(game.isGameStarted()).to.equal(false, "Game should not be started when first created");
            Test.expect(game.startGame).to.not.be.undefined;
            game.startGame();
            Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
        });

        it("should propagate start game to board", function () {
            var game = createSnakeGameWithDimensions();
            Test.expect(game.startGame).to.not.be.undefined;
            game.startGame();
            Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
        });
    });
});