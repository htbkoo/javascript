/**
 * Created by Hey on 20 Nov 2016
 */

/*

 http://www.codewars.com/kata/coding-meetup-number-7-higher-order-functions-series-find-the-most-senior-developer/train/javascript

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
    function findSenior(list) {
        "use strict";
        // thank you for checking out the Coding Meetup kata :)
        var ans = [];
        if (list.length === 0) {
            return ans;
        }
        var oldestAge = list[0].age;
        list.forEach(function (dev) {
            if (dev.age >= oldestAge) {
                if (dev.age > oldestAge) {
                    oldestAge = dev.age;
                    ans = [];
                }
                ans.push(dev);
            }
        });
        return ans;
    };

function LoopTwiceSolutionFromCodewars(list) {
    "use strict";
    var oldestAge = list.reduce(function (prev, curr) {
        return Math.max(curr.age, prev);
    }, list[0].age);
    return list.filter(function (dev) {
        return dev.age === oldestAge;
    });
}