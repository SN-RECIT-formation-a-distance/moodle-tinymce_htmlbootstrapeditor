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

namespace tiny_htmlbootstrapeditor\privacy;

use core_privacy\local\metadata\null_provider;

/**
 * Privacy Subsystem implementation for the htmlbootstrapeditor plugin for TinyMCE.
 *
 * This plugin does not collect, store, retain, or transmit any personal information.
 * It acts solely as a UI bridge: it opens the HTML Bootstrap Editor tool in a popup
 * window and passes the resulting HTML back to TinyMCE via same-origin postMessage
 * callbacks. Any file uploads are handled entirely by Moodle's core repository API
 * (repository_ajax.php) using the caller's own draft-area itemid; no file metadata
 * is stored or processed by this plugin.
 *
 * Quebec Law 25 / Loi 25 (Loi sur la protection des renseignements personnels dans le
 * secteur privé — LPRPSP) compliance statement:
 *   - No renseignements personnels (personal information) are collected by this plugin.
 *   - No personal information is used, disclosed, retained, or transferred.
 *   - No data subject rights (access, correction, deletion) are applicable to this plugin.
 *   - Data processed by the underlying TinyMCE editor content or Moodle's file repository
 *     falls under those components' respective privacy policies.
 *
 * @package tiny_htmlbootstrapeditor
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
class provider implements null_provider {

    /**
     * Returns the lang string key that explains why this plugin stores no personal data.
     *
     * The string identified by this key must be present in the plugin's lang file and
     * must clearly state that no personal information is collected or retained, in
     * compliance with Quebec Law 25 and Moodle's privacy API requirements.
     *
     * @return string
     */
    public static function get_reason(): string {
        return 'privacy:metadata';
    }
}
