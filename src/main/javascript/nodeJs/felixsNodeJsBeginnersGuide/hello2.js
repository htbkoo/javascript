/**
 * Created by Hey on 31 Jul 2016
 */

module.exports = function () {
    "use strict";
    var count = 0;
    this.world = function () {
        console.log('world in hello2, printed ' + (++count) + " times");
    };
    this.resetCount = function () {
        console.log('world in hello2, count reset to 0.');
        count = 0;
    };
    return this;
};