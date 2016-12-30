/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var titleCase = srcDirRequire(__dirname, 'TitleCaseASentence');

describe('TitleCaseASentence', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(titleCase("I'm a little tea pot")).to.equal("I'm A Little Tea Pot");
        });
    });
});