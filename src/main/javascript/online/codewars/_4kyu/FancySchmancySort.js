/**
 * Created by Hey on 25 Dec 2016
 */
/*

 https://www.codewars.com/kata/fancy-schmancy-sort/train/javascript

 Array's sort method is useful, but sometimes writing custom sort functions can get cumbersome when all you want to do is sort objects by their properties.

 So we're going to write sortByPath(arr, path, [args...], [fn]). This will have the same functionality as arr.sort, but it will resolve path and sort based on the resulting value. It will also handle method calls and array subscripts in the path.

 For example, if the call is:

 sortByPath(arr, 'foo.bar(2).baz(1).qux[1]', a, b, c);

 Then for each obj in arr, you're going to fetch:

 obj.foo.bar(a,b).baz(c).qux[1]

 path will be a dot separated path to an object property. Each path element can also have "(n)" at the end of it, where n denotes the number of arguments. In this case, you must treat that path element as a method, passing the next n elements from args, and sort based on its return value. "()" should be treated as equivalent to "(0)". Don't forget the context!

 Finally, you should allow array subscripts as well. You do not need to worry about quoted property names within brackets, like 'foo["bar.baz"]'.

 As with arr.sort, it should take an optional comparison function as a last parameter. You must also allow "str" or "num" for fn, which are shortcuts for string or numeric comparison. As with arr.sort, string sorting will be the default - but string sorting doesn't mean the arguments are necessarily strings!.

 You can assume that your inputs will be valid, and that the paths given will be fully defined on the input objects.

 * */

module.exports = function sortByPath(arr, path) {
    "use strict";
    // arguments[0]===arr, arguments[1]===path
    var elements = path.split(".");
    var optionalArguments = arguments;
    var optionalFunction;

    function getValue(e) {
        var argumentIndex = 2;
        var value = elements.reduce(function (a, b) {
            var foundRoundBrackets = b.match(/\((\d*)\)/);
            var foundSquareBrackets = b.match(/\[(\d+)\]/);

            if (foundRoundBrackets !== null) {
                var aArgs = new Array(parseInt((foundRoundBrackets[1] === "") ? "0" : foundRoundBrackets[1])).fill(0)
                    .reduce(function (a, _) {
                        a.push(optionalArguments[argumentIndex++]);
                        return a;
                    }, []);

                b = b.replace(foundRoundBrackets[0], "");
                if (foundSquareBrackets !== null) {
                    b = b.replace(foundSquareBrackets[0], "");
                    return a[b].apply(a, aArgs)[foundSquareBrackets[1]];
                }
                return a[b].apply(a, aArgs);
            } else if (foundSquareBrackets !== null) {
                a = a[b.replace(foundSquareBrackets[0], "")];
                b = foundSquareBrackets[1];
            }

            return a[b];
        }, e);

        optionalFunction = optionalArguments[argumentIndex];
        return value;
    }

    function compareFunction(aValue, bValue) {
        return (aValue === bValue) ? 0 : (aValue > bValue) ? 1 : -1;
    }

    return arr.slice().sort(function (a, b) {
        var aValue = getValue(a);
        var bValue = getValue(b);

        if (typeof optionalFunction !== "undefined") {
            if (optionalFunction === "str") {
                return compareFunction(aValue.toString(), bValue.toString());
            } else if (optionalFunction === "num") {
                return compareFunction(parseInt(aValue), parseInt(bValue));
            }
            return optionalFunction(aValue, bValue);
        }

        return compareFunction(aValue, bValue);
    });
};