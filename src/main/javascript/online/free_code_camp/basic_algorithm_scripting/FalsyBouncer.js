/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/falsy-bouncer

 Remove all falsy values from an array.

 Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Boolean Objects

 Array.prototype.filter()

 * */

module.exports = function bouncer(arr) {
    "use strict";
    // Don't show a false ID to this bouncer.
    return arr.filter(function (val) {
        return val;
    });
};