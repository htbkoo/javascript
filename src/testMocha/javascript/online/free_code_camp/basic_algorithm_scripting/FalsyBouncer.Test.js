/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var bouncer = srcDirRequire(__dirname, 'FalsyBouncer');

describe('FalsyBouncer', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(bouncer([7, "ate", "", false, 9])).to.deep.equal([7, "ate", 9]);
        });
    });
});