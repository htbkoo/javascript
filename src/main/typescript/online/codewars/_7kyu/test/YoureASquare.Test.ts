/**
 * Created by Hey on 18 Aug 2016
 */

import isSquare from '../YoureASquare';
// import the type of assertion library you wish to use (Chai recommended)
import {expect} from "chai";

// DONE: Replace examples and use TDD development by writing your own tests

//noinspection JSUnresolvedFunction,JSLint
describe('YoureASquare', function () {
    //noinspection JSLint,JSUnresolvedFunction
    describe("solution", function() {
        it("should work for some examples", function() {
            expect(isSquare(-1)).to.be.false;
            expect(isSquare( 3)).to.be.false;
            expect(isSquare( 4)).to.be.true;
            expect(isSquare(25)).to.be.true;
            expect(isSquare(26)).to.be.false;
        });
    });
});



