/**
 * Created by Hey on 6 Jan 2017
 */
// Unfortunately still have to pollute the global namespace myself if not using webpack/requireJS
var TicTacToe = (function () {
    "use strict";

    var exports = {
        "newBoardStartsWithO": function () {
            return chooseLevel(CELL.O);
        },
        "newBoardStartsWithX": function () {
            return chooseLevel(CELL.X);
        }
    };

    var CELL = {
        "O": "O",
        "X": "X",
        BLANK: ""
    };

    var DIAGONAL_CELLS = [
        [0, 0],
        [1, 1],
        [2, 2]
    ];
    var REVERSE_DIAGONAL_CELLS = [
        [2, 0],
        [1, 1],
        [0, 2]
    ];

    var AI_LEVEL = {
        "EASY": {
            "getNextPlace": function (rows) {
                var emptyCells = rows.reduce(function (prev, row, i) {
                    return prev.concat(row.map(function (cell, j) {
                        return [cell, j];
                    }).filter(function (val) {
                        return val[0] === CELL.BLANK;
                    }).map(function (val) {
                        return [i, val[1]];
                    }));
                }, []);

                return emptyCells[Math.floor(Math.random() * emptyCells.length)];
            }
        },
        "HARD": {
            "getNextPlace": function (rows, currentTurn) {
                var combinations_to_check = (function () {
                    var threeTimes = [0, 1, 2];
                    return threeTimes.map(function (i) {
                        function getCombination(reversed) {
                            return threeTimes.map(function (j) {
                                return (reversed ? [j, i] : [i, j]);
                            });
                        }

                        return [getCombination(false), getCombination(true)];
                    }).reduce(function (prev, curr) {
                        return prev.concat(curr);
                    }, []).concat([DIAGONAL_CELLS, REVERSE_DIAGONAL_CELLS]);
                }());
                var opponent = currentTurn === CELL.O ? CELL.X : CELL.O;

                var winning_combination = combinations_to_check.find(function (combination) {
                    return (combination.some(function (coors) {
                            return rows[coors[0]][coors[1]] === CELL.BLANK;
                        })) &&
                        (
                            [
                                CELL.O,
                                CELL.X
                            ].some(function (cellType) {
                                return (combination.filter(function (coors) {
                                        return rows[coors[0]][coors[1]] === cellType;
                                    })).length >= 2;
                            })
                        );
                });
                if (typeof winning_combination !== "undefined") {
                    return winning_combination.filter(function (coors) {
                        return rows[coors[0]][coors[1]] === CELL.BLANK;
                    })[0];
                } else {
                    return AI_LEVEL.EASY.getNextPlace(rows);
                }
            }
        },
        "IMPOSSIBLE": undefined,
        "FRIEND": undefined
    };

    function TicTacToe(startsWith, aiLevel) {
        var rows = new Array(3).fill(0).map(function () {
            function createNewRow() {
                return new Array(3).fill(CELL.BLANK);
            }

            return createNewRow();
        });
        var currentTurn = startsWith, gameEnded = false;

        this.tryPlacingAt = function (coors) {
            var isValid = checkIsValid(coors);
            var winner, drawn = false, aiPick;

            function isWinnerOut() {
                return typeof winner !== "undefined";
            }

            function checkIsGameEnded() {
                return isWinnerOut() || drawn;
            }

            function place(c) {
                rows[c[0]][c[1]] = currentTurn;
                winner = checkWinner();
                if (!isWinnerOut()) {
                    drawn = checkDrawn();
                }
                changeTurn();
                gameEnded = checkIsGameEnded();
            }

            if (isValid) {
                place(coors);
                if (!gameEnded) {
                    if (typeof aiLevel !== "undefined") {
                        aiPick = aiLevel.getNextPlace(rows, currentTurn);
                        place(aiPick);
                    }
                }
            }
            // Expect to be undefined when there is NO_WINNER and when there is NO_AI_PICK
            //noinspection JSUnusedAssignment
            return {
                "valid": isValid,
                "winner": winner,
                "drawn": drawn,
                "aiPick": aiPick
            };
        };

        this.getCurrentTurn = function () {
            return currentTurn;
        };

        function changeTurn() {
            currentTurn = (currentTurn === CELL.O) ? CELL.X : CELL.O;
        }

        function checkDrawn() {
            return rows.every(function (row) {
                return row.every(function (cell) {
                    return cell !== CELL.BLANK;
                });
            });
        }

        function checkWinner() {
            function checkRow() {
                return rows.some(function (row) {
                    return row.every(function (cell) {
                        return cell === currentTurn;
                    });
                });
            }

            function checkColumn() {
                return rows[0].some(function (_, index) {
                    return rows.every(function (row) {
                        return row[index] === currentTurn;
                    });
                });
            }

            function checkDiagonal() {
                return [
                    DIAGONAL_CELLS,
                    REVERSE_DIAGONAL_CELLS
                ].some(function (diag) {
                    return diag.every(function (coors) {
                        return rows[coors[0]][coors[1]] === currentTurn;
                    });
                });
            }

            return [
                checkRow,
                checkColumn,
                checkDiagonal
            ].some(function (func) {
                return func();
            }) ? currentTurn : undefined;
        }

        function checkIsValid(coors) {
            function isCellOcuppied() {
                return (rows[coors[0]][coors[1]]) !== CELL.BLANK;
            }

            function isWithInBoundary() {
                return [
                    coors[0],
                    coors[1]
                ].every(function (c) {
                    return (typeof c === "number") && c >= 0 && c < 3;
                });
            }

            return !gameEnded && isWithInBoundary() && !(isCellOcuppied());
        }
    }

    function chooseLevel(startsWith) {
        return {
            "vsEasyAI": function () {
                return new TicTacToe(startsWith, AI_LEVEL.EASY);
            },
            "vsHardAI": function () {
                return new TicTacToe(startsWith, AI_LEVEL.HARD);
            },
            "vsImpossibleAI": function () {
                return new TicTacToe(startsWith, AI_LEVEL.IMPOSSIBLE);
            },
            "vsFriend": function () {
                return new TicTacToe(startsWith, AI_LEVEL.FRIEND);
            }
        };
    }

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());