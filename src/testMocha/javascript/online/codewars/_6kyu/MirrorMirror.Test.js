/**
 * Created by Hey on 12 Aug 2016
 */
require.main.require('src/testMocha/javascript/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var evilTwin = srcDirRequire(__dirname, 'MirrorMirror');

//noinspection JSUnresolvedFunction,JSLint
describe('MirrorMirror', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Mirror, Mirror", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            var obj = {x: Math.floor(10 * Math.random())};
            // var obj = {x: Test.randomNumber()};
            var twin = evilTwin(obj);
            Test.assert.isDefined(twin.hasGoatee, "twin.hasGoatee must be true");
            Test.expect(obj.hasGoatee).to.be.a('undefined', "original must not be modified");
        });
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass example in description", function () {
            var orig = {x: 5};
            Test.assert.equal(orig.x, 5);
            Test.assert.equal(orig.hasGoatee, undefined);
            var twin = evilTwin(orig);
            Test.assert.equal(twin.x, 5);
            Test.assert.equal(twin.hasGoatee, true);

            orig.x = 6;
            Test.assert.equal(orig.x, 6);
            Test.assert.equal(twin.x, 6);

            orig.z = 12;
            Test.assert.equal(twin.z, 12);
        });
    });
});