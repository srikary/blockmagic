/**
 * Based on
 *
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * User's language (e.g. "en").
 * @type string
 */
Code.LANG = "en";

/**
 * Initialize the page language.
 */
Code.initLanguage = function() {
  $("html").attr('lang', Code.LANG);

  // Inject language strings.
  $('#title').text(MSG['title']);
  $('#span_version').html(BlocklyArduinoMSG['span_version']);
  $('#btn_variable').text(MSG['btn_variable']);
  $('#labelArduinoCard').text(MSG['labelArduinoCard']);

  $('#btn_preview').attr('title', MSG['btn_preview']);

  $('#btn_inline').attr('title', MSG['btn_inline']);

  $('#span_delete').text(MSG['span_delete']);
  $('#span_saveXML').text(MSG['span_saveXML']);
  $('#span_fakeload').text(MSG['span_fakeload']);
  $('#a_term').text(MSG['a_term']);
  $('#a_xml').text(MSG['a_xml']);

  $('#span_pasteIDEArduino').text(MSG['span_pasteIDEArduino']);
  $('#span_functionToggle').text(MSG['span_functionToggle']);
  $('#span_functionON').text(MSG['span_functionON']);
  $('#span_functionOFF').text(MSG['span_functionOFF']);
  $('#span_pymata_upload_text').text(MSG['span_pymata_upload_text']);
  $('#span_pymata_toggle_text').text(MSG['span_pymata_toggle_text']);
  $('#span_pymataON').text(MSG['span_pymataON']);
  $('#span_pymataOFF').text(MSG['span_pymataOFF']);
  $('#span_select_all').text(MSG['span_select_all']);
  $('#btn_close_config').text(MSG['btn_close']);
  $('#btn_valid_config').text(MSG['btn_valid']);
  $('#btn_close_msg').text(MSG['btn_close']);
  $('#btn_valid_msg').text(MSG['btn_valid']);

  $('#span_menu_1').text(MSG['span_menu_1']);
  $('#span_menu_11').text(MSG['span_menu_11']);
  $('#span_menu_12').text(MSG['span_menu_12']);
  $('#wiringModal').attr('title', MSG['wiringModalLabel']);
  $('#videoModalLabelTitle').text(MSG['videoModalLabelTitle']);
  $('#videoModalLabel1').text(MSG['videoModalLabel1']);
  $('#videoModalLabel2').text(MSG['videoModalLabel2']);
  $('#videoModalLabel3').text(MSG['videoModalLabel3']);
  $('#videoModalLabel4').text(MSG['videoModalLabel4']);
  $('#videoModalLabel5').text(MSG['videoModalLabel5']);

  $('#configModalGlobalLabel').text(MSG['configModalGlobalLabel']);
  $('#configGlobalLabel').text(MSG['configGlobalLabel']);
  $('#btn_closeConfigGlobale').text(MSG['btn_close']);
  $('#btn_saveConfigGlobale').text(MSG['btn_saveConfig']);
  $('#btn_validConfigGlobale').text(MSG['btn_valid']);
  $('#span_languageMenu').text(MSG['span_languageMenu']);
  $('#span_colorToggle').text(MSG['span_colorToggle']);
  $('#span_colorBW').text(MSG['span_colorBW']);
  $('#span_colorColors').text(MSG['span_colorColors']);
  $('#span_levelChoice').text(MSG['span_levelChoice']);

  $('#span_Upload').text(MSG['span_Upload']);
  $('#span_Upload_local').text(MSG['span_Upload_local']);
  $('#btn_saveXML').attr('title', MSG['span_saveXML']);
  $('#btn_fakeload').attr('title', MSG['span_fakeload']);
  $('#btn_factory').attr('title', MSG['span_blockfactory']);
  $('#btn_screenduino').attr('title', MSG['span_screenduino']);
  $('#pre_previewArduino').attr('title', MSG['a_arduino']);
  $('#btn_undo').attr('title', MSG['span_undo']);
  $('#btn_redo').attr('title', MSG['span_redo']);
  $('#btn_CopyCode').attr('title', MSG['span_copycode']);
  $('#span_txt2bin').text(MSG['span_txt2bin']);
  $('#span_bin2txt').text(MSG['span_bin2txt']);

  $('#msg_ajax_ko').text(MSG['msg_ajax_ko']);
  $('#span_ajax_msg').text(MSG['span_ajax_msg']);

  $('#firstModalLabel').text(MSG['firstModalLabel']);
  $('#span_first_msg').text(MSG['span_first_msg']);
  $('#btn_valid_first_msg').text(MSG['btn_valid_first_msg']);

  $('#BT_ELEC_BUTTON').text(MSG['CAT_BT_ELEC_BUTTON']);

  $("xml").find("category").each(function() {
	// add attribute ID to keep categorie code
		if (!$(this).attr('id')) {
	$(this).attr('id', $(this).attr('name'));
	$(this).attr('name', Blockly.Msg[$(this).attr('name')]);
		}
  });

};

// And then load the choose langage
//Load the Code demo's language strings.
document.write('<script src="lang/UI.js"></script>\n');
document.write('<script src="lang/en.js"></script>\n');
