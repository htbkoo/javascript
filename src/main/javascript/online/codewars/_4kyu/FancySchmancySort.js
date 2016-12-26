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

    function getValue(e) {
        var argumentIndex = 2;
        var value = elements.reduce(function (a, b) {
            var found = b.match(/\((\d+)\)/);
            if (found !== null) {
                var aArgs = new Array(parseInt(found[1])).fill(0)
                    .reduce(function (a, _) {
                        // a.slice().push(optionalArguments[argumentIndex++])
                        a.push(optionalArguments[argumentIndex++]);
                        return a;
                    }, []);
                return a[b.replace(found[0],"")].apply(this, aArgs);
            } else {
                found = b.match(/\[(\d+)\]/);
                if (found !== null) {
                    a = a[b.replace(found[0], "")];
                    b = found[1];
                }
            }
            return a[b];
        }, e);

        var optionalFunction = optionalArguments[argumentIndex];
        if (typeof optionalFunction !== "undefined") {
            if (optionalFunction === "str") {
                return value.toString();
            } else if (optionalFunction === "num") {
                return parseFloat(value);
            }
            return optionalFunction(value);
        }
        return value;
    }

    return arr.slice().sort(function (a, b) {
        var aValue = getValue(a);
        var bValue = getValue(b);
        return (aValue === bValue) ? 0 : (aValue > bValue) ? 1 : -1;
    });
};