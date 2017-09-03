var chai = require("chai");

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Node = srcDirRequire(__dirname, "jsonTransformer");

var createNode = Node.createNode;

describe("jsonTransformer", function () {
    "use strict";

    describe("Node", function () {
        describe("creation", function () {
            it("should be able to crete node and get asJSON", function () {
                //    given
                //    when
                var node = new Node("");

                //    then
                chai.expect(node.asJson()).to.deep.equal({name: ""})
            });
        });

        describe("getChildren/asJSON", function () {
            it("should be able to get copy of children", function () {
                //    given
                //    when
                var node = new Node("");
                var children = node.childrenAsJson();
                chai.expect(children).to.be.an('array').that.is.empty;
                children.push(1);

                //    then
                chai.expect(node.childrenAsJson()).to.be.an('array').that.is.empty;
            });
        });

        describe("primitive children", function () {
            it("should be able to create node with 1 primitive child and get asJSON", function () {
                //    given
                //    when
                var node = new Node("");
                node.addPrimitiveChildWithPath(200, ["size"]);

                //    then
                chai.expect(node.asJson()).to.deep.equal({
                    name: "",
                    children: [{
                        size: 200
                    }]
                })
            });
        });

        describe("node children", function () {
            it("should be able to crete node and addJsonChildWithPath", function () {
                //    given
                //    when
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pub id"]);

                //    then
                chai.expect(node.asJson()).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                children: [{
                                    name: "pub id"
                                }]
                            }]
                        }]
                    }]
                })
            });

            it("should be able to addJsonChildWithPath with same path", function () {
                //    given
                //    when
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pub id"]);
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pub id"]);

                //    then
                chai.expect(node.asJson()).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                children: [{
                                    name: "pub id"
                                }]
                            }]
                        }]
                    }]
                })
            });

            it("should be able to addJsonChildWithPath with different path (leaf)", function () {
                //    given
                //    when
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId"]);
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId2"]);

                //    then
                chai.expect(node.asJson()).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                children: [{
                                    name: "pubId"
                                }, {
                                    name: "pubId2"
                                }]
                            }]
                        }]
                    }]
                })
            });

            it("should be able to addJsonChildWithPath with different path (non-leaf)", function () {
                //    given
                //    when
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId"]);
                addDefaultChildToNode(node, ["asset", "subAsset", "title2", "pubId"]);

                //    then
                chai.expect(node.asJson()).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                children: [{
                                    name: "pubId"
                                }]
                            }, {
                                name: "title2",
                                children: [{
                                    name: "pubId"
                                }]
                            }]
                        }]
                    }]
                })
            });
        });
    });

    function addDefaultChildToNode(node, child) {
        node.addJsonChildWithPath(
            {
                "Asset Class": child[0],
                "Subasset Class": child[1],
                "Title": child[2],
                "Publication Id": child[3]
            },
            ["Asset Class", "Subasset Class", "Title", "Publication Id"]
        );
    }
});