/**
 * Created by Hey on 7 Oct 2016
 */
'use strict';

var a = 1;
function f() {
    return a;
}

module.exports = {
    get a() {
        return a;
    },
    // TODO
    get aWithoutClosure() {
        return (function (scope) {
            return scope;
        })(a);
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

