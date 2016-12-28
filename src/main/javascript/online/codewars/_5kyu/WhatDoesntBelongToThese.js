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

function abstractFindOutlyingElement(series, op, isConstraintFulfilled) {
    "use strict";
    if (new Array(3).fill(0).some(function (_, index) {
            return !isConstraintFulfilled(series[index]);
        })
    ) {
        return undefined;
    }

    var first = op(series[0]);
    var second = op(series[1]);
    var sample;
    if (first === second) {
        sample = first;
    } else {
        return first === (op(series[2])) ? series[1] : series[0];
    }

    // Premature optimization is the root of all evil (Knuth, 1974)
    // var seriesBak = series.slice(); // and restore later
    // series.shift();
    // series.shift();

    var allBeforeFulfillConstraint = true;
    return series.find(function (elem) {
        if (allBeforeFulfillConstraint) {
            if ((isConstraintFulfilled(elem))) {
                return ((op(elem)) !== sample);
            } else {
                allBeforeFulfillConstraint = false;
            }
        }
        return false;
    });
}

function getTypeOf(obj) {
    "use strict";
    return typeof obj;
}

function getCase(obj) {
    "use strict";
    // From http://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip
    // most robust answwer imho
    // http://stackoverflow.com/a/1077692
    // http://stackoverflow.com/a/9728437
    return [
        {
            "caseName": "upper",
            "testFunc": function () {
                return (obj === obj.toUpperCase()) && (obj !== obj.toLowerCase());
            }
        },
        {
            "caseName": "lower",
            "testFunc": function () {
                return (obj !== obj.toUpperCase()) && (obj === obj.toLowerCase());
            }
        },
        {
            "caseName": "numeric",
            "testFunc": function () {
                return !isNaN(obj * 1);
            }
        },
        {
            "caseName": "others",
            "testFunc": function () {
                return true;
            }
        }
    ].find(function (caseDeterminer) {
        return !!caseDeterminer.testFunc();

    }).caseName;
}

function valueOf(obj) {
    "use strict";
    return obj;
}

function noSpecialConstraint(_) {
    "use strict";
    return true;
}

function isNumber(obj) {
    "use strict";
    return (typeof obj === "number");
}

function isString(obj) {
    "use strict";
    return (typeof obj === "string");
}

function findElementOfDifferentType(series) {
    "use strict";
    return abstractFindOutlyingElement(series, getTypeOf, noSpecialConstraint);
}

function findElementAllInStringOfDifferentType(series) {
    "use strict";
    return abstractFindOutlyingElement(series, function (obj) {
        var caseName = getCase(obj);
        if ((caseName === "upper") || (caseName === "lower")) {
            return "isChar";
        }
        return "notChar";
    }, isString);
}


function findElementAllInStringOfDifferentCase(series) {
    "use strict";
    return abstractFindOutlyingElement(series, getCase, isString);
}

function findElementAllInNumberOfDifferentSignum(series) {
    "use strict";
    return abstractFindOutlyingElement(series, Math.sign, isNumber);
}

function findElementOfDifferentValue(series) {
    "use strict";
    return abstractFindOutlyingElement(series, valueOf, noSpecialConstraint);
}

module.exports = function findTheNotFittingElement(series) {
    "use strict";
    var result;
    [
        findElementOfDifferentType,
        findElementAllInStringOfDifferentType,
        findElementAllInStringOfDifferentCase,
        findElementAllInNumberOfDifferentSignum,
        findElementOfDifferentValue
    ].some(function (finder) {
        result = finder(series);
        return result !== undefined;
    });
    //noinspection JSUnusedAssignment
    return result;
};

// With reference to https://www.codewars.com/kata/reviews/583ff16094dbd2631f00006f/groups/58402c75258e10491d0000da
// Just as practice
function findTheNotFittingElementFromSolution(series) {
    "use strict";
    var filters = [
        function (v) {
            return ((typeof v) === (typeof series[0]));
        },
        function (v) {
            return (v > 0);
        },
        function (v) {
            return (String(v).toUpperCase() === String(v));
        },
        function (v) {
            return (/[a-z]/i.test(v));
        },
        function (v) {
            return (v === series[0]);
        }
    ];

    var result;
    filters.some(function (filter) {
        return ([
            filter,
            function (v) {
                return !filter(v);
            }
        ].some(function (f) {
            var fulfilledObj = series.filter(f);
            if (fulfilledObj.length === 1) {
                result = fulfilledObj[0];
                return true;
            }
            return false;
        }));
    });

    //noinspection JSUnusedAssignment
    return result;
}

