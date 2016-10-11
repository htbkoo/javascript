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
            properties.z = 99;
            Test.expect(properties.a).to.equal(99);
            properties.z = 2;
            Test.expect(properties.a).to.equal(2);
        });
    });
    describe("scope", function () {
        it("should be able to export closure - variable being referred to still get updated", function () {
            properties.z = 99;
            Test.expect(properties.y).to.be.a('function');
            Test.expect(properties.y()).to.equal(99);
            properties.z = 3;
            Test.expect(properties.y).to.be.a('function');
            Test.expect(properties.y()).to.equal(3);
        });
        it("should be able to export variable with local scope", function () {
            Test.expect(properties.aWithoutClosure).to.equal(1);
            properties.z = 4;
            Test.expect(properties.aWithoutClosure).to.equal(1);
        });
        it("should be able to export variable with local scope in easier way", function () {
            Test.expect(properties.aWithoutClosureEasier).to.equal(1);
            properties.z = 5;
            Test.expect(properties.aWithoutClosureEasier).to.equal(1);
        });
    });
});