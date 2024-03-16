/**
 * BlocklyDuino
 */

'use strict';

/**
 * Init modal Global Configuration
 */
BlocklyDuino.initBlocSort = function() {
    // set the toggle from url parameters
    var FunctionChoice = BlocklyDuino.getStringParamFromUrl('sortby', '');
    if (FunctionChoice === undefined || FunctionChoice === "" || FunctionChoice === "C") {
        sessionStorage.setItem('catblocsort', "C");
        $('#toggle-Functions').bootstrapToggle('off');
    } else {
        sessionStorage.setItem('catblocsort', "F");
        $('#toggle-Functions').bootstrapToggle('on');
    }
}


/**
 * Validate global configuration
 */
BlocklyDuino.validateConfigGlobal = function() {

    // Store the blocks for the duration of the reload.
    BlocklyDuino.backupBlocks();

    var search = window.location.search;
    //change Arduino card
    $("#board_select").blur();
    if ($("#board_select").val() != "none") {
        if (window.confirm(MSG['arduino_card'] + ' ' + window.profile[$("#board_select").val()].description + ' ?')) {
            BlocklyDuino.workspace.clear();
            if (search.length <= 1) {
                search = '?card=' + $("#board_select").val();
            } else if (search.match(/[?&]card=[^&]*/)) {
                search = search.replace(/([?&]card=)[^&]*/, '$1' + $("#board_select").val());
            } else {
                search = search.replace(/\?/, '?card=' + $("#board_select").val() + '&');
            }

        } else {
            $("#board_select").val(BlocklyDuino.selectedCard);
        }
    }

    sessionStorage.setItem('ConfigGlobaleSeen', 'ok');
    window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + search;
};

BlocklyDuino.validateConfigOffline = function() {

    // Store the blocks for the duration of the reload.
    BlocklyDuino.backupBlocks();

    var search = window.location.search;
    // remove values from url to test toggles
    search = search.replace(/([?&]sortby=)[^&]*/, '');
    // put values in url
    if (search.length <= 1) {
        search = '?sortby=' + sessionStorage.getItem('catblocsort');
    } else {
        search = search + '&sortby=' + sessionStorage.getItem('catblocsort');
    }

    //change Arduino card
    $("#board_select").blur();
    if (window.profile["defaultBoard"] != window.profile[$("#board_select").val()]) {
        if (window.confirm(MSG['arduino_card'] + ' ' + window.profile[$("#board_select").val()].description + ' ?')) {
            BlocklyDuino.workspace.clear();
            if (search.length <= 1) {
                search = '?card=' + $("#board_select").val();
            } else if (search.match(/[?&]card=[^&]*/)) {
                search = search.replace(/([?&]card=)[^&]*/, '$1' + $("#board_select").val());
            } else {
                search = search.replace(/\?/, '?card=' + $("#board_select").val() + '&');
            }
        } else {
            $("#board_select").val(BlocklyDuino.selectedCard);
        }
    }

    window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + search;
};

/**
 * Add convert bin <-> text
 */
BlocklyDuino.text2bin = function() {
    var output = document.getElementById("ti2");
    var input = document.getElementById("ti1").value;
    output.value = "";
    var data = input;
    var binArray = [];
    var datEncode = "";
    var i;
    for (i = 0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
    }
    var j;
    for (j = 0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' ';
    }
    output.value = datEncode;
};

function padding_left(s, c, n) {
    if (!s || !c || s.length >= n) {
        return s;
    }

    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
        s = c + s;
    }
    return s;
};

BlocklyDuino.bin2text = function() {
    var output = document.getElementById("ti4");
    var input = document.getElementById("ti3").value;
    output.value = "";
    var s = input;
    s = s.replace(/\s/g, "");
    var data = "";
    if (s.length % 8 != 0) {
        data = "???:";
    } else {
        while (s.length > 0) {
            var first8 = s.substring(0, 8);
            s = s.substring(8);
            var chr = parseInt(first8, 2);
            data += String.fromCharCode(chr);
        }
    }
    output.value = data;
};