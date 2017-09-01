var chai = require("chai");

var srcDirRequire = require.main.require('src/testMocha/testInfrastructure');
var jsonTransformer = srcDirRequire(__dirname, "jsonTransformer");

var createNode = jsonTransformer.createNode;

describe("jsonTransformer", function () {
    "use strict";
    it("should transform json into node", function () {
        //    given
        //    when
        var node = createNode();

        //    then
        chai.expect(node.asJSON()).to.deep.equal({
            name: "Root",
            children: []
        })
    });
});