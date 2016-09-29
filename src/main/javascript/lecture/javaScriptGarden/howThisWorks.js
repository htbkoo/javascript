/**
 * Created by Hey on 27 Sep 2016
 */

// https://bonsaiden.github.io/JavaScript-Garden/#function.this
"use strict";

var howThisWorks = function(){
    this.inFunctionThis = this;
};

// intended violation for learning purpose
howThisWorks.globalThis = this; // jshint ignore:line

module.exports = howThisWorks;