/**
 * Created by Hey on 17 Nov 2016
 */

/*

 https://www.codewars.com/kata/coding-meetup-number-2-higher-order-functions-series-greet-developers/train/javascript

 You will be given an array of objects (associative arrays in PHP) representing data about developers who have signed up to attend the next coding meetup that you are organising.

 Your task is to return an array where each object will have a new property 'greeting' with the following string value:

 Hi < firstName here >, what do you like the most about < language here >?

 For example, given the following input array:

 var list1 = [
 { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java' },
 { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python' },
 { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby' }
 ];

 your function should return the following array:

 [
 { firstName: 'Sofia', lastName: 'I.', country: 'Argentina', continent: 'Americas', age: 35, language: 'Java',
 greeting: 'Hi Sofia, what do you like the most about Java?'
 },
 { firstName: 'Lukas', lastName: 'X.', country: 'Croatia', continent: 'Europe', age: 35, language: 'Python',
 greeting: 'Hi Lukas, what do you like the most about Python?'
 },
 { firstName: 'Madison', lastName: 'U.', country: 'United States', continent: 'Americas', age: 32, language: 'Ruby',
 greeting: 'Hi Madison, what do you like the most about Ruby?'
 }
 ];

 Notes:

 The order of the properties in the objects does not matter.
 The input array will always be valid and formatted as in the example above.




 This kata is part of the Coding Meetup series which includes a number of short and easy to follow katas which have been designed to allow mastering the use of higher-order functions. In JavaScript this includes methods like: forEach, filter, map, reduce, some, every, find, findIndex. Other approaches to solving the katas are of course possible.

 * */
module.exports =
    function greetDevelopers(list) {
        "use strict";

        /*
        return list.map(function (elem) {
            elem.greeting = 'Hi ' + elem.firstName + ', what do you like the most about ' + elem.language + '?';
            return elem;
        });
        */

        list.forEach(function (elem) {
            elem.greeting = 'Hi ' + elem.firstName + ', what do you like the most about ' + elem.language + '?';
        });
        return list;

        // thank you for checking out my kata :)
        // no problem - thanks for writing this series of kata!
    };