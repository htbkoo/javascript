/**
 * Created by Hey on 14 May 2016
 */

/*
 You are given an array (which will have a length of at least 3, but could be very large) containing integers. The integers in the array are either entirely odd or entirely even except for a single integer N. Write a method that takes the array as an argument and returns N.

 For example:

 [2, 4, 0, 100, 4, 11, 2602, 36]

 Should return: 11

 [160, 3, 1719, 19, 11, 13, -21]

 Should return: 160

 * */

function findOutlier(integers) {
    //your code here
    "use strict";
    var isEven = function (n) {
        return n % 2 === 0;
    };

    var needEven = (integers.slice(0, 3).reduce(function (previous, current) {
        return previous + (Math.abs(current)) % 2;
    }, 0) > 1);

    var returnValue = false;
    integers.every(function (i) {
        if (needEven === isEven(i)) {
            returnValue = i;
            return false;
        }
        return true;
    });
    return returnValue;
}

/*
 Test:

 Test.assertEquals(findOutlier([0, 1, 2]), 1)
 Test.assertEquals(findOutlier([1, 2, 3]), 2)
 Test.assertEquals(findOutlier([2,6,8,10,3]), 3)
 Test.assertEquals(findOutlier([0,0,3,0,0]), 3)
 Test.assertEquals(findOutlier([1,1,0,1,1]), 0)

 * */