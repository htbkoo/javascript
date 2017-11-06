function isObjectEmpty(obj) {
    "use strict";
    return Object.keys(obj).length === 0;
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
    var nodeThis = this;

    this.childrenAsJson = function () {
        var copyOfChildren = Object.keys(children).reduce(function (prev, childKey) {
            return prev.concat(Object.keys(children[childKey]).map(function (key) {
                return children[childKey][key].asJson();
            }));
        }, []);
        if (!isObjectEmpty(primitiveChildren)) {
            copyOfChildren.push(primitiveChildren);
        }
        return copyOfChildren
    };

    this.asJson = function () {
        var json = {
            name: name,
        };
        var childrenAsJson = this.childrenAsJson();
        if (childrenAsJson.length > 0) {
            json['children'] = this.childrenAsJson();
        }
        return json;
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
                children[key] = {};
            }
            if (!(json[key] in children[key])) {
                children[key][json[key]] = new Node(json[key]);
            }
            children[key][json[key]].addJsonChildWithPath(json, path.slice(1));
        }
    };

    this.hasChildren = function () {
        return Object.keys(children).length > 0;
    };

    this.toD3Json = function () {
        return {
            build: function () {
                var json = nodeThis.asJson();
                var stack = [json];
                var pointer;
                while (stack.length > 0) {
                    pointer = stack.pop();
                    if (('children' in pointer)) {
                        if (pointer.children.some(function (child) {
                                return 'children' in child;
                            })
                        ) {
                            pointer.children.forEach(function (child) {
                                stack.push(child);
                            })
                        } else {
                            pointer.size = pointer.children.length;
                            delete pointer.children;
                        }
                    }
                }

                return json;
            }
        }
    };

    return this;
}

module.exports = Node;