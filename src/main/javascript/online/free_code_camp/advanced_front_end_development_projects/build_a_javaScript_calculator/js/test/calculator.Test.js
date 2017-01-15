/**
 * Created by Hey on 6 Jan 2017
 */

var Calculator = require("../calculator");

var Test = require("chai");
var format = require('string-format');

describe("FreeCodeCamp", function () {
    "use strict";

    describe("FrontEnd - Advanced Project", function () {
        describe("Calculator", function () {
            beforeEach(pressACAndAssert);

            describe("basics -  keys + numbers + operations", function () {
                describe("keys", function () {
                    it("should be able to initialize by 'AC' from pressing AC", pressACAndAssert);
                    it("should be able to go back a step by 'CE' from pressing CE", function () {
                        // Given
                        Calculator["1"]();
                        assertCalculator("1", "1");

                        // When
                        Calculator.CE();

                        // Then
                        assertCalculator("0", "");
                    });

                    it("should be able to calculates results '=' from pressing =", function () {
                        // Given

                        // When
                        Calculator["="]();

                        // Then
                        assertCalculator("0", "");
                    });

                    it("should be able to negate initially from pressing '+/-'", function () {
                        // Given
                        assertCalculator("0", "");

                        // When
                        Calculator["+/-"]();

                        // Then
                        assertCalculator("0", "");
                    });

                    it("should be able to negate 1 number result from pressing '+/-'", function () {
                        // Given
                        Calculator["1"]();
                        assertCalculator("1", "1");

                        // When
                        Calculator["+/-"]();

                        // Then
                        assertCalculator("-1", "-1");
                    });
                });

                describe("numbers", function () {
                    it("should be still showing '' after pressing '0'", function () {
                        // Given

                        // When
                        Calculator["0"]();

                        // Then
                        assertCalculator("0", "");
                    });

                    // [1..9]
                    new Array(9).fill(0).forEach(function (_, index) {
                        var number = index + 1;
                        it(format("should be able to add numeric '{}' from pressing {}", number, number), function () {
                            // Given
                            var numberAsString = number.toString();

                            // When
                            Calculator[numberAsString]();

                            // Then
                            assertCalculator(numberAsString, numberAsString);
                        });
                    });
                });

                describe("operations", function () {
                    [
                        "+",
                        "-",
                        "*",
                        "/"
                    ].forEach(function (op) {
                        it(format("should be able to use op '{}' from pressing {}", op, op), function () {
                            // Given

                            // When
                            Calculator[op]();

                            // Then
                            assertCalculator("0", "0" + op, op);
                        });
                    });
                });

            });
            describe("arithmetics", function () {
                describe("mutliple numbers", function () {

                    new Array(100).fill(0).map(function (_, index) {
                        var number = index + 1;
                        return {
                            "number": number,
                            "steps": number.toString().split("")
                        };
                    }).forEach(function (param) {
                        it(format("should be able to get numeric '{}' from pressing {}", param.number, JSON.stringify(param.steps)), function () {
                            // Given

                            // When
                            pressMany(param.steps);

                            // Then
                            var numberAsString = param.number.toString();
                            assertCalculator(numberAsString, numberAsString);
                        });
                    });
                });

                describe("1 numbers, 1 op", function () {
                    it("should allow press '+' after '12'", function () {
                        // Given
                        pressMany(["1", "2"]);
                        assertCalculator("12", "12");

                        // When
                        pressMany(["+"]);

                        // Then
                        assertCalculator("0", "12+", "+");
                    });
                });

                describe("1 numbers, =", function () {
                    it("should allow press '=' after '12' and still has '12' as result", function () {
                        // Given
                        pressMany(["1", "2"]);
                        assertCalculator("12", "12");

                        // When
                        pressMany(["="]);

                        // Then
                        assertCalculator("12", "12", "");
                        pressMany(["="]);
                        assertCalculator("12", "12", "");
                    });
                });

                describe("1 numbers, 1 op, 1 numbers", function () {
                    it("should process '32' after pressing '-' after '43'", function () {
                        // Given
                        pressMany(["4", "3"]);
                        assertCalculator("43", "43");

                        // When
                        pressMany(["-"]);
                        assertCalculator("0", "43-", "-");

                        // Then
                        pressMany(["3", "2"]);
                        assertCalculator("32", "43-32", "-");
                    });
                });

                describe("1 numbers, 1 op, 1 number, equal", function () {
                    it("should handle '+' correctly", function () {
                        // Given
                        pressMany(["4", "3", "+", "3", "2"]);
                        assertCalculator("32", "43+32", "+");

                        // When
                        pressMany(["="]);

                        // Then
                        assertCalculator("75", "75", "");
                    });
                });

                describe("*/ > +- precedence", function () {
                    it("should handle '*' before '+' correctly", function () {
                        // Given
                        pressMany(["4", "3", "+", "3", "2", "*", "2"]);

                        // When
                        pressMany(["="]);

                        // Then
                        assertCalculator("107", "107", "");
                    });
                });

                describe("more complicated cases", function () {
                    it("should handle full operations correctly", function () {
                        // Given
                        pressMany("435+236-165+32*5-6/2*3+15+8-56/7".split(""));

                        // When
                        pressMany(["="]);

                        // Then
                        assertCalculator("672", "672", "");
                    });

                    it("should be able to negate 1 number + 1op from pressing '+/-'", function () {
                        // Given
                        pressMany("25+".split(""));
                        assertCalculator("0", "25+");

                        // When
                        Calculator["+/-"]();

                        // Then
                        assertCalculator("0", "25+");
                    });
                    it("should be able to negate 1number + 1op + 1number from pressing '+/-'", function () {
                        // Given
                        pressMany("25+16".split(""));
                        assertCalculator("16", "25+16");

                        // When
                        Calculator["+/-"]();

                        // Then
                        assertCalculator("-16", "25+(-16)");
                    });
                    it("should be able to negate 1number + 1op + 1number from pressing '+/-'", function () {
                        // Given
                        pressMany("25+16".split(""));
                        Calculator["+/-"]();
                        assertCalculator("-16", "25+(-16)");

                        // When
                        Calculator["="]();

                        // Then
                        assertCalculator("9", "9");
                    });
                    it("should be able to negate 1number + 1op + 1number + 1op from pressing '+/-'", function () {
                        // Given
                        pressMany("25+16".split(""));
                        Calculator["+/-"]();
                        Calculator["-"]();
                        assertCalculator("0", "25+(-16)-");

                        // When
                        Calculator["="]();

                        // Then
                        assertCalculator("9", "9");
                    });
                });
            });

            describe("other cases", function () {

                describe("more usage for 'CE'", function () {
                    it("should use 'CE' to backspace first current multiple numbers step", function () {
                        // Given
                        pressMany("123".split(""));

                        // When
                        pressMany(["CE"]);

                        // Then
                        assertCalculator("0", "");
                    });

                    it("should use 'CE' to backspace first current operator", function () {
                        // Given
                        pressMany("435+".split(""));
                        assertCalculator("0", "435+", "+");

                        // When
                        pressMany(["CE"]);

                        // Then
                        assertCalculator("435", "435", "");
                    });

                    it("should use 'CE' to backspace number after an operator", function () {
                        // Given
                        pressMany("435+216".split(""));
                        assertCalculator("216", "435+216", "+");

                        // When
                        pressMany(["CE"]);

                        // Then
                        assertCalculator("0", "435+", "+");
                    });
                });

                describe("changing operator", function () {
                    it("should handle switching operators with no numbers correctly", function () {
                        // Given

                        // When
                        pressMany("+-".split(""));

                        // Then
                        assertCalculator("0", "0-", "-");
                    });
                    it("should handle switching operators with 1 number correctly", function () {
                        // Given
                        pressMany("435".split(""));
                        assertCalculator("435", "435", "");

                        // When
                        pressMany("+/".split(""));

                        // Then
                        assertCalculator("0", "435/", "/");
                    });
                    it("should handle switching operators with 1 number correctly", function () {
                        // Given
                        pressMany("435+26-".split(""));
                        assertCalculator("0", "435+26-", "-");

                        // When
                        pressMany("+-/*".split(""));

                        // Then
                        assertCalculator("0", "435+26*", "*");
                    });
                });

            });

            function pressACAndAssert() {
                // Given

                // When
                Calculator.AC();

                // Then
                assertCalculator("0", "");
            }

            function pressMany(stepsArray) {
                stepsArray.forEach(function (step) {
                    Calculator[step.toString()]();
                });
            }

            function assertCalculator(result, steps, lastOpertator) {
                Test.expect(Calculator.getResult()).to.equal(result);

                if (typeof steps !== "undefined") {
                    Test.expect(Calculator.getSteps()).to.equal(steps);
                }
                if (typeof lastOpertator !== "undefined") {
                    Test.expect(Calculator.getLastOperator()).to.equal(lastOpertator);
                }
            }
        });

    });
});