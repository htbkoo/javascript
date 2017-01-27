/**
 * Created by Hey on 17 Jan 2017
 */


var Viewer = Viewer || ((typeof require !== "undefined") ? require("./wikiViewer") : {});
var WIKI_HOST_URL = "https://en.wikipedia.org";
var WIKI_RANDOM_ARTICLE_URL = WIKI_HOST_URL + "/wiki/Special:Random";

(
    function (Viewer) {
        "use strict";
        $('#random').click(function () {
            Viewer.randomArticle();
            window.open(WIKI_RANDOM_ARTICLE_URL);
        });
        $('#search').click(function () {
            var keyword = $("#query").val();
            $.getJSON(Viewer.newSearchUrlBuilder().withQuery(keyword).build(), {}, function (data) {
                Viewer.parseSearchResponse(data);
            });
        });
    }(Viewer)
);