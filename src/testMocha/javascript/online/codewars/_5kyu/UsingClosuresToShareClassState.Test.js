/**
 * Created by Hey on 20 Aug 2016
 */

require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var Cat = srcDirRequire(__dirname, 'UsingClosuresToShareClassState');

//noinspection JSUnresolvedFunction,JSLint
describe('UsingClosuresToShareClassState', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("Tests in description:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass test in description", function () {
            Cat.reset();
            // noinspection JSLint - for averageWeight()
            var garfield = new Cat('garfield', 25);
            Test.assert.equal(Cat.averageWeight(), 25);

            var felix = new Cat('felix', 15);
            Test.assert.equal(Cat.averageWeight(), 20);

            felix.weight = 25;
            Test.assert.equal(felix.weight, 25);
            Test.assert.equal(Cat.averageWeight(), 25);
        });
    });
    //noinspection JSLint,JSUnresolvedFunction
    describe("Given Tests:", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            Cat.reset();

            var fluffy = new Cat('fluffy', 15);
            //noinspection JSLint - for averageWeight()
            var garfield = new Cat('garfield', 25);

            Test.assert.equal(fluffy.weight, 15);
            Test.assert.equal(fluffy instanceof Cat, true);
            Test.assert.equal(fluffy.averageWeight, undefined);
            Test.assert.equal(typeof Cat.averageWeight, "function");
            Test.assert.equal(Cat.averageWeight(), 20);
        });
    });
});