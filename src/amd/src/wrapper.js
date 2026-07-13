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
import {getFilePicker} from 'editor_tiny/options';
import {IWrapper} from 'tool_htmlbootstrapeditor/editor';

export class Editor {
    globalVars = {popup: null};

    open(editor){
        //if the reference exists and the window is not closed
        //so we can bring it to the front with the method focus() method without having to recreate the window
        if(this.globalVars.popup !== null && !this.globalVars.popup.closed){
            this.globalVars.popup.focus();
            return;
        }

        var that = this;

        var url = M.cfg.wwwroot;
        url += "/admin/tool/htmlbootstrapeditor/view.php";

        this.globalVars.popup = window.open(url, 'HTML Bootstrap Editor', 'scrollbars=1');

        this.globalVars.popup.IWrapper = {...IWrapper};

        this.globalVars.popup.IWrapper.uploadFile = function(filename, binFile, cb){

            let fileTransferData = that.getFileTransferData();
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        // Safely parse the server response — malformed JSON must not propagate as an uncaught exception.
                        let result;
                        try {
                            result = JSON.parse(xhr.responseText);
                        } catch (e) {
                            window.console.error('HTML Bootstrap Editor: Invalid JSON in server response', e);
                            return;
                        }

                        // Validate structure before accessing any property.
                        if (!result || typeof result !== 'object') {
                            window.console.error('HTML Bootstrap Editor: Unexpected response format', xhr.responseText);
                            return;
                        }

                        if (result.error) {
                            window.console.error('HTML Bootstrap Editor: Upload error', result);
                            return;
                        }

                        let file = result;
                        if (result.event && result.event === 'fileexists') {
                            // A file with this name is already in use here - rename to avoid conflict.
                            // Chances are, it's a different image (stored in a different folder on the user's computer).
                            // If the user wants to reuse an existing image, they can copy/paste it within the editor.
                            file = result.newfile;
                        }

                        if (file && typeof cb === 'function') {
                            cb(file);
                        }
                    } else {
                        window.console.error('HTML Bootstrap Editor: Server error', xhr.status);
                    }
                }
            };

            let formData = new FormData();
            formData.append('repo_upload_file', binFile);
            formData.append('itemid', fileTransferData.itemid);
            formData.append('env', fileTransferData.env);
            formData.append('repo_id', fileTransferData.repo_id);
            formData.append('sesskey', M.cfg.sesskey);
            formData.append('client_id', fileTransferData.client_id);
            formData.append('savepath', "/");
            formData.append('ctx_id', M.cfg.contextid);
            formData.append('license', fileTransferData.license);
            formData.append('author', fileTransferData.author);

            // Sanitize the filename: use lastIndexOf so multi-extension names like
            // "photo.of.dog.jpg" are split correctly, and strip HTML special chars
            // to prevent reflected XSS if the server echoes the title back in markup.
            const lastDot = filename.lastIndexOf('.');
            const baseName = lastDot > 0 ? filename.substring(0, lastDot) : filename;
            const ext     = lastDot > 0 ? filename.substring(lastDot + 1) : '';
            const safeBase = baseName.replace(/[<>"'&]/g, '').substring(0, 255) || 'file';
            const safeExt  = ext.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
            formData.append('title', safeExt ? `${safeBase}.${safeExt}` : safeBase);

            xhr.open("POST", M.cfg.wwwroot + '/repository/repository_ajax.php?action=upload', true);
            xhr.send(formData);
        };

        this.globalVars.popup.IWrapper.get_string = function(str){
            if (typeof M == 'undefined'){
                return str;
            }

            return M.util.get_string(str, 'tool_htmlbootstrapeditor');
        };

        this.getFileTransferData = function(){
            const options = getFilePicker(editor, 'media');

            var result = {};
            result.repo_id = 0;
            result.client_id = options.client_id || 0;
            result.env = options.env || '';
            result.license = options.defaultlicense || '';
            result.author = options.author || '';

            // Validate itemid is a positive integer to prevent IDOR via a tampered draft-area identifier.
            result.itemid = (Number.isInteger(options.itemid) && options.itemid > 0)
                ? options.itemid
                : 0;

            var attr = '';
            for(attr in options.repositories){
                if (options.repositories[attr].type === 'upload') {
                    result.repo_id = options.repositories[attr].id;
                    break;
                }
            }

            for(attr in options.licenses){
                if (options.licenses[attr].shortname === 'cc') { // creative commons
                    result.license = options.licenses[attr].shortname;
                    break;
                }
            }

            return result;
        };

        this.globalVars.popup.IWrapper.getContent = function(){
            return editor.getContent();
        };

        this.globalVars.popup.IWrapper.setContent = function(htmlStr){
            editor.execCommand('mceSetContent', false, htmlStr);
            that.globalVars.popup.close();
        };

    }
}
