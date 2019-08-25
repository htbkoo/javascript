/**
 * Created by Hey on 16 Dec 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');
var format = require('string-format');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
Test.use(sinonChai);

var Board = srcDirRequire(__dirname, 'Board');
var Food = srcDirRequire(__dirname, 'Food');
var Snake = srcDirRequire(__dirname, 'Snake');
var Coordinates = srcDirRequire(__dirname, 'Coordinates');
var NextCoordinatesProvider = srcDirRequire(__dirname, 'NextCoordinatesProvider');

describe("Board - SnakeGame", function () {
    "use strict";
    describe("construct game board", function () {
        it("should expose width and height of board same as initialization", function () {
            var board = new Board(40, 50);
            Test.expect(board.getWidth()).to.equal(40, "Width of board should be equal to 40");
            Test.expect(board.getHeight()).to.equal(50, "Height of board should be equal to 50");
        });
    });
    describe("initialize related", function () {

        //    assert randomnesss?
        //    ref: http://softwareengineering.stackexchange.com/questions/147134/how-should-i-test-randomness

        it("should create food with coordingates from NextCoordinatesProvider when initialized", sinon.test(function () {
            // given
            var WIDTH = 20;
            var HEIGHT = 30;
            var providedX = 0, providedY = 5;

            var board = createBoardWithCoordinatesProvider(this, WIDTH, HEIGHT, [[providedX, providedY]]);

            // when
            board.initialize();

            // then
            Test.expect(board.getNumOfFood()).to.equal(1, "Should have created 1 food when initialized");
            var foods = board.getViewOfFood();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Array);

            foods.forEach(function (food) {
                assertCoorsOf(food, providedX, providedY);
            });
        }));

        it("should initialize snake when initialized", sinon.test(function () {
            // given
            var mockSnake = this.mock(getSnakeCreatedInBoard(this));
            mockSnake.expects("initialize").once();
            var WIDTH = 20;
            var HEIGHT = 30;
            this.stub(NextCoordinatesProvider, "getNext", function () {
                return new Coordinates(1, 1);
            });

            // when
            var board = new Board(WIDTH, HEIGHT);
            board.initialize();

            // then
            mockSnake.verify();
        }));

    });
    describe("food related", function () {
        it("should expose view of Food as array and number of Food", function () {
            var board = new Board();
            Test.expect(board.getViewOfFood()).is.an.instanceOf(Array);
            Test.expect(board.getNumOfFood()).to.equal(0);
        });
    });
    describe("update related", function () {
        var WIDTH = 10, HEIGHT = 20;
        it("should tell snake to move when update", sinon.test(function () {
            // given
            var snake = getSnakeCreatedInBoard(this);
            var mockSnake = this.mock(snake);
            mockSnake.expects("move").once();
            mockSnake.expects("getViewOfSnakeHead").returns({
                "getCoors": function () {
                    return new Coordinates(0, 1);
                }
            });

            // when
            var board = new Board(WIDTH, HEIGHT);
            board.update();

            // then
            mockSnake.verify();
        }));
        it("should check if eaten food when update", sinon.test(function () {
            // given
            var snake = getSnakeCreatedInBoard(this);
            this.stub(snake, "move", function () {
            });

            var stubGetSnakeHead = this.stub(snake, "getViewOfSnakeHead");
            stubGetSnakeHead
                .onFirstCall().returns(createMockSnakeHead(0, 0))
                .onSecondCall().returns(createMockSnakeHead(0, 1))
                .onThirdCall().returns(createMockSnakeHead(0, 2))
                .onCall(3).returns(createMockSnakeHead(0, 3));
            stubGetSnakeHead.returns(createMockSnakeHead(0, 4));

            var board = createBoardWithCoordinatesProvider(this, 10, 20, [[0, 1], [0, 3], [9, 9]]);

            // whven
            board.initialize();

            // then
            var results = board.update();
            Test.expect(results.ate).to.be.false;
            results = board.update();
            Test.expect(results.ate).to.be.true;
            results = board.update();
            Test.expect(results.ate).to.be.false;
            results = board.update();
            Test.expect(results.ate).to.be.true;

        }));

        [
            new Coordinates(0, -1),
            new Coordinates(-1, 0),
            new Coordinates(WIDTH, 0),
            new Coordinates(0, HEIGHT)
        ].forEach(function (wall) {
            it(format("should check if hit wall of {} and game over when update", wall), sinon.test(function () {
                // given
                var snake = getSnakeCreatedInBoard(this);
                this.stub(snake, "move", function () {
                });

                var stubGetSnakeHead = this.stub(snake, "getViewOfSnakeHead");
                stubGetSnakeHead
                    .onFirstCall().returns(createMockSnakeHead(0, 0));
                stubGetSnakeHead.returns(createMockSnakeHead(wall.getX(), wall.getY()));

                var board = createBoardWithCoordinatesProvider(this, 10, 20, [[0, 1]]);

                // whven
                board.initialize();

                // then
                var results = board.update();
                Test.expect(results.gameover).to.be.false;
                results = board.update();
                Test.expect(results.gameover).to.be.true;
            }));
        });
    });
    describe("doCommand related", function () {
        it("should expose doCommand", function () {
            var board = new Board();
            Test.expect(board.doCommand).is.not.undefined;
        });
        [
            ["LEFT", new Coordinates(-1, 0)],
            ["RIGHT", new Coordinates(1, 0)],
            ["UP", new Coordinates(0, -1)],
            ["DOWN", new Coordinates(0, 1)]
        ].forEach(function (command) {
            var commandString = command[0];
            var commandArg = command[1];
            it(format("should accept movement doCommand({})", commandString), sinon.test(function () {
                // given
                var snake = getSnakeCreatedInBoard(this);
                var mockSnake = this.mock(snake);
                mockSnake.expects("setMoveDirection").withExactArgs(sinon.match(function (value) {
                    return value.isSameCoorsTo(commandArg);
                })).once();
                var board = createBoardWithCoordinatesProvider(this, 10, 10, [5, 5]);

                // when
                board.doCommand(command[0]);

                // then
                mockSnake.verify();
            }));
        });
        it("should throws error if received invalid commmand in doCommand()", function () {
            // given
            var board = new Board();
            var someInvalidCommand = "SOME_INVALID_COMMAND";

            // when
            // then
            Test.expect(function () {
                return board.doCommand(someInvalidCommand);
            }).to.throw(format("Command [{}] is not a valid command", someInvalidCommand));
        });
    });

    function assertCoorsOf(food, providedX, providedY) {
        var coors = food.getCoors();
        Test.expect(coors.getX()).to.equal(providedX, "X of food should be same as provided");
        Test.expect(coors.getY()).to.equal(providedY, "Y of food should be same as provided");
    }

    function getSnakeCreatedInBoard(s) {
        var snake = new Snake();
        var stubSnakeCreateNewSnake = s.stub(Snake, "createSnake", function () {
            return snake;
        });
        return snake;
    }

    function createBoardWithCoordinatesProvider(s, width, height, coorsArray) {
        var board = new Board(width, height);

        var stub = s.stub(NextCoordinatesProvider, "getNext");

        coorsArray.forEach(function (coors, index) {
            stub.onCall(index).returns(new Coordinates(coors[0], coors[1]));
        });

        stub.returns(new Coordinates(coorsArray[coorsArray.length - 1][0], coorsArray[coorsArray.length - 1][1]));
        return board;
    }

    function createMockSnakeHead(x, y) {
        return {
            "getCoors": function () {
                return new Coordinates(x, y);
            }
        };
    }
});

