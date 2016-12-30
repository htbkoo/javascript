/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/seek-and-destroy

 You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Arguments object

 Array.prototype.filter()

 * */

module.exports = function destroyer(arr) {
    "use strict";
    // Remove all the values
    var target = {};
    var destroyerArguments = arguments;
    new Array(arguments.length - 1).fill(0).forEach(function (_, index) {
        target[destroyerArguments[index + 1]] = "";
    });

    return arr.filter(function (val) {
        return !(val in target);
    });
};
