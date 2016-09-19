/**
 * Created by Hey on 15 Sep 2016
 */

"use strict";

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require("chai");

var addIfNotExist = srcDirRequire(__dirname, "addIfNotExist");
var HttpStatus = require('http-status-codes');

describe("addIfNotExist", function () {
    it("should call addIfNotExist() successfully for empty inputs", function () {
        var targetMap = {};
        var json = {};
        Test.expect(addIfNotExist(targetMap, json)).to.equal('200 OK: added {}');
        Test.expect(targetMap).to.be.empty;
    });
    it("should add from json to target list", function () {
        var targetMap = {};
        var json = ["0005.HK","0001.HK","GOOG.OQ"];
        addIfNotExist();
        Test.expect().to.equal();
    });
});