var chai = require("chai");

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Node = srcDirRequire(__dirname, "d3JsonBuilder");

describe("d3JsonBuilder", function () {
    "use strict";
    describe("toD3Json", function () {
        describe("toD3Json", function () {
            it("should be able to build vanilla d3 json for only root case", function () {
                //    given
                var node = new Node("Root");

                //    when
                var json = node.toD3Json().build();

                //    then
                chai.expect(json).to.deep.equal({
                    name: "Root"
                })
            });

            xit("should be able to build vanilla d3 json, i.e. size on leaf nodes, for size 2", function () {
                //    given
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId"]);
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId2"]);

                //    when
                var json = node.toD3Json().build();

                //    then
                chai.expect(json).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                size: 2,
                            }]
                        }]
                    }]
                })
            });

            xit("should be able to build vanilla d3 json, i.e. size on leaf nodes, for all size 1", function () {
                //    given
                var node = new Node("Root");
                addDefaultChildToNode(node, ["asset", "subAsset", "title", "pubId"]);
                addDefaultChildToNode(node, ["asset", "subAsset", "title2", "pubId"]);

                //    when
                var json = node.toD3Json().build();

                //    then
                chai.expect(json).to.deep.equal({
                    name: "Root",
                    children: [{
                        name: "asset",
                        children: [{
                            name: "subAsset",
                            children: [{
                                name: "title",
                                size: 1
                            }, {
                                name: "title2",
                                size: 1
                            }]
                        }]
                    }]
                })
            });
        });
    });
});