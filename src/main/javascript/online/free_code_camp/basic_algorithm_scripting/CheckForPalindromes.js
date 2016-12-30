/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/check-for-palindromes

 Return true if the given string is a palindrome. Otherwise, return false.

 A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

 Note
 You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything lower case in order to check for palindromes.

 We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

 We'll also pass strings with special symbols, such as "2A3*3a2", "2A3  3a2", and "2_A3*3#A2".

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 String.prototype.replace()

 String.prototype.toLowerCase()

 * */


module.exports = function palindrome(str) {
    "use strict";
    // Good luck!
    var lowerCaseOnly = str.toLowerCase().split("").filter(function (c) {
        return ((c >= "0") && (c <= "9"))||((c >= "a") && (c <= "z"));
    });
    return lowerCaseOnly.toString() === lowerCaseOnly.reverse().toString();
};
