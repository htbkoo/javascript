/**
 * Created by Hey on 30/12/15
 */
"use strict";

var foo = {};

foo.method1 = function(){
    "use strict";
    console.log("foo function: " + this);

    this.test = function (){
        "use strict";
        console.log(this);

    };

    var test2 = function(){
        "use strict";
        console.log(this);
    };

    (function someMethod(){
        console.log(1);
    }());

    someMethod();
    test2();
    //var x = test2;
    this.test();
    //this.test.call(this);
};
//var x=0;
//var b;
foo.method1.call(foo);
foo.method1();