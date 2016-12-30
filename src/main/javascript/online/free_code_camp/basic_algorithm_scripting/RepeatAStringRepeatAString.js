/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/repeat-a-string-repeat-a-string

 Repeat a given string (first argument) num times (second argument). Return an empty string if num is not a positive number.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Global String Object

 * */


module.exports = function repeatStringNumTimes(str, num) {
    "use strict";
    // repeat after me
    if (num<=0){
        return "";
    }
    return new Array(num+1).fill("").join(str);
};