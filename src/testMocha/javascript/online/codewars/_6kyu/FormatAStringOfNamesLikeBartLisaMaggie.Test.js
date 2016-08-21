/**
 * Created by Hey on 31 July 2016
 */
require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
var list = srcDirRequire(__dirname, 'FormatAStringOfNamesLikeBartLisaMaggie');

//noinspection JSUnresolvedFunction,JSLint
describe('FormatAStringOfNamesLikeBartLisaMaggie', function () {
    //noinspection JSLint
    describe('#list()', function () {
        //noinspection JSLint
        it('should list name in specified format', function () {
            Test.equal(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}, {name: 'Homer'}, {name: 'Marge'}]), 'Bart, Lisa, Maggie, Homer & Marge',
                "Must work with many names");

            Test.equal(list([{name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}]), 'Bart, Lisa & Maggie',
                "Must work with many names");

            Test.equal(list([{name: 'Bart'}, {name: 'Lisa'}]), 'Bart & Lisa',
                "Must work with two names");

            Test.equal(list([{name: 'Bart'}]), 'Bart',
                "Wrong output for a single name");

            Test.equal(list([]), '',
                "Must work with no names")
        });
    });
});