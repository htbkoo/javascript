/**
 * Created by Hey on 31 Jul 2016
 */

var hello = require('./hello');
hello.world();

var Hello2 = require('./hello2');
var hello2 = new Hello2();
hello2.world();
hello2.world();
hello2.count = 0;
hello2.world();
hello2.world();

// It is just IntelliJ can't map the function resetCount in Hello2
//noinspection JSUnresolvedFunction
hello2.resetCount();
hello2.world();