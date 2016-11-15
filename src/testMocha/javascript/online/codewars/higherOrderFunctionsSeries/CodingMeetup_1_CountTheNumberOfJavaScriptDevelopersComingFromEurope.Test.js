/**
 * Created by Hey on 15 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var countDevelopers = srcDirRequire(__dirname, 'CodingMeetup_1_CountTheNumberOfJavaScriptDevelopersComingFromEurope');

describe("CodingMeetup_1_CountTheNumberOfJavaScriptDevelopersComingFromEurope", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should count developers", function () {
            var list1 = [
                {
                    firstName: 'Noah',
                    lastName: 'M.',
                    country: 'Switzerland',
                    continent: 'Europe',
                    age: 19,
                    language: 'JavaScript'
                },
                {
                    firstName: 'Maia',
                    lastName: 'S.',
                    country: 'Tahiti',
                    continent: 'Oceania',
                    age: 28,
                    language: 'JavaScript'
                },
                {firstName: 'Shufen', lastName: 'L.', country: 'Taiwan', continent: 'Asia', age: 35, language: 'HTML'},
                {
                    firstName: 'Sumayah',
                    lastName: 'M.',
                    country: 'Tajikistan',
                    continent: 'Asia',
                    age: 30,
                    language: 'CSS'
                }
            ];

            var list2 = [
                {
                    firstName: 'Oliver',
                    lastName: 'Q.',
                    country: 'Australia',
                    continent: 'Oceania',
                    age: 19,
                    language: 'HTML'
                },
                {firstName: 'Lukas', lastName: 'R.', country: 'Austria', continent: 'Europe', age: 89, language: 'HTML'}
            ];

            Test.assert.equal(countDevelopers(list1), 1);
            Test.assert.equal(countDevelopers(list2), 0);
        });
    });
});