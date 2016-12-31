/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/missing-letters

 Find the missing letter in the passed letter range and return it.

 If all letters are present in the range, return undefined.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 String.prototype.charCodeAt()

 String.fromCharCode()

 String.prototype.split()

 * */

module.exports = function fearNotLetter(str) {
    "use strict";
    var nextChar = str.split("").find(function (c, index, arr) {
        if (index > 0) {
            return ((c.charCodeAt(0) - arr[index - 1].charCodeAt(0)) !== 1);
        }
        return false;
    });
    if (typeof nextChar === "undefined") {
        return nextChar;
    }
    return String.fromCharCode(nextChar.charCodeAt(0) - 1);
};