/**
 * Created by Hey on 27 Sep 2016
 */

"use strict";

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require("chai");

var howThisWorks = srcDirRequire(__dirname, "howThisWorks");

describe("howThisWorks", function () {
    describe.skip("global 'this' under 'use strict'", function () {
        it("should be 'undefined' for global 'this' under 'use strict'", function () {
            Test.expect(howThisWorks.hasOwnProperty('globalThis')).to.be.true;
            Test.expect(howThisWorks.globalThis).to.be.undefined;
        });
    });
    describe("in-function 'this' under 'use strict'", function () {
        xit("should be 'undefined' for in function 'this' under 'use strict'", function () {
            Test.expect(howThisWorks.hasOwnProperty('inFunctionThis')).to.be.true;
            Test.expect(howThisWorks.inFunctionThis).to.be.undefined;
        });
    });
});