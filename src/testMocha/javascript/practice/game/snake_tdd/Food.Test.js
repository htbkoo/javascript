/**
 * Created by Hey on 16 Dec 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var Food = srcDirRequire(__dirname, 'Food');
var Coordinates = srcDirRequire(__dirname, 'Coordinates');

describe("Food - SnakeGame", function () {
    "use strict";
    describe("Food properties", function () {
        it("should have coordinates same as initialized", function () {
            var food = new Food(3, 4);
            var coors = food.getCoors();
            Test.expect(coors).is.an.instanceOf(Coordinates);
            Test.expect(coors.getX()).to.equal(3);
            Test.expect(coors.getY()).to.equal(4);

            coors = new Food(1, 2).getCoors();
            Test.expect(coors.getX()).to.equal(1);
            Test.expect(coors.getY()).to.equal(2);
        });
    });
});