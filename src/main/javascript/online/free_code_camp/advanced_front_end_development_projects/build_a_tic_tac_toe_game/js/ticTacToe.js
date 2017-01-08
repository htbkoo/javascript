/**
 * Created by Hey on 6 Jan 2017
 */
(function () {
    "use strict";

    var CELL = {
        "O": "O",
        "X": "X",
        BLANK: ""
    };

    function TicTacToe(startsWith) {
        var rows = new Array(3).fill(0).map(function () {
            function createNewRow() {
                return new Array(3).fill(CELL.BLANK);
            }

            return createNewRow();
        });
        var currentTurn = startsWith, gameEnded = false;

        this.tryPlacingAt = function (coors) {
            var isValid = checkIsValid(coors);
            var winner, drawn = false;

            function isWinnerOut() {
                return typeof winner !== "undefined";
            }

            if (isValid) {
                rows[coors[0]][coors[1]] = currentTurn;
                winner = checkWinner();
                if (!isWinnerOut()) {
                    drawn = checkDrawn();
                    if (!drawn) {
                        changeTurn();
                    }
                }
                if (isWinnerOut() || drawn) {
                    gameEnded = true;
                }
            }
            return {
                "valid": isValid,
                "winner": winner,
                "drawn": drawn
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


    if (typeof module !== "undefined") {
        module.exports = {
            "newBoardStartsWithO": function () {
                return new TicTacToe(CELL.O);
            },
            "newBoardStartsWithX": function () {
                return new TicTacToe(CELL.X);
            }
        };
    }
}());