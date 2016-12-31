/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/drop-it

 Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.

 The second argument, func, is a function you'll use to test the first elements of the array to decide if you should drop it or not.

 Return the rest of the array, otherwise return an empty array.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Arguments object

 Array.prototype.shift()

 Array.prototype.slice()

 * */

module.exports = function dropElements(arr, func) {
    "use strict";
    // Drop them elements.
    var fulfiled = false;
    return arr.filter(function (val) {
        if (fulfiled) {
            return true;
        } else {
            return (fulfiled = func(val));
        }
    });
};

module.exports = function dropElementsWithKindOfShortCircuit(arr, func) {
    "use strict";
    // Drop them elements.
    var index = 0;
    arr.some(function (val) {
        if (!func(val)) {
            ++index;
            return false;
        } else {
            return true;
        }
    });
    return arr.slice(index);
};