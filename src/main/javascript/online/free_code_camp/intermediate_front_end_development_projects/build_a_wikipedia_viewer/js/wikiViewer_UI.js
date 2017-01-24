/**
 * Created by Hey on 17 Jan 2017
 */


var Viewer = Viewer || ((typeof require !== "undefined") ? require("./wikiViewer") : {});
var WIKI_RANDOM_ARTICLE_URL = "https://en.wikipedia.org/wiki/Special:Random";

(
    function (Viewer) {
        "use strict";
        $('#random').click(function () {
            // TODO: won't work until CORS is fixed
            // $.get({
            //     url: WIKI_RANDOM_ARTICLE_URL,
            //     success: function (data, status){
            //         console.log(data);
            //     }
            // });
            Viewer.randomArticle();
        });
    }(Viewer)
);