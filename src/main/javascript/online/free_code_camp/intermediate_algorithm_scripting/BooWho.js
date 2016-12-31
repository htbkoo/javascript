/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/boo-who

 Check if a value is classified as a boolean primitive. Return true or false.

 Boolean primitives are true and false.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 Here are some helpful links:

 Boolean Objects

 * */

module.exports = function booWho(bool) {
    "use strict";
    // What is the new fad diet for ghost developers? The Boolean.
    return ((typeof bool) === "boolean");
};