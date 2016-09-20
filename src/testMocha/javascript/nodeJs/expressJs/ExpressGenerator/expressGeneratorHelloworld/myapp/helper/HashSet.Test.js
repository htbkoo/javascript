/**
 * Created by Hey on 15 Sep 2016
 */

"use strict";

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require("chai");

var HashSet = srcDirRequire(__dirname, "HashSet");
var HttpStatus = require('http-status-codes');

describe("HashSet", function () {
    it("should create empty hashset from HashSet()", function () {
        var hashSet = new HashSet();
    });
    it("should add item to hashSet by add() and contains() should return true", function () {
        var hashSet = new HashSet();
        Test.expect(hashSet.add("str")).to.be.true;
        Test.expect(hashSet.contains("str")).to.be.true;
    });
    it("should return false for adding duplicated item to hashSet", function () {
        var hashSet = new HashSet();
        Test.expect(hashSet.add("str")).to.be.true;
        Test.expect(hashSet.add("str")).to.be.false;
    });
    it("should return false for contains() of non-existent item", function () {
        var hashSet = new HashSet();
        Test.expect(hashSet.contains("not exist")).to.be.false;
    });
    it("should return false for contains() undefined or null", function () {
        var hashSet = new HashSet();
        Test.expect(hashSet.contains(undefined)).to.be.false;
        Test.expect(hashSet.contains(null)).to.be.false;
    });
});