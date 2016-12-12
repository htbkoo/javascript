/**
 * Created by Hey on 6 Dec 2016
 */

(function tetris() {
    "use strict";

    var Cell = function (param_$c, x, y) {
        var FALLING = "falling", PLACED = "placed";

        var $div = $(param_$c.find('div')[0]);
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
    var ENGINE_INTERVAL = 200;
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
            function setUpNextPieces() {
                rotateLogic = nextRotateLogic;
                curPiece = nextPiece;
                nextRotateLogic = curPiece.shift();
                nextPiece = getNextPiece();
            }

            function getNextPiece() {
                var PIECES_PATTERN = [
                    [[
                        [[-2, -1], [-1, 0], [0, 1], [1, 2]],
                        [[-1, 2], [0, 1], [1, 0], [2, -1]],
                        [[2, 1], [1, 0], [0, -1], [-1, -2]],
                        [[1, -2], [0, -1], [-1, 0], [-2, 1]]
                    ],
                        [0], [0], [0], [0]], // long vertical
                    [[
                        [[0, 0], [0, 0], [0, 0], [0, 0]]
                    ],
                        [0, 1], [0, 1]], // square
                    [[
                        [[-1, -1], [-1, 1], [0, 0], [0, 2]],
                        [[-1, 1], [1, 1], [0, 0], [2, 0]],
                        [[1, 1], [1, -1], [0, 0], [0, -2]],
                        [[1, -1], [-1, -1], [0, 0], [-2, 0]]
                    ],
                        [1], [0, 1], [0]], // \/\
                    [[
                        [[-2, 0], [-1, 1], [0, 0], [1, 1]],
                        [[0, 2], [1, 1], [0, 0], [1, -1]],
                        [[2, 0], [1, -1], [0, 0], [-1, -1]],
                        [[0, -2], [-1, -1], [0, 0], [-1, 1]]
                    ],
                        [0], [0, 1], [1]], // /\/
                    [[
                        [[-1, -1], [0, 0], [1, -1], [1, 1]],
                        [[-1, 1], [0, 0], [-1, -1], [1, -1]],
                        [[1, 1], [0, 0], [-1, 1], [-1, -1]],
                        [[1, -1], [0, 0], [1, 1], [-1, 1]]
                    ],
                        [0], [0, 1], [0]], // T
                    [[
                        [[-2, 0], [-1, -1], [-1, 1], [0, 2]],
                        [[0, 2], [-1, 1], [1, 1], [2, 0]],
                        [[2, 0], [1, 1], [1, -1], [0, -2]],
                        [[0, -2], [1, -1], [-1, -1], [-2, 0]]
                    ],
                        [0, 1], [0], [0]], // L
                    [[
                        [[-1, -1], [0, -2], [1, -1], [2, 0]],
                        [[-1, 1], [-2, 0], [-1, -1], [0, -2]],
                        [[1, 1], [0, 2], [-1, 1], [-2, 0]],
                        [[1, -1], [2, 0], [1, 1], [0, 2]]
                    ],
                        [0, 1], [1], [1]] // _|
                ];

                function getRandomIntLessThan(maxExclusive) {
                    return Math.floor(Math.random() * maxExclusive);
                }

                return PIECES_PATTERN[getRandomIntLessThan(PIECES_PATTERN.length)];
            }

            function gameOver() {
                alert("Game Over! Your score: " + score + ", Rows: " + numRowsCleared);
                clearInterval(gameId);
                gameStarted = false;
            }

            function refreshUIScores() {
                $("#score").text(score);
                $("#numRowsCleared").text(numRowsCleared);
            }

            function gameEngine() {
                if (!wholePieceFalling) {
                    (function placeNextPiece() {
                        if (curPiece.length === 0) {
                            wholePieceFalling = true;
                            setUpNextPieces();
                            numRotate = 0;
                            tempNumRotate = 0;
                        } else {
                            curPiece[0].some(function (x) {
                                var p = cells[0][x + MIDDLE_X];
                                p.setFalling();
                                fallingPieces.push(p);
                                return !gameStarted;
                            });
                            curPiece.shift();
                        }
                    }());
                }

                (function manageFallingPiece() {
                    var tempFallingPieces = [];

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
                                    var numClearedByPiece = cells.filter(function (row, index) {
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
                                            return true;
                                        }
                                        return false;
                                    }).length;

                                    numRowsCleared += numClearedByPiece;
                                    score += Math.floor(((numClearedByPiece + 1) * numClearedByPiece) / 2);
                                    refreshUIScores();
                                }());

                                wholePieceFalling = false;
                                return true;
                            } else {
                                var newP = cells[nY][nX];
                                // newP.setFalling();
                                tempFallingPieces.push(newP);
                            }
                            return false;
                        })) {
                        fallingPieces = tempFallingPieces;
                        fallingPieces.forEach(function (newP) {
                            newP.setFalling();
                        });
                    } else {
                        fallingPieces = [];
                        tempFallingPieces.forEach(function (p) {
                            if (p.isFalling()) {
                                p.setEmpty();
                            }
                        });
                    }
                }());
            }

            var wholePieceFalling = false;
            var curPiece = getNextPiece(), nextPiece = getNextPiece(), rotateLogic, nextRotateLogic = curPiece.shift();
            var tempNumRotate = 0;
            var numRotate = 0;
            var score = 0;
            var numRowsCleared = 0;
            var fallingPieces = [];

            refreshUIScores();

            (function clearBoard() {
                cells.forEach(function (r) {
                    r.forEach(function (c) {
                        c.setEmpty();
                    });
                });
            }());
            gameStarted = true;
            gameId = setInterval(gameEngine, ENGINE_INTERVAL);

            (function setUpKeyDownControl() {
                $(document).keydown(function (event) {
                    function tryMovingTo(computeNewCoorsArr) {
                        function everyNewCellsValid(coorsArr) {
                            return coorsArr.every(function (p) {
                                var nY = p[0];
                                var nX = p[1];
                                if (nX < 0 || nY < 0 || nX >= NUM_COL || nY >= NUM_ROW) {
                                    return false;
                                }
                                var newCell = cells[nY][nX];
                                newFallingPieces.push(newCell);
                                return !newCell.isPlaced();
                            });
                        }

                        var newFallingPieces = [];

                        if (wholePieceFalling) {
                            if (everyNewCellsValid(computeNewCoorsArr())) {
                                numRotate = tempNumRotate;
                                fallingPieces.forEach(function (c) {
                                    c.setEmpty();
                                });
                                fallingPieces = newFallingPieces;
                                fallingPieces.forEach(function (c) {
                                    c.setFalling();
                                });
                            } else {
                                tempNumRotate = numRotate;
                            }
                        }

                    }

                    function computeNewCellsByMoving(coors) {
                        return fallingPieces.map(function (p) {
                            var nY = p.getY() + coors[0];
                            var nX = p.getX() + coors[1];
                            return [nY, nX];
                        });
                    }

                    function computeNewCellsByRotating() {
                        tempNumRotate = numRotate + 1;

                        console.log(numRotate + ": " + rotateLogic.toString());

                        return fallingPieces.map(function (c, i) {
                            var coors = rotateLogic[numRotate % rotateLogic.length][i];
                            return [c.getY() + coors[0], c.getX() + coors[1]];
                        });
                    }

                    switch (event.which) {
                        case KEY.LEFT:
                            tryMovingTo(function () {
                                return computeNewCellsByMoving([0, -1]);
                            });
                            event.preventDefault();
                            break;
                        case KEY.RIGHT:
                            tryMovingTo(function () {
                                return computeNewCellsByMoving([0, 1]);
                            });
                            event.preventDefault();
                            break;
                        case KEY.DOWN:
                            tryMovingTo(function () {
                                return computeNewCellsByMoving([1, 0]);
                            });
                            event.preventDefault();
                            break;
                        case KEY.UP:
                        case KEY.SPACE:
                            tryMovingTo(function () {
                                return computeNewCellsByRotating();
                            });
                            event.preventDefault();
                            break;
                    }
                });
            }());
        }

    });

}());