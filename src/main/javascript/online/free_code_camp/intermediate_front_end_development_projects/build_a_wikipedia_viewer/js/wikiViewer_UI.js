/**
 * Created by Hey on 17 Jan 2017
 */


var Viewer = Viewer || ((typeof require !== "undefined") ? require("./wikiViewer") : {});
var WIKI_HOST_URL = "https://en.wikipedia.org";
var WIKI_RANDOM_ARTICLE_URL = WIKI_HOST_URL + "/wiki/Special:Random";

(
    function (Viewer) {
        "use strict";
        var $resultDisplay = $("#resultDisplay");

        $("#query").keyup(function(event){
            if(event.key==="Enter"){
                $('#search').click();
                event.preventDefault();
            }
        });

        $('#random').click(function () {
            Viewer.randomArticle();
            window.open(WIKI_RANDOM_ARTICLE_URL);
        });
        $('#search').click(function () {
            var keyword = $("#query").val();
            if (keyword !== "") {
                $.getJSON(Viewer.newSearchUrlBuilder().withQuery(keyword).build(), {}, function (data) {
                    var searchResults = Viewer.parseSearchResponse(data);

                    setResultDisplayToListGroup();

                    searchResults.forEach(function (item) {
                        addSearchResult(item);
                    });
                });
            }
        });

        function setResultDisplayToListGroup() {
            $resultDisplay.html("");
            $resultDisplay.append($("<div class='list-group'></div>"));
        }

        function addSearchResult(item) {
            var $a_item = $('<a href="https://en.wikipedia.org/?curid=' + item.pageid + '" class="list-group-item" target="_blank"></a>');
            $a_item.append($('<h4 class="list-group-item-heading">' + item.title + '</h4>'));
            $a_item.append($('<p class="list-group-item-text">' + item.extract + '</p>'));

            $resultDisplay.find(".list-group").append($a_item);
        }

    }(Viewer)
);