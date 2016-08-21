/**
 * Created by Hey on 13 Aug 2016
 */

require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var compareVersions = srcDirRequire(__dirname, 'CompareVersions');

//noinspection JSUnresolvedFunction,JSLint
describe('CompareVersions', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Basic Tests:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            "use strict";
            Test.expect(compareVersions("11", "10")).equal(true, 'Testing versions without subversion');
            Test.expect(compareVersions("11", "11")).equal(true, 'Test equal versions');
            Test.expect(compareVersions("10.4.6", "10.4")).equal(true, 'Adding a subversion should make this version "larger"');
            Test.expect(compareVersions("10.4", "11")).equal(false, 'Subversion precedence is smaller than Version');
            Test.expect(compareVersions("10.4", "10.10")).equal(false, 'Version value is not the same as its decimal value');
            Test.expect(compareVersions("10.4.9", "10.5")).equal(false, 'Adding subversion does not make it larger than a greater version')
        });
    });
});