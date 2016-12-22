/**
 * Created by Hey on 21 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var format = require('string-format');

var Snake = srcDirRequire(__dirname, 'Snake');
var Coordinates = srcDirRequire(__dirname, 'Coordinates');

describe("Snake - SnakeGame", function () {
    "use strict";
    var snake;

    describe("Snake properties", function () {
        beforeEach(function () {
            snake = Snake.createSnake();
        });
        it("should expose getSnakeHead", function () {
            // Then
            Test.expect(snake.getSnakeHead).to.not.be.undefined;
        });
        it("should be possible to initialize with coordinates", function () {
            // Given
            var coordinates = new Coordinates(0, 0);

            // When
            Test.expect(snake.initialize).is.not.undefined;
            snake.initialize(coordinates);

            // Then
            assertSnakeHead(snake, true, coordinates);
        });
    });

    describe("Snake move", function () {
        var originalCoors = new Coordinates(1, 1);
        beforeEach(function () {
            snake = Snake.createSnake();
            snake.initialize(originalCoors);
        });
        it("should expose move", function () {
            // Then
            Test.expect(snake.move).to.not.be.undefined;
        });

        it(format("should not move by default as moveDirection should be {}", new Coordinates(0, 0)), function () {
            // Given

            // When
            assertSnakeHead(snake, true, originalCoors);
            snake.move();

            // Then
            assertSnakeHead(snake, true, originalCoors);
        });

        [
            new Coordinates(0, 1),
            new Coordinates(0, -1),
            new Coordinates(1, 0),
            new Coordinates(-1, 0)
        ].forEach(function (coors) {
            it(format("should be possible to move after setting moveDirection as {}", coors), function () {
                // Given
                assertSnakeHead(snake, true, new Coordinates(originalCoors.getX(), originalCoors.getY()));
                snake.setMoveDirection(coors);

                // When
                // Then
                new Array(5).fill(0).forEach(function (_, i) {
                    snake.move();
                    assertSnakeHead(snake, true, new Coordinates(originalCoors.getX() + (i + 1) * coors.getX(), originalCoors.getY() + (i + 1) * coors.getY()));
                });
            });
        });

        it("should not expose mutator for body", function () {
            // Then
            Test.expect(snake.getSnakeHead().moveBy).to.be.undefined;
        });
    });

    function assertSnakeHead(snake, isHead, coordinates) {
        var snakeHeadCoors = snake.getSnakeHead().getCoors();
        Test.expect(snakeHeadCoors.isSameCoorsTo(coordinates)).to.equal(true, format("Snake Head Coordinates {} shoould be equal to {}", snakeHeadCoors, coordinates));
        Test.expect(snake.getSnakeHead().isHead()).to.equal(isHead, "Expected that it is a snake head");
    }
});