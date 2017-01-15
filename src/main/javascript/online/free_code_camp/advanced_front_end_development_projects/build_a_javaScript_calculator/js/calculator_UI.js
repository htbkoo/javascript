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
                    ["AC", "CE", ["backspace"], "/"],
                    ["7", "8", "9", "-"],
                    ["4", "5", "6", "*"],
                    ["1", "2", "3", "+"],
                    ["0", ".", "=", "+/-"]
                ].forEach(function (rowToAdd) {
                    var $row = $('<div class="row"></div>');
                    rowToAdd.forEach(function (buttonToAdd) {
                        var btn_class = (buttonToAdd in BTNS_RED) ? "btn-danger" : "btn-default";
                        if (buttonToAdd instanceof Array) {
                            btn_class += (" " + buttonToAdd[0]);
                            buttonToAdd = "BS";
                        }
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

            function setUpKeysControl() {
                $("body").keyup(function (event) {
                    var KEY_CODE_MAP = {
                        "Backspace":"BS",
                        ".": ".",
                        "=": "=",
                        "Enter": "=",
                        "+": "+",
                        "-": "-",
                        "*": "*",
                        "/": "/",
                        "F9": "+/-",
                        "A": "AC",
                        "a": "AC",
                        "Escape": "AC",
                        "C": "CE",
                        "c": "CE"
                    };
                    // {"48":"0, "49":"1", ......, "57":"9"}
                    new Array(10).fill(0).forEach(function (_, index) {
                        KEY_CODE_MAP[index] = index.toString();
                    });

                    var keyCode = event.key;
                    if (keyCode in KEY_CODE_MAP) {
                        event.preventDefault();
                        $("button:contains(" + KEY_CODE_MAP[keyCode] + ")").click();
                    }
                });
            }

            addButtons();
            setUpKeysControl();
            updateUI();
        }());
    }(Calculator)
);