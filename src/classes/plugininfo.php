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
 * Security notes for maintainers
 * --------------------------------
 * - Never output user-controlled data to HTML without Moodle's s() function.
 *   Do NOT use PHP's htmlspecialchars() directly; s() applies the correct flags
 *   and encoding for Moodle's context.
 * - All file operations are delegated to Moodle's repository API
 *   (/repository/repository_ajax.php) which enforces its own capability and
 *   itemid ownership checks, providing server-side IDOR protection.
 *
 * @package    tiny_htmlbootstrapeditor
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_menuitems, plugin_with_configuration {
    /**
     * Whether the plugin is enabled for the given editor context.
     *
     * IDOR note: $options and $fpoptions are populated server-side by the form
     * that creates the editor instance and are not directly user-controllable.
     * Requiring both $canhavefiles AND non-empty $fpoptions ensures the plugin
     * cannot be activated by spoofing $options['maxfiles'] alone — a legitimately
     * configured file-picker context must also be present.
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
        if (!isloggedin() || isguestuser()) {
            return false;
        }

        $canhavefiles = !empty($options['maxfiles']);
        $canhaveexternalfiles = !empty($options['return_types']) && ($options['return_types'] & FILE_EXTERNAL);

        // IDOR prevention: require a properly configured file-picker context.
        // Returning true when $canhavefiles is set but $fpoptions is empty would
        // let the plugin open with no valid draft-area, potentially attaching
        // uploads to an unintended or unauthenticated context.
        if ($canhavefiles && empty($fpoptions)) {
            return false;
        }

        return $canhavefiles && $canhaveexternalfiles;
    }

    /**
     * Get the internal name of the toolbar button.
     * @return string[]
     */
    public static function get_available_buttons(): array {
        return [
            'tiny_htmlbootstrapeditor/tiny_htmlbootstrapeditor',
        ];
    }

    /**
     * Get the internal name of the menu item.
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return [
            'tiny_htmlbootstrapeditor/tiny_htmlbootstrapeditor',
        ];
    }

    /**
     * Returns the configuration values the plugin needs to take into consideration.
     *
     * Any string values added to the returned array that will be rendered in HTML
     * must be passed through Moodle's s() function — not PHP's htmlspecialchars() —
     * to ensure correct encoding flags and character set handling.
     *
     * @param context $context
     * @param array $options
     * @param array $fpoptions
     * @param editor|null $editor
     * @return array
     */
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
