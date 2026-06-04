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

$string['pluginname'] = 'HTML Bootstrap Editor TinyMCE';

// Privacy / Law 25 (Quebec — Loi sur la protection des renseignements personnels dans le secteur privé).
// This string is returned by provider::get_reason() and displayed in Moodle's Privacy Registry.
// It must accurately describe what personal data this plugin does (or does not) handle.
$string['privacy:metadata'] = 'The HTML Bootstrap Editor TinyMCE plugin does not collect, store, '
    . 'retain, or transmit any personal information. It acts solely as a visual editing interface '
    . 'that passes HTML content directly to the Moodle text editor. File uploads performed through '
    . 'this plugin are processed by Moodle\'s core file repository (repository_ajax.php) using the '
    . 'current user\'s own draft-area; no file metadata is stored or processed by this plugin '
    . 'itself. No personal data is retained beyond the active browser session.';
