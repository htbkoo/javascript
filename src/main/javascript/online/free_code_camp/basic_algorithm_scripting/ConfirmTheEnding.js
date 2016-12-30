/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/confirm-the-ending

 Check if a string (first argument, str) ends with the given target string (second argument, target).

 This challenge can be solved with the .endsWith() method, which was introduced in ES2015. But for the purpose of this challenge, we would like you to use one of the JavaScript substring methods instead.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 String.prototype.substr()

 String.prototype.substring()

 * */


module.exports = function confirmEnding(str, target) {
    "use strict";
    // "Never give up and good luck will find you."
    // -- Falcor
    return (str.substring(str.length-target.length)===target);
};

