/**
 * Created by Hey on 16 Dec 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var Food = srcDirRequire(__dirname, 'Food');
var Coordinates = srcDirRequire(__dirname, 'Coordinates');

describe("Food - SnakeGame", function () {
    "use strict";
    describe("Food properties", function () {
        it("should have coordinates same as initialized", function () {
            var food = new Food(new Coordinates(3, 4));
            var coors = food.getCoors();
            Test.expect(coors).is.an.instanceOf(Coordinates);
            Test.expect(coors.getX()).to.equal(3);
            Test.expect(coors.getY()).to.equal(4);

            coors = new Food(new Coordinates(1, 2)).getCoors();
            Test.expect(coors.getX()).to.equal(1);
            Test.expect(coors.getY()).to.equal(2);
        });
        it("should persist coordinates ", function () {
            var food = new Food(new Coordinates(3, 4));
            Test.expect(food.getCoors()).to.equal(food.getCoors());
        });
        it("should do defensive copy of the input coordinates ", function () {
            var x = 10, y = 11;
            var food = new Food({
                'getX': function () {
                    return x;
                },
                'getY': function () {
                    return y;
                }
            });

            var coors = food.getCoors();
            Test.expect(coors.getX()).to.equal(10);
            Test.expect(coors.getY()).to.equal(11);

            x = 20;
            Test.expect(coors.getX()).to.equal(10);

        });
    });
});