/**
 * Created by Hey on 25 Oct 2016
 */
/*

 https://www.codewars.com/kata/sum-of-intervals/train/javascript

 Write a function called sumIntervals that accepts an array of intervals, and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.
 Intervals

 Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.
 Overlapping Intervals

 List containing overlapping intervals:

 [
 [1,4],
 [7, 10],
 [3, 5]
 ]

 The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5], which has a length of 4.
 Examples:

 sumIntervals( [
 [1,2],
 [6, 10],
 [11, 15]
 ] ); //=> returns 9

 sumIntervals( [
 [1,4],
 [7, 10],
 [3, 5]
 ] ); //=> returns 7

 sumIntervals( [
 [1,5],
 [10, 20],
 [1, 6],
 [16, 19],
 [5, 11]
 ] ); //=> returns 19

 * */

module.exports =
    function sumIntervals(intervals) {
        //DONE
        "use strict";

        intervals.sort(function (a, b) {
            return a[0] - b[0];
        });

        var compressed = [], i;

        var lastFrom = intervals[0][0], lastTo = intervals[0][1];
        var length = intervals.length;
        for (i = 1; i < length; ++i) {
            if (intervals[i][0] > lastTo) {
                compressed.push([lastFrom, lastTo]);
                lastFrom = intervals[i][0];
            }
            lastTo = Math.max(lastTo, intervals[i][1]);
        }
        compressed.push([lastFrom, lastTo]);
        return compressed.reduce(function (prev, cur, arr) {
            return prev + cur[1] - cur[0];
        }, 0);
    };