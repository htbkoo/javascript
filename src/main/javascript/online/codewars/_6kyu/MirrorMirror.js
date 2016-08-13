/**
 * Created by Hey on 12 Aug 2016
 */
/*

 https://www.codewars.com/kata/mirror-mirror/train/javascript

 Write a function evilTwin(obj) which returns a new object with all the same properties as obj, and with an additional property hasGoatee set to true.

 For example:

 var orig = {x: 5};
 console.log(orig.x) // -> 5
 console.log(orig.hasGoatee) // -> undefined
 var twin = evilTwin(orig);
 console.log(twin.x) // -> 5
 console.log(twin.hasGoatee) // -> true

 If the original object is modified, its twin should reflect the changes so:

 orig.z = 12
 console.log(twin.z) // -> 12

 * */

module.exports =
    function evilTwin(obj) {
        "use strict";
        var that = Object.create(obj);
/*
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                that[key] = obj[key];
            }
        }
*/

        that.hasGoatee = true;

        return that;
    };