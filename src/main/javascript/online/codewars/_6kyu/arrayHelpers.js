/**
 * Created by Hey on 15 May 2016
 */
/*
 This kata is designed to test your ability to extend the functionality of built-in ruby classes. In this case, we want you to extend the built-in Array class with the following methods: square(), cube(), average(), sum(), even() and odd().

 Explanation:

 square() must return a copy of the array, containing all values squared, the original array must not be changed
 cube() must return a copy of the array, containing all values cubed, the original array must not be changed
 average() must return the average of all array values, average() on an empty array must return NaN
 sum() must return the sum of all array values
 even() must return an array of all even numbers, the original array must not be changed
 odd() must return an array of all odd numbers, the original array must not be changed

 Examples:

 var numbers = [1, 2, 3, 4, 5];
 numbers.square(); // must return [1, 4, 9, 16, 25]
 numbers.cube(); // must return [1, 8, 27, 64, 125]
 numbers.average(); // must return 3
 numbers.sum(); // must return 15
 numbers.even(); // must return [2, 4]
 numbers.odd(); // must return [1, 3, 5]
 * */

// TODO
Array.prototype.square = function () {
    "use strict";
    var newArray = this.slice();
    return newArray.map(function (val) {
        return val * val;
    });
};

Array.prototype.cube = function () {
    "use strict";
    var newArray = this.slice();
    return newArray.map(function (val) {
        return val * val * val;
    });
};

Array.prototype.sum = function () {
    "use strict";
    return this.reduce(function (previousValue, currentValue, currentIndex, array) {
        return previousValue + currentValue;
    });
};

Array.prototype.average = function () {
    "use strict";
    if (this.length===0){
        return NaN;
    }
    return this.sum()/this.length;
};

Array.prototype.even = function () {
    "use strict";
    var newArray = this.slice();
    return newArray.filter(function (val) {
        return (val%2===0);
    });
};

Array.prototype.odd = function () {
    "use strict";
    var newArray = this.slice();
    return newArray.filter(function (val) {
        return (val%2!==0);
    });
};

console.log([1, 2, 3, 4, 5].square());