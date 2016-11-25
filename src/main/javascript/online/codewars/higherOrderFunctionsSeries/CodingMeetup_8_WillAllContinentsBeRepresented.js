/**
 * Created by Hey on 20 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-8-higher-order-functions-series-will-all-continents-be-represented/train/javascript

 You will be given an array of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising.

 Your task is to return:

 true if all of the following continents / geographic zones will be represented by at least one developer: 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'.
 false otherwise.

 For example, given the following input array:

 var list1 = [
 { firstName: 'Fatima', lastName: 'A.', country: 'Algeria', continent: 'Africa', age: 25, language: 'JavaScript' },
 { firstName: 'Agustín', lastName: 'M.', country: 'Chile', continent: 'Americas', age: 37, language: 'C' },
 { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 39, language: 'Ruby' },
 { firstName: 'Laia', lastName: 'P.', country: 'Andorra', continent: 'Europe', age: 55, language: 'Ruby' },
 { firstName: 'Oliver', lastName: 'Q.', country: 'Australia', continent: 'Oceania', age: 65, language: 'PHP' },
 ];

 your function should return true as there is at least one developer from the required 5 geographic zones.

 Notes:

 The input array and continent names will always be valid and formatted as in the list above for example 'Africa' will always start with upper-case 'A'.

 * */
module.exports =
    function allContinents(list) {
        "use strict";
        // thank you for checking out the Coding Meetup kata :)
        var CONTINENTS = {'Africa': '', 'Americas': '', 'Asia': '', 'Europe': '', 'Oceania': ''};
        list.forEach(function (dev) {
            delete CONTINENTS[dev.continent];
        });
        return ( Object.keys(CONTINENTS).length === 0);
    };

function functionalOneLinerApproach(list) {
    "use strict";
    return ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].every(function (continent) {
        return list.some(function (dev) {
            return dev.continent === continent;
        });
    });
}