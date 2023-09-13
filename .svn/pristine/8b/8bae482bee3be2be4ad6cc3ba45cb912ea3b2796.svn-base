<template>
  <div :class="{'onlyUploadShow': uploadShow, 'noFile': uploadShow && !fileList.length }">
    <el-upload
      ref="upload"
      v-loading="loading"
      :multiple="multiple"
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
      :class="{uploadShow:uploadShow}"
      :list-type="listType"
      :action="upUrl"
      :data="upData"
      :auto-upload="autoUpload"
      :limit="length"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
    >
      <img v-if="imageUrl && imgType === 'edit'" :src="imageUrl" class="avatar">
      <img v-else-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import config from '../../config/config.js'

export default {
  /*
     * uploadUrl     string         上传地址后缀  ；
     * downServer    string         下载地址后缀(该地址直接+附件的id为下载地址)
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
     * callData      any            回调函数中原样返回(多个上传组件同时使用时在上传成功或者移除回调函数中返回)
     * uploadData    obj            上传附件的附件参数
     * */

  props: ['uploadUrl', 'downServer', 'downloadUrl', 'type', 'accept', 'show', 'unSize', 'drag', 'size', 'message', 'length',
    'uploadFiles', 'noFirstCallBack', 'unAccept', 'autoUpload', 'multiple',
    'params', 'unMultiple', 'callData', 'uploadData', 'imageUrl', 'imgType', 'contentType', 'imageUrls'
  ],
  // eslint-disable-next-line complexity
  data () {
    // let pictureAccept = 'png|jpg|jpeg|bmp|gif'
    // let textAccept = 'doc|docx|xls|xlsx|ppt|pptx|pdf'

    let listType
    // eslint-disable-next-line no-unused-vars
    let accept
    let data = {
      upUrl: this.uploadUrl,
      downUrl: this.downloadUrl,
      type: this.type,
      accept: this.accept,
      drag: this.drag,
      size: this.size || 1024 * 50,
      length: this.length || 500,
      message: this.message,
      show: this.show,
      upData: this.uploadData || {}
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
      data.uploadFiles = this.converterTextList(this.uploadFiles)
    }
    if(this.unAccept) {
      data.accept = '不限格式'
    }

    return {
      // info: {},
      textList: [],
      selectAccept: data.accept,
      listType: listType,
      isDrag: data.drag || false,
      data: data,
      fileSize: data.size,
      upUrl: config.urlPrefix + (this.uploadUrl || '/passport/pc/file/upload'),
      downUrl: config.urlPrefix + '/file/download',
      fileList: [],
      uploadList: [],
      listLength: this.uploadFiles && this.uploadFiles.length || 0,
      uploadShow: data.show || false,
      dialogVisible: false,
      dialogImageUrl: '',
      headers: '',
      upData: {bsModule: 'cms'},
      fileData: {},
      fileType: 'png,jpg,jpeg',
      loading: false
    }
  },
  computed: {
    info () {
      let info = this.$store.getters.getEnvs || {}
      return info
    }
  },
  // watch: {
  //   uploadFiles (val) { // todo 待完善  初始化数据
  //     if (!val) {return}
  //     if (this.data.type === 'picture-card') {
  //       // this.fileList = this.converterPictureList(val)
  //       if(this.noFirstCallBack) {return}
  //       this.$emit('setUploadFiles', this.processorPictureList(this.fileList), this.fileList, this.callData || {})
  //     } else {
  //       this.fileList = this.converterTextList(val)
  //       if(this.noFirstCallBack) {return}
  //       this.$emit('setUploadFiles', this.processorList(this.fileList), this.fileList, this.callData || {})
  //     }
  //   }
  // },
  created () {
  /*  this.info = this.$store.getters.getEnvs
    console.log(this.info, '21312313')*/
    this.init()
    this.dialogImageUrl = ''
    this.dialogImageUrl = this.imageUrls
    if (this.imageUrl) {
      this.dialogImageUrl = ''
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    // 初始化
    init () {
      // if (typeof this.data.url !== 'undefined') {
      //   this.upUrl = config.urlPrefix + this.data.upUrl
      //   this.downUrl = config.urlPrefix + this.data.downUrl
      // } else if (this.listType === 'picture-card') {
      //   this.upUrl = config.urlPrefix + '/passport/pc/file/upload/static'
      // }
      // 设置请求头部
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
    },

    // 处理text文件
    converterTextList (list) {
    },

    // 处理 Picture 文件  todo 照片墙待完善
    // converterPictureList (list) {
    //   let arr = []
    //   if (typeof list !== 'object' && !list.length) {return}
    //   for (let i = 0; i < list.length; i++) {
    //     arr.push({})
    //     arr[i].id = list[i].fileId
    //     arr[i].name = list[i].fileName
    //     arr[i].url = config.urlPrefix + '/' + list[i].filePath
    //     arr[i].type = list[i].fileType
    //   }
    //   return arr
    // },

    // eslint-disable-next-line complexity
    handleRemove (file) {
      console.log(file)
    },
    beforeUpload (file) {
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
      console.log('上传前')
      // 不能上传同名文件；

      // 文件大小超出默认则提示
      if (!this.unSize) {
        let isbeyond = (+this.fileSize) * 1024 > file.size
        if (!isbeyond) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: ` 文件  ${file.name}  太大，不能超过 ${this.formatUploadSize(this.fileSize) }。`
          })
          return false
        }
      }
      // 判断类型
      if(!this.unAccept || this.fileType) {
        let type = file.name.split('.')
        type = (type[type.length - 1] + '').toLowerCase()
        console.log(this.fileType)
        if (!(~this.fileType.indexOf(type))) {
          this.$Notice.warning({
            title: '文件格式不正确'
          })
          return false
        }
      }
      this.listLength++ // 记录上传图片数量
      // 图片数量多余默认数量则提示
      // const check = this.listLength <= this.data.length
      // if (!check) {
      //   this.$Notice.warning({
      //     title: `最多只能上传 ${this.data.length} ${this.listType === 'text' ? '个文件' : '张图片' }。`
      //   })
      //   return false
      // }
      this.upData.mathRand = Math.random() * 100000000000000000
      this.ajaxCreateLoading(true)

    },
    onProgress (event, file, fileList) {
      // 文件上传时的钩子，返回字段为 event, file, fileList
      this.loading = true
    },

    formatUploadSize (value) {
      let temp
      let init
      console.log(value)

      if (!value) {return '0KB'}
      if (value < 1024) {
        return value + 'kB'
      } else if (value < (1024 * 1024)) {
        temp = value / 1024
        temp = temp.toFixed(2)
        return temp + 'MB'
      } else if (value < (1024 * 1024 * 1024)) {
        init = (value / (1024 * 1024))
        // float = (value % (1024*1024))/1024;
        return init.toFixed(2) + 'GB ' // +float.toFixed(2)+'KB';
      }
      return

    },
    onSuccess (response, file, fileList) {
      this.loading = false
      this.dialogImageUrl = URL.createObjectURL(file.raw)
      this.ajaxCreateLoading(false)
      if(response.code !== 0) {
        fileList.push(response.data)
        this.errorMess(response.msg)
        this.listLength--
        fileList.length = fileList.length - 1
        return
      }
      this.fileList = fileList
      // 文件上传成功时的钩子，返回字段为 response, file, fileList
      console.log('上传成功')
      console.log(this.fileList, fileList)
      // 因为上传过程为实例，这里模拟添加 url
      // if (this.listType === 'picture-card') {
      //   this.uploadList = fileList
      //   file.url = response.data.staticUrl + response.data.relativePathFile
      //   file.uploadUrl = response.data.relativePathFile
      //   this.$emit('setUploadFiles', this.processorPictureList(fileList), fileList, this.callData || {})
      //   return
      // }
      file.id = this.getUploadFileId(response.data)
      this.uploadList = fileList
      // this.$emit('setUploadFiles', this.processorPictureList(fileList), fileList, this.callData || {})

      this.$emit('setUploadFiles', response.data)
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
      console.log(file.response, 'filefilefilefile')
      this.$emit('setUploadFiles', file.response)
      if(this.show) {
        if (this.listType !== 'text') {return}
        let downloadUrl = (this.downServer ? this.downServer : this.downUrl + '/') + file.id
        //        let http = this.$store.getters.getEnvPath.http;
        //        if(http){
        //          downloadUrl =http+ downloadUrl
        //        }
        window.open(downloadUrl, '_self')
      }

    },
    // 照片墙
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    onRemove (file, fileList) {
      this.fileList = fileList
      // 文件列表移除文件时的钩子，返回字段为 file, fileList
      this.listLength--
      this.uploadList = fileList
      if (this.listType === 'picture-card') {
        this.uploadList = fileList
        this.$emit('setUploadFiles', this.processorPictureList(fileList), fileList, this.callData || {})
        return
      }
      this.$emit('setUploadFiles', this.processorList(fileList), fileList, this.callData || {})
      this.$emit('removeUploadFiles', file.id)
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
        ids.push(fileList[i].id)
      }
      return ids.join(',')
    },
    // 处理照片墙的数据， todo 待完善
    processorPictureList (fileList) {
      let urls = []
      for (let i = 0; i < fileList.length; i++) {
        urls.push(fileList[i].uploadUrl)
      }
      return urls.join(',')
    },
    // 获取上传的附件id
    getUploadFileId (res) {
      return res.relativePathFile && res.relativePathFile || res
    }
  }
}

</script>

<style lang="less">
  .noFile{
    .uploadShow{display: none;}
  }
  .noFileTips {
    text-align: center;
    line-height: 26px;
  }
  .el-form-item__content{
    .noFileTips{line-height: 36px;}
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
