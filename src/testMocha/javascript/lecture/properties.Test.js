/**
 * Created by Hey on 7 Oct 2016
 */

"use strict";

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require("chai");

var properties = srcDirRequire(__dirname, "properties");

describe("properties", function () {
    describe("getters", function () {
        it("should be able to export getters for primitive value", function () {
            Test.expect(properties.x).to.equal(0);
        });
        it("should be able to export getters for function", function () {
            Test.expect(properties.y).to.be.a('function');
            Test.expect(properties.y()).to.equal(1);
        });
        it("should be able to export getters as privileged method", function () {
            Test.expect(properties.a).to.equal(1);
        });
    });
    describe("setters", function () {
        it("should be able to export setters", function () {
            Test.expect(properties.a).to.equal(1);
            Test.expect(properties.a).to.equal(1);

        });
        it("should be able to export getters for function", function () {
            Test.expect(properties.y).to.be.a('function');
            Test.expect(properties.y()).to.equal(1);
        });
        it("should be able to export getters as privileged method", function () {
            Test.expect(properties.a).to.equal(1);
        });
    });
});