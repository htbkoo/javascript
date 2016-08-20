/**
 * Created by Hey on 19 Aug 2016
 */
/*

 https://www.codewars.com/kata/default-arguments/train/javascript

 Write a function defaultArguments. It takes a function as an argument, along with an object containing default values for that function's arguments, and returns another function which defaults to the right values.

 You cannot assume that the function's arguments have any particular names.

 You should be able to call defaultArguments repeatedly to change the defaults.

 function add(a,b) { return a+b;};

 var add_ = defaultArguments(add,{b:9});
 add_(10); // returns 19
 add_(10,7); // returns 17
 add_(); // returns NaN

 add_ = defaultArguments(add_,{b:3, a:2});
 add_(10); // returns 13 now
 add_(); // returns 5

 add_ = defaultArguments(add_,{c:3}); // doesn't do anything, since c isn't an argument
 add_(10); // returns NaN
 add_(10,10); // returns 20

 HINT: This problem requires using Fuction.prototype.toString() in order to extract a function's argument list

 * */


// From http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
// http://stackoverflow.com/a/9924463
function getParamNames(func) {
    //noinspection JSLint
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    //noinspection JSLint
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) {
        //noinspection JSLint
        result = [];
    }
    return result;
}

function defaultArguments(func, params) {
    "use strict";
    // DONE: Program me

    var paramNames;
    //noinspection JSLint - deliberately use 'in' to check the 'paramNames' inherited from prototype
    if (!('paramNames' in func)) {
        paramNames = getParamNames(func);
    } else {
        paramNames = func.paramNames;
    }

    var pt = Object.create(Function.prototype);
    pt.paramNames = paramNames;
    var f = function () {
        var i, mergedArguments = Array.prototype.slice.call(arguments);
        for (i = mergedArguments.length; i < paramNames.length; ++i) {
            mergedArguments.push(params[paramNames[i]]);
        }
        return func.apply(func, mergedArguments);

    };
    Object.setPrototypeOf(f, pt);
    return f;
}

module.exports = defaultArguments;
