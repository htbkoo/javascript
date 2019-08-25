/**
 * Created by Hey on 31 Jul 2016
 */
'use strict';

var srcDirRequire = require('testMocha/testInfrastructure');
var assert = require('chai').assert;

var Hello2 = srcDirRequire(__dirname, 'hello2');

describe('Hello2', function () {
    describe('#getCount()', function () {
        it('should return count, which would be incremented by 1 each time when world() is called', function () {
            var hello2a = new Hello2();
            assert.equal(0, hello2a.getCount());
            assert.equal(0, hello2a.getCount());
            hello2a.world();
            assert.equal(1, hello2a.getCount());
            var hello2b = new Hello2();
            assert.equal(1, hello2a.getCount());
            assert.equal(0, hello2b.getCount());
            hello2a.resetCount();
            hello2b.world();
            assert.equal(0, hello2a.getCount());
            assert.equal(1, hello2b.getCount());
        });
    });
});

