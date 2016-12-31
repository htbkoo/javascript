/**
 * Created by Hey on 31 Dec 2016
 */

/*
 https://www.freecodecamp.com/challenges/wherefore-art-thou

 Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching property and value pairs (second argument). Each property and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

 For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the property and its value, that was passed on as the second argument.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Global Object

 Object.prototype.hasOwnProperty()

 Object.keys()

 * */

module.exports = function whatIsInAName(collection, source) {
    "use strict";
    // What's in a name?
    // Not allowed to change this :(
    //noinspection JSUnusedAssignment
    var arr = [];
    // Only change code below this line
    arr = collection.filter(function (val) {
        return Object.keys(source).every(function (key) {
            return source[key] === val[key];
        });
    });
    // Only change code above this line
    return arr;
};