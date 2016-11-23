/**
 * Created by Hey on 15 Nov 2016
 */
/*

 https://www.codewars.com/kata/functional-lists/train/javascript

 In this kata, you will create a simple, immutable, singly-linked list.

 Most list implementations use mutable nodes. Mutability brings with it a whole host of problems (especially in threaded environments, but even just with state saved and shared in multiple places). When you shift to immutable nodes, you gain a new ability to reason about things. If you have a list, it will never contain different things than it does at the moment.

 However, when dealing with immutable nodes, one has to take special steps to try to maintain efficiency. For example, to add a node to the beginning of a list, you don't want to have to duplicate the whole list. You want to be able to share as many nodes of the list as possible between the original list and the newly generated list (while still being a singly-linked list).

 There are two classes involved here: EmptyList and ListNode. Each of these should support the following operations: toString(), isEmpty(), length(), push(), remove(), and append(). If isEmpty() returns false, then the following two methods should also be supported: head() and tail().

 var list0 = new EmptyList();        // => "()"
 var list1 = list0.push(3);          // => "(3)"
 var list2 = list1.push(2);          // => "(2 3)"
 var list3 = list2.push(1);          // => "(1 2 3)"
 var list13 = list1.append(list3);   // => "(3 1 2 3)"

 list13.head()    // => 3
 list13.tail()    // => list3

 list1 instanceof ListNode
 list1.tail() instanceof EmptyList

 Diagramatically, this is what list3 above should look like:

 Or, if you prefer JSON:

 { value: 1,
 next: { value: 2,
 next: { value: 3,
 next: {} } } }

 The EmptyList constructor takes no arguments. The ListNode constructor takes a value and a next parameter. The value parameter can be anything. The next parameter will be either a ListNode instance or an EmptyList instance representing the rest of the list after this node.

 The toString() method should return "()" for an EmptyList and "(1 2 3)" for a list containing the numbers 1, 2, and 3.

 The isEmpty() method will return true for EmptyList instances and false for the ListNode instances.

 The length() method will return the number of non-EmptyList nodes in a list.

 The orig.push(x) method will create a list whose first node contains the value x and where the new list shares as many nodes as possible with orig (while still being a singly-linked list).

 The orig.remove(x) method will create a list where all nodes with value x are removed and which shares as many nodes as possible with orig (while still being a singly-linked list).

 The orig.append(other) method will create a list which is a concatenation of all nodes in orig and all nodes in other and which shares as many nodes as possible with orig and other (while still being a singly-linked list).

 If orig.isEmpty() returns false, then orig.head() should return the value in the first node of the list. The orig.tail() should return the sublist of orig containing all of the nodes except the first node in orig.

 * */

// Given
// function List() {}
//
// function EmptyList() {}
// EmptyList.prototype = new List();
// EmptyList.prototype.constructor = EmptyList;
//
// EmptyList.prototype.toString = function() { /* implement this */ };
// EmptyList.prototype.isEmpty = function() { /* implement this */ };
// EmptyList.prototype.length = function() { /* implement this */ };
// EmptyList.prototype.push = function(x) { /* implement this */ };
// EmptyList.prototype.remove = function(x) { /* implement this */ };
// EmptyList.prototype.append = function(xs) { /* implement this */ };
//
// function ListNode(value, next) { /* implement this */ }
// ListNode.prototype = new List();
// ListNode.prototype.constructor = ListNode;
// ListNode.prototype.isEmpty = function() { /* implement this */ };
//
// ListNode.prototype.toString = function() { /* implement this */ };
//
// ListNode.prototype.head = function() { /* implement this */ };
// ListNode.prototype.tail = function() { /* implement this */  };
// ListNode.prototype.length = function() { /* implement this */ };
// ListNode.prototype.push = function(x) { /* implement this */ };
// ListNode.prototype.remove = function(x) { /* implement this */ };
// ListNode.prototype.append = function(xs) { /* implement this */ };


var iterateList = function (list, callBack) {
    "use strict";
    if (typeof callBack === 'undefined') {
        callBack = function () {
        };
    }
    var curr = list;
    while (!curr.isEmpty()) {
        callBack(curr);
        curr = curr.getNext();
    }
};

var pushArrayToBeginningOfList = function (valArray, xs) {
    "use strict";
    valArray.reverse();
    var ans = xs;
    valArray.forEach(function (val) {
        ans = ans.push(val);
    });
    return ans;
};

function List() {
}

function EmptyList() {
}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function () { /* implement this */
    "use strict";
    return '()';
};
EmptyList.prototype.isEmpty = function () { /* implement this */
    "use strict";
    return true;
};
EmptyList.prototype.length = function () { /* implement this */
    "use strict";
    return 0;
};
EmptyList.prototype.push = function (x) { /* implement this */
    "use strict";
    return new ListNode(x, this);
};
EmptyList.prototype.remove = function (x) { /* implement this */
    "use strict";
    return this;
};
EmptyList.prototype.append = function (xs) { /* implement this */
    "use strict";
    return xs;
};

function ListNode(value, next) { /* implement this */
    "use strict";
    // var listValue = value, listNext = next;
    this.getValue = function () {
        return value;
    };
    this.getNext = function () {
        return next;
    };
    return this;
}
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.isEmpty = function () { /* implement this */
    "use strict";
    return false;
};

ListNode.prototype.toString = function () { /* implement this */
    "use strict";
    var str = "";
    iterateList(this, function (curr) {
        str += (str === "" ? curr.getValue() : (" " + curr.getValue()));
    });
    return "(" + str + ")";
    /*
     var curr = this, str = "(";
     while (!curr.isEmpty()) {
     str = str + " " + curr.getValue();
     curr = curr.getNext();
     }
     return str + ")";*/
};

ListNode.prototype.head = function () { /* implement this */
    "use strict";
    // if (!this.isEmpty()) {
    //     if (this.getNext().isEmpty()) {
    //         return this;
    //     }
    //     return new ListNode(this.getValue(), new EmptyList());
    // }
    if (!this.isEmpty()) {
        return this.getValue();
    }
};
ListNode.prototype.tail = function () { /* implement this */
    "use strict";
    if (!this.isEmpty()) {
        return this.getNext();
    }
};
ListNode.prototype.length = function () { /* implement this */
    "use strict";
    var size = 0;
    iterateList(this, function (curr) {
        size++;
    });
    return size;
};
ListNode.prototype.push = function (x) { /* implement this */
    "use strict";
    return new ListNode(x, this);
};
ListNode.prototype.remove = function (x) { /* implement this */
    "use strict";
    var last = this, valArray = [], temp = [], isEmpty = true, removed = false;
    iterateList(this, function (curr) {
        var currVal = curr.getValue();
        if (currVal === x) {
            removed = true;
            last = curr.getNext();
            valArray = valArray.concat(temp);
            temp = [];
        } else {
            isEmpty = false;
            temp.push(currVal);
        }
    });

    if (isEmpty) {
        // return new EmptyList();
        return this.getNext();
    }

    if (!removed) {
        return last;
    } else {
        return pushArrayToBeginningOfList(valArray, last);
    }
};
ListNode.prototype.append = function (xs) { /* implement this */
    "use strict";
    var valArray = [];
    iterateList(this, function (curr) {
        valArray.push(curr.getValue());
    });
    return pushArrayToBeginningOfList(valArray, xs);
};

module.exports = EmptyList;