/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/arguments-optional

 Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

 For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

 Calling this returned function with a single argument will then return the sum:

 var sumTwoAnd = addTogether(2);

 sumTwoAnd(3) returns 5.

 If either argument isn't a valid number, return undefined.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Closures

 Arguments object

 * */

module.exports = function addTogether() {
    "use strict";
    // From http://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
    // ref: http://stackoverflow.com/a/9716488
    function isNumeric(i) {
        // isFinite IS defined under Number
        //noinspection JSUnresolvedFunction
        return !isNaN(i) && Number.isFinite(i);
    }

    var first = arguments[0];
    switch (arguments.length) {
        case 1: {
            if (isNumeric(first)) {
                return function (a) {
                    if (isNumeric(a)) {
                        return first + a;
                    } else {
                        return undefined;
                    }
                };
            } else {
                return undefined;
            }
        } // jshint ignore:line
        // Unreachable, sigh
        case 2: {
            var second = arguments[1];
            if (isNumeric(first) && isNumeric(second)) {
                return first + second;
            } else {
                return undefined;
            }
        } // jshint ignore:line
        // Unreachable, again, sigh
        default:
            return undefined;
    }
};