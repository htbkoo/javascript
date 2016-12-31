/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/diff-two-arrays

 Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Comparison Operators

 Array.prototype.slice()

 Array.prototype.filter()

 Array.prototype.indexOf()

 Array.prototype.concat()

 * */

module.exports = function diffArray(arr1, arr2) {
    "use strict";
    var newArr = arr1.slice();
    arr2.forEach(function (val) {
        var index = newArr.indexOf(val);
        if (index!==-1) {
            newArr.splice(index, 1);
        } else {
            newArr.push(val);
        }
    });
    // Same, same; but different.
    return newArr;
};

function failedDiffArrayUsingHashMap(arr1, arr2) {
    "use strict";
    // var newArr = [];
    var newObj = {};
    arr1.forEach(function (val) {
        newObj[val] = "";
    });
    arr2.forEach(function (val) {
        if (val in newObj) {
            delete newObj[val];
        } else {
            newObj[val] = "";
        }
    });
    // Same, same; but different.
    // return newArr;
    return Object.keys(newObj);
}