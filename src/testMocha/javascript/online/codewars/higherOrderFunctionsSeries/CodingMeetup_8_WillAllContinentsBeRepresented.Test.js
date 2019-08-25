/**
 * Created by Hey on 20 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var allContinents = srcDirRequire(__dirname, 'CodingMeetup_8_WillAllContinentsBeRepresented');

describe("CodingMeetup_8_WillAllContinentsBeRepresented", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should check if all continents would be represented", function () {
            var list1 = [
                {
                    firstName: 'Fatima',
                    lastName: 'A.',
                    country: 'Algeria',
                    continent: 'Africa',
                    age: 25,
                    language: 'JavaScript'
                },
                {firstName: 'Agustín', lastName: 'M.', country: 'Chile', continent: 'Americas', age: 37, language: 'C'},
                {firstName: 'Jing', lastName: 'X.', country: 'China', continent: 'Asia', age: 39, language: 'Ruby'},
                {firstName: 'Laia', lastName: 'P.', country: 'Andorra', continent: 'Europe', age: 55, language: 'Ruby'},
                {
                    firstName: 'Oliver',
                    lastName: 'Q.',
                    country: 'Australia',
                    continent: 'Oceania',
                    age: 65,
                    language: 'PHP'
                }
            ];

            var list2 = [
                {
                    firstName: 'Fatima',
                    lastName: 'A.',
                    country: 'Algeria',
                    continent: 'Africa',
                    age: 25,
                    language: 'JavaScript'
                }
            ];

            Test.assert.equal(allContinents(list1), true);
            Test.assert.equal(allContinents(list2), false);
        });
    });
});