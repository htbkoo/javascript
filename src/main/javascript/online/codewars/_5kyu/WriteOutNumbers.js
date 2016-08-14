/**
 * Created by Hey on 13 Aug 2016
 */

/*

 https://www.codewars.com/kata/write-out-numbers/train/javascript

 Create a function that transforms any positive number to a string representing the number in words. The function should work for all numbers between 0 and 999999.

 For example,

 // number2words(0) should return "zero"

 // number2words(1) should return "one"

 // number2words(9) should return "nine"

 // number2words(10) should return "ten"

 // number2words(17) should return "seventeen"

 // number2words(20) should return "twenty"

 // number2words(21) should return "twenty-one"

 // number2words(45) should return "forty-five"

 // number2words(80) should return "eighty"

 // number2words(99) should return "ninety-nine"

 // number2words(100) should return "one hundred"

 // number2words(301) should return "three hundred one"

 // number2words(799) should return "seven hundred ninety-nine"

 // number2words(800) should return "eight hundred"

 // number2words(950) should return "nine hundred fifty"

 // number2words(1000) should return "one thousand"

 // number2words(1002) should return "one thousand two"

 // number2words(3051) should return "three thousand fifty-one"

 // number2words(7200) should return "seven thousand two hundred"

 // number2words(7219) should return "seven thousand two hundred nineteen"

 // number2words(8330) should return "eight thousand three hundred thirty"

 // number2words(99999) should return "ninety-nine thousand nine hundred ninety-nine"

 // number2words(888888) should return "eight hundred eighty-eight thousand eight hundred eighty-eight"

 * */

module.exports =
    function number2words(n) {
        "use strict";
        // works for numbers between 0 and 999999
        if (n === 0) {
            return "zero";
        }

        var dictionary = {
            0: "zero",
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine",
            10: "ten",
            11: "eleven",
            12: "twelve",
            13: "thirteen",
            14: "fourteen",
            15: "fifteen",
            16: "sixteen",
            17: "seventeen",
            18: "eighteen",
            19: "nineteen",
            20: "twenty",
            30: "thirty",
            40: "forty",
            50: "fifty",
            60: "sixty",
            70: "seventy",
            80: "eighty",
            90: "ninety",
            100: "hundred",
            1000: "thousand"
        };

        var number2wordsOtherThanZero = function (param) {

            if (param === 0) {
                return "";
            }
            if (param < 100) {
                if (dictionary.hasOwnProperty(param)) {
                    return dictionary[param];
                }
                return (number2wordsOtherThanZero(Math.floor(param / 10) * 10) + "-" + number2wordsOtherThanZero(param % 10)).trim();
            }

            if (param < 1000) {
                return (number2wordsOtherThanZero(Math.floor(param / 100)) + " " + dictionary[100] + " " + number2wordsOtherThanZero(param % 100)).trim();
            }

            return (number2wordsOtherThanZero(Math.floor(param / 1000)) + " " + dictionary[1000] + " " + number2wordsOtherThanZero(param % 1000)).trim();
        };

        return number2wordsOtherThanZero(n);
    };



