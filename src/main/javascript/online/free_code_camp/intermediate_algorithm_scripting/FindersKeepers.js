/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/finders-keepers

 Create a function that looks through an array (first argument) and returns the first element in the array that passes a truth test (second argument).

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Array.prototype.filter()

 * */

module.exports = function findElement(arr, func) {
    "use strict";
    // var num = 0;
    // return num;
    return arr.find(func);
};