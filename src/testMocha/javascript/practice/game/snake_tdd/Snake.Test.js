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
            Test.expect(snake.getViewOfSnakeHead).to.not.be.undefined;
        });
        it("should be possible to initialize with coordinates", function () {
            // Given
            var coordinates = new Coordinates(0, 0);

            // When
            Test.expect(snake.initialize).is.not.undefined;
            snake.initialize(coordinates);

            // Then
            assertSnakeHeadCoordinates(snake, coordinates);
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
            assertSnakeHeadCoordinates(snake, originalCoors);
            snake.move();

            // Then
            assertSnakeHeadCoordinates(snake, originalCoors);
        });

        [
            new Coordinates(0, 1),
            new Coordinates(0, -1),
            new Coordinates(1, 0),
            new Coordinates(-1, 0)
        ].forEach(function (coors) {
            it(format("should be possible to move after setting moveDirection as {}", coors), function () {
                // Given
                assertSnakeHeadCoordinates(snake, new Coordinates(originalCoors.getX(), originalCoors.getY()));
                snake.setMoveDirection(coors);

                // When
                // Then
                new Array(5).fill(0).forEach(function (_, i) {
                    snake.move();
                    assertSnakeHeadCoordinates(snake, new Coordinates(originalCoors.getX() + (i + 1) * coors.getX(), originalCoors.getY() + (i + 1) * coors.getY()));
                });
            });
        });

        it("should not be possible to setMoveDirection backward", function () {
            // Given
            assertSnakeHeadCoordinates(snake, new Coordinates(originalCoors.getX(), originalCoors.getY()));
            var zeroCoordinates = new Coordinates(0, 0);
            var rightCoordinates = new Coordinates(1, 0);
            var leftCoordinates = new Coordinates(-1, 0);
            var upCoordinates = new Coordinates(0, -1);
            var downCoordinates = new Coordinates(0, 1);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(zeroCoordinates)).to.equal(true, format("Should be facing {} initially", zeroCoordinates));

            // When
            // Then
            snake.setMoveDirection(leftCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(leftCoordinates)).to.equal(true, format("Should be able to setFacing to {} before move", leftCoordinates));

            snake.setMoveDirection(rightCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(rightCoordinates)).to.equal(true, format("Should be able to setFacing to {} before move", rightCoordinates));

            snake.move();
            assertSnakeHeadCoordinates(snake, new Coordinates(originalCoors.getX()+rightCoordinates.getX(),originalCoors.getY()+rightCoordinates.getY()));

            snake.setMoveDirection(leftCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(rightCoordinates)).to.equal(true, format("Should not be able to face backward to snakebody and should still face {}", rightCoordinates));

            [
                upCoordinates,
                rightCoordinates,
                downCoordinates
            ].forEach(function(coors){
                snake.setMoveDirection(coors);
                Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(coors)).to.equal(true, format("Should be able to moving 90 degree to face {}", rightCoordinates));
            });

            snake.setMoveDirection(leftCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(downCoordinates)).to.equal(true, format("Should not be able to face backward to snakebody even after rotating but not moving and should still face {}", downCoordinates));

            snake.move();
            assertSnakeHeadCoordinates(snake, new Coordinates(2,2));

            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(downCoordinates)).to.equal(true, format("Should be still facing {} after move", downCoordinates));

            snake.setMoveDirection(upCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(downCoordinates)).to.equal(true, format("Should be still facing {}", downCoordinates));

            snake.setMoveDirection(leftCoordinates);
            Test.expect(snake.getViewOfSnakeHead().getFacing().isSameCoorsTo(leftCoordinates)).to.equal(true, format("Should be able to face {} after moving down", leftCoordinates));
        });

        it("should not expose mutator for body", function () {
            // Then
            Test.expect(snake.getViewOfSnakeHead().moveBy).to.be.undefined;
        });
    });

    function assertSnakeHeadCoordinates(snake, coordinates) {
        var snakeHeadCoors = snake.getViewOfSnakeHead().getCoors();
        Test.expect(snakeHeadCoors.isSameCoorsTo(coordinates)).to.equal(true, format("Snake Head Coordinates {} shoould be equal to {}", snakeHeadCoors, coordinates));
        Test.expect(snake.getViewOfSnakeHead().isHead()).to.equal(true, "Expected that it is a snake head");
    }
});