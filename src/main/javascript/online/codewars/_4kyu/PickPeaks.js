/**
 * Created by Hey on 27 Dec 2016
 */
/*

 https://www.codewars.com/kata/pick-peaks/train/javascript

 In this kata, you will create an object that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

 For example, the array arr = [ 0 , 1 , 2 , 5 , 1 , 0 ] has a peak in position 3 with a value of 5 (arr[3] = 5)

 The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be {pos: [], peaks: []}.

 Example: pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]) returns {pos:[3,7],peaks:[6,3]}

 All input arrays will be valid numeric arrays (although it could still be empty), so you won't need to validate the input.

 The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

 Also, beware of plateaus !!! [1,2,2,2,1] has a peak while [1, 2, 2, 2, 3] does not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: pickPeaks([1,2,2,2,1]) returns {pos:[1],peaks:[2]}

 have fun!

 * */

module.exports = function pickPeaks(arr) {
    "use strict";
    var pos = [];
    // , peaks = [];

    // cannot use filter (in a simple way) since it only return value but not index
    // var pos = arr.filter(function (val, index) {
    //     return true;
    // });
    var startPlateau = -1;

    arr.forEach(function (value, index) {
        if (index !== 0 && index !== (arr.length - 1)) {
            var prevValue = arr[index - 1], nextValue = arr[index + 1];
            if ((value > prevValue) && (value > nextValue)) {
                pos.push(index);
            } else {
                if (startPlateau === -1) {
                    if (value > prevValue && value === nextValue) {
                        startPlateau = index;
                    }
                } else {
                    if (value > nextValue) {
                        pos.push(startPlateau);
                        startPlateau = -1;
                    } else if (value < nextValue) {
                        startPlateau = -1;
                    }

                }
            }
        }
    });

    return {
        pos: pos, peaks: pos.map(function (index) {
            return arr[index];
        })
    };
};