/**
 * Created by Hey on 13 Aug 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var songDecoder = srcDirRequire(__dirname, 'Dubstep');

//noinspection JSUnresolvedFunction,JSLint
describe('Dubstep', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Dubstep", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Test.assert.equal(songDecoder("AWUBBWUBC"), "A B C", "WUB should be replaced by 1 space");
            Test.assert.equal(songDecoder("AWUBWUBWUBBWUBWUBWUBC"), "A B C", "multiples WUB should be replaced by only 1 space");
            Test.assert.equal(songDecoder("WUBAWUBBWUBCWUB"), "A B C", "heading or trailing spaces should be removed");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass example in description", function () {
            Test.assert.equal(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"), "WE ARE THE CHAMPIONS MY FRIEND");
        });
    });
});