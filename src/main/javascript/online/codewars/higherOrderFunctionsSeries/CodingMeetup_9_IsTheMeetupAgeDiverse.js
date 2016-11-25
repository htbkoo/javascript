/**
 * Created by Hey on 20 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-9-higher-order-functions-series-is-the-meetup-age-diverse/train/javascript

 You will be given an array of objects representing data about developers who have signed up to attend the next coding meetup that you are organising.

 Your task is to return:

 true if developers from all of the following age groups have signed up: teens, twenties, thirties, forties, fifties, sixties, seventies, eighties, nineties, centenarian (at least 100 years young).
 false otherwise.

 For example, given the following input array:

 var list1 = [
 { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 19, language: 'Python' },
 { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 29, language: 'JavaScript' },
 { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 39, language: 'Ruby' },
 { firstName: 'Noa', lastName: 'A.', country: 'Israel', continent: 'Asia', age: 40, language: 'Ruby' },
 { firstName: 'Andrei', lastName: 'E.', country: 'Romania', continent: 'Europe', age: 59, language: 'C' },
 { firstName: 'Maria', lastName: 'S.', country: 'Peru', continent: 'Americas', age: 60, language: 'C' },
 { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 75, language: 'Python' },
 { firstName: 'Chloe', lastName: 'K.', country: 'Guernsey', continent: 'Europe', age: 88, language: 'Ruby' },
 { firstName: 'Viktoria', lastName: 'W.', country: 'Bulgaria', continent: 'Europe', age: 98, language: 'PHP' },
 { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'Javascript' }
 ];

 your function should return true as there is at least one developer from each age group.

 Notes:

 The input array will always be valid and formatted as in the example above.
 Age is represented by a number which can be any positive integer up to 199.

 * */
module.exports =
    function isAgeDiverse(list) {
        "use strict";
        // thank you for checking out the Coding Meetup kata :)

        // From StackOverflow - Does JavaScript have a method like “range()” to generate an array based on supplied bounds?
        // http://stackoverflow.com/a/36251311
        return new Array(10).fill(0).map(function (_, n) {
            return (n + 1);
        }).every(function (group) {
            return list.some(function (dev) {
                var age = dev.age;
                if (age >= 100) {
                    return (Math.floor(age / 100) * 10) === group;
                }
                return Math.floor(age / 10) === group;
            });
        });
    };