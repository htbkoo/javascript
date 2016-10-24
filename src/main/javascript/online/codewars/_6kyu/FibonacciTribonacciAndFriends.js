/**
 * Created by Hey on 24 Oct 2016
 */
/*

 https://www.codewars.com/kata/fibonacci-tribonacci-and-friends/train/javascript

 If you have completed the Tribonacci sequence kata, you would know by now that mister Fibonacci has at least a bigger brother. If not, give it a quick look to get how things work.

 Well, time to expand the family a little more: think of a Quadribonacci starting with a signature of 4 elements and each following element is the sum of the 4 previous, a Pentabonacci (well Cinquebonacci would probably sound a bit more italian, but it would also sound really awful) with a signature of 5 elements and each following element is the sum of the 5 previous, and so on.

 Well, guess what? You have to build a Xbonacci function that takes a signature of X elements - and remember each next element is the sum of the last X elements - and returns the first n elements of the so seeded sequence.

 Xbonacci([1,1,1,1],10)==[1,1,1,1,4,7,13,25,49,94]
 Xbonacci([0,0,0,0,1],10)==[0,0,0,0,1,1,2,4,8,16]
 Xbonacci([1,0,0,0,0,0,1],10)==[1,0,0,0,0,0,1,2,3,6]

 * */

function getXbonacciValue(signature, n) {
    "use strict";
    //your code here
    var sum = function (arr) {
        return arr.reduce(function (a, b) {
            return a + b;
        }, 0);
    };
    var length = signature.length;
    var nextVal = sum(signature);
    var pointer, lastVal = signature[0];
    for (pointer = length; pointer < n; ++pointer) {
        lastVal = signature[pointer % length];
        signature[pointer % length] = nextVal;
        nextVal = sum(signature);
    }
    return lastVal;
}

module.exports =
    function Xbonacci(signature, n) {
        "use strict";
        //your code here
        var sum = function (arr) {
            return arr.reduce(function (a, b) {
                return a + b;
            }, 0);
        };
        var length = Math.min(signature.length, n);
        var nextVal = sum(signature);
        var pointer, lastVal = signature[0];
        var ans = signature.slice(0, length);
        for (pointer = length; pointer < n; ++pointer) {
            lastVal = ans[pointer - length];
            ans.push(nextVal);
            nextVal = 2 * nextVal - lastVal;
        }
        return ans;
    };