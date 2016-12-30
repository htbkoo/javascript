/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/title-case-a-sentence

 Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

 For the purpose of this exercise, you should also capitalize connecting words like "the" and "of".

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 String.prototype.split()

 * */


module.exports = function largestOfFour(arr) {
    "use strict";
    // You can do this!
    return arr.map(function(sub){
        return sub.reduce(function(prev, curr){
            return Math.max(prev,curr);
        });
    });
};
