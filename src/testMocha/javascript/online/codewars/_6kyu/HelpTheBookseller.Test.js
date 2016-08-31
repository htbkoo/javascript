/**
 * Created by Hey on 13 Aug 2016
 */

require.main.require('src/testMocha/testInfrastructure');
var Test = require('chai');

//noinspection JSLint
var stockList = srcDirRequire(__dirname, 'HelpTheBookseller');

//noinspection JSUnresolvedFunction,JSLint
describe('HelpTheBookseller', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("should get correct string", function () {
        //noinspection JSLint,JSUnresolvedFunction
        it("should pass given test", function () {
            "use strict";
            var b = ["ABAR 200", "CDXE 500", "BKWR 250", "BTSQ 890", "DRTY 600"];
            var c = ["A", "B"];
            var res = "(A : 200) - (B : 1140)";
            Test.assert.deepEqual(stockList(b, c), res);

            b = ["CBART 20", "CDXEF 50", "BKWRK 25", "BTSQZ 89", "DRTYM 60"];
            c = ["A", "B", "C", "W"];
            res = "(A : 0) - (B : 114) - (C : 70) - (W : 0)";
            Test.assert.deepEqual(stockList(b, c), res);
        });
    });
});