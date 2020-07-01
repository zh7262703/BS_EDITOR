    (function(UE) {
        var oNode = null;
        thePlugins = 'editattr';
        //初始化加载之前编辑的数据
        window.onload = function() {
            if (UE.plugins[thePlugins].editdom) {
                oNode = UE.plugins[thePlugins].editdom;
                var json = JSON.parse(oNode.getAttribute('tag-model'));
                var hl7 = oNode.getAttribute('hl7');
                var hl7value = oNode.getAttribute('hl7value');
                var jlly = oNode.getAttribute('jlly');
                var jltj = oNode.getAttribute('jltj');
                if (!json || json == null) {
                    alert("无法识别json！");
                    return;
                }
                //json = gValue == null ? '' : gValue;
                //gTitle = gTitle == null ? '' : gTitle;
                $G('txtID').value = json.ID;
                $G('txtNAME').value = json.NAME;
                $G('txtCOLOR').value = json.COLOR;
                $G('txtCOLOR').style.backgroundColor = "#" + json.COLOR;
                $G('txtTAG').value = json.TAG;
                $G('txtVALUE').value = json.VALUE;
                $G('txtDESCNAME').value = json.DESCNAME;
                $G('txtVERIFYTYPE').value = json.VERIFYTYPE;
                $G('txtJlly').value = jlly;
                $G('txtJltj').value = jltj;
                $G('txtHL7').value = hl7;
                $G('txtHL7Value').value = hl7value;
                if (json.REQUIRED == 1) {
                    $G('txtREQUIRED').checked = true;
                }
                if (json.READONLY == 1) {
                    $G('txtREADONLY').checked = true;
                }
                $G('txtID').setAttribute('readonly', 'readonly');
            }
            $G('txtID').focus();
        };

        function makeHtml(json) {
            var isClear = 1,
                show = json.DESCNAME == '' ? ' ' : json.DESCNAME;
            if (json.VALUE != '') {
                show = json.VALUE;
                isClear = 0;
            }
            if (json.READONLY == 1)
                isClear = 0;
            var html = '<span  title="' + json.DESCNAME + '"  style="color:#' + json.COLOR + ';"  class="tag-value" ' +
                ((json.READONLY == 1) ? ' contenteditable="false" ' : ' contenteditable="true" ') +
                '>' + show + '</span>';
            return html;
        }
        dialog.oncancel = function() {
            if (oNode) {
                delete UE.plugins[thePlugins].editdom;
            }
        };
        dialog.onok = function() {
            if ($G('txtID').value == '') {
                alert('请输入控件ID');
                return false;
            }
            if ($G('txtNAME').value == '') {
                alert('请输入控件名称');
                return false;
            }

            var json = {
                ID: $G('txtID').value,
                TYPE: 'text',
                NAME: $G('txtNAME').value,
                TAG: $G('txtTAG').value,
                DESCNAME: $G('txtDESCNAME').value,
                VERIFYTYPE: $G('txtVERIFYTYPE').value,
                VALUE: $G('txtVALUE').value,
                REQUIRED: 0,
                READONLY: 0,
                COLOR: $G('txtCOLOR').value
            };
            if ($G('txtREQUIRED').checked) {
                json.REQUIRED = 1;
            }
            if ($G('txtREADONLY').checked) {
                json.READONLY = 1;
            }
            var html = makeHtml(json);
            if (!oNode) {
                try {
                    oNode = createElement('span', json.ID);
                    oNode.setAttribute('title', json.NAME);
                    oNode.setAttribute('hl7', $G('txtHL7').value);
                    oNode.setAttribute('hl7value', $G('txtHL7Value').value);
                    oNode.setAttribute('jlly', $G('txtJlly').value);
                    oNode.setAttribute('jltj', $G('txtJltj').value);
                    oNode.setAttribute('tag-model', JSON.stringify(json));
                    oNode.setAttribute("contenteditable", "false");
                    oNode.setAttribute('class', 'tag-bg');
                    oNode.innerHTML = html;

                    editor.execCommand('insertHtml', oNode.outerHTML);
                } catch (e) {
                    try {
                        editor.execCommand('error');
                    } catch (e) {
                        alert('控件异常，请联系管理员！');
                    }
                    return false;
                }
            } else {
                oNode.setAttribute('title', json.NAME);
                oNode.setAttribute('id', json.ID);
                oNode.setAttribute('tag-model', JSON.stringify(json));
                oNode.setAttribute('hl7', $G('txtHL7').value);
                oNode.setAttribute('hl7value', $G('txtHL7Value').value);
                oNode.setAttribute('jlly', $G('txtJlly').value);
                oNode.setAttribute('jltj', $G('txtJltj').value);
                oNode.innerHTML = html;
                delete UE.plugins[thePlugins].editdom;
            }
        };
    })(UE);
