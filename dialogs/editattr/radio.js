function createElement(type, name) {
    var element = null;
    try {
        element = document.createElement('<' + type + ' name="' + name + '">');
    } catch (e) {}
    if (element == null) {
        element = document.createElement(type);
        element.name = name;
    }
    return element;
}


//checkboxs
function isIE() {
    if (window.attachEvent) {
        return true;
    }
    return false;
}
//moveRow在IE支持而在火狐里不支持！以下是扩展火狐下的moveRow
if (!isIE()) {
    function getTRNode(nowTR, sibling) {
        while (nowTR = nowTR[sibling])
            if (nowTR.tagName == 'TR') break;
        return nowTR;
    }
    if (typeof Element != 'undefined') {
        Element.prototype.moveRow = function(sourceRowIndex, targetRowIndex) //执行扩展操作
        {
            if (!/^(table|tbody|tfoot|thead)$/i.test(this.tagName) || sourceRowIndex === targetRowIndex) return false;
            var pNode = this;
            if (this.tagName == 'TABLE') pNode = this.getElementsByTagName('tbody')[0]; //firefox会自动加上tbody标签，所以需要取tbody，直接table.insertBefore会error
            var sourceRow = pNode.rows[sourceRowIndex],
                targetRow = pNode.rows[targetRowIndex];
            if (sourceRow == null || targetRow == null) return false;
            var targetRowNextRow = sourceRowIndex > targetRowIndex ? false : getTRNode(targetRow, 'nextSibling');
            if (targetRowNextRow === false) pNode.insertBefore(sourceRow, targetRow); //后面行移动到前面，直接insertBefore即可
            else { //移动到当前行的后面位置，则需要判断要移动到的行的后面是否还有行，有则insertBefore，否则appendChild
                if (targetRowNextRow == null) pNode.appendChild(sourceRow);
                else pNode.insertBefore(sourceRow, targetRowNextRow);
            }
        }
    }
}

/*删除tr*/
function fnDeleteRow(obj) {
    var oTable = document.getElementById("options_table");
    while (obj.tagName != 'TR') {
        obj = obj.parentNode;
    }
    oTable.deleteRow(obj.rowIndex);
}
/*上移*/
function fnMoveUp(obj) {
    var oTable = document.getElementById("options_table");
    while (obj.tagName != 'TR') {
        obj = obj.parentNode;
    }
    var minRowIndex = 1;
    var curRowIndex = obj.rowIndex;
    if (curRowIndex - 1 >= minRowIndex) {
        oTable.moveRow(curRowIndex, curRowIndex - 1);
    }

}
/*下移*/
function fnMoveDown(obj) {
    var oTable = document.getElementById("options_table");
    while (obj.tagName != 'TR') {
        obj = obj.parentNode;
    }
    var maxRowIndex = oTable.rows.length;
    var curRowIndex = obj.rowIndex;
    if (curRowIndex + 1 < maxRowIndex) {
        oTable.moveRow(curRowIndex, curRowIndex + 1);
    }
}

/*生成tr*/
function fnAddComboTr(gName, obj) {
    var oTable = document.getElementById('options_table');
    var new_tr_node = oTable.insertRow(oTable.rows.length);
    var new_td_node0 = new_tr_node.insertCell(0),
        new_td_node1 = new_tr_node.insertCell(1),
        new_td_node2 = new_tr_node.insertCell(2);

    var sChecked = '';
    if (obj.checked) sChecked = 'checked="checked"';
    if (!obj.name) obj.name = '';
    if (!obj.value) obj.value = '';
    new_td_node0.innerHTML = '<td><input type="radio" ' + sChecked + ' name="' + gName + '"></td>';
    new_td_node1.innerHTML = '<td><input type="text" value="' + obj.value + '" name="' + gName + '" placeholder="选项值"></td>';
    new_td_node2.innerHTML = '<td><div class="btn-group"><a title="上移" class="btn btn-small btn-warning" href="javascript:void(0);" onclick="fnMoveUp(this)"><i class="icon-white icon-arrow-up"></i></a>&nbsp;&nbsp;<a title="下移" class="btn btn-small btn-warning" href="javascript:void(0);" onclick="fnMoveDown(this)"><i class="icon-white icon-arrow-down"></i></a><a title="删除" class="btn btn-small btn-info" href="javascript:void(0);" onclick="fnDeleteRow(this)"><i class="icon-ban-circle"></i></a></div></td>';
    return true;
}

function fnAdd() {
    var dName = $G('hidname').value;
    if (!dName) dName = 'leipiNewField';
    fnAddComboTr(dName, {
        "checked": false,
        "name": 'leipiNewField',
        "value": ''
    });
}
/*组合checkbox*/
function fnParseOptions(gName, gChecked) {
    var oTable = document.getElementById('options_table');
    var nTr = oTable.getElementsByTagName('tr'),
        trLength = nTr.length,
        html = "";
    for (var i = 0; i < trLength; i++) {
        var inputs = nTr[i].getElementsByTagName('input');

        if (inputs.length > 0) {
            if (!inputs[1].value) continue;
            var sChecked = '';
            if (inputs[0].checked) sChecked = 'checked'; // 在ie中，checked的值是空的 ,兼容IE 不要改为 checked="checked"  感谢@李静反馈
            html += '<input name="' + gName + '" value="' + inputs[1].value + '" ' + sChecked + ' type="radio"/>' + inputs[1].value + '&nbsp;';
            if (gChecked == 'orgchecked1') //竖排
                html += '<br/>';
        }
    }
    //alert(html);
    return html;

}

var oNode = null,
    thePlugins = 'radios';
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
    if (!UE.plugins[thePlugins].editdom) {
        thePlugins = 'editattr';
    }
    if (UE.plugins[thePlugins].editdom) {
        oNode = UE.plugins[thePlugins].editdom;
        var gTitle = oNode.getAttribute('title').replace(/&quot;/g, "\"");
        var gName = oNode.getAttribute('name').replace(/&quot;/g, "\"");
        $G('orgname').value = gTitle;
        $G('hidname').value = gName;
        var checked = oNode.getAttribute('orgchecked');
        checked == 'orgchecked1' ? $G('orgchecked1').checked = true : $G('orgchecked0').checked = true;

        var inputTags = oNode.getElementsByTagName('input');
        var length = inputTags.length;
        var aInputs = [];
        for (var i = 0; i < length; i++) {
            if (inputTags[i].type == 'radio')
                fnAddComboTr(gName, inputTags[i]);
        }


    }
}
dialog.oncancel = function() {
    if (UE.plugins[thePlugins].editdom) {
        delete UE.plugins[thePlugins].editdom;
    }
};
dialog.onok = function() {
    if ($G('orgname').value == '') {
        alert('控件名称不能为空');
        return false;
    }
    var gTitle = $G('orgname').value.replace(/\"/g, "&quot;");

    var gChecked = 'orgchecked0';
    if ($G('orgchecked1').checked) gChecked = 'orgchecked1';


    if (!oNode) {
        try {
            var options = fnParseOptions("NewField", gChecked);
            if (!options) {
                alert('请添加选项');
                return false;
            }
            var json = {
                TYPE: 'radios',
            };

            if (!oNode) {
                oNode = createElement('span');
            }
            var d = new Date();
            var jsonid = d.valueOf();
            oNode.setAttribute('title', gTitle);
            oNode.setAttribute('tag-model', JSON.stringify(json));
            oNode.setAttribute("name", "NewField-"+jsonid);
            oNode.innerHTML = options;
            editor.execCommand('insertHtml', oNode.outerHTML);
            return true;
        } catch (e) {
            try {
                editor.execCommand('error');
            } catch (e) {
                alert('控件异常，请联系管理员！');
            }
            return false;
        }
    } else {
        var gName = oNode.getAttribute('name').replace(/&quot;/g, "\"");
        oNode.setAttribute('title', gTitle);
        oNode.setAttribute('orgchecked', gChecked);
        oNode.innerHTML = fnParseOptions(gName, gChecked);
        delete UE.plugins[thePlugins].editdom;
        return true;
    }
};
