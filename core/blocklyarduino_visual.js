/**
 * BlocklyDuino
 */

'use strict';

BlocklyDuino.pictSize = 2;
//set default image size
Blockly.Arduino.imageSizeNull = 0; //pictSize = 0
Blockly.Arduino.imageSizeSmall = 32; //pictSize = 1
Blockly.Arduino.imageSizeNormal = 64; //pictSize = 2
Blockly.Arduino.imageSizeBig = 96; //pictSize = 3
Blockly.Arduino.imageSizeOld = 32;
Blockly.Arduino.imageSize = Blockly.Arduino.imageSizeNormal;
Blockly.Arduino.imageBool = true;
Blockly.Arduino.cardSize = 200; //same as width in index.html showcardModal
Blockly.Arduino.wiringSize = 400;

/**
 * Override Blockly.makeColour to use Hexa or HUE
 */
Blockly.makeColour = function (color) {
    if (typeof color != 'string' || color.substring(0, 1) != '#') {
        color = goog.color.hsvToHex(color, Blockly.HSV_SATURATION, Blockly.HSV_VALUE * 255);
    }
    return color;
};

BlocklyDuino.changeFont = function () {
    var FontChoice = $('#fontChoice').val();
    if (FontChoice === 'O') {
        document.body.style.fontFamily = "OpenDyslexic";
    }
    if (FontChoice === 'T') {
        document.body.style.fontFamily = "Trebuchet MS";
    }
    if (FontChoice === 'V') {
        document.body.style.fontFamily = "V";
    }
    return FontChoice;
};

BlocklyDuino.cardPicture_change_AIO = function () {
    if ($("#board_select").val()) {
        $('#arduino_card_mini_picture').attr("src", profile[$("#board_select").val()]['picture']);
        $('#arduino_card_picture').attr("src", profile[$("#board_select").val()]['picture']);
    } else {
        $('#arduino_card_mini_picture').attr("src", "");
        $('#arduino_card_picture').attr("src", "");
    }
};

/**
 * Toggle blocks rendering : inline or block
 */
BlocklyDuino.inline = function () {
    var xmlBlocks = Blockly.Xml.workspaceToDom(BlocklyDuino.workspace);

    var blocks = xmlBlocks.getElementsByTagName("block");

    BlocklyDuino.inlineBool = !BlocklyDuino.inlineBool;

    for (var i = 0; i < blocks.length; i++) {
        blocks.item(i).setAttribute("inline", BlocklyDuino.inlineBool);
    }

    BlocklyDuino.workspace.clear();
    BlocklyDuino.loadBlocks(Blockly.Xml.domToPrettyText(xmlBlocks));
};

/**
 * Set menu orientation
 */
BlocklyDuino.setOrientation = function () {

    $("#ul_nav").addClass("nav nav-pills nav-stacked");
    $("#menuPanelBlockly").addClass("menuPanelBlockly-ver");
    // if (Code.isRtl()) {
    //     $("#ul_nav").addClass("navbar-right");
    // }
    $("#menuPanel").addClass("menuPanel-ver");
    $("#btn_config").addClass("btn_ver");
    $("#btn_supervision").addClass("btn_ver");
    $("#btn_saveXML").addClass("btn_ver");
    $("#btn_fakeload").addClass("btn_ver");
    // $("#btn_example").addClass("btn_ver");
    $("#divTabpanel").addClass("divTabpanel-ver");
    $("#div_help_button").addClass("div_help_button-ver");
    $("#div_tools_button").addClass("div_tools_button-ver");
    $("#div_miniPicture").addClass("div_miniPicture-ver");
};

/**
 * Get the function from URL : offline for AIO version or normal in webbrowser
 *
 * @return {int} selectd size.
 */
BlocklyDuino.OnOffLine = function () {
    $("#btn_configGlobal").removeClass("hidden");
    $("#btn_MiniconfigGlobal").removeClass("hidden");
    // $("#pictureModalLabel").removeClass("hidden");
    $("#btn_card_picture_change").addClass("hidden");
    $('#board_select_AIO_off').prepend($('#board_select'));
};

BlocklyDuino.ExampleWiring = function () {
    var ExampleTest = BlocklyDuino.getStringParamFromUrl('url', '');
    var KitTest = BlocklyDuino.getStringParamFromUrl('card', '');
    var KitTestResult = KitTest.slice(0, 3);
    // ni exemple ni kit
    if ((ExampleTest === '') && (KitTestResult !== 'kit')) {
        $("#btn_wiring").addClass("hidden");
        // $("#menu_21").addClass("hidden");

    } else {
        $("#btn_wiring").removeClass("hidden");
        // $("#menu_21").removeClass("hidden");
        // exemple mais pas kit
        if ((ExampleTest !== '') && (KitTestResult !== 'kit')) {
            // ExampleTest = ExampleTest.replace('.xml', '');
            // ExampleTest = ExampleTest.replace('.B@', '');
            ExampleTest = ExampleTest.slice(0, -4);
            $('#wiringModal_picture').prepend("<img src='" + ExampleTest + ".jpg' id='wiringModalImg' width=100% height=auto/>");
            $('#arduino_card_miniPicture').attr('src', ExampleTest + '.jpg');
            $('#arduino_card_miniPicture').attr('style', "max-width: 100%; height: auto;");
            $('#arduino_card_picture').attr('src', ExampleTest + '_wiring.jpg');
        } else if ((ExampleTest === '') && (KitTestResult === 'kit')) {
            //c'est donc un kit
            $('#wiringModal_picture').prepend("<img src='media/boards/" + KitTest + "_wiring.jpg' id='wiringModalImg' width=100% height=auto/>");
            $("#btn_wiring").removeClass("hidden");
            // $("#menu_21").removeClass("hidden");
        }
    }
};

BlocklyDuino.wiring_mini = function () {
    Blockly.Arduino.wiringSize -= 50;
    $("#arduino_card_picture").animate({width: Blockly.Arduino.wiringSize}, );
};

BlocklyDuino.wiring_maxi = function () {
    Blockly.Arduino.wiringSize += 50;
    $("#arduino_card_picture").animate({width: Blockly.Arduino.wiringSize}, );
};
