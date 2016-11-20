/**
 * Created by Hey on 20 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-6-higher-order-functions-series-can-they-code-in-the-same-language/train/javascript

 You will be given an array of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising. The list is ordered according to who signed up first.

 You will be given an array of objects representing data about developers who have signed up to attend the next coding meetup that you are organising.

 Your task is to return either:

 true if all developers in the list code in the same language; or
 false otherwise.

 For example, given the following input array:

 var list1 = [
 { firstName: 'Daniel', lastName: 'J.', country: 'Aruba', continent: 'Americas', age: 42, language: 'JavaScript' },
 { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 22, language: 'JavaScript' },
 { firstName: 'Hanna', lastName: 'L.', country: 'Hungary', continent: 'Europe', age: 65, language: 'JavaScript' },
 ];

 your function should return true.

 Notes:

 The strings representing a given language will always be formatted in the same way (e.g. 'JavaScript' will always be formatted with upper-case 'J' and 'S'.
 The input array will always be valid and formatted as in the example above.

 * */
module.exports =
    function isSameLanguage(list) {
        "use strict";
        if (list.length === 0) {
            return true;
        }
        var firstDevLanguage = list[0].language;
        return list.every(function (dev) {
            return dev.language === firstDevLanguage;
        });
        // thank you for checking out the Coding Meetup kata :)
    };