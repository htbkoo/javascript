/**
 * Created by Hey on 7 Oct 2016
 */
'use strict';

var a = 1;
function f() {
    return a;
}

var localScopeA = (function (scope){
    return scope;
})(a);
var localScopeA2 = a;

module.exports = {
    get a() {
        return a;
    },
    get aWithoutClosure() {
        return localScopeA;
    },
    get aWithoutClosureEasier() {
        return localScopeA2;
    },
    get x() {
        return 0;
    },
    get y() {
        return f;
    },
    set z(input) { // jshint ignore:line
        a = input;
    }
};

