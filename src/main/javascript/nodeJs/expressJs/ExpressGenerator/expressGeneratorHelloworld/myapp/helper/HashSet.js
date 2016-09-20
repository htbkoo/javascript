/**
 * Created by Hey on 15 Sep 2016
 */

var format = require("string-format");


function HashSet() {
    "use strict";
    var underlyingHashMap = {};

    this.add = function (item) {
        // coercion checks for both undefined and null
        if (item == null) { // jshint ignore:line
            return false;
        }
        if (this.contains(item)) {
            return false;
        }
        underlyingHashMap[item.toString()] = "";
        return true;
    };

    this.contains = function (item) {
        // coercion checks for both undefined and null
        return item != null && (item.toString() in underlyingHashMap); // jshint ignore:line
    };

    // this.fromObject = function (obj){
    //
    // };

    // if (targetMap){};
    return this;
}

HashSet.createFromArray = function (arr) {
    "use strict";
    if (!Array.isArray(arr)) {
        throw new TypeError(format("Argument {} is not an array!", arr));
    }
    var hashSet = new HashSet();
    arr.forEach(function (value, index, array) {
        hashSet.add(value);
    });
    return hashSet;
};

module.exports = HashSet;