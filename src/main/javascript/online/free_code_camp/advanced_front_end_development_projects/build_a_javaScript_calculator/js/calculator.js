//noinspection JSUnusedLocalSymbols
/**
 * Created by Hey on 6 Jan 2017
 */
// Unfortunately still have to pollute the global namespace myself if not using webpack/requireJS
var Calculator = (function () {
    "use strict";

    var result, steps;
    initialize();

    function initialize() {
        result = 0;
        steps = [];
    }

    var ALL_NUMERICS = {};
    // [0..9]
    new Array(10).fill(0).forEach(function (_, index) {
        ALL_NUMERICS[index] = function () {
            result = result * 10 + index;
        };
    });

    var ALL_OPERATORS = {};
    ["+", "-", "*", "/"].forEach(function (op) {
        ALL_OPERATORS[op] = function () {
            if (!isResultZero()) {
                steps.push(getFormattedResult());
            } else if (!hasSteps()) {
                steps.push("0");
            }
            result = 0;

            if (isAnOperator(getLastFrom(steps))) {
                steps[steps.length - 1] = op;
            } else {
                steps.push(op);
            }
        };
    });

    var exports = {
        "AC": function () {
            initialize();
        },
        "CE": function () {
            if (isResultZero()) {
                var removed = steps.splice(-1, 1);
                if (isAnOperator(removed)) {
                    result = steps.splice(-1, 1);
                }
            } else {
                result = 0;
            }
        },
        "=": function () {
            function getProcessedSteps() {
                if (isResultZero() && isAnOperator(steps.slice(-1)[0])) {
                    steps.splice(-1, 1);
                }
                return exports.getSteps();
            }

            if (!isResultZero() || hasSteps()) {
                var str_steps = getProcessedSteps();
                //    Simple, but probably unsafe way is to use eval, but it is really simple one-liner.....
                result = eval(str_steps); // jshint ignore:line
                steps = [];
            } else {
                result = 0;
            }
        }, "+/-": function () {
            result *= -1;
        },

        // getters
        "getResult": function () {
            return result.toString();
        },
        "getSteps": function () {
            return steps.join("") + getFormattedResult();
        },
        "getLastOperator": function () {
            var lastOperators = steps.filter(function (step) {
                return (step in ALL_OPERATORS);
            });

            function hasLastOperators() {
                return lastOperators.length > 0;
            }

            return hasLastOperators() ? getLastFrom(lastOperators) : "";
        }
    };

    [
        ALL_NUMERICS,
        ALL_OPERATORS
    ].forEach(function (obj) {
        Object.keys(obj).forEach(function (key) {
            exports[key] = obj[key];
        });
    });

    function hasSteps() {
        return steps.length > 0;
    }

    function isResultZero() {
        return result === 0;
    }


    function isAnOperator(str) {
        return str in ALL_OPERATORS;
    }

    function getLastFrom(array) {
        return array.slice(-1)[0];
    }

    function getFormattedResult() {
        if (isResultZero()) {
            return "";
        } else {
            var resultAsString = result.toString();
            if ((hasSteps()) && (result < 0)) {
                return "(" + resultAsString + ")";
            } else {
                return resultAsString;
            }
        }
    }

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());