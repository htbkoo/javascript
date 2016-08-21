/**
 * Created by Hey on 1 August 2016
 */
/*

 https://www.codewars.com/kata/build-a-pile-of-cubes/train/javascript

 Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of n^3, the cube above will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.

 You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?

 The parameter of the function findNb (find_nb, find-nb) will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m if such a n exists or -1 if there is no such n.
 Examples:

 findNb(1071225) --> 45
 findNb(91716553919377) --> -1

 * */

module.exports =
    function findNb(m) {
        "use strict";
        // your code
        if (m === 0) {
            return -1;
        }
        var sum = 0;
        var index;
        for (index = 1; sum < m; index++) {
            sum += index * index * index;
        }
        return (sum === m) ? (index-1) : (-1);
    };