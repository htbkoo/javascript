function isObjectEmpty(obj) {
    "use strict";
    return Object.keys(obj).length === 0;
}

function Node(name) {
    "use strict";
    // var children = [];
    var children = {};
    var primitiveChildren = {};

    this.childrenAsJson = function () {
        var copyOfChildren = Object.keys(children).map(function (childKey) {
            return children[childKey].asJSON();
        });
        if (!isObjectEmpty(primitiveChildren)) {
            copyOfChildren.push(primitiveChildren);
        }
        return copyOfChildren
    };

    this.asJSON = function () {
        return {
            name: name,
            children: this.childrenAsJson()
        }
    };

    this.addPrimitiveChild = function (key, value) {
        primitiveChildren[key] = value;
    };

    this.addJsonChildWithPath = function (param) {
        if (!('path' in param) || !('json' in param)) {
            throw new Error("path and json should be in param");
        }
        var path = param.path;
        if (!(Array.isArray(path))) {
            throw new Error("param.path should be an Array");
        }
        if (path.length > 0) {
            var key = path[0];
            if (!(key in children)) {
                children[key] = new Node(param.json[key]);
            }
            children[key].addJsonChildWithPath({
                path: path.slice(1),
                json: param.json
            });
        }
    };

    return this;
}

Node.createNode = function (optionalParam) {
    "use strict";
    return (typeof optionalParam === "undefined") ? new Node("Root") : nodeWithParam(optionalParam);
};

module.exports = Node;

function nodeWithParam(param) {
    "use strict";
    var name = "name" in param ? name : "Root";
    var node = new Node(name);
    if ('child' in param) {

    }
    return node;
}