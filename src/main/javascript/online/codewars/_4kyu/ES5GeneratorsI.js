/**
 * Created by Hey on 31 Oct 2016
 */
/*

 https://www.codewars.com/kata/es5-generators-i/train/javascript

 This is the first part of three (part2, part3).

 Generators and Iterators are new ES6 features that will allow things like this:

 function* fibonacci() {
 let [prev, curr] = [0, 1];
 for (;;) {
 [prev, curr] = [curr, prev + curr];
 yield curr;
 }
 }

 Using them in this way, we can do amazing things:

 let seq = fibonacci();
 print(seq.next()); // 1
 print(seq.next()); // 2
 print(seq.next()); // 3
 print(seq.next()); // 5
 print(seq.next()); // 8

 This is powerful, but until a few months later, ES6 will not be born.

 The goal of this kata is to implement pseudo-generators with ES5.

 The first thing to do is to implement the generator function:

 function generator(sequencer) {
 ...
 }

 generator(sequencer[, arg1, arg2, ...]) receives a sequencer function to generate the sequence and returns and object with a next() method. When the next() method is invoked, the next value is generated. The method could receive as well optional arguments to be passed to the sequencer function.

 This is an example of a dummy sequencer:

 function dummySeq() {
 return function() {
 return "dummy";
 };
 }

 To test generator(), you could use dummySeq() in this way:

 var seq = generator(dummySeq);
 seq.next(); // 'dummy'
 seq.next(); // 'dummy'
 seq.next(); // 'dummy'
 ....

 When you're done, you should implement the following generators (I think the functions are self explanatory):

 function factorialSeq() {...} // 1, 1, 2, 6, 24, ...
 function fibonacciSeq() {...} // 1, 1, 2, 3, 5, 8, 13, ...
 function rangeSeq(start, step) {...} // rangeSeq(1, 2)  -> 1, 3, 5, 7, ...
 function primeSeq() {...} // 2, 3, 5, 7, 11, 13, ...
 partialSumSeq(1, 3, 7, 2, 0) {...} // 1, 4, 11, 13, 13, end

 You can use any of them in the same way:

 var seq = generator(factorialSeq);
 seq.next(); // !0 = 1
 seq.next(); // !1 = 1
 seq.next(); // !2 = 2
 seq.next(); // !3 = 6
 seq.next(); // !4 = 24
 ...

 There are some sequences which are infinite and others are not. For example:

 primeSeq: Is infinite
 partialSumSeq: Is limited to the passed values.

 When the sequence is done (in finite sequences), if you call seq.next() again, it should produce an error.

 Good luck!

 * */

function generator(sequencer) {
    "use strict";
    var nextValFunction = sequencer.apply(null, Array.prototype.slice.call(arguments, 1));
    return {
        'next': function () {
            return nextValFunction();
        }
    };
}

function dummySeq() {
    "use strict";
    return function () {
        return "dummy";
    };
}

function factorialSeq() {
    "use strict";
    var val = 1, pointer = 0;
    return function () {
        if (++pointer === 1) {
            return pointer;
        }
        return val = val * (pointer - 1); // jshint ignore:line
    };
}

function fibonacciSeq() {
    "use strict";
    var prev = 0, cur = 1;
    return function () {
        cur = cur + prev;
        prev = cur - prev;
        return (prev === 0) ? 1 : prev;
    };
}

function rangeSeq(start, step) {
    "use strict";
    var cur = start - step;
    return function () {
        return cur = cur + step; // jshint ignore:line
    };
}

function primeSeq() {
    "use strict";
    var primeList = [];

    function isPrime(n) {
        var ans = !primeList.some(function (val) {
            return n % val === 0;
        });
        primeList.push(n);
        return ans;
    }

    var cur = 1;
    return function () {
        while (!isPrime(++cur)) { // jshint ignore:line
        }
        return cur;
    };
}

function partialSumSeq() {
    "use strict";
    var cur = 0, argsAsArray = Array.prototype.slice.call(arguments);
    return function () {
        if (argsAsArray.length === 0) {
            throw new Error("Sequence has ended");
        }
        cur += argsAsArray[0];
        argsAsArray = argsAsArray.slice(1);
        return cur;
    };
}

module.exports = {
    "generator": generator,
    "dummySeq": dummySeq,
    "factorialSeq": factorialSeq,
    "fibonacciSeq": fibonacciSeq,
    "rangeSeq": rangeSeq,
    "primeSeq": primeSeq,
    "partialSumSeq": partialSumSeq
};