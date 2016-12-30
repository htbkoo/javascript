/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/reverse-a-string

 Reverse the provided string.

 You may need to turn the string into an array before you can reverse it.

 Your result must be a string.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Global String Object

 String.prototype.split()

 Array.prototype.reverse()

 Array.prototype.join()

 * */

function reverseString(str) {
    "use strict";
    return str.split("").reverse().join("");
}

module.exports = reverseString;