/**
 * Created by Hey on 17 Aug 2016
 */

/*

 https://www.codewars.com/kata/argument-mapper/train/javascript

 As part of a broader functionality you need to develop an argument mapper.

 The function receives a function object as first parameter and an unknown number of arguments [zero to many]. You have to return an associative array that maps the name of an argument and its related value.

 The usage is:

 function func1(arg1, arg2) { ... }

 var map = createArgumentMap(func1,'valueOfArg1', 'valueOfArg2');
 console.log(map['arg1']);  // writes 'valueOfArg1'
 console.log(map['arg2']);  // writes 'valueOfArg2'

 The passed values are in the same order as they appear in the function object.

 Invalid inputs, e.g. non-function objects, or wrong number of arguments, are not considered.

 Hajime!

 * */

module.exports =
    function createArgumentMap(func) {
        "use strict";
        // create an argument map and return it

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

        var returnObj = {};
        var outerArguments = arguments;
        getParamNames(func).forEach(
            function (key, index) {
                returnObj[key] = outerArguments[index + 1];
            }
        );
        return returnObj;
    };