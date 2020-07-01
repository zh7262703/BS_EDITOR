(function(UE) {
    var oNode = null;
    thePlugins = 'expressioncustom';
    var json = '';
    //初始化加载之前编辑的数据
    window.onload = function() {
        var can = editor.selection.getRange().getClosedNode();
        if (UE.plugins[thePlugins].editdom) {
            oNode = UE.plugins[thePlugins].editdom;
            var js = oNode.getAttribute('can-model');

            $G('customJs').value = js;
        }
    };
    function test() {
        eval($G('customJs').value);
    }
    dialog.oncancel = function() {
        if (oNode) {
            delete UE.plugins[thePlugins].editdom;
        }
    };
    dialog.onok = function() {
        oNode.setAttribute('can-model', JSON.stringify(json));

        editor.fireEvent("onCanvasEdit");

    };
})(UE);
