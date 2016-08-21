/**
 * Created by Hey on 20 Aug 2016
 */
/*

 https://www.codewars.com/kata/roman-numerals-decoder/train/javascript

 Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer. You don't need to validate the form of the Roman numeral.

 Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately, starting with the leftmost digit and skipping any 0s. So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII). The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.

 Example:

 solution('XXI'); // should return 21

 C# RomanDecode.Solution("XXI") -- should return 21

 Courtesy of rosettacode.org

 * */

function solution(roman) {
    "use strict";
    // complete the solution by transforming the
    // string roman numeral into an integer
    var ROMAN_LETTER_VALUE = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    var sum = 0;
    var prevVal;
    roman.split("").reduce(function (prev, cur) {
        var curVal = ROMAN_LETTER_VALUE[cur];
        sum += curVal;
        if (prevVal !== 0) {
            if (curVal > prevVal) {
                sum -= 2 * prevVal;
            }
        }
        prevVal = curVal;
        return sum;
    }, 0);
    return sum;
}

module.exports = solution;
