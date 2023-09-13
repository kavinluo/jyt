<template>
  <div :class="{'onlyUploadShow': uploadShow }">
    <el-upload
      ref="upload"
      :multiple="false"
      with-credentials
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :on-success="onSuccess"
      :on-error="onError"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-format-error="onFormatError"
      :on-exceeded-size="onExceededSize"
      :file-list="fileList"
      :drag="isDrag"
      :headers="headers"
      :class="{uploadShow:uploadShow,'picture-card':listType=='picture-card'}"
      :list-type="listType"
      :action="upUrl"
    >
      <div
        v-if="listType=='text'&& listLength<data.length"
        v-show="!uploadShow"
      >
        <el-button
          size="small"
          type="primary"
        >
          点击上传
        </el-button>
      </div>
      <div
        v-if="listType=='picture'&& listLength<data.length"
        v-show="!uploadShow"
        style="padding: 20px 0"
      >
        <Icon
          type="ios-cloud-upload"
          size="52"
          style="color: #3399ff"
        />
        <p>点击或将文件拖拽到这里上传</p>
      </div>
      <i
        v-show="!uploadShow"
        v-if="listType=='picture-card'"
        class="el-icon-plus"
      />
      <div
        v-if="!data.message"
        v-show="!uploadShow"
        slot="tip"
        class="el-upload__tip"
      >
        只能上传<span
          v-if="length"
          style="font-size: 16px;vertical-align: inherit;"
        >{{ length }}个</span>{{ selectAccept }}文件
        <span
          v-if="!unSize"
          style="vertical-align: inherit;"
        >，且不超过{{ +fileSize/1000 }}M</span>
      </div>
      <div
        v-if="data.message"
        v-show="!uploadShow"
        slot="tip"
        class="el-upload__tip"
      >
        {{ data.message }}
      </div>
    </el-upload>
    <div
      v-if="uploadShow && !fileList.length"
      class="noFileTips"
    >
      暂无附件
    </div>
    <el-dialog
      v-if="listType=='picture-card'"
      v-show="!uploadShow"
      v-model="dialogVisible"
      size="tiny"
    >
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>
<script>
import config from '../../config/config.js'

export default {
  /*
     * uploadUrl     string         上传地址后缀  ；
     * downloadUrl   string         下载地址后缀  ；
     * type          string         类型（默认text） 可接受 picture，text；picture-card
     * accept        string         允许通过的类型
     * show          boolean        是否是查看
     * drag          boolean        是否拖拽
     * size          number||string 文件大小默认500kb
     * length        number||string 长度
     * message       string         提示消息
     * params        obj            上述数据的集合，优先级较高，会覆盖上述数据
     * uploadFiles   array          需要查看的文件列表数据
     * */

  props: ['uploadUrl', 'downloadUrl', 'noFirstCallBack', 'type', 'accept', 'show', 'unSize', 'drag', 'size', 'message', 'length',
    'uploadFiles',
    'params', 'unMultiple'
  ],
  data () {
    //        let pictureAccept ='image/jpeg,image/png,image/bmp,image/gif,image/psd,image/tiff,image/tga,application/postscript';
    //        let textAccept =`application/x-zip-compressed,
    //        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
    //        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    //        application/vnd.ms-powerpoint,text/plain`;
    //        let allAccept = `image/jpeg,image/png,image/bmp,image/gif,image/psd,image/tiff,image/tga,application/postscript,application/x-zip-compressed,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
    //        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    //        application/vnd.ms-powerpoint,
    //          text/plain`;
    let pictureAccept = 'png|jpg|jpeg|bmp|gif'
    let textAccept = 'doc|docx|xls|xlsx|ppt|pptx|pdf'

    let listType
    let data = {
      upUrl: this.uploadUrl,
      downUrl: this.downloadUrl,
      type: this.type,
      accept: this.accept,
      drag: this.drag,
      size: this.size || 500,
      length: this.length || 500,
      message: this.message,
      show: this.show
    }
    // 合并
    if (this.params) {
      data = Object.assign(data, this.params)
    }

    if (!data.type) { // 默认设置类型为text
      listType = data.type = 'text'
    } else {
      listType = data.type
    }

    // 没有是否拖动，设置默认
    if (!data.drag) {
      listType === 'picture' && (data.drag = true)
      listType === 'picture-card' && (data.drag = false)
    }

    // 处理获取到的文件
    if (this.uploadFiles) {
      if (listType === 'picture-card') {
        data.uploadFiles = this.converterPictureList(this.uploadFiles)
      } else {
        data.uploadFiles = this.converterTextList(this.uploadFiles)
      }
    }

    if (!data.accept) { // 根据类型匹配可以上传的文件
      listType === 'text' && (data.accept = textAccept)
      listType === 'picture' && (data.accept = pictureAccept)
      listType === 'picture-card' && (data.accept = pictureAccept)
    } else {
      //            ~data.accept.indexOf('jpg') && selectAccept.push('image/jpeg');
      //            ~data.accept.indexOf('png') && selectAccept.push('image/png');
      //            ~data.accept.indexOf('bmp') && selectAccept.push('image/bmp');
      //            ~data.accept.indexOf('gif') && selectAccept.push('image/gif');
      //            ~data.accept.indexOf('tiff') && selectAccept.push('image/tiff');
      //            ~data.accept.indexOf('postscript') && selectAccept.push('application/postscript');
      //
      //            ~data.accept.indexOf('zip') && selectAccept.push('application/x-zip-compressed');
      //            ~data.accept.indexOf('xlsx') && selectAccept.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      //            ~data.accept.indexOf('docx') && selectAccept.push('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      //            ~data.accept.indexOf('ppt') && selectAccept.push('application/vnd.ms-powerpoint');
      //            ~data.accept.indexOf('txt') && selectAccept.push('text/plain');

      //          accept = selectAccept.join(',')

    }

    return {
      selectAccept: data.accept,
      listType: listType,
      isDrag: data.drag || false,
      data: data,
      fileSize: data.size,
      upUrl: config.urlPrefix + (this.uploadUrl || '/file/upload/study'),
      downUrl: config.urlPrefix + '/file/download',
      fileList: [],
      uploadList: [],
      listLength: this.uploadFiles && this.uploadFiles.length || 0,
      uploadShow: data.show || false,
      dialogVisible: false,
      dialogImageUrl: '',
      headers: '',
      noFirstCallBacka: this.noFirstCallBack
    }
  },
  watch: {
    uploadFiles (val) { // todo 待完善  初始化数据
      if (!val) {return}
      if (this.data.type === 'picture-card') {
        this.fileList = this.converterPictureList(val)
        if(!this.noFirstCallBacka) {
          this.$emit('setUploadFiles', this.processorPictureList(this.fileList), this.processorSrcList(this.fileList), this.fileList)
        }
        this.noFirstCallBacka = false

      } else {
        this.fileList = this.converterTextList(val)
        if(!this.noFirstCallBacka) {
          this.$emit('setUploadFiles', this.processorList(this.fileList), this.processorSrcList(this.fileList), this.fileList)
        }
        this.noFirstCallBacka = false
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    // 初始化
    init () {
      if (typeof this.data.url !== 'undefined') {
        this.upUrl = config.urlPrefix + this.data.upUrl
        this.downUrl = config.urlPrefix + this.data.downUrl
      } else if (this.listType === 'picture-card') {
        this.upUrl = config.urlPrefix + '/passport/pc/file/upload/static'
      }

      // 设置请求头部
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
    },

    // 处理text文件
    converterTextList (list) {
      let arr = []
      if (typeof list !== 'object' && !list.length) {return}
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i])
        if (list[i].fileId) {
          arr[i].id = list[i].fileId
        } else {
          arr[i].id = list[i].id
        }
        arr[i].name = list[i].fileName
        arr[i].url = list[i].filePath
        arr[i].type = list[i].fileType
      }
      this.listLength = arr.length
      return arr
    },

    // 处理 Picture 文件  todo 照片墙待完善
    converterPictureList (list) {
      let arr = []
      if (typeof list !== 'object' && !list.length) {return}
      for (let i = 0; i < list.length; i++) {
        arr.push({})
        arr[i].id = list[i].fileId
        arr[i].name = list[i].fileName
        arr[i].url = config.urlPrefix + '/' + list[i].filePath
        arr[i].type = list[i].fileType
      }
      return arr
    },

    beforeUpload (file) {
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
      // console.log("上传前")
      // 不能上传同名文件；
      if(!this.type) {
        for(let i = 0;i < this.fileList.length;i++) {
          let fileListName = this.fileList[i].name.split('.')
          let tempFileListName = (fileListName[fileListName.length - 1] + '').toLowerCase()
          fileListName[fileListName.length - 1] = tempFileListName
          fileListName = fileListName.join('.')
          // 把后缀变成小写
          let name = file.name.split('.')
          let temName = (name[name.length - 1] + '').toLowerCase()
          name[name.length - 1] = temName
          name = name.join('.')
          if(fileListName === name) {
            this.$Notice.warning({
              title: '文件已存在',
              desc: ` 文件  ${file.name}  已存在。`
            })
            return false
          }
        }
      }

      // 文件大小超出默认则提示
      if (!this.unSize) {
        let isbeyond = (+this.fileSize) * 1024 > file.size
        if (!isbeyond) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: ` 文件  ${file.name}  太大，不能超过 ${+this.fileSize / 1000}M。`
          })
          return false
        }

      }

      // 判断类型
      let type = file.name.split('.')
      type = (type[type.length - 1] + '').toLowerCase()
      if (!(~this.data.accept.indexOf(type))) {
        this.$Notice.warning({
          title: '文件格式不正确'
        })

        return false
      }
      this.listLength++ // 记录上传图片数量
      // 图片数量多余默认数量则提示
      const check = this.listLength <= this.data.length
      if (!check) {
        this.$Notice.warning({
          title: `最多只能上传 ${this.data.length} ${this.listType === 'text' ? '个文件' : '张图片' }。`
        })
        return false
      }
      this.ajaxCreateLoading(true)
    },
    onProgress (event, file, fileList) {
      // 文件上传时的钩子，返回字段为 event, file, fileList
    },
    onSuccess (response, file, fileList) {
      this.ajaxCreateLoading(false)
      if(response.status.code !== 0) {
        this.errorMess(response.status.msg)
        this.listLength--
        fileList.length = fileList.length - 1
        return
      }
      this.fileList = fileList
      // 文件上传成功时的钩子，返回字段为 response, file, fileList
      // console.log("上传成功")
      // 因为上传过程为实例，这里模拟添加 url
      if (this.listType === 'picture-card') {
        this.uploadList = fileList
        file.url = response.data.staticUrl + response.data.relativePathFile
        file.uploadUrl = response.data.relativePathFile
        this.$emit('setUploadFiles', this.processorPictureList(fileList), this.processorSrcList(fileList), fileList)
        return
      }
      file.data = response.data
      this.uploadList = fileList
      this.$emit('setUploadFiles', this.processorList(fileList), this.processorSrcList(fileList), fileList)
    },
    // eslint-disable-next-line handle-callback-err
    onError (error, file, fileList) {
      this.ajaxCreateLoading(false)
      this.listLength--
      // 文件上传失败时的钩子，返回字段为 error, file, fileList
      this.$Notice.warning({
        title: '上传失败'
      })
    },
    onPreview (file) {
      // 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
      if(this.show) {
        if (this.listType !== 'text') {return}
        let downloadUrl = this.downUrl + '/' + file.id
        //        let http = this.$store.getters.getEnvPath.http;
        //        if(http){
        //          downloadUrl =http+ downloadUrl
        //        }
        window.open(downloadUrl, '_self')
      }

    },
    // 照片墙
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onRemove (file, fileList) {

      this.fileList = fileList

      // 文件列表移除文件时的钩子，返回字段为 file, fileList
      this.listLength--
      this.uploadList = fileList

      if (this.listType === 'picture-card') {
        this.uploadList = fileList
        this.$emit('setUploadFiles', this.processorPictureList(fileList), this.processorSrcList(fileList), fileList)
        return
      }

      this.$emit('setUploadFiles', this.processorList(fileList), this.processorSrcList(fileList), fileList)

    },
    onFormatError (file) {
      // 文件格式验证失败时的钩子，返回字段为 file, fileList
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    onExceededSize (file, fileList) {
      // 文件超出指定大小限制时的钩子，返回字段为 file, fileList
      // console.log("最大上传10MB,您已超出默认设置大小!")
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },
    // 处理非照片墙的数据， todo 待完善
    processorList (fileList) {
      let ids = []
      for (let i = 0; i < fileList.length; i++) {
        ids.push(fileList[i].data.id)
      }
      return ids.join(',')
    },
    processorSrcList (fileList) {
      let path = []
      let pdfPath = []
      let imgsPath = []
      let flvPath = []
      for (let i = 0; i < fileList.length; i++) {
        path.push(fileList[i].data.path || '')
        pdfPath.push(fileList[i].data.pdfPath || '')
        imgsPath.push(fileList[i].data.imgsPath || '')
        flvPath.push(fileList[i].data.flvPath || '')
      }
      return {
        path: path.join(','),
        pdfPath: pdfPath.join(','),
        imgsPath: imgsPath.join(','),
        flvPath: flvPath.join(',')
      }
    },
    // 处理照片墙的数据， todo 待完善
    processorPictureList (fileList) {
      let ids = []
      for (let i = 0; i < fileList.length; i++) {
        ids.push(fileList[i].data.id)
      }
      return ids.join(',')
    }
  }
}

</script>

<style>
  .noFileTips {
    text-align: center;
    line-height: 26px;
  }

</style>
