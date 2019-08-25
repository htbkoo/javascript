/**
 * Created by Hey on 11 Oct 2016
 */

"use strict";

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require("chai");

var closure = srcDirRequire(__dirname, "closure");

describe("closure", function () {
    it("closure", function () {
        Test.expect(closure.outer).to.include.members([0, 1, 2, 3, 4]);
        Test.expect(closure.inner).to.include.members([5, 5, 5, 5, 5]);
        Test.expect(closure.innerNoClosure).to.include.members([0, 1, 2, 3, 4]);
    });
});