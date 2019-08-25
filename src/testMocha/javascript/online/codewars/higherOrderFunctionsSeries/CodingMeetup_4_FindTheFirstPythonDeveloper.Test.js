/**
 * Created by Hey on 17 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var getFirstPython = srcDirRequire(__dirname, 'CodingMeetup_4_FindTheFirstPythonDeveloper');

describe("CodingMeetup_4_FindTheFirstPythonDeveloper", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should greet developers", function () {
            var list1 = [
                {
                    firstName: 'Mark',
                    lastName: 'G.',
                    country: 'Scotland',
                    continent: 'Europe',
                    age: 22,
                    language: 'JavaScript'
                },
                {
                    firstName: 'Victoria',
                    lastName: 'T.',
                    country: 'Puerto Rico',
                    continent: 'Americas',
                    age: 30,
                    language: 'Python'
                },
                {
                    firstName: 'Emma',
                    lastName: 'B.',
                    country: 'Norway',
                    continent: 'Europe',
                    age: 19,
                    language: 'Clojure'
                }
            ];

            var list2 = [
                {
                    firstName: 'Kseniya',
                    lastName: 'T.',
                    country: 'Belarus',
                    continent: 'Europe',
                    age: 29,
                    language: 'JavaScript'
                },
                {
                    firstName: 'Amar',
                    lastName: 'V.',
                    country: 'Bosnia and Herzegovina',
                    continent: 'Europe',
                    age: 32,
                    language: 'Ruby'
                }
            ];

            Test.assert.equal(getFirstPython(list1), 'Victoria, Puerto Rico');
            Test.assert.equal(getFirstPython(list2), 'There will be no Python developers');

        });
    });
});