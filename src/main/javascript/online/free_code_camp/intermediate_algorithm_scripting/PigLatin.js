/**
 * Created by Hey on 1 Jan 2017
 */

/*
 https://www.freecodecamp.com/challenges/pig-latin

 Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching property and value pairs (second argument). Each property and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

 For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), because it contains the property and its value, that was passed on as the second argument.

 Remember to use Read-Search-Ask if you get stuck. Write your own code.

 Here are some helpful links:

 Global Object

 Object.prototype.hasOwnProperty()

 Object.keys()

 * */

module.exports = function translatePigLatin(str) {
    "use strict";

    function isVowel(c) {
        return (c === "a") ||
            (c === "e") ||
            (c === "i") ||
            (c === "o") ||
            (c === "u");
    }

    if (str.length === 0) {
        return "";
    }

    if (isVowel(str.charAt(0))) {
        return str + "way";
    }

    var end = "";

    str.split("").every(function (c) {
        var isConsonant = !isVowel(c);
        if (isConsonant) {
            end += c;
        }
        return isConsonant;
    });

    return str.slice(end.length) + end + "ay";
};