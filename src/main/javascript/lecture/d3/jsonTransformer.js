function isObjectEmpty(obj) {
    "use strict";
    return Object.keys(obj).length === 0;
}

function checkExists(param, key) {
    if (!(key in param)) {
        throw new Error(key + " should be in param");
    }
}

function checkPathIsArray(param) {
    if (!(Array.isArray(param.path))) {
        throw new Error("param.path should be an Array");
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

    this.addPrimitiveChildWithPath = function (key, value) {
        primitiveChildren[key] = value;
    };

    this.addJsonChildWithPath = function (param) {
        checkExists(param, 'json');
        checkExists(param, 'path');
        checkPathIsArray(param);

        var path = param.path;
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

module.exports = Node;