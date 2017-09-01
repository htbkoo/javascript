function Node() {
    "use strict";
    this.asJSON = function(){
        return {
            name: "Root",
            children: []
        }
    };
    return this;
}

Node.createNode = function () {
    "use strict";
    return new Node();
};

module.exports = Node;