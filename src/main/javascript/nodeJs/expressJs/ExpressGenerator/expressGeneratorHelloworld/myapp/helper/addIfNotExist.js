/**
 * Created by Hey on 15 Sep 2016
 */

var HttpStatus = require('http-status-codes');
var format = require('string-format');

function addIfNotExist(targetMap, json) {
    "use strict";

    // if (targetMap){};
    return format('{} {}: added {}', HttpStatus.OK, HttpStatus.getStatusText(HttpStatus.OK), JSON.stringify(json));
}

module.exports = addIfNotExist;