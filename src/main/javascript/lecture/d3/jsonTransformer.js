function isObjectEmpty(obj) {
    "use strict";
    return Object.keys(obj).length === 0;
}

function checkExists(param, key) {
    if (!(key in param)) {
        throw new Error(key + " should be in param");
    }
}

function checkIsArray(probableArray) {
    if (!(Array.isArray(probableArray))) {
        throw new Error("should be an Array");
    }
}

function Node(name) {
    "use strict";
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

    this.addPrimitiveChildWithPath = function (value, path) {
        checkIsArray(path);
        if (path.length > 0) {
            var key = path[0];
            if (path.length === 1) {
                primitiveChildren[key] = value;
            } else {
                children[key].addPrimitiveChildWithPath(value, path.slice(1));
            }
        }
    };

    this.addJsonChildWithPath = function (json, path) {
        checkIsArray(path);
        if (path.length > 0) {
            var key = path[0];
            if (!(key in children)) {
                children[key] = new Node(json[key]);
            }
            children[key].addJsonChildWithPath(json, path.slice(1));
        }
    };

    return this;
}

module.exports = Node;