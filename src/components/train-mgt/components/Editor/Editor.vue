<template>
  <div>
    <el-upload
        action=""
        :http-request="uploadPic"
        :before-upload="handleBeforeUpload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        name="file"
        accept="image/*"
        :show-file-list="false"
        style="display: none"
        ref="upload"
        v-if="this.type == 'url'"
    >
    </el-upload>

    <div class="editor" ref="editor" :style="styles"></div>
<!--    :before-upload="FiluBeforeUpload"-->
    <el-upload
        action=""
        :http-request="FiluploadPic"
        :on-success="FiluploadPicSuccess"
        :on-error="FiluploadPicError"
        style="display: none"
        :show-file-list="false"
        ref="uploadFileUrl">
    </el-upload>

  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// import { getToken } from "@/utils/auth";
import axios from 'axios'
import { uploadFiles } from '../../api/file'
import '@/assets/quillEditor.css'
import SfUpload from "../Upload/Upload.vue";

const Link = Quill.import("formats/link");

class FileBlot extends Link {

  static create (value) {
    let node = undefined;
    if (value && !value.href) {

      node = super.create(value)
    } else {

      node = super.create(value.href)
      node.href = value.href
      node.innerText = value.innerText

    }
    return node;
  }
}
FileBlot.blotName = "link"
FileBlot.tagName = "A"
Quill.register(FileBlot)

var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
];
// 自定义字号的大小，注意下面的内容要和css里面对应上
var sizes = [false, "16px", "18px", "20px", "22px", "26px", "28px", "30px"];
var Size = Quill.import("formats/size");
Size.whitelist = sizes;
var Font = Quill.import("formats/font");
Font.whitelist = fonts; //将字体加入到白名单
Quill.register(Font, true);
export default {
  name: "Editor",
  components:{
    SfUpload
  },

  props: {
    uploadApi: {
      type: Function,
      default: uploadFiles //uploadFiles
    },
    /* 编辑器的内容 */
    value: {
      type: String,
      default: "",
    },
    /* 高度 */
    height: {
      type: Number,
      default: 300,
    },
    /* 最小高度 */
    minHeight: {
      type: Number,
      default: 300,
    },
    /* 只读 */
    readOnly: {
      type: Boolean,
      default: false,
    },
    // 上传文件大小限制(MB)
    fileSize: {
      type: Number,
      default: 50,
    },
    /* 类型（base64格式、url格式） */
    type: {
      type: String,
      default: "url",
    }
  },
  data() {
    return {
      uploadUrl:  "api/passport/infra/file/upload", // 上传的图片服务器地址
      fileType:["doc", "xls", "pdf"],
      Quill: null,
      currentValue: "",
      options: {
        theme: "snow",
        bounds: document.body,
        debug: "warn",
        modules: {
          // 工具栏配置
          toolbar:{  container:
                [
                  ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"],                    // 引用  代码块
                  [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
                  [{ indent: "-1" }, { indent: "+1" }],            // 缩进
                  [{ size: sizes }],   // 字体大小
                  [{ font: fonts }], //显示字体选择
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
                  [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
                  [{ align: [] }],                                 // 对齐方式
                  ["clean"],                                       // 清除文本格式
                  ["link", "video","upload", "image"]                       // 链接、图片、视频
                ],
            handlers: { upload: value => { //编辑器-上传文件
                if (value) {
                  this.$refs.uploadFileUrl.$children[0].$refs.input.click();

                }
              }}},
        },
        placeholder: "请输入内容",
        readOnly: this.readOnly,
      },
    };
  },
  computed: {
    styles() {
      let style = {};
      if (this.minHeight) {
        style.minHeight = `${this.minHeight}px`;
      }
      if (this.height) {
        style.height = `${this.height}px`;
      }
      return style;
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.currentValue) {
          this.currentValue = val === null ? "" : val;
          if (this.Quill) {
            this.Quill.pasteHTML(this.currentValue);
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.Quill = null;
  },
  methods: {
    uploadSuccess_annex(res){
        console.log('success:',res)
    },
    uploadPic(param) {
      // console.log('res=>',param);
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      formData.append('newFileName', param.file.name)
      formData.append('bsModule','headImg')
      // axios.post(this.uploadUrl,formData)
      //     .then(res=>{
      //       this.handleUploadSuccess(res.data)
      //       console.log('res=>',res);
      //     })
      return this.uploadApi(formData, param.onProgress)
    },
    FiluploadPic(param){

      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      formData.append('newFileName', param.file.name)
      formData.append('bsModule','headImg')
      return this.uploadApi(formData, param.onProgress)
      // axios.post(this.uploadUrl,formData)
      //     .then(res=>{
      //       this.FiluploadPicSuccess(res.data,param.file)
      //       console.log('res=>',res);
      //     })
    },

    init() {
      const editor = this.$refs.editor;
      this.Quill = new Quill(editor, this.options);
      // 如果设置了上传地址则自定义图片上传事件
      if (this.type == 'url') {
        let toolbar = this.Quill.getModule("toolbar");
        toolbar.addHandler("image", (value) => {
          this.uploadType = "image";
          if (value) {
            this.$refs.upload.$children[0].$refs.input.click();
          } else {
            this.quill.format("image", false);
          }
        });
      }
      this.Quill.pasteHTML(this.currentValue);
      this.Quill.on("text-change", (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML;
        const text = this.Quill.getText();
        const quill = this.Quill;
        this.currentValue = html;
        this.$emit("input", html);
        this.$emit("on-change", { html, text, quill });
      });
      this.Quill.on("text-change", (delta, oldDelta, source) => {
        this.$emit("on-text-change", delta, oldDelta, source);
      });
      this.Quill.on("selection-change", (range, oldRange, source) => {
        this.$emit("on-selection-change", range, oldRange, source);
      });
      this.Quill.on("editor-change", (eventName, ...args) => {
        this.$emit("on-editor-change", eventName, ...args);
      });
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },

    FiluBeforeUpload(file){

      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
    },
    handleUploadSuccess(res, file) {
      console.log(res)
      // 获取富文本组件实例
      let quill = this.Quill;
      // 如果上传成功
      if (res.code == 0) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image",res.data.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    },

    FiluploadPicSuccess(res,file){
      let quill = this.Quill;
      let length = quill.getSelection().index;
      var Link = Quill.import('formats/link');

      let range = quill.getSelection(true)
      console.log('range', range)

      let obj = res.data.url
      const linkText = file.name
      quill.insertEmbed(length, 'link', { href: obj, innerText: linkText }, "api")
      quill.setSelection(length + linkText.length)
    },
    handleUploadError() {
      this.$message.error("图片插入失败");
    },
    FiluploadPicError(){   this.$message.error("文件插入失败");},

  },
};
</script>

<style>
.ql-upload{
  background: url("@/assets/images/fileUpload.svg") !important;
  background-size: 20px 20px !important;
  background-position: center center !important;
  background-repeat:no-repeat !important;
}
.editor, .ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
