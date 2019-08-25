/**
 * Created by Hey on 20 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');
var sinon = require('sinon');

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

    describe("my own test with first attempt to use sinon to mock time", function () {
        describe("with mock time of year 2020", function () {
            var clock;
            before(function () {
                clock = sinon.useFakeTimers(new Date(2020, 1, 1).getTime());
            });
            after(function () {
                clock.restore();
            });
            it("should test create usernames with mocktime", function () {
                var list1 = [
                    {
                        firstName: 'Emily',
                        lastName: 'N.',
                        country: 'Ireland',
                        continent: 'Europe',
                        age: 30,
                        language: 'Ruby'
                    },
                    {
                        firstName: 'Nor',
                        lastName: 'E.',
                        country: 'Malaysia',
                        continent: 'Asia',
                        age: 20,
                        language: 'Clojure'
                    }
                ];

                var expected = [
                    {
                        firstName: 'Emily',
                        lastName: 'N.',
                        country: 'Ireland',
                        continent: 'Europe',
                        age: 30,
                        language: 'Ruby',
                        username: 'emilyn1990'
                    },
                    {
                        firstName: 'Nor',
                        lastName: 'E.',
                        country: 'Malaysia',
                        continent: 'Asia',
                        age: 20,
                        language: 'Clojure',
                        username: 'nore2000'
                    }
                ];

                Test.expect(createUsernames(list1)).to.deep.equal(expected);
            });
        });
    });
});