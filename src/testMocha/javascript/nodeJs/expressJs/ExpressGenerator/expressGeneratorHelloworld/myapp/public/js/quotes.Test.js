/**
 * Created by Hey on 28 Oct 2016
 */

'use strict';

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

var quotes = srcDirRequire(__dirname, 'quotes');

describe("quotes", function () {
    describe("add underlying", function () {
        it("should call the add underlying api when clicked button", function(){
            Test.assert.fail("not implemented yey");
        });
    });
});