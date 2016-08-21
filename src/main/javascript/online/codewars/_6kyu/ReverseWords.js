/**
 * Created by Hey on 31 July 2016
 */
/*

 https://www.codewars.com/kata/reverse-words/train/javascript

 Write a reverseWords function that accepts a string a parameter, and reverses each word in the string. Every space should stay, so you cannot use words from Prelude.

 Example:

 reverseWords("This is an example!"); // returns  "sihT si na !elpmaxe"

 * */

module.exports =
    function reverseWords(str) {
        'use strict';
        // Go for it
        return str.split(" ").map(function (curr) {
            return curr.split("").reverse().join("");
        }).join(" ");
    };