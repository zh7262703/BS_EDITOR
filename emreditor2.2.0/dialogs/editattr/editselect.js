(function(UE) {
    var oNode = null,
        thePlugins = 'editattr';
    //初始化加载之前编辑的数据
    window.onload = function() {
        $('#txtRemote').change(function() {
            if ($(this).is(":checked")) {
                $('#tab1').removeClass('active');
                $('#tab2').addClass('active');
            } else {
                $('#tab1').addClass('active');
                $('#tab2').removeClass('active');
            }
        });
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
            $G('txtID').value = json.ID;
            $G('txtCOLOR').value = json.COLOR;
            $G('txtCOLOR').style.backgroundColor = "#" + json.COLOR;
            $G('txtTAG').value = json.TAG;
            $G('txtNAME').value = json.NAME;
            $G('txtJlly').value = jlly;
            $G('txtJltj').value = jltj;
            $G('txtHL7').value = hl7;
            $G('txtHL7Value').value = hl7value;
            $G('txtDEFAULTVALUE').setAttribute('tag-value', json.VALUE);
            if (json.VALUE != null && json.VALUE != '') {
                $G('txtDEFAULTVALUE').value = json.VALUE + '|' + json.TEXT; //默认值value|desc
            }
            $G('txtREMOTEURL').value = json.REMOTEURL;
            if (json.REQUIRED == 1) {
                $G('txtREQUIRED').checked = true;
            }
            //if (json.FREEINPUT == 1) {
            //$G('txtFREEINPUT').checked = true;
            //}
            var html = [];
            var datas = json.BINDINGDATA;
            if (datas && datas != undefined && datas != null) {
                for (var i = 0, l = datas.length; i < l; i++) {
                    html.push('<option value="' + datas[i].VALUE + '" ')
                    if (datas[i].SELECTED != undefined && datas[i].SELECTED == 1) {
                        html.push(' selected="selected" ');
                    }
                    html.push('>' + datas[i].TEXT + '</option>');
                }
            }
            $G('txtBINDINGDATA').innerHTML = html.join('');
            $G('txtID').setAttribute('readonly', 'readonly');
        }
        $G('txtID').focus();
    };

    function makeHtml(json) {
        var isClear = 1,
            show = json.NAME == '' ? ' ' : json.NAME;
        if (json.VALUE != '') {
            show = json.TEXT;
            isClear = 0;
        }
        if (json.READONLY == 1)
            isClear = 0;
        var html = '<span title="' + json.NAME + '" style="color:#' + json.COLOR + ';"  class="tag-value" ' +
            ((json.FREEINPUT == 0) ? ' contenteditable="false" ' : ' contenteditable="true" ') +
            '>' + show + '</span>';
        return html;
    }
    dialog.oncancel = function() {
        if (UE.plugins[thePlugins].editdom) {
            delete UE.plugins[thePlugins].editdom;
        }
    };
    dialog.onok = function() {
        if ($G('txtID').value == '') {
            alert('请输入控件ID');
            return false;
        }

        var txtBINDINGDATA = $G('txtBINDINGDATA'),
            selectIndex = txtBINDINGDATA.selectedIndex,
            selectOptions = txtBINDINGDATA.options,
            selectValue = $G('txtDEFAULTVALUE').getAttribute('tag-value'),
            selectDesc = '',
            selectData = [];
        if (selectOptions != undefined && selectOptions.length > 0) {
            for (var i = 0, l = selectOptions.length; i < l; i++) {
                selectData.push({
                    VALUE: selectOptions[i].value,
                    TEXT: selectOptions[i].text,
                    SELECTED: selectValue == selectOptions[i].value ? 1 : 0
                });
                if (selectValue == selectOptions[i].value)
                    selectDesc = selectOptions[i].text;
            }
        }
        var json = {
            ID: $G('txtID').value,
            TYPE: 'select',
            TAG: $G('txtTAG').value,
            NAME: $G('txtNAME').value,
            REQUIRED: 0,
            FREEINPUT: 0,
            COLOR: $G('txtCOLOR').value,
            VALUE: (selectValue == null || selectValue == '') ? '' : selectValue,
            TEXT: selectDesc,
            REMOTEURL: $G('txtREMOTEURL').value, //url
            BINDINGDATA: selectData //数据
        };
        if ($G('txtREQUIRED').checked) {
            json.REQUIRED = 1;
        }
        var html = makeHtml(json);
        if (!oNode) {
            try {
                oNode = createElement('span', json.ID);
                oNode.setAttribute('title', json.NAME);
                oNode.setAttribute('tag-model', JSON.stringify(json));
                oNode.setAttribute("contenteditable", "false");
                oNode.setAttribute('class', 'tag-bg');
                oNode.setAttribute('jlly', $G('txtJlly').value);
                oNode.setAttribute('jltj', $G('txtJltj').value);
                oNode.setAttribute('hl7value', $G('txtHL7Value').value);
                oNode.setAttribute('hl7', $G('txtHL7').value);
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
            oNode.setAttribute('jlly', $G('txtJlly').value);
            oNode.setAttribute('jltj', $G('txtJltj').value);
            oNode.setAttribute('hl7value', $G('txtHL7Value').value);
            oNode.setAttribute('hl7', $G('txtHL7').value);
            oNode.innerHTML = html;
            delete UE.plugins[thePlugins].editdom;
        }
    };
})(UE);

function BINDINGDATAClick(t) {
    if (t.selectedIndex < 0)
        return;
    $G('txtInputValue').value = t.value;
    $G('txtInputDesc').value = t.options[t.selectedIndex].text;
}

function add() {
    var ss = $G('txtBINDINGDATA');
    //判断是否重复
    var tempoptions = ss.options,
        iscan = true,
        txtInputValue = $G('txtInputValue').value,
        txtInputDesc = $G('txtInputDesc').value;
    //debugger;
    for (var i = 0, l = tempoptions.length; i < l; i++) {
        if (tempoptions[i].value == txtInputValue) {
            alert(txtInputValue + '值已经存在，值不可重复');
            iscan = false;
        } else if (tempoptions[i].text == txtInputDesc) {
            alert(txtInputDesc + '描述已经存在，描述不可重复');
            iscan = false;
        }
        if (!iscan) break;
    }
    if (iscan) {
        var option = document.createElement("option");
        option.text = $G('txtInputDesc').value;
        option.value = $G('txtInputValue').value;
        if (option.text == '') {
            alert('添加描述不可谓空！');
            return;
        }
        if (option.value == '') {
            alert('添加值不可谓空！');
            return;
        }
        try {
            // 对于更早的版本IE8 
            tempoptions.add(option, x.options[null]);
        } catch (e) {
            tempoptions.add(option, null);
        }
    }
    $G('txtInputValue').value = '';
    $G('txtInputDesc').value = '';
}

function edit() {
    var ss = $G('txtBINDINGDATA');
    if (ss.selectedIndex < 0)
        return;
    //判断是否重复
    var tempoptions = ss.options,
        iscan = true,
        txtInputValue = $G('txtInputValue').value,
        txtInputDesc = $G('txtInputDesc').value;
    if (txtInputDesc == '') {
        alert('修改描述不可谓空！');
        return;
    }
    if (txtInputValue == '') {
        alert('修改值不可谓空！');
        return;
    }
    for (var i = 0, l = tempoptions.length; i < l; i++) {
        if (i != ss.selectedIndex) { //不能有相同的
            if (tempoptions[i].value == txtInputValue) {
                alert(txtInputValue + '值已经存在，值不可重复');
                iscan = false;
            } else if (tempoptions[i].text == txtInputDesc) {
                alert(txtInputDesc + '描述已经存在，描述不可重复');
                iscan = false;
            }
        }
        if (!iscan) break;
    }
    if (iscan) {
        ss.options[ss.selectedIndex].value = txtInputValue;
        ss.options[ss.selectedIndex].text = txtInputDesc;
    }
    $G('txtInputValue').value = '';
    $G('txtInputDesc').value = '';
}

function upMove() {
    var ss = $G('txtBINDINGDATA');
    if (ss.selectedIndex < 0)
        return;
    if (ss.selectedIndex == 0) return;
    var currentIndex = ss.selectedIndex;
    var opt = ss.options[currentIndex - 1];
    ss.options.remove(currentIndex - 1);
    ss.options.add(opt, currentIndex);
}

function deleteDefaultOption() {
    var doc = $G('txtDEFAULTVALUE');
    doc.value = '';
    doc.setAttribute('tag-value', '');
}

function downMove() {
    var ss = $G('txtBINDINGDATA');
    if (ss.selectedIndex < 0)
        return;
    if (ss.selectedIndex + 1 == ss.options.length) return;
    var currentIndex = ss.selectedIndex;
    var opt = ss.options[currentIndex + 1];
    ss.options.remove(currentIndex + 1);
    ss.options.add(opt, currentIndex);
}

function setDefault() {
    var ss = $G('txtBINDINGDATA');
    if (ss.selectedIndex < 0)
        return;
    $G('txtDEFAULTVALUE').setAttribute('tag-value', ss.value);
    $G('txtDEFAULTVALUE').value = ss.value + '|' + ss.options[ss.selectedIndex].text; //默认值value|desc
}

function deleteOption() {
    var ss = $G('txtBINDINGDATA');
    if (ss.selectedIndex < 0)
        return;
    if ($G('txtDEFAULTVALUE').getAttribute('tag-value') == ss.value) {
        $G('txtDEFAULTVALUE').setAttribute('tag-value', '');
        $G('txtDEFAULTVALUE').value = '';
    }
    ss.options.remove(ss.selectedIndex);
}
