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

// Named exports so consumers can use `import {component, pluginName, buttonName} from './common'`
// without relying on Babel default-export interop, which resolves to undefined in AMD/RequireJS.
export const pluginName  = 'tiny_htmlbootstrapeditor/plugin';
export const component   = 'tiny_htmlbootstrapeditor';
export const buttonName  = 'tiny_htmlbootstrapeditor';
export const icon        = 'tiny_htmlbootstrapeditor';
