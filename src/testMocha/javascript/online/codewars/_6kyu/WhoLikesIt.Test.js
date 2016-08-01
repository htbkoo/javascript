/**
 * Created by Hey on 31 July 2016
 */
require.main.require('testMocha/javascript/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var likes = srcDirRequire(__dirname, 'WhoLikesIt');

//noinspection JSUnresolvedFunction,JSLint
describe("ReverseWords", function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe('example tests', function () {
        //noinspection JSLint,JSUnresolvedFunction
        it('should return correct text', function () {
            Test.equal(likes([]), 'no one likes this');
            Test.equal(likes(['Peter']), 'Peter likes this');
            Test.equal(likes(['Jacob', 'Alex']), 'Jacob and Alex like this');
            Test.equal(likes(['Max', 'John', 'Mark']), 'Max, John and Mark like this');
            Test.equal(likes(['Alex', 'Jacob', 'Mark', 'Max']), 'Alex, Jacob and 2 others like this');
        });
    });
});