/**
 * Created by Hey on 8 Jan 2017
 */


var Calculator = Calculator || ((typeof require !== "undefined") ? require("./Calculator") : {});

(
    function (Calculator) {
        "use strict";

        var $holder = $("#holder");
        var $result = $('#result');
        var $steps = $('#steps');

        function updateUI() {
            $result.val(Calculator.getResult());
            $steps.val(Calculator.getSteps());
        }

        (function setUpOnce() {
            function addButtons() {
                var intRange3 = new Array(3).fill(0);
                var BTNS_RED = {
                    "AC": "",
                    "CE": ""
                };

                [
                    ["AC", "CE", ["<", "Back"], "/"],
                    ["7", "8", "9", "-"],
                    ["4", "5", "6", "*"],
                    ["1", "2", "3", "+"],
                    ["0", ".", "=", ["+/-", "Negate"]]
                ].forEach(function (rowToAdd) {
                    var $row = $('<div class="row"></div>');
                    rowToAdd.forEach(function (buttonToAdd) {
                        if (buttonToAdd instanceof Array) {
                            buttonToAdd = "";
                        }

                        var btn_class = (buttonToAdd in BTNS_RED) ? "btn-danger" : "btn-default";
                        var $div = $('<div class="col-xs-3"><button class="btn ' + btn_class + ' calc-btn" type="button">' + buttonToAdd + '</button></div>');
                        var $button = $div.find("button");
                        $button.click(function () {
                            Calculator[buttonToAdd]();
                            updateUI();
                        });
                        $row.append($div);
                    });
                    $holder.append($row);
                });
            }

            addButtons();
        }());
    }(Calculator)
);