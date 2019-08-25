/**
 * Created by Hey on 29 Sep 2016
 */

"use strict";

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require("chai");

var prototype = srcDirRequire(__dirname, "prototype");
var Foo = prototype.Foo;
var Bar = prototype.Bar;
var Bar2 = prototype.Bar2;


describe("prototype", function () {
    describe("public variable in parent class", function () {
        it("should be able to use instance method on instance but not on class'", function () {
            var foo = new Foo();
            Test.expect(foo.getPriv()).to.equal(5);
            foo.setPriv(20);
            Test.expect(foo.getPriv()).to.equal(20);
            Test.expect(function () {
                // checking function should be missing on Class instead of instance
                //noinspection JSUnresolvedFunction
                Foo.setPriv(30);
            }).to.throw(TypeError);
            Test.expect(foo.getPriv()).to.equal(20);
        });
    });
});