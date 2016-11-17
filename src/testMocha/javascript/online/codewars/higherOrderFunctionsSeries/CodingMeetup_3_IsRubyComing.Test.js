/**
 * Created by Hey on 17 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var isRubyComing = srcDirRequire(__dirname, 'CodingMeetup_3_IsRubyComing');

describe("CodingMeetup_3_IsRubyComing", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should greet developers", function () {
            var list1 = [
                {
                    firstName: 'Sofia',
                    lastName: 'I.',
                    country: 'Argentina',
                    continent: 'Americas',
                    age: 35,
                    language: 'Java'
                },
                {
                    firstName: 'Lukas',
                    lastName: 'X.',
                    country: 'Croatia',
                    continent: 'Europe',
                    age: 35,
                    language: 'Python'
                },
                {
                    firstName: 'Madison',
                    lastName: 'U.',
                    country: 'United States',
                    continent: 'Americas',
                    age: 32,
                    language: 'Ruby'
                }
            ];

            var list2 = [
                {
                    firstName: 'Sofia',
                    lastName: 'I.',
                    country: 'Argentina',
                    continent: 'Americas',
                    age: 35,
                    language: 'Java'
                },
                {
                    firstName: 'Lukas',
                    lastName: 'X.',
                    country: 'Croatia',
                    continent: 'Europe',
                    age: 35,
                    language: 'Python'
                }
            ];

            Test.assert.equal(isRubyComing(list1), true);
            Test.assert.equal(isRubyComing(list2), false);
        });
    });
});