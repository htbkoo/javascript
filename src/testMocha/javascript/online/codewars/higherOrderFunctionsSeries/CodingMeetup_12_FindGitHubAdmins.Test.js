/**
 * Created by Hey on 21 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');
var sinon = require('sinon');

var findAdmin = srcDirRequire(__dirname, 'CodingMeetup_12_FindGitHubAdmins');

describe("CodingMeetup_12_FindGitHubAdmins", function () {
    "use strict";
    describe("given test cases", function () {
        it("should find average age", function () {
            var list1 = [
                { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 22, language: 'JavaScript', githubAdmin: 'yes' },
                { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 49, language: 'Ruby', githubAdmin: 'no' },
                { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 34, language: 'JavaScript', githubAdmin: 'yes' },
                { firstName: 'Piotr', lastName: 'B.', country: 'Poland', continent: 'Europe', age: 128, language: 'JavaScript', githubAdmin: 'no' }
            ];

            var answer1 = [
                { firstName: 'Harry', lastName: 'K.', country: 'Brazil', continent: 'Americas', age: 22, language: 'JavaScript', githubAdmin: 'yes' },
                { firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 34, language: 'JavaScript', githubAdmin: 'yes' }
            ];

            Test.assert.deepEqual(findAdmin(list1, 'JavaScript'), answer1);
            Test.assert.deepEqual(findAdmin(list1, 'Ruby'), []);
            Test.assert.deepEqual(findAdmin(list1, 'Python'), []);
        });
    });
});