/**
 * Created by Hey on 11 Oct 2016
 */
'use strict';

var a = 0;

var outer = [];
var inner = [];
var innerNoClosure = [];
var innerF = [];
var innerNoClosureF = [];

function test() {
    for (var i = 0; i < 5; i++) {
        outer.push(i);

        // suppressing warning on purpose - just to test with close
        innerF.push(function () { // jshint ignore:line
            //noinspection JSReferencingMutableVariableFromClosure
            inner.push(i);
        });

        (function (x) { // jshint ignore:line
            innerNoClosureF.push(function () {
                innerNoClosure.push(x);
            });
        })(i);
    }
}

test();
innerF.forEach(function (val) {
    val();
});
innerNoClosureF.forEach(function (val) {
    val();
});

module.exports = {
    "outer": outer,
    "inner": inner,
    "innerNoClosure": innerNoClosure
};