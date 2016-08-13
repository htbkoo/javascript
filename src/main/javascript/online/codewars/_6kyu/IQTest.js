/**
 * Created by Hey on 13 Aug 2016
 */
/*

 https://www.codewars.com/kata/iq-test/train/javascript

 Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given numbers differs from the others. Bob observed that one number usually differs from the others in evenness. Help Bob — to check his answers, he needs a program that among the given numbers finds one that is different in evenness, and return a position of this number.

 ! Keep in mind that your task is to help Bob solve a real IQ test, which means indexes of the elements start from 1 (not 0)
 Examples :

 iqTest("2 4 7 8 10") => 3 // Third number is odd, while the rest of the numbers are even

 iqTest("1 2 1 1") => 2 // Second number is even, while the rest of the numbers are odd

 * */

module.exports =
    function iqTest(numbers) {
        "use strict";
        // ...
        var list = numbers.split(" ");
        var length = list.length;
        if (length <= 2) {
            return 1;
        }
        var isEven = function (x) {
            return (x % 2) === 0;
        };
        var firstIsEven = isEven(list[0]);
        var secondIsEven = isEven(list[1]);
        if (firstIsEven === secondIsEven) {
            var findEven = true;
            if (firstIsEven) {
                findEven = false;
            }
            var i;
            for (i = 2; i < length; ++i) {
                if (isEven(list[i]) === findEven) {
                    return i + 1;
                }
            }
        } else {
            return firstIsEven === isEven(list[2]) ? 2 : 1;
        }
    };