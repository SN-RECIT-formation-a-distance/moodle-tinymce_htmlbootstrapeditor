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

import {getTinyMCE} from 'editor_tiny/loader';
import {getPluginMetadata} from 'editor_tiny/utils';
import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {component, pluginName, buttonName} from './common';
import {Editor} from './wrapper';
import * as Configuration from './configuration';
import * as Options from './options';

export default new Promise(async(resolve) => {
    const bseditor = new Editor();
    const [
        tinyMCE,
        pluginMetadata,
    ] = await Promise.all([
        getTinyMCE(),
        getPluginMetadata(component, pluginName),
    ]);
    const [
        ButtonTitle,
        btn,
    ] = await Promise.all([
        getString('pluginname', component),
        getButtonImage('html', component),
    ]);

    tinyMCE.PluginManager.add(`${component}/plugin`, (editor) => {
        Options.register(editor);

        const icon = 'html';
        editor.ui.registry.addIcon(icon, btn.html);

        editor.ui.registry.addButton(buttonName, {
            icon,
            tooltip: ButtonTitle,
            onAction: () => bseditor.open(editor),
        });

        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: ButtonTitle,
            onAction: () => bseditor.open(editor),
        });
        return pluginMetadata;
    });

    // Resolve the Media Plugin and include configuration.
    resolve([`${component}/plugin`, Configuration]);
});
