/**
 * Created by Hey on 29 Dec 2016
 */

/*
 https://www.codewars.com/kata/volume-of-a-cuboid/train/javascript

 Bob needs a fast way to calculate the volume of a cuboid with three values: length, width and the height of the cuboid. Write a function to help Bob with this calculation.

 Ruby: def get_volume_of_cuboid(length, width, height)

 * */

var Kata;

Kata = (function () {
    "use strict";
    function Kata() {
    }

    Kata.getVolumeOfCuboid = function (length, width, height) {
        // your code here
        return length * width * height;
    };

    return Kata;

})();

module.exports = Kata;