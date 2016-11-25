/**
 * Created by Hey on 17 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var countLanguages = srcDirRequire(__dirname, 'CodingMeetup_5_PrepareTheCountOfLanguages');

describe("CodingMeetup_5_PrepareTheCountOfLanguages", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should greet developers", function () {
            var list1 = [
                { firstName: 'Noah', lastName: 'M.', country: 'Switzerland', continent: 'Europe', age: 19, language: 'C' },
                { firstName: 'Anna', lastName: 'R.', country: 'Liechtenstein', continent: 'Europe', age: 52, language: 'JavaScript' },
                { firstName: 'Ramon', lastName: 'R.', country: 'Paraguay', continent: 'Americas', age: 29, language: 'Ruby' },
                { firstName: 'George', lastName: 'B.', country: 'England', continent: 'Europe', age: 81, language: 'C' }
            ];

            var answer = { C: 2, JavaScript: 1, Ruby: 1 };

            Test.assert.deepEqual(countLanguages(list1), answer);
        });
    });
});