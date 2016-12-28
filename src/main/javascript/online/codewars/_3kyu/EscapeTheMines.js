/**
 * Created by Hey on 29 Dec 2016
 */
/*

 https://www.codewars.com/kata/escape-the-mines/train/javascript

 A poor miner is trapped in a mine and you have to help him to get out !

 Only, the mine is all dark so you have to tell him where to go.

 In this kata, you will have to implement a method solve(map, miner, exit) that has to return the path the miner must take to reach the exit as an array of moves, such as : ['up', 'down', 'right', 'left']. There are 4 possible moves, up, down, left and right, no diagonal.

 map is a 2-dimensional array of boolean values, representing squares. false for walls, true for open squares (where the miner can walk). It will never be larger than 5 x 5. It is laid out as an array of columns. All columns will always be the same size, though not necessarily the same size as rows (in other words, maps can be rectangular). The map will never contain any loop, so there will always be only one possible path. The map may contain dead-ends though.

 miner is the position of the miner at the start, as an object made of two zero-based integer properties, x and y. For example {x:0, y:0} would be the top-left corner.

 exit is the position of the exit, in the same format as miner.

 Note that the miner can't go outside the map, as it is a tunnel.

 Let's take a pretty basic example :

 var map = [[true, false],
 [true, true]];

 solve(map, {x:0,y:0}, {x:1,y:1});
 // Should return ['right', 'down']

 * */

module.exports = function solve(map, miner, exit) {
    "use strict";
    // DONE
    function areTwoCoordinatesSame(coors1, coors2) {
        return (coors1.x === coors2.x) && (coors1.y === coors2.y);
    }

    function isCoordinatesValid(coors) {
        return (coors.x >= 0) && (coors.x <= map.length - 1) && (coors.y >= 0) && (coors.y <= map[0].length - 1) && (map[coors.x][coors.y]);
    }

    function coordinatesToString(coors) {
        return "[x:" + coors.x + ", y:" + coors.y + "]";
    }

    function BreadthFirstSearchWithBackTracking() {
        var path;
        function addToSearchIfNotSearched(delta) {
            var newCoors = {x: (coors.x + delta.x), y: (coors.y + delta.y)};
            if (!(coordinatesToString(newCoors) in searched)) {
                if (isCoordinatesValid(newCoors)) {
                    var newPath = path.slice();
                    newPath.push(delta.path);
                    toSearch.push({"coors": newCoors, "path": newPath});
                }
            }
        }

        while (toSearch.length > 0) {
            var obj = toSearch.shift();
            var coors = obj.coors;
            path = obj.path;
            if (areTwoCoordinatesSame(coors, exit)) {
                return path;
            }
            searched[coordinatesToString(coors)] = "";

            [
                {x: -1, y: 0, path: "left"},
                {x: 1, y: 0, path: "right"},
                {x: 0, y: -1, path: "up"},
                {x: 0, y: 1, path: "down"}
            ].forEach(addToSearchIfNotSearched);
        }

        return [];
    }

    var toSearch = [];
    var searched = {};

    toSearch.push({"coors": miner, "path": []});
    return BreadthFirstSearchWithBackTracking();
};