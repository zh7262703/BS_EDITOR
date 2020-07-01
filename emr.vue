<template>
  <div class="bs">
    <div class="bs-header"></div>
    <div id="toolbarid" class="toolbar" style="width: inherit"></div>
    <div class="bs-editor">
      <div class="bs-editor-content">
        <script type="text/plain" id="editorid"></script>
      </div>
    </div>
  </div>
</template>
<script>
import { all } from "q";
export default {
  name: "EMReditor",
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    },
    toolbar: {
      type: String
    }
  },
  data() {
    return {
      editor: null,
      editorcontentH: "",
      editorModel: WO
    };
  },
  watch: {
    editorcontentH(val, oldval) {
      var winHeight = $(window).height();
      var editorcontentH = val,
        toolbarH = $("#toolbarid").offsetHeight;
      $(".bs-editor")
        .css("height", winHeight - 116 - 30 - toolbarH)
        .css("scroll-y", "auto")
        .css("scroll-x", "hidden");
    },
    "editor.options.editorModel"(val) {
      if (val === "eidt") {
        this.$emit("recordbind");
      }
    }
  },
  beforeMount() {
    // let  tool = "toolbar.config.js"
    // if (localStorage.getItem("type")==="record") {
    //   tool = "toolbar.config.js"
    // } else {
    //   tool = "toolbartemp.config.js"
    // }
    //   alert(tool)
    // import (`@/statics/emr/toolbar/${ tool }`)
  },
  mounted() {
    var my = this;
    //初始化UE保存
    UE.plugins["savecontent"] = function() {
      var me = this;
      me.commands["savecontent"] = {
        execCommand: function(cmdName) {
          var html = me.getContent();
          my.$emit("savechange", html);
        }
      };
    };
    //完成
    UE.plugins["completecontent"] = function() {
      var me = this;
      me.commands["completecontent"] = {
        execCommand: function(cmdName) {
          var html = me.getContent();
          my.$emit("completecontent", html);
        }
      };
    };
    //取消完成
    UE.plugins["cancelcomplete"] = function() {
      var me = this;
      me.commands["cancelcomplete"] = {
        execCommand: function(cmdName) {
          var html = me.getContent();
          my.$emit("cancelcomplete", html);
        }
      };
    };
    //插入关联片段
    UE.plugins["insertcode"] = function() {
      var me = this;
      me.commands["insertcode"] = {
        execCommand: function(cmdName) {
          my.$emit("insertcode");
        }
      };
    };
    //指定病历书写
    UE.plugins["writeassign"] = function() {
      var me = this;
      me.commands["writeassign"] = {
        execCommand: function(cmdName) {
          my.$emit("writeassign");
        }
      };
    };
    //重载模板
    UE.plugins["reloadtemp"] = function() {
      var me = this;
      me.commands["reloadtemp"] = {
        execCommand: function(cmdName) {
          my.$emit("reloadtemp");
        }
      };
    };
    //设置常用
    UE.plugins["savepersonal"] = function() {
      var me = this;
      me.commands["savepersonal"] = {
        execCommand: function(cmdName) {
          my.$emit("savepersonal");
        }
      };
    };
    //医嘱
    UE.plugins["advice"] = function() {
      var me = this;
      me.commands["advice"] = {
        execCommand: function(cmdName) {
          my.$emit("lead", "advice");
        }
      };
    };
    //历史病历
    UE.plugins["history"] = function() {
      var me = this;
      me.commands["history"] = {
        execCommand: function(cmdName) {
          my.$emit("lead", "history");
        }
      };
    };
    //设置常用
    UE.plugins["lis"] = function() {
      var me = this;
      me.commands["lis"] = {
        execCommand: function(cmdName) {
          my.$emit("lead", "lis");
        }
      };
    };
    //检查
    UE.plugins["ris"] = function() {
      var me = this;
      me.commands["ris"] = {
        execCommand: function(cmdName) {
          my.$emit("lead", "ris");
        }
      };
    };
    //诊断
    UE.plugins["diagnose"] = function() {
      var me = this;
      me.commands["diagnose"] = {
        execCommand: function(cmdName) {
          my.$emit("lead", "diagnose");
        }
      };
    };
    //严格模式
    UE.plugins["yangemodel"] = function() {
      var me = this;
      me.commands["yangemodel"] = {
        execCommand: function(cmdName) {
          my.$emit("strictmodel");
        }
      };
    };
    //病程记录
    UE.plugins["bingcheng"] = function() {
      var me = this;
      me.commands["bingcheng"] = {
        execCommand: function(cmdName) {
          my.$emit("bingcheng");
        }
      };
    };
    //刷新
    UE.plugins["refresh"] = function() {
      var me = this;
      me.commands["refresh"] = {
        execCommand: function(cmdName) {
          my.$emit("refresh");
        }
      };
    };
    // eslint-disable-next-line no-unused-vars
    const _this = this;
    // eslint-disable-next-line no-undef
    WO.render("toolbarid", "editorid", "emr/");
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    this.editor = WO.editor;
    //this.editorModel = WO.editor.options.editorModel
    // this.editorcontentH = document.getElementById('editorid').offsetHeight
  },
  destroyed() {
    this.editor.destroy();
  },
  methods: {
    elehidden(type) {
      FUIToolbar.MainConfig.buttons.forEach(params => {
        if (
          (type == "ele" && params.reord == true) ||
          (type == "record" && params.temp === true)
        ) {
          params.className = params.className + "  hidden";
        } else {
          params.className = params.className.replace("hidden", "");
        }
      });
      WO.ConfigTraveller(FUIToolbar.MainConfig, function name(params) {
        if (params.className) {
          if (
            (type == "ele" && params.reord == true) ||
            (type == "record" && params.temp === true)
          ) {
            params.className = params.className + "  hidden";
          } else {
            params.className = params.className.replace("hidden", "");
          }
        }
      });
    },
    hisrecordhidden(type) {
      FUIToolbar.MainConfig.buttons.forEach(params => {
        if (
          (type == "nothis" && params.hisrecord == true)||
          (type == "nothis" && params.temp === true)
        ) {
          params.className = params.className + "  hidden";
        } else {
          params.className = params.className.replace("hidden", "");
        }
      });
      WO.ConfigTraveller(FUIToolbar.MainConfig, function name(params) {
        if (params.className) {
          if (
            (type == "nothis" && params.hisrecord == true) ||
            (type == "nothis" && params.temp === true)
          ) {
            params.className = params.className + "  hidden";
          } else {
            params.className = params.className.replace("hidden", "");
          }
        }
      });
    },
    controlhidden(type) {
      FUIToolbar.MainConfig.buttons.forEach(params => {
        if (
          (type == "control" && params.control == true)
        ) {
          params.className = params.className + "  hidden";
        } else {
          params.className = params.className.replace("hidden", "");
        }
      });
      WO.ConfigTraveller(FUIToolbar.MainConfig, function name(params) {
        if (params.className) {
            // console.log('controlcontrolcontrolcontrolcontrol', params)
          if (
            (type == "control" && params.control == true) 
          ) {
            params.className = params.className + "  hidden";
          } else {
            params.className = params.className.replace("hidden", "");
          }
        }
      });
    },
    bindData: function(data) {
      this.editor.execCommand("databinds", data);
    },
    setViewModel: function() {
      this.editor.execCommand("viewmodel");
    },
    setModel: function(type) {
      this.editor.execCommand(type);
    },
    getGlobalContent: function() {
      return this.editor.execCommand("getstruct");
    },
    insertcode: function(val, flag) {
      return this.editor.execCommand("fragmentfiled", {
        name: val,
        isline: flag
      });
    },
    getUEContent: function() {
      return this.editor.getContent();
    },
    getContentTxt: function() {
      return this.editor.getContentTxt();
    },
    setHtmlContent: function(content) {
      this.editor.setContent(content);
      this.editor.fireEvent("setvalidate");
      this.editor.fireEvent("afterinsertdatefiled");
    },
    getEditorModel: function() {
      return this.editor.options.editorModel;
    },
    setEditorModel: function(type) {
      this.editor.options.editorModel = type;
    },
    addhtmlcontent: function(params) {
      this.editor.execCommand("inserthtml", params);
    },
    ajustHeight: function() {
      var winHeight = $(window).height();
      var editorcontentH = $(".bs-editor").offsetHeight,
        toolbarH = $("#toolbarid").offsetHeight;
      $(".bs-editor")
        .css("height", winHeight - 116 - 30 - toolbarH)
        .css("scroll-y", "auto")
        .css("scroll-x", "hidden");
    }
  }
};
</script>
<style>
body {
  margin: 0;
  background-color: #f1f1f1;
}

.toolbar {
  z-index: 1004 !important;

  left: auto;
  top: 1px;
}

.bs .bs-editor {
  margin: 0 auto;
  margin-top: 30px;
}

.bs .bs-editor .bs-editor-content {
  margin-top: 0px;
}

.edui-default .edui-editor {
  border: 1px solid #d4d4d4 !important;
  background-color: white;
  position: relative;
  overflow: visible;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
}

.edui-default .edui-editor {
  border: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  padding: 0px;
}

.FlexBoxAppContainer {
  position: relative;
  flex-flow: row;
  flex: 1 1 auto;
  display: flex;
}

div.Frame.cui-exth.FlexBoxLayout {
  position: relative;
  flex: 1 1 auto;
  flex-flow: column;
  display: flex;
  -ms-flex: 1 1 auto;
  -ms-flex-direction: column;
  display: -ms-flexbox;
  top: 0;
}

div.Frame.cui-exth {
  height: auto;
  width: auto;
  top: 50px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

div.Frame.FlexBoxLayout {
  position: relative;
  flex: 1 1 auto;
  flex-flow: column;
  display: flex;
  -ms-flex: 1 1 auto;
  -ms-flex-direction: column;
  display: -ms-flexbox;
  top: 0;
}

div.Frame {
  top: 50px;
}

div.Frame {
  border: none;
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 640px;
  min-height: 200px;
}

div.InnerFrame {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  display: -ms-flexbox;
  -ms-flex-flow: column;
  -ms-flex: 1 1 auto;
}

.cui-exth .Toolbar {
  overflow: visible;
}

.Toolbar.FlexBoxLayout {
  position: relative;
  flex: 0 1 auto;
  -ms-flex: 0 1 auto;
}

.Toolbar {
  position: relative;
}

.Toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.DocumentPanel.FlexBoxLayout {
  position: relative;
  flex: 1 1 auto;
  -ms-flex: 1 1 auto;
}

.DocumentPanel {
  bottom: 0;
}

.DocumentPanel {
  position: absolute;
  left: 0;
  right: 0;
  color: #000000;
}

.DocumentPanelContent {
  border: 2px solid transparent;
  border-top: 0;
  border-bottom: 0;
}

.DocumentPanelContent,
.DocumentPanelContentFocused,
.ViewPanelContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.DocumentPanelContent,
.DocumentPanelContentFocused,
.ViewPanelContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.ViewPanel {
  -webkit-tap-highlight-color: transparent;
  z-index: 0;
  background-color: transparent !important;
}

.InteractiveView {
  background-color: window;
}

.ViewPanel,
.ViewPanelLoading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.ViewPanel {
  direction: ltr;
  overflow: hidden;
  color: WindowText;
  outline-style: none;
}

div.SingleOutlineLayout div.View {
  border: hidden 1px Red;
  min-width: 1.5in;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-bottom: 0.375in;
  display: inline-block;
  position: relative;
}

.PageContentOrigin {
  top: 19px;
  position: absolute;
  z-index: 3;
  width: 100%;
}

div.View {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  top: 0;
  position: relative;
  border-color: #ababab;
  border-left-style: solid;
  border-right-style: solid;
  color: WindowText;
  background-color: window;
}

div.View {
  direction: ltr;
  border-width: 1px;
  width: 793px;
  border-top-style: solid;
  border-bottom-style: none;
}

div.ViewLine {
  border: hidden 1px Red;
  min-width: 1.5in;
  height: 510px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-bottom: 0.375in;
  display: inline-block;
  position: relative;
  width: 100%;
  overflow: hidden;
}

div.ViewContent {
  padding: 0;
  height: 100%;
  background-color: transparent;
}
</style>
