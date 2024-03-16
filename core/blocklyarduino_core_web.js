/**
 * Blockly@rduino
 */

'use strict';

/**
 * Create a namespace for the application.
 */
var BlocklyDuino = {};
Blockly.pathToBlockly = './';
Blockly.pathToMedia = './media/';

BlocklyDuino.selectedCard = 'none';
BlocklyDuino.selectedTab = 'blocks';
BlocklyDuino.inlineBool = true;
BlocklyDuino.withImage = true;
BlocklyDuino.ajaxOK = true;

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
BlocklyDuino.workspace = null;
var BlocklyLevel = 'none';


/**
 * Populate the currently selected pane with content generated from the blocks.
 */
BlocklyDuino.renderContent = function() {
    BlocklyDuino.workspace.render();
    $(".blocklyTreeSeparator").removeAttr("style");
    $("#tools_blocks").show();
    $("#btn_levels").show();
    $("#header_supervision").hide();
    $("#header_code").hide();
};

BlocklyDuino.renderArduinoCodePreview = function() {
    var cardId = BlocklyDuino.getStringParamFromUrl('card', '');
    if (cardId != 'kit_microbit') {
        $('#pre_previewArduino').text(Blockly.Arduino.workspaceToCode(BlocklyDuino.workspace));
        $('#pre_arduino').text(Blockly.Arduino.workspaceToCode(BlocklyDuino.workspace));
    } else {
        $('#pre_previewArduino').text(Blockly.Python.workspaceToCode(BlocklyDuino.workspace));
        $('#pre_arduino').text(Blockly.Python.workspaceToCode(BlocklyDuino.workspace));
    }
    if (typeof prettyPrintOne == 'function') {
        $('#pre_previewArduino').html(prettyPrintOne($('#pre_previewArduino').html(), 'cpp'));
        $('#pre_arduino').html(prettyPrintOne($('#pre_previewArduino').html(), 'cpp'));
    }
};

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
BlocklyDuino.getStringParamFromUrl = function(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Add or replace a parameter to the URL.
 * 
 * @param {string} name The name of the parameter.
 * @param {string} value Value to set
 * @return {string} The url completed with parameter and value
 */
BlocklyDuino.addReplaceParamToUrl = function(url, param, value) {
    var re = new RegExp("([?&])" + param + "=.*?(&|$)", "i");
    var separator = url.indexOf('?') !== -1 ? "&" : "?";
    if (url.match(re)) {
        return url.replace(re, '$1' + param + "=" + value + '$2');
    } else {
        return url + separator + param + "=" + value;
    }
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * 
 * @param {string}
 *            defaultXml Text representation of default blocks.
 */
BlocklyDuino.loadBlocks = function(defaultXml) {
    if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.utils.xml.textToDom(defaultXml);
        Blockly.utils.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
    } else {
        var loadOnce = null;
        try {
            loadOnce = sessionStorage.getItem('loadOnceBlocks');
        } catch (e) {
            // Firefox sometimes throws a SecurityError when accessing
            // localStorage.
            // Restarting Firefox fixes this, so it looks like a bug.
        }
        if (loadOnce != null) {
            // Language switching stores the blocks during the reload.
            sessionStorage.removeItem('loadOnceBlocks');
            var xml = Blockly.utils.xml.textToDom(loadOnce);
            Blockly.Xml.domToWorkspace(xml, BlocklyDuino.workspace);
        }
    }
};

/*
 *  Store the blocks for the duration of the reload.
 */
BlocklyDuino.backupBlocks = function() {
    if (typeof Blockly != 'undefined' && sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(BlocklyDuino.workspace);
        var text = Blockly.Xml.domToText(xml);
        sessionStorage.setItem('loadOnceBlocks', text);
    }
};


/**
 * Sets Arduino card
 */
BlocklyDuino.setArduinoBoard = function() {
    var cardId = BlocklyDuino.getStringParamFromUrl('card', '');
    if (!cardId) {
        cardId = BlocklyDuino.selectedCard;
    }
    $("#board_select").val(cardId);
    // set the card from url parameters
    profile["defaultBoard"] = profile[cardId];
    $('#arduino_card_picture').attr("src", profile.defaultBoard['picture']);
    $('#arduino_card_miniPicture').attr("src", profile.defaultBoard['miniPicture']);
    BlocklyDuino.cardPicture_change_AIO();
};


/**
 * Binds functions to each of the buttons, nav links, and related.
 */
BlocklyDuino.bindFunctions = function() {

    $('#clearLink').on("click", BlocklyDuino.clearLocalStorage);

    var clipboard = new Clipboard('#btn_CopyCode');

    // Navigation buttons
    $('#btn_delete').on("click", BlocklyDuino.discard);
    $('#btn_undo').on("click", BlocklyDuino.Undo);
    $('#btn_redo').on("click", BlocklyDuino.Redo);
    $('#btn_pasteIDEArduino').remove();
    $('#btn_saveXML, #menu_12').on("click", BlocklyDuino.saveXmlFile);
    $('#btn_validCode').on("click", BlocklyDuino.valideEditedCode);
    $('#btn_factory').on("click", function() {
        var langChoice = BlocklyDuino.getStringParamFromUrl('lang', '');
        window.open("./tools/factory/block_factory.html?lang=" + langChoice, "_blank");
    });
    $('#load').on("change", BlocklyDuino.load);
    $('#btn_fakeload, #menu_11').on("click", function() {
        $('#load').click();
    });
    $('#btn_preview').on("click", function() {
        $("#toggle_code").toggle("blind");
    });
    $('#pre_previewArduino').on("click", function() {
        $("#toggle_code").toggle("blind");
    });

    $('#toggle-Colors').on("change", BlocklyDuino.toggleTextColors);

    $('#board_select').on("focus", function() {
        BlocklyDuino.selectedCard = $(this).val();
    });
    $('#btn_configGlobal').on("click", BlocklyDuino.buildlibraries);
    $('#configModalGlobal').on("hidden.bs.modal", function() {
        $("#board_select").val(BlocklyDuino.selectedCard);
        BlocklyDuino.cardPicture_change_AIO();
    });

    $('#menuPanelBlockly li[id^=tab_]').on("click", function() {
        BlocklyDuino.selectedTab = $(this).attr('id').substring(4);
        BlocklyDuino.renderContent();
    });

    $('#btn_card_picture_change').on("click", BlocklyDuino.validateConfigOffline);
    $('#textSize').on("click", BlocklyDuino.tailleFonte);

    $('#btn_valid_msg').on("click", function() {
        if ($('#ajax_msg').prop("checked")) {
            sessionStorage.setItem('msg_ajax_seen', true);
        }
        $('#ajaxModal').modal('hide');
    });

    $('#btn_inline').on("click", BlocklyDuino.inline);
    $('#btn_wiring').on('click', function() {
        var dialogConvert = $("#wiringModal").dialog({
            autoOpen: false,
            resizable: true,
            height: 400,
            width: 600,
            show: {
                effect: "drop",
                duration: 600
            },
            hide: {
                effect: "drop",
                duration: 600
            },
            position: {
                my: "center",
                at: "center",
                of: window
            },
        });
        if (!dialogConvert.dialog("isOpen")) {
            dialogConvert.dialog("open").dialog("option", "buttons");
        };
    });

    $('#btn_screenduino, #menu_32').on('click', function() {
        var iframe = $("#screen_falsemodal > iframe");
        var $screenlang = "./tools/screenduino/index.html";
        var dialogScreen = $("#screen_falsemodal").dialog({
            autoOpen: false,
            resizable: true,
            height: 600,
            width: 650,
            show: {
                effect: "drop",
                duration: 600
            },
            hide: {
                effect: "drop",
                duration: 600
            },
            position: {
                my: "center",
                at: "center",
                of: window
            },
        });
        iframe.attr({
            width: "100%",
            height: "100%",
            src: $screenlang
        });
        if (!dialogScreen.dialog("isOpen")) {
            dialogScreen.dialog("open").dialog("option", "buttons");
        };
    });
};

/**
 * Initialize Blockly.  Called on page load.
 */
BlocklyDuino.init = function() {

    BlocklyDuino.setOrientation();

    BlocklyDuino.testAjax();

    document.body.style.fontFamily = "OpenDyslexic";

    Code.initLanguage();

    // minimize div
    $("#divTabpanel").css({ "margin-left": "5px" });
    $("#div_miniPicture").removeClass("hidden");
    $('#icon_btn_size').addClass('glyphicon-resize-full');
    $('#icon_btn_size').removeClass('glyphicon-resize-small');
    $("#btn_miniMenuPanel > span").addClass("glyphicon-step-backward");
    $("#btn_miniMenuPanel > span").removeClass("glyphicon-step-forward");

    BlocklyDuino.setArduinoBoard();

    // build Blockly ...
    BlocklyDuino.workspace = Blockly.inject('content_blocks', {
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        sounds: true,
        media: 'media/',
        renderer: 'custom_renderer',
        rtl: false,
        toolbox: toolbox_arduino_json,
        zoom: {
            controls: true,
            wheel: true
        }
    });
    // bind events to html elements
    BlocklyDuino.bindFunctions();
    BlocklyDuino.renderContent();
    BlocklyDuino.workspace.addChangeListener(BlocklyDuino.renderArduinoCodePreview);

    // load blocks stored in session or passed by url
    var urlFile = BlocklyDuino.getStringParamFromUrl('url', '');
    var loadOnce = null;
    try {
        loadOnce = sessionStorage.getItem('loadOnceBlocks');
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing
        // localStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
    }
    if (urlFile) {
        if (loadOnce != null) {
            if (!confirm(MSG['xmlLoad'])) {
                BlocklyDuino.loadBlocks();
            }
        }
        $.get(urlFile, function(data) {
            BlocklyDuino.loadBlocks(data);
        }, 'text');
    } else {
        BlocklyDuino.loadBlocks();
    }

    // Hook a save function onto unload.
    window.addEventListener('unload', BlocklyDuino.backupBlocks, false);

    //global config
    BlocklyDuino.initBlocSort();

    BlocklyDuino.OnOffLine();
    BlocklyDuino.ExampleWiring();
};

/**
 * Test ajax request 
 */
BlocklyDuino.testAjax = function() {
    $.ajax({
        type: "GET",
        url: "./index.html",
        dataType: 'text',
        error: function() {
            if (window.sessionStorage && !sessionStorage.getItem('msg_ajax_seen')) {
                $('#ajaxModal').modal('show');
            }
            BlocklyDuino.ajaxOK = false;
        }
    });
};

/**
 * Override Blockly method (/Blockly/core/variable.js)
 * To add the block "variables_set_type"
 * 
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategory = function(workspace) {
    var variableList = workspace.variableList;
    variableList.sort(goog.string.caseInsensitiveCompare);

    var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', Blockly.Msg.NEW_VARIABLE);
    button.setAttribute('callbackKey', 'CREATE_VARIABLE');

    Blockly.registerButtonCallback('CREATE_VARIABLE', function(button) {
        Blockly.Variables.createVariable(button.getTargetWorkspace());
    });

    xmlList.push(button);

    if (variableList.length > 0) {
        if (Blockly.Blocks['variables_set']) {
            // <block type="variables_set" gap="20">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_set');
            if (Blockly.Blocks['variables_set_type']) {
                block.setAttribute('gap', 8);
            } else {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, variableList[0]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        if (Blockly.Blocks['variables_const']) {
            // <block type="variables_const" gap="20">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_const');
            if (Blockly.Blocks['variables_set_type']) {
                block.setAttribute('gap', 8);
            } else {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, variableList[0]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        // override to inject variables_set_type block
        if (Blockly.Blocks['variables_set_type']) {
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_set_type');
            if (Blockly.Blocks['math_change']) {
                block.setAttribute('gap', 8);
            } else {
                block.setAttribute('gap', 24);
            }
            xmlList.push(block);
        }
        // end override
        if (Blockly.Blocks['variables_set_init']) {
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_set_init');
            if (Blockly.Blocks['variables_set_init']) {
                block.setAttribute('gap', 8);
            } else {
                block.setAttribute('gap', 24);
            }
            xmlList.push(block);
        }
        if (Blockly.Blocks['math_change']) {
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'math_change');
            if (Blockly.Blocks['variables_get']) {
                block.setAttribute('gap', 20);
            }
            var value = goog.dom.createDom('value');
            value.setAttribute('name', 'DELTA');
            block.appendChild(value);

            var field = goog.dom.createDom('field', null, variableList[0]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);

            var shadowBlock = goog.dom.createDom('shadow');
            shadowBlock.setAttribute('type', 'math_number');
            value.appendChild(shadowBlock);

            var numberField = goog.dom.createDom('field', null, '1');
            numberField.setAttribute('name', 'NUM');
            shadowBlock.appendChild(numberField);

            xmlList.push(block);
        }

        for (var i = 0; i < variableList.length; i++) {
            if (Blockly.Blocks['variables_get']) {
                var block = goog.dom.createDom('block');
                block.setAttribute('type', 'variables_get');
                if (Blockly.Blocks['variables_set']) {
                    block.setAttribute('gap', 8);
                }
                var field = goog.dom.createDom('field', null, variableList[i]);
                field.setAttribute('name', 'VAR');
                block.appendChild(field);
                xmlList.push(block);
            }
        }
    }
    return xmlList;
};

BlocklyDuino.DialogCode = function() {
    var dialogCode = $("#pre_previewArduino").dialog({
        autoOpen: false,
        resizable: true,
        height: 600,
        width: 400,
        show: {
            effect: "drop",
            duration: 1000
        },
        hide: {
            effect: "drop",
            duration: 1000
        },
        position: {
            my: "right top",
            at: "right top",
            of: "#content_blocks"
        },
        buttons: [{
                text: "copy-paste",
                icon: {
                    primary: "btn btn_ver btn-danger btn-block"
                },
                click: BlocklyDuino.ArduinoIDEClick_IDE,
            },
            {
                text: 'save',
                icons: {
                    primary: "ui-icon-cancel"
                },
                click: BlocklyDuino.saveArduinoFile_IDE,
            },
            {
                text: 'upload',
                icons: {
                    primary: "ui-icon-cancel"
                },
                click: BlocklyDuino.uploadClick_IDE,
            }
        ]
    });
    if (!dialogCode.dialog("isOpen")) {
        dialogCode.dialog("open").dialog("option", "buttons");
    };
};
