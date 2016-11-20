/**
 * Created by Hey on 20 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var createUsernames = srcDirRequire(__dirname, 'CodingMeetup_10_CreateUsernames');

describe("CodingMeetup_10_CreateUsernames", function () {
    "use strict";

// ======================================================

// Please run the full test suite to check your solution

// ======================================================
    xdescribe("Please run the test suite to check your solution", function () {
        xit("does not test your function", function () {
            Test.assert.equal("not a test", "not a test", "This does not test you function");
        });
    });
});