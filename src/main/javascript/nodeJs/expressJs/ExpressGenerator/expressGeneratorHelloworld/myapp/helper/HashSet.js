/**
 * Created by Hey on 15 Sep 2016
 */
"use strict";

var format = require("string-format");

function HashSet() {
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

    this.size = function () {
        return Object.keys(underlyingHashMap).length;
    };

    this.isEmpty = function () {
        return this.size() === 0;
    };

    this.remove = function (item) {
        // coercion checks for both undefined and null
        if (item == null) { // jshint ignore:line
            return false;
        }
        if (!this.contains(item)) {
            return false;
        }
        delete underlyingHashMap[item.toString()];
        return true;
    };

    this.clear = function () {
        underlyingHashMap = {};
    };

    this.getKeysAsArray = function () {
        return Object.keys(underlyingHashMap);
    };

    return this;
}

HashSet.createFromArray = function (arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError(format("Argument {} is not an array!", arr));
    }
    var hashSet = new HashSet();
    arr.forEach(function (value, index, array) {
        hashSet.add(value);
    });
    return hashSet;
};

HashSet.createFromObject = function (obj) {
    return HashSet.createFromArray(Object.keys(obj));
};

module.exports = HashSet;