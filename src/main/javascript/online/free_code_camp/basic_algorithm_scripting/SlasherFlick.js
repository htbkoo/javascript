/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/slasher-flick

 Return the remaining elements of an array after chopping off n elements from the head.

 The head means the beginning of the array, or the zeroth index.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Array.prototype.slice()

 Array.prototype.splice()

 * */

module.exports = function slasher(arr, howMany) {
    "use strict";
    // it doesn't always pay to be first
    return arr.slice(howMany);
};
