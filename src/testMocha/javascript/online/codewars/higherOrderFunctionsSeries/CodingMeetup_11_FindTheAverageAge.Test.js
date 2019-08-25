/**
 * Created by Hey on 21 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');
var sinon = require('sinon');

var getAverageAge = srcDirRequire(__dirname, 'CodingMeetup_11_FindTheAverageAge');

describe("CodingMeetup_11_FindTheAverageAge", function () {
    "use strict";
    describe("given test cases", function () {
        it("should find average age", function () {
            var list1 = [
                { firstName: 'Maria', lastName: 'Y.', country: 'Cyprus', continent: 'Europe', age: 30, language: 'Java' },
                { firstName: 'Victoria', lastName: 'T.', country: 'Puerto Rico', continent: 'Americas', age: 70, language: 'Python' }
            ];

            Test.assert.equal(getAverageAge(list1), 50);


            var list2 = [
                { firstName: 'Noa', lastName: 'A.', country: 'Israel', continent: 'Asia', age: 20, language: 'Ruby' },
                { firstName: 'Andrei', lastName: 'E.', country: 'Romania', continent: 'Europe', age: 21, language: 'C' }
            ];

            Test.assert.equal(getAverageAge(list2), 21);
        });
    });
});