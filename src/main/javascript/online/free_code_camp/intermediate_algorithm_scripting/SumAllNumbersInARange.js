/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/sum-all-numbers-in-a-range

 We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them.

 The lowest number will not always come first.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Math.max()

 Math.min()

 Array.prototype.reduce()

 * */

module.exports = function sumAll(arr) {
    "use strict";
    var smaller = Math.min(arr[0], arr[1]), larger = Math.max(arr[0], arr[1]);
    return new Array(larger - smaller + 1).fill(0).reduce(function (prev, _, curr) {
        return prev + (curr + smaller);
    }, 0);
};

function sumAllWithoutLoop(arr) {
    "use strict";
    var smaller = Math.min(arr[0], arr[1]), larger = Math.max(arr[0], arr[1]);

    if (larger === 0 && smaller === 0) {
        return 0;
    }
    if (larger === 0) {
        return -((1 + (Math.abs(smaller))) * (Math.abs(smaller))) / 2;
    }

    if (smaller === 0) {
        return ((1 + (Math.abs(larger))) * (Math.abs(larger))) / 2;
    }

    if (larger > 0 && smaller > 0) {
        return ((smaller + larger) * (larger - smaller + 1)) / 2;
    }

    if (smaller < 0) {
        return ((1 + larger) * larger) / 2 - ((1 + Math.abs(smaller)) * Math.abs(smaller)) / 2;
    }

    return -((Math.abs(smaller) + Math.abs(larger)) * (Math.abs(larger) - Math.abs(smaller) + 1)) / 2;
}

