/**
 * Created by Hey on 15 Sep 2016
 */

"use strict";

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require("chai");

var HashSet = srcDirRequire(__dirname, "HashSet");
var HttpStatus = require('http-status-codes');

describe("HashSet", function () {
    describe("Constructors", function () {
        it("should create empty hashset from HashSet()", function () {
            var hashSet = new HashSet();
        });
    });
    describe("Instance methods", function () {
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
        it("should get size()", function () {
            var hashSet = new HashSet();
            Test.expect(hashSet.size()).to.equal(0);
            Test.expect(hashSet.add("str")).to.be.true;
            Test.expect(hashSet.size()).to.equal(1);
            Test.expect(hashSet.add("str")).to.be.false;
            Test.expect(hashSet.size()).to.equal(1);
        });
        it("should return true for empty() for empty hashSet and vice versa", function () {
            var hashSet = new HashSet();
            Test.expect(hashSet.isEmpty()).to.be.true;
            hashSet.add("str");
            Test.expect(hashSet.isEmpty()).to.be.false;
        });
        it("should be able to remove from hashSet", function () {
            var hashSet = new HashSet();
            Test.expect(hashSet.remove("str")).to.be.false;
            hashSet.add("str");
            Test.expect(hashSet.remove("str")).to.be.true;
        });
        it("should be able to clear hashSet", function () {
            var hashSet = new HashSet();
            Test.expect(hashSet.size()).to.equal(0);
            hashSet.clear();
            Test.expect(hashSet.size()).to.equal(0);
            hashSet.add("str");
            Test.expect(hashSet.size()).to.equal(1);
            hashSet.add("str");
            Test.expect(hashSet.size()).to.equal(1);
            hashSet.add("str2");
            Test.expect(hashSet.size()).to.equal(2);
            hashSet.clear();
            Test.expect(hashSet.size()).to.equal(0);
        });
    });
    describe("Static methods", function () {
        it("should be able to create from Array and have same items", function () {
            var array = ["1", "2", "3"];
            var hashSet = HashSet.createFromArray(array);
            array.forEach(function (value) {
                Test.expect(hashSet.contains(value)).to.be.true;
            });
        });
        it("should be able to create from Array but remove duplicated items", function () {
            var array = ["1", "2", "1"];
            var hashSet = HashSet.createFromArray(array);
            Test.expect(hashSet.size()).to.equal(2);
        });
        it("should be able to create from Object and have same items", function () {
            var obj = {"1": "", "2": "", "3": ""};
            var hashSet = HashSet.createFromObject(obj);
            Object.keys(obj).forEach(function (value) {
                Test.expect(hashSet.contains(value)).to.be.true;
            });
        });
    });
});