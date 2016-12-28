/**
 * Created by Hey on 28 Dec 2016
 */

/*

 https://www.codewars.com/kata/pete-the-baker/train/javascript

 What doesn't belong to these?

 Write a method that takes an array of elements and returns the element that does not belong to these elements.

 Example:

 [1, 2, 2, 2, 2] -> 1
 ['1', 2, '4', '6', '8'] -> 2
 [2, 2, -2, 6, 10] -> -2
 ['a', 'a', 'b', 'a', 'a', 'a', 'a'] -> 'b'

 Look in the example tests. (The submit tests have no additional surprises!)

 The elements will only be of the types:
 boolean, char (or string with one char in JS/TS) or int (number in JS/TS).

 The array will never be null and there will always more than 2 values in the array!
 It is always exactly one element that does not belong to the other elements.
 The values in the array will never be null or undefined or 0.

 Have fun coding it and please don't forget to vote and rank this kata! :-)

 I have also created other katas. Take a look if you enjoyed this kata!

 * */

function abstractFindElement(op){
    "use strict";

}

function findElementOfDifferentType(series) {
    "use strict";
    function getTypeOf(obj) {
        return typeof obj;
    }

    var firstType = getTypeOf(series[0]);
    var secondType = getTypeOf(series[1]);
    var type;
    if (firstType === secondType) {
        type = firstType;
    } else {
        return firstType === (getTypeOf(series[2])) ? series[1] : series[0];
    }

    // Premature optimization is the root of all evil (Knuth, 1974)
    // series.shift();
    // series.shift();

    return series.find(function (elem) {
        return (typeof elem) !== type;
    });
}

function findElementInAllNumbersOfDifferentSignum(series) {
    "use strict";
    var firstElem = series[0];
    var secondElem = series[1];
    var sample;
    if (firstElem === secondElem) {
        sample = firstElem;
    } else {
        return firstElem === series[2] ? series[1] : series[0];
    }

    return series.find(function (elem) {
        return elem !== sample;
    });
}

function findElementOfDifferentValue(series) {
    "use strict";
    var firstElem = series[0];
    var secondElem = series[1];
    var sample;
    if (firstElem === secondElem) {
        sample = firstElem;
    } else {
        return firstElem === series[2] ? series[1] : series[0];
    }

    return series.find(function (elem) {
        return elem !== sample;
    });
}

module.exports = function findTheNotFittingElement(series) {
    "use strict";
    var result;
    [
        findElementOfDifferentType,
        findElementOfDifferentValue
    ].some(function (finder) {
        result = finder(series);
        return result !== undefined;
    });
    return result;
};