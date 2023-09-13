<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar"/>
    <div ref="editor" class="text"/>
  </div>
</template>
<script>
import axios from 'axios'
import E from 'wangeditor'
import { Sub, Sup, Symbol } from './customizeMenu'

export default {
  name: 'Editoritem',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    idEdit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // uploadPath,
      editor: null,
      info_: null
    }
  },
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted () {
    this.seteditor()
    this.editor.txt.html(this.value)
    this.$nextTick(() => {
      let a = document.getElementsByClassName('w-e-icon-happy')
      for (let i = 0; i < a.length; i++) {
        a[i].parentNode.setAttribute('data-title', '文字图片')
      }
    })

  },
  created () {
    // this.editor = new E(this.$refs.toolbar, this.$refs.editor)
  },
  beforeDestroy () {
    // 销毁编辑器
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    getHtml () {
      console.log(this.editor.txt.html())
    },
    // 编辑器设置
    seteditor () {
      // 特殊符号
      const SymbolKey = 'SymbolKey'
      E.registerMenu(SymbolKey, Symbol)
      // 上标
      const SupKey = 'SupKey'
      E.registerMenu(SupKey, Sup)
      // 下标
      const SubKey = 'SubKey'
      E.registerMenu(SubKey, Sub)

      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.config.uploadImgShowBase64 = false // base 64 存储图片，如果这个参数设置为true的话，就不用配置服务器端上传地址
      this.editor.config.showLinkImg = false // 禁止上传网络图片
      // this.editor.config.showLinkImg = true  // 允许上传网络图片
      this.editor.config.uploadImgServer = '/api/passport/infra/file/upload'// 这是服务器端上传图片的接口路径
      this.editor.config.uploadImgHeaders = { 'Content-Type': 'multipart/form-data' }// 自定义 header  上传文件格式为file文件，用form-data格式
      this.editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.config.uploadImgMaxLength = 6 // 限制一次最多上传 6张图片
      this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      // 配置菜单   // 去掉链接和表格
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'emoticon', // 表情
        'SymbolKey', // 特殊符号
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'undo', // 撤销
        'redo', // 重复
        'SupKey', // 上标
        'SubKey', // 下标
        'indent', // 缩进
        'link' // 链接
      ]
      /* 'video', // 插入视频
        'fullscreen', // 全屏
        'code', // 插入代码
          */
      this.editor.config.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
          console.log(xhr, editor, result)
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          console.log(xhr, editor)
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
          console.log(xhr, editor)
        },
        error: (xhr, editor) => {
          console.log(xhr, editor)
          // 图片上传错误的回调
        }
      }
      // =======================================重点如下：
      // this.editor.config.uploadImgShowBase64 = false 如果这个参数设置true，也就不用下面这些了，
      this.editor.config.customUploadImg = (files, insert) => {
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('file', files[i], files[i].name) //  多张图片文件都放进一个form-data，有些小伙伴说这里应该这样写：formData.append("file[" + i + "]", files[i], files[i].name)，后端才能拿到完整的图片数组，其实不然，用这个formData.getAll("file")方法恰好拿到数组，或者也可以forEach获取，有很多种办法。
          formData.append('mini', false)
          formData.append('bsModule', 'cms')
        }
        axios.post('/api/passport/infra/file/upload', formData, { // 上传图片接口
          headers: {
            token: this.$cookie.get('Token') || '',
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          let da = res.data
          console.log(da)
          if (da.code === 0) {
            insert(da.data.url)
          } else {
            alert(da.msg)
            return
          }
        })
      }
      // =========================================
      this.editor.config.onchange = (html) => {
        let textContent = this.editor.txt.text() // 文本内容
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', {
          res: this.info_,
          textContent: textContent
        }) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
      if (this.idEdit === 'show') {
        this.editor.disable()
      }
    }
  }
}
</script>

<style lang="less">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index:auto !important;
  .w-e-toolbar .w-e-menu {
    height: 30px!important;
  }
  .w-e-text-container {
    // 文本框里面的层级调低
    z-index: 1 !important;
  }
  .w-e-toolbar {
    // 给工具栏换行
    z-index:auto !important;
  }

  .w-e-panel-container {
    margin-left: 0!important;
  }
}

.toolbar {
  border: 1px solid rgb(148, 147, 147);
}

.text {
  border: 1px solid rgb(122, 122, 122);
  min-height: 85px;
  border-top: none!important;
}
.w-e-droplist {
  max-height: 200px;
  overflow: auto;
  z-index: auto;
}

.eleImg {
  width: 22px !important;
  height: 16px !important;
  margin-top: -4px !important;
}

.w-e-panel-tab-content {
  div {
    line-height: 30px !important;
  }
}
</style>
