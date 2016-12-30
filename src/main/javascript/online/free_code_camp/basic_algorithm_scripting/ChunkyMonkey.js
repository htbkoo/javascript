/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/chunky-monkey

 Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Array.prototype.push()

 Array.prototype.slice()

 * */

module.exports = function chunkArrayInGroups(arr, size) {
    "use strict";
    // Break it up.
    var ans = [];
    arr.forEach(function (v, i) {
        if (typeof ans[Math.floor(i / size)] === "undefined") {
            ans.push([]);
        }
        ans[Math.floor(i / size)].push(v);
    });
    return ans;
};

function chunkArrayInGroupsWithoutForEach(arr, size) {
    "use strict";
    return arr.reduce(function (prev, curr, index) {
        var group = Math.floor(index / size);
        if (group >= prev.length) {
            prev.push([]);
        }
        prev[group].push(curr);
        return prev;
    }, []);
}