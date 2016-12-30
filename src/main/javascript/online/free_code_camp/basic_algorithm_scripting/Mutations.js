/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/mutations

 Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.

 For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.

 The arguments ["hello", "hey"] should return false because the string "hello" does not contain a "y".

 Lastly, ["Alien", "line"], should return true because all of the letters in "line" are present in "Alien".

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 String.prototype.indexOf()

 * */

module.exports = function mutation(arr) {
    "use strict";
    var first = {};
    arr[0].toLowerCase().split("").forEach(function (c) {
        first[c] = (c in first) ? first[c] + 1 : 0;
    });

    return arr[1].toLowerCase().split("").every(function (c) {
        return (c in first);
    });
};

function mutationWithSuggestedWay(arr) {
    "use strict";
    var first = arr[0].toLowerCase(), second = arr[1].toLowerCase();

    return second.split("").every(function (c) {
        return first.indexOf(c) !== -1;
    });
}
