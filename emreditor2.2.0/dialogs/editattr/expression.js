(function(UE) {
  var oNode = null;
  thePlugins = 'expression';
  var json = ''; 
  //初始化加载之前编辑的数据
  window.onload = function() {
    var can = editor.selection.getRange().getClosedNode();
    if (UE.plugins[thePlugins].editdom) {
      oNode = UE.plugins[thePlugins].editdom;
      json = JSON.parse(oNode.getAttribute('can-model'));
      if (!json || json == null) {
        alert("无法json序列化！");
        return;
      }
      if (json.CANLINE && json.CANTEXT) {
        UE.utils.each(json.CANTEXT, function(obj, key) {
          if (obj.I == 1) {
            $G('value1').value = obj.TEXT;
          } else if (obj.I == 2) {
            $G('value2').value = obj.TEXT;
          } else if (obj.I == 3) {
            $G('value3').value = obj.TEXT;
          } else if (obj.I == 4) {
            $G('value4').value = obj.TEXT;
          }else if (obj.I == 5) {
            $G('value5').value = obj.TEXT;
          }else if (obj.I == 6) {
            $G('value6').value = obj.TEXT;
          }else if (obj.I == 7) {
            $G('value7').value = obj.TEXT;
          }else if (obj.I == 8) {
            $G('value8').value = obj.TEXT;
          }else if (obj.I == 9) {
            $G('value9').value = obj.TEXT;
          }
        });
      }
    }
    $G('value1').focus();
  };

  dialog.oncancel = function() {
    if (oNode) {
      delete UE.plugins[thePlugins].editdom;
    }
  };
  dialog.onok = function() {
    if(json.CANTEXT[0]){json.CANTEXT[0].TEXT = $G('value1').value;}
    if(json.CANTEXT[1]){json.CANTEXT[1].TEXT = $G('value2').value;}
    if(json.CANTEXT[2]){json.CANTEXT[2].TEXT = $G('value3').value;}
    if(json.CANTEXT[3]){json.CANTEXT[3].TEXT = $G('value4').value;}
    if(json.CANTEXT[4]){json.CANTEXT[4].TEXT = $G('value5').value;}
    if(json.CANTEXT[5]){json.CANTEXT[5].TEXT = $G('value6').value;}
    if(json.CANTEXT[6]){json.CANTEXT[6].TEXT = $G('value7').value;}
    if(json.CANTEXT[7]){json.CANTEXT[7].TEXT = $G('value8').value;}
    if(json.CANTEXT[8]){json.CANTEXT[8].TEXT = $G('value9').value;}

    oNode.setAttribute('can-model', JSON.stringify(json));

    editor.fireEvent("onCanvasEdit");
    
  };
})(UE);