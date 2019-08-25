/**
 * Created by Hey on 1 Jan 2017
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var translatePigLatin = srcDirRequire(__dirname, 'PigLatin');

describe('PigLatin', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(translatePigLatin("consonant")).to.equal("onsonantcay");
        });
    });
});