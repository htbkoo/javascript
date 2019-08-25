/**
 * Created by Hey on 31 Dec 2016
 */

'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var whatIsInAName = srcDirRequire(__dirname, 'WhereforeArtThou');

describe('WhereforeArtThou', function () {
    describe('Given Tests', function () {
        it("should pass example tests", function () {
            Test.expect(whatIsInAName(
                [
                    {first: "Romeo", last: "Montague"},
                    {first: "Mercutio", last: null},
                    {first: "Tybalt", last: "Capulet"}
                ],
                {last: "Capulet"}
            )).to.deep.equal(
                [
                    {first: "Tybalt", last: "Capulet"}
                ]
            );
        });
    });
});