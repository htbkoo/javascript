/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/roman-numeral-converter

 Convert the given number into a roman numeral.

 All roman numerals answers should be provided in upper-case.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Roman Numerals

 Array.prototype.splice()

 Array.prototype.indexOf()

 Array.prototype.join()

 * */

module.exports = function convertToRoman(num) {
    "use strict";

    var ROMAN_NUMBERALS = {
        1: "I",
        5: "V",
        9: "IX",
        10: "X",
        50: "L",
        90: "XC",
        100: "C",
        500: "D",
        900: "CM",
        1000: "M"
    };
    var keys = Object.keys(ROMAN_NUMBERALS).sort(function (a, b) {
        return b - a;
    });
    var index = 0;
    var ans = "";

    while (num > 0) {
        var refNum = Number.parseInt(keys[index]);
        if (num >= refNum) {
            var repeat = Math.floor(num / refNum);
            if (repeat === 4) {
                ans += ROMAN_NUMBERALS[refNum] + ROMAN_NUMBERALS[Number.parseInt(keys[index - 1])];
            } else {
                ans += new Array(repeat).fill(ROMAN_NUMBERALS[refNum]).join("");
            }
            num -= repeat * refNum;
        } else {
            index++;
        }
    }

    return ans;
};