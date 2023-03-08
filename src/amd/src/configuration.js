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

/**
 *
 * @module      tiny_htmlbootstrapeditor/plugin
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */

import {component as buttonName} from './common';
import {
    addMenubarItem,
    addToolbarButton,
} from 'editor_tiny/utils';

export const configure = (instanceConfig) => {
    // Update the instance configuration to add the Filter WS menu option to the menus and toolbars.
    return {
        toolbar: addToolbarButton(instanceConfig.toolbar, 'content', buttonName),
        menu: addMenubarItem(instanceConfig.menu, 'insert', buttonName),
    };
};