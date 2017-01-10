/**
 * Created by Hey on 8 Jan 2017=
 */


var TicTacToe = TicTacToe || ((typeof require !== "undefined") ? require("./ticTacToe") : {});

(
    function (TicTacToe) {
        "use strict";
        var ALL_ALERT_CLASSES = "alert-success alert-info alert-warning alert-danger";
        var MODAL_OPTIONS = {
            "backdrop": "static",
            "keyboard": false
        };
        var ANNOUNCEMENT_CLASS = {
            "O": "alert-info",
            "X": "alert-success",
            "WIN": "alert-warning",
            "DRAW": "alert-danger"
        };

        var $holder = $("#holder");
        var $announcement = $("#announcement");
        var $gameOverAnnouncement = $("#gameOverAnnouncement");
        var $gameOverAnnouncement_h3 = $gameOverAnnouncement.find("h3");
        var $startGameModal = $('#startGameModal');
        var $gameOverModal = $('#gameOverModal');
        var $btnStartGame = $('#btn_startGame');
        var $btnRestart = $('#btn_restart');
        var ticTacToe;
        var isPlaying = false;

        function showStartGameModal() {
            $startGameModal.modal(MODAL_OPTIONS);
        }

        function initializeBoard() {
            function cleanAllCellClass() {
                var $td_divs = $('td div');
                $td_divs.removeClass("O");
                $td_divs.removeClass("X");
            }

            cleanAllCellClass();
        }

        function setUpAnnouncementClass($a, announcement_class) {
            $a.removeClass(ALL_ALERT_CLASSES);
            $a.addClass(announcement_class);
        }

        function updateUIForTurn() {
            $announcement.text(ticTacToe.getCurrentTurn() + "'s Turn!");
            setUpAnnouncementClass($announcement, ANNOUNCEMENT_CLASS[ticTacToe.getCurrentTurn()]);
        }

        function restart() {
            initializeBoard();
            showStartGameModal();
        }

        (function setUpOnce() {
            function createTable() {
                var intRange3 = new Array(3).fill(0);

                $holder.append('<table id="gameBoard" align="center"><tbody></tbody></table>');

                intRange3.forEach(function () {
                    var $row = $("<tr></tr>");
                    intRange3.forEach(function () {
                        $row.append("<td><div></div></td>");
                    });
                    $row.appendTo($holder.find("tbody"));
                });
            }

            function setUpButtonControl() {
                $btnStartGame.click(function () {
                    var $checkedRadios = $("input:radio:checked");
                    var startsWith = "O", playWith = "Friend";
                    $checkedRadios.each(function () {
                        var $radio = $(this);
                        var id = $radio.attr("id");
                        switch ($radio.attr("name")) {
                            case "startsWith":
                                startsWith = id.slice(-1);
                                break;
                            case "playsWith":
                                playWith = id.charAt(0).toUpperCase() + id.slice(1);
                                break;
                        }
                    });

                    ticTacToe = TicTacToe["newBoardStartsWith" + startsWith]()["vs" + playWith]();
                    isPlaying = true;
                    updateUIForTurn();
                    $startGameModal.modal('hide');
                });

                $btnRestart.click(function () {
                    $gameOverModal.modal('hide');
                    restart();
                });
            }

            function setUpCellClickControl() {
                /*
                 results = {
                 valid:
                 winner:
                 drawn:
                 aiPick
                 }
                 * */

                function handleResults(results) {
                    function isWinnerOut() {
                        return typeof results.winner !== "undefined";
                    }

                    if (results.valid) {
                        var $tbody = $("#holder").find("tbody");
                        var currentTurn = ticTacToe.getCurrentTurn();
                        var opponent = ticTacToe.getCurrentTurn() === "O" ? "X" : "O";
                        if (typeof results.aiPick !== "undefined") {
                            $($($tbody.find("tr")[results.aiPick[1]]).find("td")[results.aiPick[0]]).find("div").addClass(opponent);
                        } else {
                            if (!isWinnerOut() && !results.drawn) {
                                currentTurn = opponent;
                            }
                        }
                        $($($tbody.find("tr")[results.playerPick[1]]).find("td")[results.playerPick[0]]).find("div").addClass(currentTurn);
                        updateUIForTurn();
                    }

                    function handleGameOver(text, announcementClass) {
                        [
                            $announcement,
                            $gameOverAnnouncement_h3
                        ].forEach(function ($a) {
                            $a.text(text);
                        });
                        [
                            $announcement,
                            $gameOverAnnouncement
                        ].forEach(function ($a) {
                            setUpAnnouncementClass($a, announcementClass);
                        });
                        $gameOverModal.modal(MODAL_OPTIONS);
                    }

                    if (isWinnerOut()) {
                        handleGameOver(results.winner + " Won!", ANNOUNCEMENT_CLASS.WIN);
                    } else if (results.drawn) {
                        handleGameOver("Draw game!", ANNOUNCEMENT_CLASS.DRAW);
                    }
                }

                $('td div').click(function () {
                    if (isPlaying) {
                        // From http://stackoverflow.com/questions/788225/table-row-and-column-number-in-jquery
                        // Ref: http://stackoverflow.com/a/5225594
                        var $div = $(this);
                        var myCol = $div.closest('td').index();
                        var myRow = $div.closest('tr').index();
                        var playerPick = [myCol, myRow];
                        console.log(myCol + ", " + myRow);

                        var results = ticTacToe.tryPlacingAt(playerPick);
                        results.playerPick = playerPick;
                        handleResults(results);
                    }
                });
            }

            createTable();
            setUpButtonControl();
            setUpCellClickControl();
            restart();
        }());
    }(TicTacToe)
);