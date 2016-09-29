/**
 * Created by Hey on 29 Sep 2016
 */

"use strict";

function Foo() {
    var priv = 5;
    this.public = 10;

    this.getPriv = function () {
        return priv;
    };

    this.setPriv = function (p) {
        priv = p;
    };
    return this;
}

function Bar() {
    this.getBarPriv = function () {
        return this.getPriv() + 1;
    };
    return this;
}

function Bar2() {
    this.public = 20;
    return this;
}

Bar.prototype = new Foo();
var fooPrototype = new Foo();
Bar2.prototype = fooPrototype;

module.exports = {
    "Foo": Foo,
    "Bar": Bar,
    "Bar2": Bar2
};