/**
 * Created by Hey on 17 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var greetDevelopers = srcDirRequire(__dirname, 'CodingMeetup_2_GreetDevelopers');

describe("CodingMeetup_2_GreetDevelopers", function () {
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

            var answer = [
                {
                    firstName: 'Sofia',
                    lastName: 'I.',
                    country: 'Argentina',
                    continent: 'Americas',
                    age: 35,
                    language: 'Java',
                    greeting: 'Hi Sofia, what do you like the most about Java?'
                },
                {
                    firstName: 'Lukas',
                    lastName: 'X.',
                    country: 'Croatia',
                    continent: 'Europe',
                    age: 35,
                    language: 'Python',
                    greeting: 'Hi Lukas, what do you like the most about Python?'
                },
                {
                    firstName: 'Madison',
                    lastName: 'U.',
                    country: 'United States',
                    continent: 'Americas',
                    age: 32,
                    language: 'Ruby',
                    greeting: 'Hi Madison, what do you like the most about Ruby?'
                }
            ];


            Test.assert.deepEqual(greetDevelopers(list1), answer);
        });
    });
});