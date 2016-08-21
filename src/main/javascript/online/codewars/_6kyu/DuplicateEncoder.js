/**
 * Created by Hey on 13 Aug 2016
 */
/*

 https://www.codewars.com/kata/duplicate-encoder/train/javascript

 The goal of this exercise is to convert a string to a new string where each character in the new string is '(' if that character appears only once in the original string, or ')' if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

 Examples:

 "din" => "((("

 "recede" => "()()()"

 "Success" => ")())())"

 "(( @" => "))(("

 * */

module.exports =
    function duplicateEncode(word) {
        "use strict";
        // ...
        var chars = word.toLowerCase().split("");

        var occurrence = chars.reduce(function (acc, curr) {
            //noinspection JSLint
            acc[curr] = (typeof acc[curr] === 'undefined') ? (1) : (acc[curr] + 1);
            return acc;
        }, {});

        return chars.map(function (c) {
            return (occurrence[c] > 1) ? ")" : "(";
        }).join("");
    };
