/**
 * Created by Hey on 24 Oct 2016
 */

/*

 https://www.codewars.com/kata/concatenating-functions/train/javascript

 Functional programming thrives from the reuse of functions. One core feature to extend the reuse is the concatenation of functions.

 You probably know this feature from your favorite shell: ls -la | sort | head lists the top lines of the sorted result of ls -la

 Build a function pipe to achieve this with JS. An example use could be:

 var addOne = function(e) {
 return e + 1;
 };

 var square = function(e) {
 return e * e;
 };

 var result = [1,2,3,4,5].map(addOne.pipe(square)) //-> [4,9,16,25,36]

 Since a function only can return one value it is absolutely sufficient to only support functions that consume only one parameter. Build your pipe function in a way, that one can pipe an arbitrary number of functions.

 * */

// just a small amount of possible functions to start testing with.
var addOne = function (e) {
    "use strict";
    return e + 1;
};
var square = function (e) {
    "use strict";
    return e * e;
};

// Extend the Function prototype with a method pipe
Function.prototype.pipe = function (next) {
    "use strict";
    var that = this;
    return function(val){
        return next(that(val));
        // return next.call(this, that(val));
    };
};

module.exports =
{
    'addOne': addOne,
    'square': square
};
