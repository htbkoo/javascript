var chai = require("chai");

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var Node = srcDirRequire(__dirname, "jsonTransformer");

var createNode = Node.createNode;

describe("jsonTransformer", function () {
    "use strict";
    describe("Node", function () {
        it("should be able to crete node and get asJSON", function () {
            //    given
            //    when
            var node = new Node("");

            //    then
            chai.expect(node.asJSON()).to.deep.equal({
                name: "",
                children: []
            })
        });

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

        it("should be able to create node with 1 primitive child and get asJSON", function () {
            //    given
            //    when
            var node = new Node("");
            node.addPrimitiveChildWithPath("size", 200);

            //    then
            chai.expect(node.asJSON()).to.deep.equal({
                name: "",
                children: [{
                    size: 200
                }]
            })
        });

        it("should be able to crete node and addJsonChildWithOrder ", function () {
            //    given
            //    when
            var node = new Node("Root");
            node.addJsonChildWithPath({
                path: ["Asset Class", "Subasset Class", "Title", "Publication Id"],
                json: {
                    "Asset Class": "asset", "Subasset Class": "subAsset", "Title": "title", "Publication Id": "pub id"
                }
            });

            //    then
            chai.expect(node.asJSON()).to.deep.equal({
                name: "Root",
                children: [{
                    name: "asset",
                    children: [{
                        name: "subAsset",
                        children: [{
                            name: "title",
                            children: [{
                                name: "pub id",
                                children: []
                            }]
                        }]
                    }]
                }]
            })
        });
    });
});