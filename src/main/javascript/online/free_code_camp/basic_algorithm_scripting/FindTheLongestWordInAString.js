/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/find-the-longest-word-in-a-string

 Find the Longest Word in a String

 Return the length of the longest word in the provided sentence.

 Your response should be a number.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 String.prototype.split()

 String.length

 * */


module.exports = function findLongestWord(str) {
    "use strict";
    return str.split(" ").reduce(function(prev, curr){
        return Math.max(prev, curr.length);
    }, 0);
};
