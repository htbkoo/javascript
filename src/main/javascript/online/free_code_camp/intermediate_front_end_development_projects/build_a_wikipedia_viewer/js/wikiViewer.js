/**
 * Created by Hey on 17 Jan 2017
 */
// Unfortunately still have to pollute the global namespace myself if not using webpack/requireJS
var Viewer = (function () {
    "use strict";

    var exports = {
        "randomArticle": function(){

        }
    };

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());