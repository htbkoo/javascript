/**
 * Created by Hey on 12 Nov 2016
 */

var srcDirRequire = require('testMocha/testInfrastructure');
var Test = require('chai');

var parseCSV = srcDirRequire(__dirname, 'ComplexCSVParser');

describe("ComplexCSVParser", function () {
    "use strict";
    describe("Example Test Cases", function () {
        it("should handle simple inputs", function () {
            var input = "1,2,3\n4,5,6";
            var output = [['1', '2', '3'], ['4', '5', '6']];
            Test.expect(parseCSV(input)).to.have.deep.members(output);
        });
        it("should handle quoted fields", function () {
            var input = "1,\"two was here\",3\n4,5,6";
            var output = [['1', 'two was here', '3'], ['4', '5', '6']];
            Test.expect(parseCSV(input)).to.have.deep.members(output);
        });
        it("should handle alternate separators", function () {
            var input = "1\t2\t3\n4\t5\t6";
            var output = [['1', '2', '3'], ['4', '5', '6']];
            Test.expect(parseCSV(input, '\t')).to.have.deep.members(output);
        });
    });
    describe("Test Cases in description", function () {
        it("should handle quoted that spread across multiple lines", function () {
            var input = "one,\"two wraps\nonto \"\"two\"\" lines\",three\n4,,6";
            var output = [['one', 'two wraps\nonto "two" lines', 'three'], ['4', '', '6']];
            Test.expect(parseCSV(input)).to.have.deep.members(output);

        });
    });
    describe("Test Cases in submission", function () {
        it(" should handle using a backslash (\\) as the quote", function () {
            var input = '\\a \\\\string\\\\ using \\\\ as the quote\\.\n\\multi\nline\\.\n1.2.\\3.4\\';
            var output = [["a \\string\\ using \\ as the quote", ''], ["multi\nline", ''], ['1', '2', '3.4']];
            Test.expect(parseCSV(input, '.', '\\')).to.have.deep.members(output);

        });
    });
});