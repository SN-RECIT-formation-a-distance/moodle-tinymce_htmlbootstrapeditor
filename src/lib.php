<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot . '/admin/tool/htmlbootstrapeditor/lib.php');

function tinymce_htmlbootstrapeditor_strings_for_js(){
    global $PAGE; 

    $PAGE->requires->strings_for_js(array('pluginname',
                                          ), 'tinymce_htmlbootstrapeditor');
}

function tinymce_htmlbootstrapeditor_before_standard_top_of_body_html(){
    tool_htmlbootstrapeditor_inject_js();
}

class tinymce_htmlbootstrapeditor extends editor_tinymce_plugin {
    /** @var array list of buttons defined by this plugin */
    protected $buttons = array('htmlbootstrapeditor');

    protected function update_init_params(array &$params, context $context, array $options = null) {
        tinymce_htmlbootstrapeditor_strings_for_js();
        tool_htmlbootstrapeditor_strings_for_js();

        if ($row = $this->find_button($params, 'image')) {
            // Add button after 'image'.
            $this->add_button_after($params, $row, 'htmlbootstrapeditor', 'image');
        } else {
            // If 'image' is not found, add button in the end of the last row.
            $this->add_button_after($params, $this->count_button_rows($params), 'htmlbootstrapeditor');
        }

        $params['settings'] = '';
        // Add JS file, which uses default name.
        $this->add_js_plugin($params);
    }
}
