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
    function compareVersions(version1, version2) {
        "use strict";
        // return parseFloat(version1) >= parseFloat(version2);```
        var v1 = version1.split(".");
        var v2 = version2.split(".");

        var length1 = v1.length;
        var length2 = v2.length;
        var length = Math.min(length1, length2);
        var i, int1, int2;
        for (i = 0; i < length; ++i) {
            int1 = parseInt(v1[i], 10);
            int2 = parseInt(v2[i], 10);
            if (int1 > int2) {
                return true;
            }
            if (int1 < int2) {
                return false;
            }
        }
        return length1 >= length2;
    };