/**
 * Created by Hey on 20 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var isSameLanguage = srcDirRequire(__dirname, 'CodingMeetup_6_CanTheyCodeInTheSameLanguage');

describe("CodingMeetup_6_CanTheyCodeInTheSameLanguage", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should check if they can code in the same language", function () {
            var list1 = [
                { firstName: 'Daniel', lastName: 'J.', country: 'Aruba', continent: 'Americas', age: 42, language: 'JavaScript' },
                { firstName: 'Kseniya', lastName: 'T.', country: 'Belarus', continent: 'Europe', age: 22, language: 'JavaScript' },
                { firstName: 'Hanna', lastName: 'L.', country: 'Hungary', continent: 'Europe', age: 65, language: 'JavaScript' }
            ];

            var list2 = [
                { firstName: 'Mariami', lastName: 'G.', country: 'Georgia', continent: 'Europe', age: 29, language: 'Python' },
                { firstName: 'Mia', lastName: 'H.', country: 'Germany', continent: 'Europe', age: 39, language: 'Ruby' },
                { firstName: 'Maria', lastName: 'I.', country: 'Greece', continent: 'Europe', age: 32, language: 'C' }
            ];

            Test.assert.equal(isSameLanguage(list1), true);
            Test.assert.equal(isSameLanguage(list2), false);
        });
    });
});