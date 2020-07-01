(function() {

    /* 工具栏的配置项，FUI根据它来生成 Toolbar */
    FUIToolbar.MainConfig = {
        clazz: 'Tabs',
        className: 'wo-tabs',
        /* 在其他几个配置文件添加 tab 按钮 */
        buttons: [],
        /* 在其他几个配置文件添加 tab 内容 */
        panels: []
    };
    
    /**
     * 工具栏上"编辑"tab的配置项
     * @zuokk
     * @date 2017-07-20
     */

    (function() {

        /* 字体下拉框的配置项 */
        var fontfamily = {
                'clazz': 'InputMenu',
                'id': 'fontfamily',
                'className': 'wo-input-menu-fontfamily',
                'text': '字体格式',
                'select': 0,
                'input': {
                    'placeholder': '字体格式'
                },
                'menu': {
                    'items': (function() {
                        var result = [];
                        $.each([{
                            'name': 'songti',
                            'val': '宋体,SimSun'
                        }, {
                            'name': 'yahei',
                            'val': '微软雅黑,Microsoft YaHei'
                        }, {
                            'name': 'kaiti',
                            'val': '楷体,楷体_GB2312, SimKai'
                        }, {
                            'name': 'heiti',
                            'val': '黑体, SimHei'
                        }, {
                            'name': 'lishu',
                            'val': '隶书, SimLi'
                        }, {
                            'name': 'andaleMono',
                            'val': 'andale mono'
                        }, {
                            'name': 'arial',
                            'val': 'arial, helvetica,sans-serif'
                        }, {
                            'name': 'arialBlack',
                            'val': 'arial black,avant garde'
                        }, {
                            'name': 'comicSansMs',
                            'val': 'comic sans ms'
                        }, {
                            'name': 'impact',
                            'val': 'impact,chicago'
                        }, {
                            'name': 'timesNewRoman',
                            'val': 'times new roman'
                        }], function(k, item) {
                            result.push({
                                'value': item.val,
                                'label': {
                                    'text': item.name,
                                    'style': {
                                        'font-family': item.val,
                                        'font-size': '18px'
                                    }
                                }
                            })
                        });
                        return result
                    })()
                }
            },
            fontsize = {
                'clazz': 'InputMenu',
                'id': 'fontsize',
                'className': 'wo-input-menu-fontsize',
                'text': '字号',
                'select': 4,
                'input': {
                    'placeholder': '字号'
                },
                'menu': {
                    'items': (function() {
                        var result = [];
                        UE.utils.each([10, 11, 12, 14, 16, 18, 20, 24, 36], function(val) {
                            result.push({
                                'value': val + 'px',
                                'label': {
                                    'text': val + 'px',
                                    'style': {
                                        'font-size': val + 'px'
                                    }
                                }
                            })
                        });
                        return result
                    })()
                }
            },
            paragraph = {
                'clazz': 'InputMenu',
                'id': 'paragraph',
                'className': 'wo-input-menu-paragraph',
                'text': '段落格式',
                'select': 0,
                'input': {
                    'placeholder': '段落格式'
                },
                'menu': {
                    'items': [{
                        'className': 'ext-p',
                        'label': '段落',
                        'value': 'p'
                    }, {
                        'className': 'ext-blockquote',
                        'label': '引用',
                        'value': 'blockquote'
                    }, {
                        'className': 'ext-h1',
                        'label': '标题1',
                        'value': 'h1'
                    }, {
                        'className': 'ext-h2',
                        'label': '标题2',
                        'value': 'h2'
                    }, {
                        'className': 'ext-h3',
                        'label': '标题3',
                        'value': 'h3'
                    }, {
                        'className': 'ext-h4',
                        'label': '标题4',
                        'value': 'h4'
                    }, {
                        'className': 'ext-h5',
                        'label': '标题5',
                        'value': 'h5'
                    }, {
                        'className': 'ext-h6',
                        'label': '标题6',
                        'value': 'h6'
                    }]
                }
            },
            unorderedlist = {
                'clazz': 'ButtonMenu',
                'id': 'unorderedlist',
                '_cmd': 'insertunorderedlist',
                'className': 'wo-btnmenu-unorderedlist',
                'text': '编号',
                'selected': 1,
                'buttons': [{
                    'className': 'fui-button-menu-button'
                }, {
                    'className': 'fui-button-menu-down'
                }],
                'menu': {
                    'items': [{
                        'label': '○ 空心项目符号',
                        'value': 'circle'
                    }, {
                        'label': '● 实心项目符号',
                        'value': 'disc'
                    }, {
                        'label': '■ 方形项目符号',
                        'value': 'square'
                    }]
                }
            },
            orderedlist = {
                'clazz': 'ButtonMenu',
                'id': 'orderedlist',
                '_cmd': 'insertorderedlist',
                'className': 'wo-btnmenu-orderedlist',
                'text': '编号',
                'selected': 0,
                'buttons': [{
                    'className': 'fui-button-menu-button'
                }, {
                    'className': 'fui-button-menu-down'
                }],
                'menu': {
                    'items': [{
                        'label': '1., 2., 3., 4.,  ',
                        'value': 'decimal'
                    }, {
                        'label': 'a., b., c., d.,  ',
                        'value': 'lower-alpha'
                    }, {
                        'label': 'i., ii., iii., iv.,  ',
                        'value': 'lower-roman'
                    }, {
                        'label': 'A., B., C., D.,  ',
                        'value': 'upper-alpha'
                    }, {
                        'label': 'I., II., III., IV.,  ',
                        'value': 'upper-roman'
                    }]
                }
            },
            rowspacingtop = {
                'clazz': 'ButtonMenu',
                'id': 'rowspacingtop',
                'className': 'wo-btnmenu-rowspacingtop',
                'text': '段前距',
                'selected': 0,
                'buttons': [{
                    'className': 'fui-button-menu-button'
                }, {
                    'className': 'fui-button-menu-down'
                }],
                'menu': {
                    'items': [{
                        'label': '5px',
                        'value': 5
                    }, {
                        'label': '10px',
                        'value': 10
                    }, {
                        'label': '15px',
                        'value': 15
                    }, {
                        'label': '20px',
                        'value': 20
                    }, {
                        'label': '25px',
                        'value': 25
                    }]
                }
            },
            rowspacingbottom = {
                'clazz': 'ButtonMenu',
                'id': 'rowspacingbottom',
                'className': 'wo-btnmenu-rowspacingbottom',
                'text': '段后距',
                'selected': 0,
                'buttons': [{
                    'className': 'fui-button-menu-button'
                }, {
                    'className': 'fui-button-menu-down'
                }],
                'menu': {
                    'items': [{
                        'label': '5px',
                        'value': 5
                    }, {
                        'label': '10px',
                        'value': 10
                    }, {
                        'label': '15px',
                        'value': 15
                    }, {
                        'label': '20px',
                        'value': 20
                    }, {
                        'label': '25px',
                        'value': 25
                    }]
                }
            },
            lineheight = {
                'clazz': 'ButtonMenu',
                'id': 'lineheight',
                'className': 'wo-btnmenu-lineheight',
                'text': '行高',
                'selected': 0,
                'buttons': [{
                    'className': 'fui-button-menu-button'
                }, {
                    'className': 'fui-button-menu-down'
                }],
                'menu': {
                    'items': (function() {
                        var result = [];
                        UE.utils.each([1, 1.5, 1.75, 2, 3, 4, 5], function(val) {
                            result.push({
                                'value': val,
                                'label': val
                            })
                        });
                        return result
                    })()
                }
            },
            fontstyle = {
                'clazz': 'DropPanel',
                'id': 'fontstyle',
                'className': 'wo-drop-panel wo-drop-panel-fontstyle',
                'button': {
                    'className': 'fui-drop-panel-down'
                }
            };

        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '编辑'
        });

        /* 设置 tab 内容 */
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-edit',
            'widgets': [{
                'clazz': 'LabelPanel',
                'id': 'blockhistory',
                'className': 'wo-block wo-blockhistory',
                'label': '历史记录',
                'layout': 'top',
                'widgets': [{
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'undo',
                        'className': 'wo-btn wo-btn-undo',
                        'text': '撤销',
                        'label': '撤销'
                    }, {
                        'clazz': 'Button',
                        'id': 'redo',
                        'className': 'wo-btn wo-btn-redo',
                        'text': '恢复',
                        'label': '恢复'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'drafts1',
                        '_cmd': 'drafts',
                        'className': 'wo-btn wo-btn-drafts',
                        'text': '草稿箱',
                        'label': '草稿箱',
                        'layout': 'bottom'
                    }]
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockclipboard',
                'className': 'wo-block wo-blockclipboard',
                'label': '剪贴板',
                'layout': 'top',
                'widgets': [{
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'column': true,
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'copy',
                        'className': 'wo-btn wo-btn-copy',
                        'text': '复制',
                        'label': '复制'
                    }, {
                        'clazz': 'Button',
                        'id': 'cut',
                        'className': 'wo-btn wo-btn-cut',
                        'text': '剪切',
                        'label': '剪切'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'paste',
                        'className': 'wo-btn wo-btn-paste',
                        'text': '粘贴',
                        'label': '粘贴',
                        'layout': 'bottom'
                    }]
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockfont',
                'className': 'wo-block wo-blockfont',
                'label': '字体',
                'layout': 'top',
                'column': true,
                'widgets': [{
                    'clazz': 'Panel',
                    'className': 'wo-line wo-line-1',
                    'widgets': [fontfamily, {
                        'clazz': 'Button',
                        'id': 'removeformat',
                        'className': 'wo-btn wo-btn-removeformat',
                        'label': '清除格式',
                        'text': '清除格式'
                    }, {
                        'clazz': 'Button',
                        'id': 'autotypeset',
                        'className': 'wo-btn wo-btn-autotypeset',
                        'label': '自动格式化',
                        'text': '自动格式化'
                    }, {
                        'clazz': 'Button',
                        'id': 'formatmatch',
                        'className': 'wo-btn wo-btn-formatmatch',
                        'label': '格式刷',
                        'text': '格式刷'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line wo-line-2',
                    'widgets': [fontsize, {
                        'clazz': 'Button',
                        'id': 'upsize',
                        'className': 'wo-btn wo-btn-upsize',
                        'text': '增大字体'
                    }, {
                        'clazz': 'Button',
                        'id': 'downsize',
                        'className': 'wo-btn wo-btn-downsize',
                        'text': '缩小字体'
                    }, {
                        'clazz': 'Button',
                        'id': 'fontborder',
                        'className': 'wo-btn wo-btn-fontborder',
                        'text': '字体边框'
                    },{
                        'clazz': 'Button',
                        'id': 'subscript',
                        'className': 'wo-btn wo-btn-subscript',
                        'text': '上标'
                    }, {
                        'clazz': 'Button',
                        'id': 'superscript',
                        'className': 'wo-btn wo-btn-superscript',
                        'text': '下标'
                    }, {
                        'clazz': 'Button',
                        'id': 'bold',
                        'className': 'wo-btn wo-btn-bold',
                        'text': '加粗'
                    }, {
                        'clazz': 'Button',
                        'id': 'italic',
                        'className': 'wo-btn wo-btn-italic',
                        'text': '倾斜'
                    }, {
                        'clazz': 'Button',
                        'id': 'underline',
                        'className': 'wo-btn wo-btn-underline',
                        'text': '下划线'
                    }, {
                        'clazz': 'Button',
                        'id': 'strikethrough',
                        'className': 'wo-btn wo-btn-strikethrough',
                        'text': '删除线'
                    }, {
                        'clazz': 'Button',
                        'id': 'forecolor',
                        'className': 'wo-btn wo-btn-forecolor',
                        'text': '文字颜色'
                    }, {
                        'clazz': 'Button',
                        'id': 'backcolor',
                        'className': 'wo-btn wo-btn-backcolor',
                        'text': '背景颜色'
                    }]
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockparagraph',
                'className': 'wo-block wo-blockparagraph',
                'label': '段落',
                'layout': 'top',
                'column': true,
                'widgets': [{
                    'clazz': 'Panel',
                    'className': 'wo-line wo-line-1',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'justifyleft',
                        'className': 'wo-btn wo-btn-justifyleft',
                        'text': '向左对齐'
                    }, {
                        'clazz': 'Button',
                        'id': 'justifycenter',
                        'className': 'wo-btn wo-btn-justifycenter',
                        'text': '居中对齐'
                    }, {
                        'clazz': 'Button',
                        'id': 'justifyright',
                        'className': 'wo-btn wo-btn-justifyright',
                        'text': '向右对齐'
                    }, {
                        'clazz': 'Button',
                        'id': 'justifyjustify',
                        'className': 'wo-btn wo-btn-justifyjustify',
                        'text': '两端对齐'
                    }, {
                        'clazz': 'Button',
                        'id': 'blockquote',
                        'className': 'wo-btn wo-btn-blockquote',
                        'text': '引用'
                    }, {
                        'clazz': 'Button',
                        'id': 'blockindent',
                        'className': 'wo-btn wo-btn-blockindent',
                        'text': '增加缩进'
                    }, {
                        'clazz': 'Button',
                        'id': 'blockoutdent',
                        'className': 'wo-btn wo-btn-blockoutdent',
                        'text': '减少缩进'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line wo-line-2',
                    'widgets': [
                        unorderedlist,
                        orderedlist,
                        rowspacingtop,
                        rowspacingbottom,
                        lineheight
                    ]
                }]
            }]
        });

    })();

    /**
     * 工具栏上"插入"tab的配置项
     * @author zuokk
     * @date 2017-07-20
     */

    (function() {

        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '插入'
        });

        /* 设置 tab 内容 */
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-insert',
            'widgets': [{
                    'clazz': 'LabelPanel',
                    'id': 'blockpage',
                    'className': 'wo-block wo-blockpage',
                    'layout': 'top',
                    'label': '知识库',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'repository',
                        'className': 'wo-btn wo-btn-designmodel',
                        'text': '知识库',
                        'label': '知识库',
                        'layout': 'bottom',
                        '_dialog': {
                            'width': 820,
                            'height': 575,
                            'caption': '知识库'
                        }
                    }]
                },{
                    'clazz': 'LabelPanel',
                    'id': 'blockpage',
                    'className': 'wo-block wo-blockpage',
                    'layout': 'top',
                    'label': '结构化',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'struct',
                        'className': 'wo-btn wo-btn-designmodel',
                        'text': '结构化',
                        'label': '结构化',
                        'layout': 'bottom',
                        '_dialog': {
                            'width': 620,
                            'height': 575,
                            'caption': '结构化数据'
                        }
                    }]
                },{
                    'clazz': 'LabelPanel',
                    'id': 'blockpage',
                    'className': 'wo-block wo-blockpage',
                    'layout': 'top',
                    'label': '页',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'horizontal',
                        'className': 'wo-btn wo-btn-horizontal',
                        'text': '分页符',
                        'label': '分页符',
                        'layout': 'bottom'
                    }]
                }, {
                    'clazz': 'LabelPanel',
                    'id': 'blockchar',
                    'className': 'wo-block wo-blockchar',
                    'layout': 'top',
                    'label': '字符',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'spechars',
                        'className': 'wo-btn wo-btn-spechars',
                        'text': '字符',
                        'label': '字符',
                        'layout': 'bottom',
                        '_dialog': {
                            'width': 620,
                            'height': 575,
                            'caption': '插入字符'
                        }
                    }]
                }, {
                    'clazz': 'LabelPanel',
                    'id': 'blocklink',
                    'className': 'wo-block wo-blocklink',
                    'layout': 'top',
                    'label': '链接',
                    'column': true,
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'link',
                        'className': 'wo-btn wo-btn-link',
                        'text': '添加',
                        'label': '添加',
                        '_dialog': {
                            'width': 420,
                            'height': 250,
                            'caption': '添加'
                        }
                    }, {
                        'clazz': 'Button',
                        'id': 'unlink',
                        'className': 'wo-btn wo-btn-unlink',
                        'text': '取消',
                        'label': '取消'
                    }]
                }, {
                    'clazz': 'LabelPanel',
                    'id': 'blockimage',
                    'className': 'wo-block wo-blockimage',
                    'layout': 'top',
                    'label': '影像',
                    'widgets': [{
                            'clazz': 'Button',
                            'id': 'insertimage',
                            'className': 'wo-btn wo-btn-insertimage',
                            'text': '图片',
                            'label': '图片',
                            'layout': 'bottom',
                            '_dialog': {
                                'width': 680,
                                'height': 500,
                                'caption': '插入图片'
                            }
                        },
                        /*{
                                               'clazz': 'Button',
                                               'id': 'simpleupload',
                                               'className': 'wo-btn wo-btn-simpleupload',
                                               'text': '单图',
                                               'label': '单图',
                                               'layout': 'bottom'
                                           }, */
                        {
                            'clazz': 'Button',
                            'id': 'insertvideo',
                            'className': 'wo-btn wo-btn-insertvideo',
                            'text': '视频',
                            'label': '视频',
                            'layout': 'bottom',
                            '_dialog': {
                                'width': 680,
                                'height': 500,
                                'caption': '插入视频'
                            }
                        }, {
                            'clazz': 'Button',
                            'id': 'barcode',
                            'className': 'wo-btn wo-btn-barcode',
                            'text': '条形码',
                            'label': '条形码',
                            'layout': 'bottom'
                        }, {
                            'clazz': 'Button',
                            'id': 'qrcode',
                            'className': 'wo-btn wo-btn-qrcode',
                            'text': '二维码',
                            'label': '二维码',
                            'layout': 'bottom'
                        }
                    ]
                },
                //输入域
                {
                    'clazz': 'LabelPanel',
                    'id': 'blockimage',
                    'className': 'wo-block wo-blockimage',
                    'layout': 'top',
                    'label': '输入域',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'textfiled',
                        'className': 'wo-btn wo-btn-textfiled',
                        'text': '文本域',
                        'label': '文本域',
                        'layout': 'bottom'
                    }, {
                        'clazz': 'Button',
                        'id': 'selectfiled',
                        'className': 'wo-btn wo-btn-selectfiled',
                        'text': '下拉域',
                        'label': '下拉域',
                        'layout': 'bottom'
                    }, {
                        'clazz': 'Button',
                        'id': 'datefiled',
                        'className': 'wo-btn wo-btn-datefiled',
                        'text': '日期域',
                        'label': '日期域',
                        'layout': 'bottom'
                    }, {
                        'clazz': 'Button',
                        'id': 'articlefiled',
                        'className': 'wo-btn wo-btn-textfiled',
                        'text': '章节',
                        'label': '章节',
                        'layout': 'bottom'
                    }]
                },
                //框
                {
                    'clazz': 'LabelPanel',
                    'id': 'blockimage',
                    'className': 'wo-block wo-blockimage',
                    'layout': 'top',
                    'label': '框',
                    'column': true,
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'radios',
                        'className': 'wo-btn wo-btn-radio',
                        'text': '单选框',
                        'label': ' 单选'
                    }, {
                        'clazz': 'Button',
                        'id': 'checkboxs',
                        'className': 'wo-btn wo-btn-check',
                        'text': '复选框',
                        'label': ' 复选'
                    }]
                },
                {
                    'clazz': 'LabelPanel',
                    'id': 'blockcode',
                    'className': 'wo-block wo-blockcode',
                    'layout': 'top',
                    'label': '代码',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'insertcode',
                        'className': 'wo-btn wo-btn-insertcode',
                        'text': '代码',
                        'label': '代码',
                        'layout': 'bottom'
                    }]
                },
                /*{
                                   'clazz': 'LabelPanel',
                                   'id': 'blocktable',
                                   'className': 'wo-block wo-blocktable',
                                   'layout': 'top',
                                   'label': '表格',
                                   'widgets': [{
                                       'clazz': 'TablePicker',
                                       'id': 'inserttable1',
                                       '_cmd': 'inserttable',
                                       'button': {
                                           'className': 'wo-btn wo-btn-inserttable',
                                           'text': '表格',
                                           'label': '表格',
                                           'layout': 'bottom'
                                       }
                                   }]
                               }, */
                {
                    'clazz': 'LabelPanel',
                    'id': 'blockformula',
                    'className': 'wo-block wo-blockformula',
                    'layout': 'top',
                    'label': '表达式',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'kityformula',
                        'className': 'wo-btn wo-btn-insertformula',
                        'text': '表达式',
                        'label': '表达式',
                        'layout': 'bottom',
                        '_dialog': {
                            'width': 833,
                            'height': 486,
                            'caption': '插入表达式'
                        }
                    }]
                }
                /*{
                                   'clazz': 'LabelPanel',
                                   'id': 'blockformula',
                                   'className': 'wo-block wo-blockformula',
                                   'layout': 'top',
                                   'label': 'HL7',
                                   'widgets': [{
                                       'clazz': 'Button',
                                       'id': 'hl7',
                                       'className': 'wo-btn wo-btn-insertformula',
                                       'text': 'HL7',
                                       'label': 'HL7',
                                       'layout': 'bottom',
                                       '_dialog': {
                                           'width': 250,
                                           'height': 600,
                                           'caption': '插入HL7'
                                       }
                                   }]
                               }, */
            ]
        });

    })();

    /**
     * 工具栏上"表格"tab的配置项
     * @author zuokk
     * @date 2017-07-20
     */

    (function() {

        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '表格'
        });

        /* 设置 tab 内容 */
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-table',
            'widgets': [{
                    'clazz': 'LabelPanel',
                    'id': 'blocktable',
                    'className': 'wo-block wo-blocktable',
                    'layout': 'top',
                    'label': '表格',
                    'widgets': [{
                        'clazz': 'Panel',
                        'widgets': [{
                            'clazz': 'TablePicker',
                            'id': 'inserttable2',
                            '_cmd': 'inserttable',
                            'button': {
                                'className': 'wo-btn wo-btn-inserttable',
                                'text': '插入表格',
                                'label': '插入表格',
                                'layout': 'bottom'
                            }
                        }, {
                            'clazz': 'Button',
                            'id': 'deletetable',
                            'className': 'wo-btn wo-btn-deletetable',
                            'text': '删除表格',
                            'label': '删除表格',
                            'layout': 'bottom'
                        }]
                    }, {
                        'clazz': 'Panel',
                        'column': true,
                        'widgets': [{
                            'clazz': 'Panel',
                            'widgets': [{
                                'clazz': 'Button',
                                'id': 'insertrow',
                                'className': 'wo-btn wo-btn-insertrow',
                                'text': '插入行'
                            }, {
                                'clazz': 'Button',
                                'id': 'insertcol',
                                'className': 'wo-btn wo-btn-insertcol',
                                'text': '插入列'
                            }]
                        }, {
                            'clazz': 'Panel',
                            'widgets': [{
                                'clazz': 'Button',
                                'id': 'deleterow',
                                'className': 'wo-btn wo-btn-deleterow',
                                'text': '删除行'
                            }, {
                                'clazz': 'Button',
                                'id': 'deletecol',
                                'className': 'wo-btn wo-btn-deletecol',
                                'text': '删除列'
                            }]
                        }]
                    }]
                }, {
                    'clazz': 'LabelPanel',
                    'id': 'blockmergecells',
                    'className': 'wo-block wo-blockmergecells',
                    'layout': 'top',
                    'label': '合并单元格',
                    'column': true,
                    'widgets': [{
                        'clazz': 'Panel',
                        'widgets': [{
                            'clazz': 'Button',
                            'id': 'mergecells',
                            'className': 'wo-btn wo-btn-mergecells',
                            'text': '合并单元格'
                        }, {
                            'clazz': 'Button',
                            'id': 'mergedown',
                            'className': 'wo-btn wo-btn-mergedown',
                            'text': '向下合并单元格'
                        }, {
                            'clazz': 'Button',
                            'id': 'mergeright',
                            'className': 'wo-btn wo-btn-mergeright',
                            'text': '向右合并单元格'
                        }]
                    }, {
                        'clazz': 'Panel',
                        'widgets': [{
                            'clazz': 'Button',
                            'id': 'splittocells',
                            'className': 'wo-btn wo-btn-splittocells',
                            'text': '拆分单元格'
                        }, {
                            'clazz': 'Button',
                            'id': 'splittocols',
                            'className': 'wo-btn wo-btn-splittocols',
                            'text': '单元格拆分成列'
                        }, {
                            'clazz': 'Button',
                            'id': 'splittorows',
                            'className': 'wo-btn wo-btn-splittorows',
                            'text': '单元格拆分成行'
                        }]
                    }]
                }
                /*, {
                            'clazz': 'LabelPanel',
                            'id': 'blockcellinfo',
                            'className': 'wo-block wo-blockcellinfo',
                            'layout': 'top',
                            'label': '单元格'
                        }*/
            ]
        });

    })();

    /**
     * 工具栏上"视图"tab的配置项
     * @author zuokk
     * @date 2017-07-20
     */

    (function() {

        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '视图审阅'
        });

        /* 设置 tab 内容 */
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-edit',
            'widgets': [{
                'clazz': 'LabelPanel',
                'id': 'blockeditmode',
                'className': 'wo-block wo-blockeditmode',
                'layout': 'top',
                'label': '编辑模式',
                'widgets': [{
                        'clazz': 'Button',
                        'id': 'source',
                        'className': 'wo-btn wo-btn-source',
                        'text': '源码模式',
                        'label': '源码模式',
                        'layout': 'bottom'
                    },
                    {
                        'clazz': 'Button',
                        'id': 'markmodel',
                        'className': 'wo-btn wo-btn-markmodel',
                        'text': '留痕模式',
                        'label': '留痕模式',
                        'layout': 'bottom'
                    },
                    {
                        'clazz': 'Button',
                        'id': 'designmodel',
                        'className': 'wo-btn wo-btn-designmodel',
                        'text': '设计模式',
                        'label': '设计模式',
                        'layout': 'bottom'
                    },
                    {
                        'clazz': 'Button',
                        'id': 'editmodel',
                        'className': 'wo-btn wo-btn-editmodel',
                        'text': '编辑模式',
                        'label': '编辑模式',
                        'layout': 'bottom'
                    },
                    {
                        'clazz': 'Button',
                        'id': 'viewmodel',
                        'className': 'wo-btn wo-btn-viewmodel',
                        'text': '预览模式',
                        'label': '预览模式',
                        'layout': 'bottom'
                    }
                ]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockshowcomment',
                'className': 'wo-block wo-blockshowcomment',
                'layout': 'top',
                'label': '批注',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'comment',
                    'className': 'wo-btn wo-btn-comment',
                    'text': '批注',
                    'label': '插入批注',
                    'layout': 'bottom'
                }, {
                    'clazz': 'Button',
                    'id': 'showcomment',
                    'className': 'wo-btn wo-btn-showcomment',
                    'text': '显示批注',
                    'label': '显示批注',
                    'layout': 'bottom'
                }]
            }]
        });

    })();

    /**
     * 工具栏上"工具"tab的配置项
     * @zuokk
     * @date 2017-07-20
     */

    (function() {
        var pagedistance = {
                'clazz': 'ButtonMenu',
                'id': 'pagedistance',
                'className': 'wo-btnmenu-pagedistance',
                'text': '页边距',
                'label': '页边距',
                "layout": "bottom",
                'selected': 0,
                'buttons': [{
                    'width': 60,
                    'className': 'ext-spelling',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BJREFUeNq8V7tuE0EUPTP78CtB0FFFyS8gEAVIFBGRUEAi0AJpQEjUfAE1NRWN43REkBBMeAREEVp+AUhFhxQlju31znLv7I73Ya/tBNsTTWaz9u4595x770wEALtarW4KIZaVUgiCAJMchAMpJePUV1dXb/O92bW1tWDagzEZ26ZfRY6cx89f+8RwogKABV6Yn0OEWWQCwsgupdASiQmxYByDFa3CTvsjNYlJ+q9UOsfSBBIKjFsFEz3FmE9ARsCWZcFxHL0mX5Bcu4aGoaWiTK48fN+H53l6zeBnFGACVCK2bWNl5S4qlTIc14VL0yZCDt13HZfI2Zogf8bf99ptAujQpLXtodPx0CZABm23Wmg0GtjYeAXFhKOEz1cgiuzd9lZKAb4XZBQw1yKhQp4CbSLJ0QcZa3sVyE5+yACwhyKhfPxgikj4p+j7XgyzQFKWcOTLN2+hXK6Q/KHULDnb4NpOKD/b4BZ04rLUHZabouwY6bUlxoIjbG2+gfIV+CefgBUyZLF3duqaSDLiXhvMKhJCxJEa9YwF7IHAQAuk/jjs1yLqCSIGii5jUgK9FqYJ8ZVSSQvEaGW4tHQjssDtWsCyu2wF2cDW2HSfn/G07CR5uxVVQ1QFXA3NsArq9bfot9n15IDJ7t3dj1EViJTk4WWA7KbZrYikApF2DKwtyFRHXwu6VghLzxg46L5St2wRZz8DcA9gr/OGCuL3D7XAocgXF69j9swZsqGEYqmEUrGIEq1SWjg+bqDZbNLaRIOuDw8O8OF9nbLczz1PyEzHHGgBd6xvXz9DZhpROuMSScgSk+e2JfsS4FtBVEEjEaDX0PT7AOYMCs8tSBNnL7ofoOXRfuAHozQioOBauP/yB9b39gcDj7QNAveuzqH28AJUq4PMbtzbiDgPQFKu7/3G66dLYdKdHltLd+f5J9QeXyRL5bAylHEZ0fdmygW8+P4H1ikZsOJPrpw3m0m0twwoQ0t/IWT44No8lp5tQ3tiWtpJw6doN78E+l0mjaxhuyE/GBD16qNLNC+P6TxEHdBXqX0il4DePChTRKDobzW2k7D2XoxAIKPgOE+k3Y1uJAKTPBnnt2IpMe2hEVNnvykNg2kUOKzVajODdrMJgB+a0jxLc4HmOfx/4z1Jl/jL/44yoEOzQtOdsgt8Qjn6J8AArLQBgS2LidYAAAAASUVORK5CYII='
                    }
                }, {
                    'label': '页边距',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/mlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjajZTPbxRlGMc/u/POrAk4B1MBi8GJP4CQQrZgkAZBd7vLtlDLZtti25iY7ezb3bHT2fGd2fIjPXHRG6h/gIocPJh4MsFfES7AQQMJQUNsSEw4lPgjRBIuhtTDTHcHaMX39Mzzfp/v9/s875OBzOdV33fTFsx6oaqU8tb4xKSVuUGaZ1hDN2uqduDnyuUhgKrvuzxy7v1MCuDa9pXv//OsqcnAhtQTQLMW2LOQOga6a/sqBOMWsOdo6IeQeRboUuMTk5DJAl31KC4AXVNRPA50qdFKP2RcwLQb1Rpk5oGeqUS+nogjDwB0laQnlWNblVLeKqvmtOPKhN3HXP/PM+u2lvU2AWuDmZFDwFZIHWuogUocf2JXiyPAi5C67If5CrAZUn+0ZsZywDZIPzWtDoxF+PSrJxqjbwLrIF1zwsHROH/Cmxo+HNWmz8w0D1VizGU76J8Enof0zYYcHIr8aNRkoQj0gLap0RqI+bWDwdxIcZnnRKN/OOLR1DvVg2WgG7T3VbNyOPKsnZFuqRLxaxf9sBx70BY9d3go4hSmDIojy/mwMToQ1YrdoRqNa8XktHNgMMbP+255KPImzqpWZSzGXK2qYiniEX9Lbyzm1DfUqoVDwA7Q93MkVUXSZAqJjcd9LCqUyGPho2gyjYNLCYmHROGknmQGZxVcGYmK4w6ijsRjEYWDvQomUrgdY5pivciKXSIr9oohsU/sEX1Y4jXxutgvCiIr+sTedm05oW9R53ab511aSCwqHCF/uru1taN3Ur3t2FdO3XmguvmIZ7nsJzkBAmbayO3J/i/Nf7ehw3FdnHvr2tpL8xx+3Hz1W/qifl2/pd/QFzoI/Vd9QV/Qb5DDxaWOZBaJg4ckSDhI9nABl5AqLr/h0UzgHlCc9k53d27sK6fuyPeG7w1zsqeTzf6S/TN7Pftp9mz294emvOKUtI+0r7Tvta+1b7QfsbTz2gXtB+2i9qX2beKtVt+P9tuTS3Qr8VactcQ18+ZG8wWzYD5nvmQOdfjM9WavOWBuMQvmxva7JfWSvThM4LanurJWhBvDw+EoEkVAFReP4w/tf1wtNoleMfjQ1u4Re0XbpVE0CkYOy9hm9Bm9xkEj1/FnbDEKRp+xxSg+sHX2Kh3IBCrZ53amkATMoHCYQ+ISIEN5LATob/rHlVNvhNbObPYVK+f7rrQGPXtHj1V1XUs59UYYWEoGUs3J2g7GJyat6Bd9t0IKSK270smFb8C+v0C72slNtuCLANa/3Mlt7YanP4Zzu+2Wmov/+anUTxBM79oZfa3Ng35zaenuZsh8CPc/WFr658zS0v3PQFuA8+6/WQBxeLnbzNAAAAAgY0hSTQAAbZgAAHOOAADyewAAhNoAAG6UAADlGgAAMycAABkXmUkcfwAAAEJJREFUeNqcjlEKgEAQQp/RPZ2jzU3ta7ci2IUEP0RRlYQVDjbYBk6AqvrsdLcAND7YjqSXCUCSSdt56iR3w++T1wDz9ygMbsLLYAAAAABJRU5ErkJggg=='
                    },
                    'layout': 'top'
                }],
                'menu': {
                    'items': [{
                        'label': '默认：上1厘米,下1厘米,左1厘米,右1厘米',
                        'value': 1
                    }, {
                        'label': '常规：上2.54厘米,下2.54厘米,左2.54厘米,右2.54厘米',
                        'value': 2
                    }, {
                        'label': '常规：上1.27厘米,下1.27厘米,左1.27厘米,右1.27厘米',
                        'value': 3
                    }, {
                        'label': '常规：上2.54厘米,下2.54厘米,左1.9厘米,右1.9厘米',
                        'value': 4
                    }, {
                        'label': '常规：上2.54厘米,下2.54厘米,左5.08厘米,右5.08厘米',
                        'value': 5
                    }, {
                        'label': '常规：上2.54厘米,下2.54厘米,左3.18厘米,右3.18厘米',
                        'value': 6
                    }]
                }
            },
            pagelineheight = {
                'clazz': 'ButtonMenu',
                'id': 'pagelineheight',
                'className': 'wo-btnmenu-pagedistance',
                'text': '页行高',
                'label': '页行高',
                "layout": "bottom",
                'selected': 1,
                'buttons': [{
                    'width': 60,
                    'className': 'ext-spelling',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BJREFUeNq8V7tuE0EUPTP78CtB0FFFyS8gEAVIFBGRUEAi0AJpQEjUfAE1NRWN43REkBBMeAREEVp+AUhFhxQlju31znLv7I73Ya/tBNsTTWaz9u4595x770wEALtarW4KIZaVUgiCAJMchAMpJePUV1dXb/O92bW1tWDagzEZ26ZfRY6cx89f+8RwogKABV6Yn0OEWWQCwsgupdASiQmxYByDFa3CTvsjNYlJ+q9UOsfSBBIKjFsFEz3FmE9ARsCWZcFxHL0mX5Bcu4aGoaWiTK48fN+H53l6zeBnFGACVCK2bWNl5S4qlTIc14VL0yZCDt13HZfI2Zogf8bf99ptAujQpLXtodPx0CZABm23Wmg0GtjYeAXFhKOEz1cgiuzd9lZKAb4XZBQw1yKhQp4CbSLJ0QcZa3sVyE5+yACwhyKhfPxgikj4p+j7XgyzQFKWcOTLN2+hXK6Q/KHULDnb4NpOKD/b4BZ04rLUHZabouwY6bUlxoIjbG2+gfIV+CefgBUyZLF3duqaSDLiXhvMKhJCxJEa9YwF7IHAQAuk/jjs1yLqCSIGii5jUgK9FqYJ8ZVSSQvEaGW4tHQjssDtWsCyu2wF2cDW2HSfn/G07CR5uxVVQ1QFXA3NsArq9bfot9n15IDJ7t3dj1EViJTk4WWA7KbZrYikApF2DKwtyFRHXwu6VghLzxg46L5St2wRZz8DcA9gr/OGCuL3D7XAocgXF69j9swZsqGEYqmEUrGIEq1SWjg+bqDZbNLaRIOuDw8O8OF9nbLczz1PyEzHHGgBd6xvXz9DZhpROuMSScgSk+e2JfsS4FtBVEEjEaDX0PT7AOYMCs8tSBNnL7ofoOXRfuAHozQioOBauP/yB9b39gcDj7QNAveuzqH28AJUq4PMbtzbiDgPQFKu7/3G66dLYdKdHltLd+f5J9QeXyRL5bAylHEZ0fdmygW8+P4H1ikZsOJPrpw3m0m0twwoQ0t/IWT44No8lp5tQ3tiWtpJw6doN78E+l0mjaxhuyE/GBD16qNLNC+P6TxEHdBXqX0il4DePChTRKDobzW2k7D2XoxAIKPgOE+k3Y1uJAKTPBnnt2IpMe2hEVNnvykNg2kUOKzVajODdrMJgB+a0jxLc4HmOfx/4z1Jl/jL/44yoEOzQtOdsgt8Qjn6J8AArLQBgS2LidYAAAAASUVORK5CYII='
                    }
                }, {
                    'label': '页行高',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/mlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjajZTPbxRlGMc/u/POrAk4B1MBi8GJP4CQQrZgkAZBd7vLtlDLZtti25iY7ezb3bHT2fGd2fIjPXHRG6h/gIocPJh4MsFfES7AQQMJQUNsSEw4lPgjRBIuhtTDTHcHaMX39Mzzfp/v9/s875OBzOdV33fTFsx6oaqU8tb4xKSVuUGaZ1hDN2uqduDnyuUhgKrvuzxy7v1MCuDa9pXv//OsqcnAhtQTQLMW2LOQOga6a/sqBOMWsOdo6IeQeRboUuMTk5DJAl31KC4AXVNRPA50qdFKP2RcwLQb1Rpk5oGeqUS+nogjDwB0laQnlWNblVLeKqvmtOPKhN3HXP/PM+u2lvU2AWuDmZFDwFZIHWuogUocf2JXiyPAi5C67If5CrAZUn+0ZsZywDZIPzWtDoxF+PSrJxqjbwLrIF1zwsHROH/Cmxo+HNWmz8w0D1VizGU76J8Enof0zYYcHIr8aNRkoQj0gLap0RqI+bWDwdxIcZnnRKN/OOLR1DvVg2WgG7T3VbNyOPKsnZFuqRLxaxf9sBx70BY9d3go4hSmDIojy/mwMToQ1YrdoRqNa8XktHNgMMbP+255KPImzqpWZSzGXK2qYiniEX9Lbyzm1DfUqoVDwA7Q93MkVUXSZAqJjcd9LCqUyGPho2gyjYNLCYmHROGknmQGZxVcGYmK4w6ijsRjEYWDvQomUrgdY5pivciKXSIr9oohsU/sEX1Y4jXxutgvCiIr+sTedm05oW9R53ab511aSCwqHCF/uru1taN3Ur3t2FdO3XmguvmIZ7nsJzkBAmbayO3J/i/Nf7ehw3FdnHvr2tpL8xx+3Hz1W/qifl2/pd/QFzoI/Vd9QV/Qb5DDxaWOZBaJg4ckSDhI9nABl5AqLr/h0UzgHlCc9k53d27sK6fuyPeG7w1zsqeTzf6S/TN7Pftp9mz294emvOKUtI+0r7Tvta+1b7QfsbTz2gXtB+2i9qX2beKtVt+P9tuTS3Qr8VactcQ18+ZG8wWzYD5nvmQOdfjM9WavOWBuMQvmxva7JfWSvThM4LanurJWhBvDw+EoEkVAFReP4w/tf1wtNoleMfjQ1u4Re0XbpVE0CkYOy9hm9Bm9xkEj1/FnbDEKRp+xxSg+sHX2Kh3IBCrZ53amkATMoHCYQ+ISIEN5LATob/rHlVNvhNbObPYVK+f7rrQGPXtHj1V1XUs59UYYWEoGUs3J2g7GJyat6Bd9t0IKSK270smFb8C+v0C72slNtuCLANa/3Mlt7YanP4Zzu+2Wmov/+anUTxBM79oZfa3Ng35zaenuZsh8CPc/WFr658zS0v3PQFuA8+6/WQBxeLnbzNAAAAAgY0hSTQAAbZgAAHOOAADyewAAhNoAAG6UAADlGgAAMycAABkXmUkcfwAAAEJJREFUeNqcjlEKgEAQQp/RPZ2jzU3ta7ci2IUEP0RRlYQVDjbYBk6AqvrsdLcAND7YjqSXCUCSSdt56iR3w++T1wDz9ygMbsLLYAAAAABJRU5ErkJggg=='
                    },
                    'layout': 'top'
                }],
                'menu': {
                    'items': [{
                        'label': '1',
                        'value': 1
                    }, {
                        'label': '1.5',
                        'value': 1.5
                    }, {
                        'label': '1.75',
                        'value': 1.75
                    }, {
                        'label': '2',
                        'value': 2
                    }, {
                        'label': '3',
                        'value': 3
                    }, {
                        'label': '4',
                        'value': 4
                    }, {
                        'label': '5',
                        'value': 5
                    }]
                }
            },
            pagedirection = {
                'clazz': 'ButtonMenu',
                'id': 'pagedirection',
                'className': 'wo-btnmenu-pagedistance',
                'text': '方向',
                'label': '方向',
                'selected': 0,
                "layout": "bottom",
                'buttons': [{
                    'width': 60,
                    'className': 'ext-spelling',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABgFJREFUeNqcV+tvVFUQ/93H7t7dbiEYaHxEBUXDs9DYALXSohgLLSBNidEQ/WTiB/SDKaGwoLYVDWptTIx/gPGDxFDaLVDb8IitlgIiVSzEEKiNSuQpqW7b7Xb3HmfOvbvsdu9tN5xkutNz5szMmfcF7n15yxo6RTkB4/fKRE/+trS2tiiKsskUwpVYYUJVQdCnou4HHV+9VYZo3MTWiY7xj56JIzJuIm4KiCkEqooCIUR7TXV1Df0bT+7nH2xrE7muxTsOiSu3x8TTTb0SGOe9XBfLYpnpFjCSLx/8fQiKqma9XKOtoFdDycdnEa57AW/sv4D78v3ynPGW2rVYUBtG345iRGIJJExkWUKYJh6bNxe2LIPgPzVNhlyapkGfBLzn93pQ2nQObaH12NExhBl5AQQMQwLjvMdnTMO0bnwmvQtqlp/JR05Af7BpWQG2Nh/FrcFBVC4ugE6CGBjnPT5jGrjwkHwmx4RTkDhBPCFQVzEXZ3auQozwebP98Hm9EhjnPT5jGqZ14+OWBXctQP6fHAPSfwQU5IgSJCjS/4kBfsMnzxjnPT5jGqGocJAFZYo0zHKBWxryIlmIxD3ICwbk/4ybIkmjOEuyeU+rgEfX4PNonKvSrKaZGcuU9qhcWoAvj5yGZvP7UVh7fCb9n+5SqhtezXrU+ETCXYHkpZmGjsLG71Fd9AB2V86nQpPIyCcWsqvqCVmQlDT3cAFihbX0VxJq0IM+6LiM1v6/cf7d1VmuSDmbGfIqrO/BN28/i66BGwgGPZgZ8FKaeZEf8MDw6RQf9BISNDphYsQGxnmPz5iGafkO32UezIt5Mu90WRkWmEHldfmuI9j32kpcuRkhswEr6rtlcCX9Xll4P0IbnkTUwZTM0kev/fDwJXScv4akDE26AJIn82YZn61RsxUI9XmxbdMSNJ8YQuljs/B61bIsEV+E+9G4eQEmyA/CQQFDV6XwbS8WYXIdPDP0L3oH75CM5Qh1DWQo4F27t+t6RelCtA/ckuX14s0oBm6MpYiogqLk8Vky6FROU4doVmCdMc21SBx9V+4gPZu5BjBvllG9ZhECnq7rx/dU+FiBPNZ2XOgIBoyU6dJFsPlHTSvo2M+K6qyAYgcm084M+pFOJtJ4sSx7J0+64PiedauUvUdPPbpkIRQzfrcg2S/llBwXHuuKS51Q7DNZsAQHn5JxnxuRxFUd3ScvSJlJF4wQ3NxdPIba7n6UlpdIzft7+0DBbeW2rfm8OUFixOZUHWOAz5imu/ts6vUUFvAQFJWWSB693X34tFzgGMm0ZctVEA5b80Dh9oNiZ++YKA5xf08IYcboxwIzFhVjo6NiJDLiCHzGNEl6eZd4MK9dxJN582JZLDMjC+K2iX75ZCMW1R7GlpUPQyTid1NOWF7jtPJTXilaZr8QNADEyFxjBAqbzbaA4RFYv/xBHDjYiYtNGzNkZSiQnMTiNExcbKqS0jjdUvXOLvFcpt87MICW/qup7sYDRk3RQ2jYsgTRWGaN4M7YWLMUdVWLEKfH6B4d6VNfVi8geiRipmMDsSYIDW0//YXGV4ozSnHD12fR8NIyUiqzRrDfYxRMHl2RU5I+fTdU3YdSqYzVarlp7eu6LPd3Vsy32y+3cg1wGWydmmyWAqrq3Es1mf9aClcpnfLzDPuOLvdkN2UTm4lUCZ9u5TySsfD6A/14KnQIXro1PB5HnuElMAg35R6fMQ3T5jqS6bkMDcm1/+QQ3nx5NRUr4NLtKE1EhowDxl/dsIqKjILP9/egfkvRlHymcYEqK5fT+q25Gku3t2FF2QqoRBPwWyPZ1RGBP0djON1zRtK4PWTKoVRN6xxTme7Xps34+dQ5KrVBUsCQwDjvDdBZLjzSZSUtIIaHh3taw+Ey+dHgGsWKHCaay1WEek7huXVr5P6Jzu9oT6C9PWx9mrl93tmTMctKdqOkWvyZ9AjBbCe3uCzP8+93fsvIsXfWraefiRzvcbe7RfAHfxkpaZbw259LSo6MggRzbJwbSyTHe/zyKAEPHPFchTl+nluzhFzc1WL3wuR/AQYAUAv74JGPojgAAAAASUVORK5CYII='
                    }
                }, {
                    'label': '方向',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/mlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjajZTPbxRlGMc/u/POrAk4B1MBi8GJP4CQQrZgkAZBd7vLtlDLZtti25iY7ezb3bHT2fGd2fIjPXHRG6h/gIocPJh4MsFfES7AQQMJQUNsSEw4lPgjRBIuhtTDTHcHaMX39Mzzfp/v9/s875OBzOdV33fTFsx6oaqU8tb4xKSVuUGaZ1hDN2uqduDnyuUhgKrvuzxy7v1MCuDa9pXv//OsqcnAhtQTQLMW2LOQOga6a/sqBOMWsOdo6IeQeRboUuMTk5DJAl31KC4AXVNRPA50qdFKP2RcwLQb1Rpk5oGeqUS+nogjDwB0laQnlWNblVLeKqvmtOPKhN3HXP/PM+u2lvU2AWuDmZFDwFZIHWuogUocf2JXiyPAi5C67If5CrAZUn+0ZsZywDZIPzWtDoxF+PSrJxqjbwLrIF1zwsHROH/Cmxo+HNWmz8w0D1VizGU76J8Enof0zYYcHIr8aNRkoQj0gLap0RqI+bWDwdxIcZnnRKN/OOLR1DvVg2WgG7T3VbNyOPKsnZFuqRLxaxf9sBx70BY9d3go4hSmDIojy/mwMToQ1YrdoRqNa8XktHNgMMbP+255KPImzqpWZSzGXK2qYiniEX9Lbyzm1DfUqoVDwA7Q93MkVUXSZAqJjcd9LCqUyGPho2gyjYNLCYmHROGknmQGZxVcGYmK4w6ijsRjEYWDvQomUrgdY5pivciKXSIr9oohsU/sEX1Y4jXxutgvCiIr+sTedm05oW9R53ab511aSCwqHCF/uru1taN3Ur3t2FdO3XmguvmIZ7nsJzkBAmbayO3J/i/Nf7ehw3FdnHvr2tpL8xx+3Hz1W/qifl2/pd/QFzoI/Vd9QV/Qb5DDxaWOZBaJg4ckSDhI9nABl5AqLr/h0UzgHlCc9k53d27sK6fuyPeG7w1zsqeTzf6S/TN7Pftp9mz294emvOKUtI+0r7Tvta+1b7QfsbTz2gXtB+2i9qX2beKtVt+P9tuTS3Qr8VactcQ18+ZG8wWzYD5nvmQOdfjM9WavOWBuMQvmxva7JfWSvThM4LanurJWhBvDw+EoEkVAFReP4w/tf1wtNoleMfjQ1u4Re0XbpVE0CkYOy9hm9Bm9xkEj1/FnbDEKRp+xxSg+sHX2Kh3IBCrZ53amkATMoHCYQ+ISIEN5LATob/rHlVNvhNbObPYVK+f7rrQGPXtHj1V1XUs59UYYWEoGUs3J2g7GJyat6Bd9t0IKSK270smFb8C+v0C72slNtuCLANa/3Mlt7YanP4Zzu+2Wmov/+anUTxBM79oZfa3Ng35zaenuZsh8CPc/WFr658zS0v3PQFuA8+6/WQBxeLnbzNAAAAAgY0hSTQAAbZgAAHOOAADyewAAhNoAAG6UAADlGgAAMycAABkXmUkcfwAAAEJJREFUeNqcjlEKgEAQQp/RPZ2jzU3ta7ci2IUEP0RRlYQVDjbYBk6AqvrsdLcAND7YjqSXCUCSSdt56iR3w++T1wDz9ygMbsLLYAAAAABJRU5ErkJggg=='
                    },
                    'layout': 'top'
                }],
                'menu': {
                    'items': [{
                        'label': '纵向',
                        'value': 'vertical'
                    }, {
                        'label': '横向',
                        'value': 'horizontal'
                    }]
                }
            },
            pagesize = {
                'clazz': 'ButtonMenu',
                'id': 'pagesize',
                'className': 'wo-btnmenu-pagedistance',
                'text': '大小',
                'label': '大小',
                'selected': 3,
                "layout": "bottom",
                'buttons': [{
                    'width': 60,
                    'className': 'ext-spelling',
                    'icon': {
                        'img': 'data:image/png;base64,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'
                    }
                }, {
                    'label': '大小',
                    'icon': {
                        'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/mlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjajZTPbxRlGMc/u/POrAk4B1MBi8GJP4CQQrZgkAZBd7vLtlDLZtti25iY7ezb3bHT2fGd2fIjPXHRG6h/gIocPJh4MsFfES7AQQMJQUNsSEw4lPgjRBIuhtTDTHcHaMX39Mzzfp/v9/s875OBzOdV33fTFsx6oaqU8tb4xKSVuUGaZ1hDN2uqduDnyuUhgKrvuzxy7v1MCuDa9pXv//OsqcnAhtQTQLMW2LOQOga6a/sqBOMWsOdo6IeQeRboUuMTk5DJAl31KC4AXVNRPA50qdFKP2RcwLQb1Rpk5oGeqUS+nogjDwB0laQnlWNblVLeKqvmtOPKhN3HXP/PM+u2lvU2AWuDmZFDwFZIHWuogUocf2JXiyPAi5C67If5CrAZUn+0ZsZywDZIPzWtDoxF+PSrJxqjbwLrIF1zwsHROH/Cmxo+HNWmz8w0D1VizGU76J8Enof0zYYcHIr8aNRkoQj0gLap0RqI+bWDwdxIcZnnRKN/OOLR1DvVg2WgG7T3VbNyOPKsnZFuqRLxaxf9sBx70BY9d3go4hSmDIojy/mwMToQ1YrdoRqNa8XktHNgMMbP+255KPImzqpWZSzGXK2qYiniEX9Lbyzm1DfUqoVDwA7Q93MkVUXSZAqJjcd9LCqUyGPho2gyjYNLCYmHROGknmQGZxVcGYmK4w6ijsRjEYWDvQomUrgdY5pivciKXSIr9oohsU/sEX1Y4jXxutgvCiIr+sTedm05oW9R53ab511aSCwqHCF/uru1taN3Ur3t2FdO3XmguvmIZ7nsJzkBAmbayO3J/i/Nf7ehw3FdnHvr2tpL8xx+3Hz1W/qifl2/pd/QFzoI/Vd9QV/Qb5DDxaWOZBaJg4ckSDhI9nABl5AqLr/h0UzgHlCc9k53d27sK6fuyPeG7w1zsqeTzf6S/TN7Pftp9mz294emvOKUtI+0r7Tvta+1b7QfsbTz2gXtB+2i9qX2beKtVt+P9tuTS3Qr8VactcQ18+ZG8wWzYD5nvmQOdfjM9WavOWBuMQvmxva7JfWSvThM4LanurJWhBvDw+EoEkVAFReP4w/tf1wtNoleMfjQ1u4Re0XbpVE0CkYOy9hm9Bm9xkEj1/FnbDEKRp+xxSg+sHX2Kh3IBCrZ53amkATMoHCYQ+ISIEN5LATob/rHlVNvhNbObPYVK+f7rrQGPXtHj1V1XUs59UYYWEoGUs3J2g7GJyat6Bd9t0IKSK270smFb8C+v0C72slNtuCLANa/3Mlt7YanP4Zzu+2Wmov/+anUTxBM79oZfa3Ng35zaenuZsh8CPc/WFr658zS0v3PQFuA8+6/WQBxeLnbzNAAAAAgY0hSTQAAbZgAAHOOAADyewAAhNoAAG6UAADlGgAAMycAABkXmUkcfwAAAEJJREFUeNqcjlEKgEAQQp/RPZ2jzU3ta7ci2IUEP0RRlYQVDjbYBk6AqvrsdLcAND7YjqSXCUCSSdt56iR3w++T1wDz9ygMbsLLYAAAAABJRU5ErkJggg=='
                    },
                    'layout': 'top'
                }],
                'menu': {
                    'items': [{
                        'label': '信纸 21.59cm × 27.94cm',
                        'value': 1
                    }, {
                        'label': '法律专用纸 21.59cm × 35.56cm',
                        'value': 2
                    }, {
                        'label': '行政公文纸 18.42cm × 26.67cm',
                        'value': 3
                    }, {
                        'label': 'A4 21cm × 29.7cm',
                        'value': 4
                    }, {
                        'label': 'A5 14.8cm × 21cm',
                        'value': 5
                    }, {
                        'label': '自定义页面大小',
                        'value': 6
                    }]
                }
            }
        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '工具'
        });

        /* 设置 tab 内容 */
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-edit',
            'widgets': [{
                'clazz': 'LabelPanel',
                'id': 'blockprint',
                'className': 'wo-block wo-blockprint',
                'layout': 'top',
                'label': '页面布局',
                'widgets': [pagedistance,
                    pagedirection,
                    pagesize,
                    pagelineheight
                ]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockset',
                'className': 'wo-block wo-blockprint',
                'layout': 'top',
                'label': '打印设置',
                'widgets': [{
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'setheader',
                        'className': 'wo-btn wo-btn-copy',
                        'text': '插入页眉',
                        'label': '插入页眉'
                    }, {
                        'clazz': 'Button',
                        'id': 'showheader',
                        'className': 'wo-btn wo-btn-copy',
                        'text': '编辑页眉',
                        'label': '编辑页眉'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'gridlinebreak',
                        '_cmd': 'gridlinebreak',
                        'className': 'wo-btn wo-btn-gridline',
                        'text': '网格线开始标记',
                        'label': '开始标记',
                        'layout': 'bottom'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'gridline',
                        '_cmd': 'gridline',
                        'className': 'wo-btn wo-btn-gridline',
                        'text': '网格线',
                        'label': '网格线',
                        'layout': 'bottom'
                    }]
                }, {
                    'clazz': 'Panel',
                    'className': 'wo-line',
                    'widgets': [{
                        'clazz': 'Button',
                        'id': 'pagefooter',
                        '_cmd': 'pagefooter',
                        'className': 'wo-btn wo-btn-pagefooter',
                        'text': '页码格式',
                        'label': '页码',
                        'layout': 'bottom'
                    }]
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockprint',
                'className': 'wo-block wo-blockprint',
                'layout': 'top',
                'label': '打印',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'jumpprint',
                    'className': 'wo-btn wo-btn-print',
                    'text': '续打',
                    'label': '续打',
                    'layout': 'bottom'
                }, {
                    'clazz': 'Button',
                    'id': 'print',
                    'className': 'wo-btn wo-btn-print',
                    'text': '打印文档',
                    'label': '打印文档',
                    'layout': 'bottom'
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockpreview',
                'className': 'wo-block wo-blockpreview',
                'layout': 'top',
                'label': '预览',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'preview',
                    'className': 'wo-btn wo-btn-preview',
                    'text': '预览文档',
                    'label': '预览打印',
                    'layout': 'bottom'
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blocksearch',
                'className': 'wo-block wo-blocksearch',
                'layout': 'top',
                'label': '搜索',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'searchreplace',
                    'className': 'wo-btn wo-btn-searchreplace',
                    'text': '查找替换',
                    'label': '查找替换',
                    'layout': 'bottom',
                    '_dialog': {
                        'width': 400,
                        'height': 290,
                        'caption': '查找替换'
                    }
                }]
            }, {
                'clazz': 'LabelPanel',
                'id': 'blockwordcount',
                'className': 'wo-block wo-blockwordcount',
                'layout': 'top',
                'label': '字数统计',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'wordcount',
                    'className': 'wo-btn wo-btn-wordcount',
                    'text': '字数统计',
                    'label': '字数统计',
                    'layout': 'bottom',
                    '_dialog': {
                        'width': 340,
                        'height': 260,
                        'caption': '字数统计'
                    }
                }]
            }]
        });

    })();

    (function() {

        /* 设置 tab 标题 */
        FUIToolbar.MainConfig.buttons.push({
            'className': 'wo-tabs-btn',
            'label': '文件'
        });
        FUIToolbar.MainConfig.panels.push({
            'className': 'fui-tab-content fui-tab-content-edit',
            'widgets': [{
                'clazz': 'LabelPanel',
                'id': 'blockimage',
                'className': 'wo-block wo-blockimage',
                'layout': 'top',
                'label': '本地文件',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'savexml',
                    'className': 'wo-btn wo-btn-savexml',
                    'text': '另存',
                    'label': '另存',
                    'layout': 'bottom'
                }, {
                    'clazz': 'Button',
                    'id': 'loadxml',
                    'className': 'wo-btn wo-btn-loadxml',
                    'text': '加载',
                    'label': '加载',
                    'layout': 'bottom'
                }, {
                    'clazz': 'Button',
                    'id': 'savexml1',
                    'className': 'wo-btn wo-btn-savexml',
                    'text': '导出HL7',
                    'label': '导出HL7',
                    'layout': 'bottom'
                }],
            }, {
                'clazz': 'LabelPanel',
                'id': 'help',
                'className': 'wo-block wo-blockimage',
                'layout': 'top',
                'label': '帮助',
                'widgets': [{
                    'clazz': 'Button',
                    'id': 'help',
                    'className': 'wo-btn wo-btn-help',
                    'text': '帮助',
                    'label': '帮助',
                    'layout': 'bottom',
                    '_dialog': {
                        'width': 420,
                        'height': 500,
                        'caption': '在线帮助'
                    }
                }],
            }]
        });
    })();
})();

(function() {
    /* 遍历 config */
    WO.ConfigTraveller = function(node, callback) {
        if (!node) return;
        callback(node);

        var children = (node.clazz === 'Tabs' ? node.panels : node.widgets);
        if (children && children.length) {
            for (var i = 0; i < children.length; i++) {
                WO.ConfigTraveller(children[i], callback);
            }
        }

    };

    /* 格式化 MainConfig */
    WO.ConfigTraveller(FUIToolbar.MainConfig, function(node) {
        if (node.clazz && node.id) {
            /* 设置 _cmd 值 */
            node._cmd = node._cmd || node.id;
            /* 设置的 className */
            if (node._dialog) {
                node._dialog.className = 'wo-dialog wo-dialog-' + node.id;
            }
            if (node._popup) {
                node._popup.className = 'wo-popup wo-popup-' + node.id;
            }
        }
    });
})();