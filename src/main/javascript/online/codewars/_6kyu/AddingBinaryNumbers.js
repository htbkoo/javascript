/**
 * Created by Hey on 13 Aug 2016
 */
/*

 https://www.codewars.com/kata/adding-binary-numbers/train/javascript

 You have to write a function add which takes two binary numbers as strings and returns their sum as a string.
 Note:

 You are not allowed to convert binary to decimal & vice versa.
 The sum should contain No leading zeroes.

 Examples:

 add('111','10'); => '1001'
 add('1101','101'); => '10010'
 add('1101','10111') => '100100'
 * */

module.exports =
    function add(a, b) {
        "use strict";
        // Happy Coding ^_^
        var pad = function (n, width, z) {
            // Courtesy of http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
            while (n.length < width) {
                //noinspection JSLint
                n = '' + z + n;
            }
            return n;
        };
        var aLength = a.length;
        var bLength = b.length;

        if (aLength > bLength) {
            b = pad(b, aLength, '0');
        } else if (bLength > aLength) {
            a = pad(a, bLength, '0');
        }

        var length = a.length;
        var i, carry = 0, result = "", digit, cache = "";
        for (i = length - 1; i >= 0; --i) {
            digit = carry + a.charCodeAt(i) - "0".charCodeAt(0) + b.charCodeAt(i) - "0".charCodeAt(0);
            carry = Math.floor(digit / 2);
            digit = digit % 2;
            //noinspection JSLint
            cache = "" + digit + cache;
            if (digit === 1) {
                //noinspection JSLint
                result = "" + cache + result;
                cache = "";
            }
        }
        if (carry > 0) {
            result = "1" + cache + result;
        }
        return (result === "") ? "0" : result;
    };