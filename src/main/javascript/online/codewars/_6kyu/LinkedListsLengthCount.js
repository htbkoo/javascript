/**
 * Created by Hey on 18 Aug 2016
 */

/*

 http://www.codewars.com/kata/linked-lists-push-and-buildonetwothree/train/javascript

 Linked Lists - Length & Count

 Implement Length() to count the number of nodes in a linked list.

 length(null) === 0
 length(1 -> 2 -> 3 -> null) === 3

 Implement Count() to count the occurrences of an integer in a linked list.

 count(null, 1) === 0
 count(1 -> 2 -> 3 -> null, 1) === 1
 count(1 -> 1 -> 1 -> 2 -> 2 -> 2 -> 2 -> 3 -> 3 -> null, 2) === 4

 I've decided to bundle these two functions within the same Kata since they are both very similar.

 The push() and buildOneTwoThree() functions do not need to be redefined.

 Related Kata in order of expected completion (increasing difficulty):
 Linked Lists - Push & BuildOneTwoThree
 Linked Lists - Length & Count
 Linked Lists - Get Nth Node
 Linked Lists - Insert Nth Node
 Linked Lists - Sorted Insert
 Linked Lists - Insert Sort
 Linked Lists - Append
 Linked Lists - Remove Duplicates
 Linked Lists - Move Node
 Linked Lists - Move Node In-place
 Linked Lists - Alternating Split
 Linked Lists - Front Back Split
 Linked Lists - Shuffle Merge
 Linked Lists - Sorted Merge
 Linked Lists - Merge Sort
 Linked Lists - Sorted Intersect
 Linked Lists - Iterative Reverse
 Linked Lists - Recursive Reverse

 Inspired by Stanford Professor Nick Parlante's excellent Linked List teachings.

 * */

function Node(data) {
    "use strict";
    this.data = data;
    this.next = null;
}

function iterateAndCount(head, predicate) {
    "use strict";
    var c = 0;
    while (head !== null) {
        if (predicate(head)) {
            ++c;
        }
        head = head.next;
    }
    return c;
}

function length(head) {
    "use strict";
    // Your code goes here.
    return iterateAndCount(head, function () {
        return true;
    });
}

function count(head, data) {
    "use strict";
    // Your code goes here.
    return iterateAndCount(head, function (curNode) {
        return data === curNode.data;
    });
}

exports.Node = Node;
exports.length = length;
exports.count = count;
