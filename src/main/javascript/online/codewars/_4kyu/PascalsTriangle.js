/**
 * Created by Hey on 1 Nov 2016
 */
/*

 https://www.codewars.com/kata/pascals-triangle/train/javascript

 Pascal's Triangle

 Pascal's Triangle

 Wikipedia article on Pascal's Triangle: http://en.wikipedia.org/wiki/Pascal's_triangle

 Write a function that, given a depth (n), returns a single-dimensional array representing Pascal's Triangle to the n-th level.

 For example:

 pascalsTriangle(4) == [1,1,1,1,2,1,1,3,3,1]

 * */

module.exports = function pascalsTriangle(n) {
    "use strict";
    function getLayer(n) {
        switch (n) {
            case 0:
                return [];
            case 1:
                return [1];
            case 2:
                return [1, 1];
            default:
                var i = 1, cur = 1, ans = [1];
                for (; i < n; ++i) {
                    cur = cur * (n - i) / i;
                    ans.push(cur);
                }
                return ans;
        }
    }

    //return a flat array representing the values of Pascal's Triangle to the n-th level
    var i = 1, ans = [];
    for (; i <= n; ++i) {
        ans = ans.concat(getLayer(i));
    }
    return ans;
};