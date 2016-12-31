/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/sorted-union

 Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.

 In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.

 The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

 Check the assertion tests for examples.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Arguments object

 Array.prototype.reduce()

 * */

module.exports = function uniteUnique(arr) {
    "use strict";
    var arrsArguments = arguments;
    var appeared = {};
    return new Array(arguments.length).fill(0).reduce(function (prev, _, index) {
        return prev.concat(
            arrsArguments[index].reduce(function (p, c) {
                if (!(c in appeared)) {
                    appeared[c] = "";
                     p.push(c);
                }
                return p;
            }, [])
        );
    }, []);
};