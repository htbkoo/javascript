/**
 * Created by Hey on 2 Nov 2016
 */

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var isValidCoordinates = srcDirRequire(__dirname, 'CoordinatesValidator');

describe("CoordinatesValidator", function () {
    "use strict";
    describe("Solution", function () {
        describe("Valid coordinates", function () {
            var ValidCoordinates = [
                "-23, 25",
                "4, -3",
                "24.53525235, 23.45235",
                "04, -23.234235",
                "43.91343345, 143"
            ];
            ValidCoordinates.forEach(function (coordinates, index) {
                it("[" + index + "] should be able to validate valid coordinate - " + coordinates, function () {
                    Test.expect(isValidCoordinates(coordinates), coordinates + " validation failed.").to.be.true;
                });
            });
        });

        describe("Invalid coordinates", function () {
            var InvalidCoordinates = [
                "23.234, - 23.4234",
                "2342.43536, 34.324236",
                "N23.43345, E32.6457",
                "99.234, 12.324",
                "6.325624, 43.34345.345",
                "0, 1,2",
                "0.342q0832, 1.2324",
                "23.245, 1e1"
            ];
            InvalidCoordinates.forEach(function (coordinates, index) {
                it("[" + index + "] should be able to validate invalid coordinate - " + coordinates, function () {
                    Test.expect(isValidCoordinates(coordinates), coordinates + " validation failed.").to.be.false;
                });
            });
        });
    });
});