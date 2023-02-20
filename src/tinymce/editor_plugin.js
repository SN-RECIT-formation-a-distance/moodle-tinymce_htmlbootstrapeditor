

(function() {
    tinymce.create('tinymce.plugins.htmlbootstrapeditor', {

        globalVars: {popup: null},


        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init: function(ed, url) {
            this.editor = ed;
            // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mcehtmlbootstrapeditor');
            ed.addCommand('mcehtmlbootstrapeditor', () => {
                this.openHtmlEditor();
            });

            // Register htmlbootstrapeditor button.
            ed.addButton('htmlbootstrapeditor', {
                title : M.str.tinymce_htmlbootstrapeditor.pluginname,
                cmd : 'mcehtmlbootstrapeditor',
                image : url + '/img/htmlbootstrapeditor.png'
            });
        },

        openHtmlEditor: function(e) {
           
            // if the reference exists and the window is not closed so we can bring it to the front with the method focus() method without having to recreate the window
            if(this.globalVars.popup !== null && !this.globalVars.popup.closed){
                this.globalVars.popup.focus();
                return;
            }
    
            var that = this;
           
            var url = M.cfg.wwwroot;
            url += "/lib/editor/tinymce/plugins/htmlbootstrapeditor/view.php";
            
            this.globalVars.popup = window.open(url, M.str.pluginname, 'scrollbars=1');
    
            /*if (this.globalVars.popup.outerWidth < screen.availWidth || this.globalVars.popup.outerHeight < screen.availHeight){
                this.globalVars.popup.moveTo(0,0);
                this.globalVars.popup.resizeTo(screen.availWidth, screen.availHeight);
            }*/
    
            this.globalVars.popup.IWrapper = M.recit.htmlbootstrapeditor.IWrapper;

            this.globalVars.popup.IWrapper.uploadFile = function(filename, binFile, cb){
                

                let fileTransferData = that.getFileTransferData();
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => cb(xhr);

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

                let tmp = filename.split(".");
                filename = [(tmp[0] || ""), (tmp[1] || "")];
                formData.append('title', `${filename[0].substr(0,255)}.${filename[1]}`);
            
                xhr.open("POST", M.cfg.wwwroot + '/repository/repository_ajax.php?action=upload', true);
                xhr.send(formData);
            }
    
            this.globalVars.popup.IWrapper.get_string = function(str, resource){
                if (typeof M == 'undefined') return str;
                let moodle = M || window.parent.M;
                return moodle.util.get_string(str, 'tool_htmlbootstrapeditor');
            }
    
            this.getFileTransferData = function(){
                var host = tinyMCE.activeEditor.editorId;
                var options = M.editor_tinymce.filepicker_options[host].image;
                
                var result = {};
                result.repo_id = 0 || 0;
                result.client_id = options.client_id || 0;
                result.env = options.env || '';
                result.license = options.defaultlicense || '';
                result.itemid = options.itemid || 0;
                result.author = options.author || '';
    
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
                return that.editor.getContent();
            };
    
            this.globalVars.popup.IWrapper.setContent = function(htmlStr){
                that.editor.execCommand('mceInsertContent', false, htmlStr);
                that.globalVars.popup.close();
            };
        },
        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'Bootstrap Editor',
                author : 'RÉCIT',
                authorurl : 'https://recitfad.com',
                infourl : 'https://moodle.org',
                version : "1.0"
            };
        }
    });

    // Register plugin.
    tinymce.PluginManager.add('htmlbootstrapeditor', tinymce.plugins.htmlbootstrapeditor);
})();
