/**
 * Created by Hey on 31 July 2016
 */
/*

 https://www.codewars.com/kata/detect-pangram/train/javascript

 A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).

 Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.

 * */

module.exports =
    function isPangram(string) {
        "use strict";
        //...
        var used = {};
        var ch;
        for (ch = 'A'.charCodeAt(0); ch <= 'Z'.charCodeAt(0); ch++) {
            used[String.fromCharCode(ch)] = false;
        }

        //noinspection JSUnresolvedFunction
        string.toUpperCase().split("").forEach(function (curr) {
            if ((function isAlphabetic(c) {
                    return (c >= 'A' && c <= 'Z');
                }(curr))) {
                used[curr] = true;
            }
        });

        return !Object.keys(used).some(function isUnused(key) {
            return !used[key];
        });
    }
;
