/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/smallest-common-multiple

 Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

 The range will be an array of two numbers that will not necessarily be in numerical order.

 e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Smallest Common Multiple

 * */

module.exports = function smallestCommons(arr) {
    "use strict";
    function gcd(a, b) {
        //    Euclid's algorithm
        //    Ref: https://en.wikipedia.org/wiki/Greatest_common_divisor
        if (a === 0) {
            return b;
        } else if (b === 0) {
            return a;
        } else {
            return gcd(b, a % b);
        }
    }

    function lcm(a, b) {
        return Math.floor((a * b) / gcd(a, b));
    }

    arr.sort(function (a, b) {
        return a - b;
    });

    return new Array(arr[1] - arr[0] + 1).fill(0).reduce(function (prev, _, curr) {
        return lcm(prev, curr + arr[0]);
    }, arr[0]);
};