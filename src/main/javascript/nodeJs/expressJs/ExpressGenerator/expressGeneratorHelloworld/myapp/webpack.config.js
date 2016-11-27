/**
 * Created by Hey on 27 Nov 2016
 */

var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        "public/js/quotes":['./dev_public/js/quotes.js'],
        "test/unit/quotes.Test":'./dev_public/js/test_unit/quotes.Test.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            '$': 'jquery'
        })
    ],
    debug: true
};