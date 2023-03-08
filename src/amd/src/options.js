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

import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from './common';

const predefinedFiltersName = getPluginOptionName(pluginName, 'predefinedfilters');

/**
 * Register the options for the Tiny Filter WS plugin.
 *
 * @param {TinyMCE} editor
 */
export const register = (editor) => {
    const registerOption = editor.options.register;

    registerOption(predefinedFiltersName, {
        processor: 'array',
        "default": [],
    });
};

/**
 * Get the permissions configuration for the Tiny Filter WS plugin.
 *
 * @param {TinyMCE} editor
 * @returns {object}
 */
export const getPredefinedFilters = (editor) => editor.options.get(predefinedFiltersName);