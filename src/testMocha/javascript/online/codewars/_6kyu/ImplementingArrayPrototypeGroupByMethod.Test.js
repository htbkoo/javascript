/**
 * Created by Hey on 31 July 2016
 */
'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai').assert;

//noinspection JSLint
srcDirRequire(__dirname, 'ImplementingArrayPrototypeGroupByMethod');

//noinspection JSUnresolvedFunction,JSLint
describe('ImplementingArrayPrototypeGroupByMethod', function () {
    //noinspection JSLint
    describe('#groupBy()', function () {
        //noinspection JSLint
        it('should implement Array.prototype.groupBy Method', function () {
            Test.equal(
                JSON.stringify([1,2,3,2,4,1,5,1,6].groupBy()),
                '{"1":[1,1,1],"2":[2,2],"3":[3],"4":[4],"5":[5],"6":[6]}'
            );

            Test.equal(
                JSON.stringify([1,2,3,2,4,1,5,1,6].groupBy(
                    function(_) {return _ % 3;}
                )),
                '{"0":[3,6],"1":[1,4,1,1],"2":[2,2,5]}'
            );

            var words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            Test.equal(
                JSON.stringify(words.groupBy(
                    function(_) {return _.length;}
                )),
                '{"3":["one","two","six","ten"],"4":["four","five","nine"],"5":["three","seven","eight"]}'
            );
        });
    });
});