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

namespace tiny_htmlbootstrapeditor;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_buttons;
use editor_tiny\plugin_with_configuration;
use editor_tiny\plugin_with_menuitems;

require_once($CFG->dirroot . '/admin/tool/htmlbootstrapeditor/lib.php');

/**
 * Tiny htmlbootstrapeditor plugin.
 *
 * @package    tiny_htmlbootstrapeditor
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_menuitems, plugin_with_configuration {
    /**
     * Whether the plugin is enabled
     *
     * @param context $context The context that the editor is used within
     * @param array $options The options passed in when requesting the editor
     * @param array $fpoptions The filepicker options passed in when requesting the editor
     * @param editor $editor The editor instance in which the plugin is initialised
     * @return boolean
     */
    public static function is_enabled(
        context $context,
        array $options,
        array $fpoptions,
        ?editor $editor = null
    ): bool {
        // Disabled if:
        // - Not logged in or guest.
        // - Files are not allowed.
        // - Only URL are supported.
        $canhavefiles = !empty($options['maxfiles']);
        $canhaveexternalfiles = !empty($options['return_types']) && ($options['return_types'] & FILE_EXTERNAL);
        return isloggedin() && !isguestuser() && $canhavefiles && $canhaveexternalfiles;
    }

    public static function get_available_buttons(): array {
        return [
            'tiny_htmlbootstrapeditor/tiny_htmlbootstrapeditor',
        ];
    }

    public static function get_available_menuitems(): array {
        return [
            'tiny_htmlbootstrapeditor/tiny_htmlbootstrapeditor',
        ];
    }

    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?\editor_tiny\editor $editor = null
    ): array {

        global $PAGE;

        $PAGE->requires->strings_for_js(array('pluginname'), 'tiny_htmlbootstrapeditor');
        tool_htmlbootstrapeditor_init_settings();
        tool_htmlbootstrapeditor_inject_js();
        tool_htmlbootstrapeditor_strings_for_js();

        return [
        ];
    }
}
