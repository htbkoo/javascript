/**
 * Created by Hey on 15 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-1-higher-order-functions-series-count-the-number-of-javascript-developers-coming-from-europe/javascript

 You will be given an array of objects representing data about developers who have signed up to attend the coding meetup that you are organising for the first time.

 Your task is to return the number of JavaScript developers coming from Europe.

 For example, given the following list:

 var list1 = [
 { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'JavaScript' },
 { firstName: 'Maia', lastName: 'S.', country: 'Tahiti', continent: 'Oceania', age: 28, language: 'JavaScript' },
 { firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML' },
 { firstName: 'Sumayah', lastName: 'M.', country: 'Tajikistan', continent: 'Asia', age: 30, language: 'CSS' }
 ];

 your function should return number 1.

 If, there are no JavaScript developers from Europe then your function should return 0.

 Notes:

 The format of the strings will always be Europe and JavaScript.
 All data will always be valid and uniform as in the example above.




 This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.
 * */
module.exports =
function countDevelopers(list) {
    "use strict";
    var matchingContinent = "Europe", matchingLanguage = "JavaScript", isMatch = function (developer) {
        return (developer.continent === matchingContinent) && (developer.language === matchingLanguage);
    };

    // From Top solutions in Codewars solution page
    // return list.filter(isMatch).length;

// your awesome code here :)
    return list.reduce(function (prev, curr, index, array) {
        return prev + (isMatch(curr) ? 1 : 0);
    }, 0);
};