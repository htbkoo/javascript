/**
 * Created by Hey on 31 Jul 2016
 * 
 * ---
 * 
 * Test infrastructure for mocha tests
 */

var srcDirRequire = function (dirName, name) {
    'use strict';
    var main_dir_name = "main", test_dir_name = "testMocha";
    if (process.env.main_dir_name !== undefined) {
        main_dir_name = process.env.main_dir_name;
    }
    if (process.env.test_dir_name !== undefined) {
        test_dir_name = process.env.test_dir_name;
    }
    return require(dirName.replace(test_dir_name, main_dir_name) + '\\' + name);
};

module.exports = srcDirRequire;