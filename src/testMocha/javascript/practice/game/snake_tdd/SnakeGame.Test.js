/**
 * Created by Hey on 6 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
Test.use(sinonChai);

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

        describe("construct game engine", function () {

            it("should initialize board when start game", sinon.test(function () {
                // given
                var board = new Board(10, 10);
                var mockToBoard = this.mock(board).expects("initialize").once();
                var game = createSnakeGameWithDimensions(board);

                // when
                Test.expect(game.isGameStarted()).to.equal(false, "Game should not be started when first created");
                Test.expect(game.startGame).to.not.be.undefined;
                game.startGame();

                // then
                Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
                mockToBoard.verify();
            }));

            it("should not initialize board when game is started already", sinon.test(function () {
                // given
                var board = new Board(10, 10);
                var mockToBoard = this.mock(board).expects("initialize").once().atMost(1);
                var game = createSnakeGameWithDimensions(board);

                // when
                game.startGame();
                Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
                game.startGame();
                Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");

                // then
                mockToBoard.verify();
            }));
        });
    });
});