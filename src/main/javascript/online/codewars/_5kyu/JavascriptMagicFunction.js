/**
 * Created by Hey on 20 Aug 2016
 */

/*

 https://www.codewars.com/kata/javascript-magic-function/train/javascript

 Create function that:

 accepts any number of parameters,
 returns sum of every single parameter given,
 any parameter that can not be parsed as a number will be counted as 0.
 can be called infinitely,
 the next function call will do the same thing, but also summing the last returned number.


 MagicFunction(3) == 3; // should return true
 MagicFunction(1, 2) == 3; // should return true
 MagicFunction(1, 3)(2) == 6; // should return true
 MagicFunction(1, 2)(3, 4, 5)(6)(7, 10) == 38; // should return true

 * */

module.exports = function MagicFunction() {
    "use strict";
    function getSumWithZeroAsDefault(prev, cur) {
        // var curAsInt = parseInt(cur, 10);
        // return prev + (isNaN(curAsInt) ? 0 : curAsInt);
        // var curAsFloat = parseFloat(cur, 10);
        // return prev + (isNaN(curAsFloat) ? 0 : curAsFloat);
        var curAsNumber = Number(cur);
        return prev + (isNaN(curAsNumber) ? 0 : curAsNumber);
        // return prev + (isNaN(cur) ? 0 : cur);
    }

    var args = Array.prototype.slice.call(arguments);
    console.log(args.toString()+"\n");

    var sum = args.reduce(getSumWithZeroAsDefault, 0);

    function curry() {
        var innerArgs = Array.prototype.slice.call(arguments);
        sum = innerArgs.reduce(getSumWithZeroAsDefault, sum);
        //noinspection JSLint
        return MagicFunction(sum);
    }

    // Reference: http://stackoverflow.com/questions/35039020/currying-a-function-that-takes-infinite-arguments
    // http://stackoverflow.com/a/35065863
    curry.valueOf = function () {
        return sum;
    };

    return curry;
};