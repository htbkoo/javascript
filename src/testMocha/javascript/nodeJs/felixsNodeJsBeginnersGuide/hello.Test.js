/**
 * Created by Hey on 31 Jul 2016
 */
require.main.require('testMocha/javascript/testInfrastructure');

//noinspection JSLint
var hello = srcDirRequire(__dirname, 'hello');

describe('Hello', function () {
    describe('#world()', function () {
        it('should run without error for world()', function () {
            "use strict";
            hello.world();
        });
    });
});

