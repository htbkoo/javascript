/**
 * Created by Hey on 6 Dec 2016
 */

(function tetris() {
    "use strict";

    var Cell = function (param_$c, x, y) {
        var FALLING = "falling", PLACED = "placed";

        var $c = param_$c;
        var $div = $($c.find('div')[0]);
        var state = "";

        var setState = function (param_state) {
            $div.removeClass(state);
            state = param_state;
            $div.addClass(state);
        };

        this.setFalling = function () {
            setState(FALLING);
        };

        this.setPlaced = function () {
            setState(PLACED);
        };

        this.setEmpty = function () {
            setState("");
        };

        this.isFalling = function () {
            return state === FALLING;
        };

        this.isPlaced = function () {
            return state === PLACED;
        };

        this.getX = function () {
            return x;
        };

        this.getY = function () {
            return y;
        };

        return this;
    };

    // Const
    var $container_body = $($('#tContainer').find('tbody')[0]);
    var NUM_HIDDEN_ROWS = 4, NUM_ROW = 22 + NUM_HIDDEN_ROWS, NUM_COL = 16;
    var MIDDLE_X = 0;
    var GRAVITY = 1;
    var ENGINE_INTERVAL = 100;
    var KEY = {
        'ENTER': 13,
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40,
        'SPACE': 32
    };

    // Variables
    var cells = [];
    var gameStarted = false;
    var gameId = 0;

    // Temp Variables
    var i = 0, j = 0;

    $(document).ready(function () {
        (function initializeOnce() {
            (function drawContainer() {
                var $tr = $('<tr></tr>');
                for (i = 0; i < NUM_ROW; ++i) {
                    var row = [];
                    $tr.append('<td><div class="wall"></div></td>');

                    for (j = 0; j < NUM_COL; ++j) {
                        var c = $('<td><div></div></td>');
                        row.push(new Cell(c, j, i));
                        c.appendTo($tr);
                    }

                    cells.push(row);

                    $tr.append('<td><div class="wall"></div></td>');

                    $tr.appendTo($container_body);
                    $tr = $('<tr></tr>');
                }
                for (i = 0; i <= NUM_COL + 1; ++i) {
                    $tr.append('<td><div class="wall"></div></td>');
                }
                $tr.appendTo($container_body);
            }());
        }());

        $(document).keydown(function (event) {
            if (event.which === KEY.ENTER) {
                if (!gameStarted) {
                    startGame();
                }
                event.preventDefault();
            }
        });

        function startGame() {
            var wholePieceFalling = false;
            var curPiece = getNextPiece(), nextPiece = getNextPiece();
            var fallingPieces = [];

            (function clearBoard() {
                cells.forEach(function (r) {
                    r.forEach(function (c) {
                        c.setEmpty();
                    });
                });
            }());
            gameStarted = true;
            gameId = setInterval(gameEngine, ENGINE_INTERVAL);

            function getNextPiece() {
                var PIECES_PATTERN = [
                    [[0], [0], [0], [0]], // long vertical
                    [[0, 1], [0, 1]], // square
                    [[1], [0, 1], [0]], // \/\
                    [[0], [0, 1], [1]], // /\/
                    [[0], [0, 1], [0]]
                ];

                function getRandomIntLessThan(maxExclusive) {
                    return Math.floor(Math.random() * maxExclusive);
                }

                return PIECES_PATTERN[getRandomIntLessThan(PIECES_PATTERN.length)];
            }

            function gameOver() {
                alert("Game Over!");
                clearInterval(gameId);
                gameStarted = false;
            }

            function gameEngine() {
                if (!wholePieceFalling) {
                    (function placeNextPiece() {

                        if (curPiece.length === 0) {
                            wholePieceFalling = true;
                            curPiece = nextPiece;
                            nextPiece = getNextPiece();
                        } else {
                            // wrong - my misconception about forEach being asynchronous  -> cannot do for each without ES6 promise......
                            curPiece[0].some(function (x) {
                                var p = cells[0][x + MIDDLE_X];
                                p.setFalling();
                                fallingPieces.push(p);
                                return !gameStarted;
                            });
                            // for (i = 0; i < curPiece[0].length; ++i) {
                            //     var p = cells[0][curPiece[0][i] + MIDDLE_X];
                            //     p.setFalling();
                            //     fallingPieces.push(p);
                            // }
                            curPiece.shift();
                        }
                    }());
                }

                (function manageFallingPiece() {
                    var tempFallingPieces = [];

                    // wrong - my misconception about forEach being asynchronous  -> cannot do for each without ES6 promise......

                    if (!fallingPieces.some(function (p) {
                            p.setEmpty();
                            var nY = p.getY() + GRAVITY;
                            var nX = p.getX();

                            function shouldStopFalling(P) {
                                return nY >= NUM_ROW || cells[nY][nX].isPlaced();
                            }

                            if (shouldStopFalling()) {
                                if (!wholePieceFalling) {
                                    gameOver();
                                } else {
                                    fallingPieces.forEach(function (pp) {
                                        pp.setPlaced();
                                    });
                                }

                                (function managePlacedPiece() {
                                    cells.forEach(function (row, index) {
                                        var rowFilled = row.every(function (c) {
                                            return c.isPlaced();
                                        });

                                        function collapseRow() {
                                            row.forEach(function (c) {
                                                c.setEmpty();
                                            });
                                            new Array(index).fill(0).forEach(function (_, i) {
                                                var y = index - i;
                                                cells[y].forEach(function (c) {
                                                    var upperC = cells[y - 1][c.getX()];
                                                    if (upperC.isPlaced()) {
                                                        c.setPlaced();
                                                        upperC.setEmpty();
                                                    }
                                                });
                                            });
                                        }

                                        if (rowFilled) {
                                            collapseRow();
                                        }
                                    });
                                }());

                                wholePieceFalling = false;
                                return true;
                            } else {
                                var newP = cells[nY][nX];
                                newP.setFalling();
                                tempFallingPieces.push(newP);
                            }
                            return false;
                        })) {
                        fallingPieces = tempFallingPieces;
                    } else {
                        fallingPieces = [];
                        tempFallingPieces.forEach(function (p) {
                            if (p.isFalling()) {
                                p.setEmpty();
                            }
                        });
                    }
                    // for (i = 0; i < fallingPieces.length; ++i) {
                    //     fallingPieces[i].setEmpty();
                    //     var nY = fallingPieces[i].getY() + GRAVITY;
                    //     var nX = fallingPieces[i].getX();
                    //     var newP = cells[nY][nX];
                    //
                    //     if (newP.isPlaced()) {
                    //         if (falling) {
                    //             gameOver();
                    //         } else {
                    //
                    //         }
                    //     } else {
                    //         newP.setFalling();
                    //         tempFallingPieces.push(newP);
                    //     }
                    // }
                }());
            }

            (function setUpKeyDownControl() {
                $(document).keydown(function (event) {
                    function tryMovingBy(coors) {
                        var newFallingPieces = [];

                        function everyCellCanMove() {
                            return fallingPieces.every(function (p) {
                                var nY = p.getY() + coors[0];
                                var nX = p.getX() + coors[1];
                                if (nX < 0 || nY < 0 || nX >= NUM_COL || nY >= NUM_ROW) {
                                    return false;
                                }
                                var newP = cells[nY][nX];
                                if (newP.isPlaced()) {
                                    return false;
                                }
                                newFallingPieces.push(newP);
                                return true;
                            });
                        }

                        // function someCellPlaced() {
                        //     return fallingPieces.some(function(p){
                        //         p.isPlaced();
                        //     });
                        // }

                        if (wholePieceFalling && everyCellCanMove()) {
                            // if (!someCellPlaced()) {
                            fallingPieces.forEach(function (c) {
                                c.setEmpty();
                            });
                            fallingPieces = newFallingPieces;
                            fallingPieces.forEach(function (c) {
                                c.setFalling();
                            });
                            // }
                        }
                    }

                    switch (event.which) {
                        case KEY.LEFT:
                            tryMovingBy([0, -1]);
                            event.preventDefault();
                            break;
                        case KEY.RIGHT:
                            tryMovingBy([0, 1]);
                            event.preventDefault();
                            break;
                        case KEY.UP:
                            event.preventDefault();
                            break;
                        case KEY.DOWN:
                            tryMovingBy([1, 0]);
                            event.preventDefault();
                            break;
                        case KEY.SPACE:
                            event.preventDefault();
                            break;
                    }
                });
            }());
        }

    });

}());