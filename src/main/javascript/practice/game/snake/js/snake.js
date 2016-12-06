/**
 * Created by Hey on 5 Dec 2016
 */

var cells = [];
var NUM_ROW = 40, NUM_COL = 60;
var gameStarted = false;

var KEY = {
    'ENTER': 13,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
};

function createBoard() {
    "use strict";

    var tempRow;
    var _;

    var $board_body = $($('#board').find('tbody')[0]);
    var $tr;

    $tr = $('<tr></tr>');
    $board_body.append($tr);
    for (_ = -1; _ <= NUM_COL; ++_) {
        $tr.append("<td class='wall'><div></div></td>");
    }

    for (_ = 0; _ < NUM_ROW; ++_) {
        tempRow = [];
        $tr = $('<tr></tr>');
        $board_body.append($tr);
        $tr.append("<td class='wall'><div></div></td>");
        for (var j = 0; j < NUM_COL; ++j) {
            var $td = $("<td><div></div></td>");
            tempRow.push($td);
            $td.appendTo($tr);
        }
        $tr.append("<td class='wall'><div></div></td>");
        cells.push(tempRow);
    }


    $tr = $('<tr></tr>');
    $board_body.append($tr);
    for (_ = -1; _ <= NUM_COL; ++_) {
        $tr.append("<td class='wall'><div></div></td>");
    }
}

function getRandomIntLessThan(maxExclusive) {
    "use strict";
    return Math.floor(Math.random() * maxExclusive);
}

function startGame() {
    "use strict";
    function toggleCellWithCoordinatesPair(type, coors) {
        cells[coors[0]][coors[1]].toggleClass(type);
    }

    var y = 0, x = 0;
    var dy = 0, dx = 0;
    var snakes = [];
    var foodCoors = [];
    var gameID = 0;
    var score = 0;

    function hitSnake(coors) {
        return snakes.some(function (snake) {
            return snake[0] === coors[0] && snake[1] === coors[1];
        });
    }

    function isOutOfBoundary(coors) {
        return coors[0] < 0 || coors[1] < 0 || coors[0] >= NUM_ROW || coors[1] >= NUM_COL;
    }

    function gameOver() {
        clearInterval(gameID);
        gameStarted = false;
        // to be replaced by more proper result page
        alert("game over! Your score: " + score);
    }

    function isMoved() {
        return dx !== 0 || dy !== 0;
    }

    function clearBoard() {
        cells.forEach(function (rs) {
            rs.forEach(function (c) {
                c.removeClass("snake");
                c.removeClass("food");
            });
        });
    }

    function ateFood() {
        ++score;
        toggleCellWithCoordinatesPair("food", foodCoors);
        generateFood();
    }

    function generateFood() {
        foodCoors = [getRandomIntLessThan(NUM_ROW), getRandomIntLessThan(NUM_COL)];
        while (hitSnake(foodCoors)) {
            foodCoors = [getRandomIntLessThan(NUM_ROW), getRandomIntLessThan(NUM_COL)];
        }
        toggleCellWithCoordinatesPair("food", foodCoors);
    }

    if (!gameStarted) {
        gameStarted = true;
        clearBoard();

        y = 1;
        x = 1;
        dx = 0;
        dy = 0;
        snakes = [[y, x]];
        snakes.forEach(function (coors) {
            toggleCellWithCoordinatesPair("snake", coors);
        });

        // var snake_x = getRandomIntLessThan(NUM_ROW), snake_y = getRandomIntLessThan(NUM_COL);
        generateFood();

        $(document).keydown(function (event) {
            switch (event.which) {
                case KEY.LEFT:
                    if (dx === 0) {
                        dx = -1;
                        dy = 0;
                    }
                    event.preventDefault();
                    break;
                case KEY.RIGHT:
                    if (dx === 0) {
                        dx = 1;
                        dy = 0;
                    }
                    event.preventDefault();
                    break;
                case KEY.UP:
                    if (dy === 0) {
                        dx = 0;
                        dy = -1;
                    }
                    event.preventDefault();
                    break;
                case KEY.DOWN:
                    if (dy === 0) {
                        dx = 0;
                        dy = 1;
                    }
                    event.preventDefault();
                    break;
            }
        });

        var gameEngine = function () {
            var length = snakes.length - 1;
            var head = snakes[length];
            var nX = head[1] + dx;
            var nY = head[0] + dy;
            var newHead = [nY, nX];

            if (isMoved()) {
                (function determineNewHead() {
                    if (isOutOfBoundary(newHead)) {
                        gameOver();
                    }

                    if (hitSnake(newHead)) {
                        gameOver();
                    }

                    if ((nY === foodCoors[0]) && (nX === foodCoors[1])) {
                        ateFood();
                    } else {
                        var tail = snakes[0];
                        toggleCellWithCoordinatesPair("snake", tail);
                        // snakes = snakes.slice(length);
                        snakes.shift();
                    }

                    snakes.push(newHead);
                    toggleCellWithCoordinatesPair("snake", newHead);
                }());
            }

        };

        gameID = setInterval(gameEngine, 100);
    }
}


$(document).ready(function () {
    "use strict";
    createBoard();
    $(document).keydown(function (event) {
        if (event.which === KEY.ENTER) {
            startGame();
            event.preventDefault();
        }
    });
});

