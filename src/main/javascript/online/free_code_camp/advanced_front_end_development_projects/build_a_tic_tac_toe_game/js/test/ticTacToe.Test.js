/**
 * Created by Hey on 6 Jan 2017
 */

var TicTacToe = require("../ticTacToe");
// It IS defined, only because IntelliJ could not find it
//noinspection JSUnresolvedFunction
var TTT_StartsWithO = TicTacToe.newBoardStartsWithO();
//noinspection JSUnresolvedFunction
var TTT_StartsWithX = TicTacToe.newBoardStartsWithX();

var Test = require("chai");
var format = require('string-format');

describe("TicTacToe - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("TicTacToe", function () {
            var MESSAGES = {
                "NO_WINNER": "There should be no winner yet",
                "NOT_DRAWN": "It should not be drawn yet"
            };

            var ticTacToe;

            beforeEach(function () {
                // Given
                ticTacToe = TTT_StartsWithO.vsFriend();
            });

            describe("Initialization", function () {
                [
                    {
                        "startsWith": "O", "thenTurn": "X", "func": function () {
                        return TTT_StartsWithO.vsFriend();
                    }
                    },
                    {
                        "startsWith": "X", "thenTurn": "O", "func": function () {
                        return TTT_StartsWithX.vsFriend();
                    }
                    }
                ].forEach(function (param) {
                    it(format("should be able to place anywhere for a fresh board starts with {}", param.startsWith), function () {
                        // Given
                        ticTacToe = param.func();

                        // When
                        assertTurn(param.startsWith);
                        var results = ticTacToe.tryPlacingAt([0, 0]);

                        // Then
                        assertTurn(param.thenTurn);
                        assertResults(results,
                            {
                                "valid": true,
                                "winner": undefined,
                                "drawn": false
                            },
                            {
                                "valid": "It should be able to place at (0,0) at the beginning",
                                "winner": MESSAGES.NO_WINNER,
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });
                });
            });

            describe("Winner cases", function () {

                beforeEach(function () {
                    // Given
                    [
                        [0, 0],
                        [0, 1],
                        [1, 0],
                        [1, 1]
                    ].forEach(function (coors) {
                        var results = ticTacToe.tryPlacingAt(coors);

                        assertResults(results,
                            {
                                "valid": true,
                                "winner": undefined,
                                "drawn": false
                            },
                            {
                                "valid": format("It should be able to place at ({}, {})", coors[0], coors[1]),
                                "winner": MESSAGES.NO_WINNER,
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });
                });

                [
                    {"places": [[2, 0]], "winner": "O"},
                    {"places": [[2, 2], [2, 1]], "winner": "X"}
                ].forEach(function (inputs) {
                    it(format('should check "{}" as winner', inputs.winner), function () {
                        // Given
                        inputs.places.slice(0, -1).forEach(function (coors) {
                            var results = ticTacToe.tryPlacingAt(coors);

                            assertResults(results,
                                {
                                    "valid": true,
                                    "winner": undefined,
                                    "drawn": false
                                },
                                {
                                    "valid": format("It should be able to place at ({}, {})", coors[0], coors[1]),
                                    "winner": MESSAGES.NO_WINNER,
                                    "drawn": MESSAGES.NOT_DRAWN
                                }
                            );
                        });

                        // When
                        var winningCoors = inputs.places.slice(-1)[0];
                        var results = ticTacToe.tryPlacingAt(winningCoors);

                        // Then
                        assertResults(results,
                            {
                                "valid": true,
                                "winner": inputs.winner,
                                "drawn": false
                            },
                            {
                                "valid": format("It should be able to place at ({}, {})", winningCoors[0], winningCoors[1]),
                                "winner": format('"{}" should be the winner', inputs.winner),
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });
                });

                it("should not be able to place after there has been a winner", function () {
                    // Given
                    var winner = "O", winningCoors = [2, 0];
                    assertResults(ticTacToe.tryPlacingAt(winningCoors),
                        {
                            "valid": true,
                            "winner": winner,
                            "drawn": false
                        },
                        {
                            "valid": format("It should be able to place at ({}, {})", winningCoors[0], winningCoors[1]),
                            "winner": format('"{}" should be the winner', winner),
                            "drawn": MESSAGES.NOT_DRAWN
                        }
                    );

                    // When
                    var results = ticTacToe.tryPlacingAt([2, 2]);

                    // Then
                    assertResults(results,
                        {
                            "valid": false,
                            "winner": undefined,
                            "drawn": false
                        },
                        {
                            "valid": "It should be invalid to place after winners is out",
                            "winner": MESSAGES.NO_WINNER,
                            "drawn": MESSAGES.NOT_DRAWN
                        }
                    );
                });
            });

            describe("Special Case of Win and Drawn case together", function () {
                it("should check winner before drawn, and drawn be false if winner is out", function () {
                    // Given
                    [
                        [1, 1],
                        [0, 0],
                        [0, 1],
                        [2, 1],
                        [1, 2],
                        [1, 0],
                        [2, 0],
                        [2, 2]
                    ].forEach(function (coors) {
                        var results = ticTacToe.tryPlacingAt(coors);

                        assertResults(results,
                            {
                                "valid": true,
                                "winner": undefined,
                                "drawn": false
                            },
                            {
                                "valid": format("It should be able to place at ({}, {})", coors[0], coors[1]),
                                "winner": MESSAGES.NO_WINNER,
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });

                    // When
                    var results = ticTacToe.tryPlacingAt([0, 2]);

                    // Then
                    assertResults(results,
                        {
                            "valid": true,
                            "winner": "O",
                            "drawn": false
                        },
                        {
                            "valid": "It should be valid to place",
                            "winner": "O should be the winner",
                            "drawn": "It should not be consider as drawn if winner is out"
                        }
                    );
                });
            });

            describe("Drawn Case", function () {
                beforeEach(function () {
                    // Given
                    [
                        [0, 0],
                        [0, 1],
                        [1, 0],
                        [1, 1],
                        [2, 1],
                        [2, 0],
                        [0, 2],
                        [1, 2]
                    ].forEach(function (coors) {
                        var results = ticTacToe.tryPlacingAt(coors);

                        assertResults(results,
                            {
                                "valid": true,
                                "winner": undefined,
                                "drawn": false
                            },
                            {
                                "valid": format("It should be able to place at ({}, {})", coors[0], coors[1]),
                                "winner": MESSAGES.NO_WINNER,
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });
                });

                it("should be able to note that it is a drawn case, after 9 places", function () {
                    // When
                    var results = ticTacToe.tryPlacingAt([2, 2]);

                    // Then
                    assertResults(results,
                        {
                            "valid": true,
                            "winner": undefined,
                            "drawn": true
                        },
                        {
                            "valid": "It should be valid to place for the last space",
                            "winner": MESSAGES.NO_WINNER,
                            "drawn": "It should be a draw after last place"
                        }
                    );
                });

                it("should not be able to place after a drawn case", function () {
                    // Given
                    ticTacToe.tryPlacingAt([2, 2]);

                    // When
                    var results = ticTacToe.tryPlacingAt([0, 0]);

                    // Then
                    assertResults(results,
                        {
                            "valid": false,
                            "winner": undefined,
                            "drawn": false
                        },
                        {
                            "valid": "It should be invalid to place at an occupied place which is always the case after drawn",
                            "winner": MESSAGES.NO_WINNER,
                            "drawn": MESSAGES.NOT_DRAWN
                        }
                    );
                });

            });

            describe("Invalid cases", function () {

                it("should not be able to place at the same place", function () {
                    // Given
                    ticTacToe.tryPlacingAt([0, 0]);

                    // When
                    var results = ticTacToe.tryPlacingAt([0, 0]);

                    // Then
                    assertResults(results,
                        {
                            "valid": false,
                            "winner": undefined,
                            "drawn": false
                        },
                        {
                            "valid": "It should be invalid to place at an occupied place",
                            "winner": MESSAGES.NO_WINNER,
                            "drawn": MESSAGES.NOT_DRAWN
                        }
                    );
                });

                function generateInvalidCoordinatesPairs() {
                    var byArrayConcat = function (prev, curr) {
                        return prev.concat(curr);
                    };
                    return [-1, 3].map(function (x) {
                        return new Array(4).fill(0).map(function (_, i) {
                            return [[x, i], [i, x]];
                        }).reduce(byArrayConcat, []);
                    }).reduce(byArrayConcat, []);
                }

                generateInvalidCoordinatesPairs().forEach(function (invalidCoors) {
                    it(format("should not be able to place at invalid coordinates as ({}, {})", invalidCoors[0], invalidCoors[1]), function () {
                        // When
                        var results = ticTacToe.tryPlacingAt(invalidCoors);

                        // Then
                        assertResults(results,
                            {
                                "valid": false,
                                "winner": undefined,
                                "drawn": false
                            },
                            {
                                "valid": format("It should be invalid to place at invalid coordinates as ({}, {})", invalidCoors[0], invalidCoors[1]),
                                "winner": MESSAGES.NO_WINNER,
                                "drawn": MESSAGES.NOT_DRAWN
                            }
                        );
                    });
                });
            });

            describe("AI related", function () {
                describe("Easy AI", function () {
                    it("should place immediately after player when playing with AI", function () {
                        // Given
                        ticTacToe = TTT_StartsWithO.vsEasyAI();

                        // When
                        assertTurn("O");
                        var results = ticTacToe.tryPlacingAt([1,0]);

                        // Then
                        assertTurn("O");
                        Test.expect(results.aiPick).not.to.be.undefined;

                    });
                });
                describe("Hard AI", function () {
                    it("should place immediately after player when playing with AI", function () {
                        // Given
                        ticTacToe = TTT_StartsWithO.vsHardAI();

                        // When
                        assertTurn("O");
                        var results = ticTacToe.tryPlacingAt([1,0]);

                        // Then
                        assertTurn("O");
                        Test.expect(results.aiPick).not.to.be.undefined;

                    });
                });
                describe("With Friend", function () {
                    it("should still be able to play with Friend and should not place immediately after first player placed when playing with friend", function () {
                        // Given
                        ticTacToe = TTT_StartsWithO.vsFriend();

                        // When
                        assertTurn("O");
                        var results = ticTacToe.tryPlacingAt([1,0]);

                        // Then
                        assertTurn("X");
                        Test.expect(results.aiPick).to.be.undefined;

                    });
                });
            });

            function assertResults(results, expectedResults, messages) {
                Test.expect(results.valid).to.equal(expectedResults.valid, messages.valid);
                Test.expect(results.winner).to.be.equal(expectedResults.winner, messages.winner);
                Test.expect(results.drawn).to.be.equal(expectedResults.drawn, messages.drawn);
            }


            function assertTurn(startsWith) {
                Test.expect(ticTacToe.getCurrentTurn()).to.equal(startsWith, format("It should be {}'s turn", startsWith));
            }
        });
    });
});