/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/steamroller

 Flatten a nested array. You must account for varying levels of nesting.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Array.isArray()

 * */

module.exports = function steamrollArray(arr) {
    "use strict";
    // I'm a steamroller, baby
    function recursivelyFlatten(x) {
        return x.reduce(function (prev, curr) {
            if (Array.isArray(curr)) {
                return prev.concat(recursivelyFlatten(curr));
            } else {
                prev.push(curr);
                return prev;
            }
        }, []);
    }

    if (Array.isArray(arr)) {
        return recursivelyFlatten(arr);
    } else {
        return [arr];
    }
};