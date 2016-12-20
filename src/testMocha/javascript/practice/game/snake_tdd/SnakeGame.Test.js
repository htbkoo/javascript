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

        describe("initialization", function () {

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
                var boardInitializeAtMostOnce = this.mock(board).expects("initialize").once().atMost(1);
                var game = createSnakeGameWithDimensions(board);

                // when
                game.startGame();
                Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");
                game.startGame();
                Test.expect(game.isGameStarted()).to.equal(true, "Game should be started after startGame()");

                // then
                boardInitializeAtMostOnce.verify();
            }));
        });

        describe("timer", function () {
            it("should be able to set interval", sinon.test(function () {
                // given
                var game = createSnakeGameWithDimensions(10, 10);

                // when
                game.setInterval(100);

                // then
                Test.expect(game.getInterval()).to.equal(100);
                Test.expect(game.getInterval()).to.equal(100);
            }));

            it("should start timer after initialization and thus cause board to update per interval", sinon.test(function () {
                // given
                var clock = this.clock;
                var INTERVAL = 100;
                var board = new Board(10, 10);
                var mockBoard = this.mock(board);
                var expectUpdate = mockBoard.expects("update").exactly(0);
                mockBoard.expects("initialize").exactly(1);

                var game = createSnakeGameWithDimensions(board);
                game.setInterval(INTERVAL);

                // when
                game.startGame();

                // then
                expectUpdate.verify();
                new Array(10).fill(0).forEach(function (_, i) {
                    expectUpdate = mockBoard.expects("update").once().returns({"gameover": false});
                    clock.tick(INTERVAL);
                    expectUpdate.verify();
                });

            }));

            it("should not cause board to update before game start", sinon.test(function () {
                // given
                var clock = this.clock;
                var INTERVAL = 100;
                var board = new Board(10, 10);
                var mockBoard = this.mock(board);
                var expectUpdate = mockBoard.expects("update").exactly(0);
                mockBoard.expects("initialize").exactly(0);

                var game = createSnakeGameWithDimensions(board);
                game.setInterval(INTERVAL);

                // when
                // game is not started
                // game.startGame();

                // then
                expectUpdate.verify();
                new Array(10).fill(0).forEach(function (_, i) {
                    expectUpdate = mockBoard.expects("update").exactly(0);
                    clock.tick(INTERVAL);
                    expectUpdate.verify();
                });
            }));

            it("should stop game when gameover from board update result is true", sinon.test(function () {
                // given
                var clock = this.clock;
                var INTERVAL = 100;
                var board = new Board(10, 10);
                var stubBoardInitialize = this.stub(board, "initialize", function () {
                });
                var stubBoardUpdate = this.stub(board, "update");
                stubBoardUpdate.onFirstCall().returns({"gameover": false, "ate": false})
                    .onSecondCall().returns({"gameover": true, "ate": false});
                stubBoardUpdate.throws("UnexpectedCallError");

                var game = createSnakeGameWithDimensions(board);
                game.setInterval(INTERVAL);

                // when
                game.startGame();

                // then
                Test.expect(game.isGameStarted()).to.be.true;
                clock.tick(INTERVAL);
                Test.expect(game.isGameStarted()).to.be.true;
                clock.tick(INTERVAL);
                Test.expect(game.isGameStarted()).to.be.false;
                clock.tick(INTERVAL);
                // expect game clock stopped or exception would be thrown
                clock.tick(INTERVAL);
                // expect game clock stopped or exception would be thrown

            }));
        });
    });
});