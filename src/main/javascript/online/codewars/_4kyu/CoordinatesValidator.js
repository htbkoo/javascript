/**
 * Created by Hey on 2 Nov 2016
 */
/*

 https://www.codewars.com/kata/pascals-triangle/train/javascript

 You need to create a function that will validate if given parameters are valid geographical coordinates.

 Valid coordinates look like the following: "23.32353342, -32.543534534". The return value should be either true or false.

 Latitude (which is first float) can be between 0 and 90, positive or negative. Longitude (which is second float) can be between 0 and 180, positive or negative.

 Coordinates can only contain digits, or one of the following symbols (including space after comma) -, .

 There should be no space between the minus "-" sign and the digit after it.

 Here are some valid coordinates:

 -23, 25
 24.53525235, 23.45235
 04, -23.234235
 43.91343345, 143
 4, -3

 And some invalid ones:

 23.234, - 23.4234
 2342.43536, 34.324236
 N23.43345, E32.6457
 99.234, 12.324
 6.325624, 43.34345.345
 0, 1,2
 0.342q0832, 1.2324

 * */

module.exports = function isValidCoordinates(coordinates) {
    "use strict";
    function isValid(coor, min, max) {
        coor = (function removeLeadingZeroes(c) {
            return c.replace(/^(?!0$)0+/, '');
        })(coor);

        var numCoor = parseFloat(coor);
        if (numCoor.toString() !== coor) {
            return false;
        }

        return (numCoor >= min) && (numCoor <= max);
    }

    var firstCommaIndex = coordinates.indexOf(',');
    if (firstCommaIndex === -1) {
        return false;
    }

    if (firstCommaIndex !== coordinates.lastIndexOf(',')) {
        return false;
    }

    var first = coordinates.substring(0, firstCommaIndex).trim(), second = coordinates.substring(firstCommaIndex + 1).trim();

    // return true; // do your thing!
    return isValid(first, -90, 90) && isValid(second, -180, 180);
};