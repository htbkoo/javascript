/**
 * Created by Hey on 21 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-11-higher-order-functions-series-find-the-average-age/train/javascript

 You will be given an array of objects representing data about developers who have signed up to attend the next coding meetup that you are organising.

 Given the following input array:

 var list1 = [
 { firstName: 'Maria', lastName: 'Y.', country: 'Cyprus', continent: 'Europe', age: 30, language: 'Java' },
 { firstName: 'Victoria', lastName: 'T.', country: 'Puerto Rico', continent: 'Americas', age: 70, language: 'Python' },
 ];

 write a function that returns the average age of developers (rounded to the nearest integer). In the example above your function should return 50 (number).

 Notes:

 The input array will always be valid and formatted as in the example above.
 Age is represented by a number which can be any positive integer.

 * */
module.exports =
    function findAverage(list) {
        "use strict";
        // thank you for checking out the Coding Meetup kata :)
        return Math.round(list.reduce(function (prev, curr) {
                return prev + curr.age;
            }, 0) / list.length);
    };