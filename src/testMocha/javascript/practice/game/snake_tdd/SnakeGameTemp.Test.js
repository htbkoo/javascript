/**
 * Created by Hey on 6 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var SnakeGame = srcDirRequire(__dirname, 'SnakeGame');
var Board = srcDirRequire(__dirname, 'Board');

describe("SnakeGame (by TDD)", function () {
    "use strict";
    describe("construct game engine", function () {
        it("should expose game engine", function () {
            Test.expect(SnakeGame).to.not.be.undefined;
            Test.expect(new SnakeGame()).to.not.be.undefined;
        });

        it("should has a board in the game", function () {
            var game = new SnakeGame();
            Test.expect(game.getViewOfBoard()).to.be.an.instanceOf(Board);
        });

        it("should expose game status and start game", function () {
            var game = new SnakeGame();
            Test.expect(game.isGameStarted()).to.equal(false, "Game should not be started when first created");
            Test.expect(game.startGame).to.not.be.undefined;
            game.startGame();
            Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
        });
    });
});