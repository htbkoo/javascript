/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/everything-be-true

 Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

 Remember, you can access object properties through either dot notation or [] notation.

 Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

 * */

module.exports = function truthCheck(collection, pre) {
    "use strict";
    // Is everyone being true?
    return collection.every(function(val){
        return val[pre];
    });
};