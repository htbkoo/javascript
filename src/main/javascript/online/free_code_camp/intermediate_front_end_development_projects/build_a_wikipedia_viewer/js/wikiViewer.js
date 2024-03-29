/**
 * Created by Hey on 17 Jan 2017
 */
// Unfortunately still have to pollute the global namespace myself if not using webpack/requireJS
var Viewer = (function () {
    "use strict";
    function SearchUrlBuilder() {
        var params = {};
        var buildThis = this;

        this.withQuery = function (query) {
            params.gsrsearch = query;
            return buildThis;
        };

        this.build = function () {
            var additionalPart = Object.keys(params).reduce(function (str, key) {
                return str + "&" + key + "=" + params[key];
            }, "");

            return "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&generator=search&callback=?" + additionalPart;
        };
        return this;
    }

    var exports = {
        "parseSearchResponse": function (data) {
            var pages = data.query.pages;
            return Object.keys(pages)
                .map(function (id) {
                    return pages[id];
                }).sort(function (a, b) {
                    return a.index - b.index;
                });
        },
        "randomArticle": function () {
            // TODO: won't work until CORS is fixed
            // $.get({
            //     url: WIKI_RANDOM_ARTICLE_URL,
            //     success: function (data, status){
            //         console.log(data);
            //     }
            // });
        },
        "newSearchUrlBuilder": function () {
            return new SearchUrlBuilder();
        }
    };

    if (typeof module !== "undefined") {
        module.exports = exports;
    }

    return exports;
}());