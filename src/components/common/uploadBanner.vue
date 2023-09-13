<template>
  <div>
    <el-upload
      v-loading="loading"
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
    >
      <img
        v-if="imageUrl"
        class="avatar"
        :src="imageUrl"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
    <p style="color:#aaaaaa;text-align: center;font-size:15px;">请上传JPG/PNG/JPEG格式的图片。</p>
  </div>
</template>
<script>
import config from '../../config/config.js'
export default {
  props: ['uploadUrl', 'imageUrl'],
  data () {
    return {
      loading: false,
      headers: '',
      path: '',
      upUrl: config.urlPrefix + (this.uploadUrl || '/passport/pc/file/upload')
    }
  },
  created () {
    // 设置请求头部
    this.headers = {
      'Token': this.$util.getCookie('Token')
    }
  },
  methods: {
    // 封面上传
    handleAvatarSuccess (response, file, fileList) {
      this.loading = false
      this.$emit('setUploadFiles', response.data)
    },
    onProgress (event, file, fileList) {
      // 文件上传时的钩子，返回字段为 event, file, fileList
      this.loading = true
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' ||
                    file.type === 'image/jpg' ||
                    file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpeg/png/jpg 格式!');
        return false
      }else if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
        return false
      }
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          let img = new Image()
          img.src = reader.result
          img.onload = () => {
            console.log(img.naturalWidth / img.naturalHeight)
            if (img.naturalWidth / img.naturalHeight !== 1.7777777777777777) {
              this.$message.error('请上传宽高比为16:9的图片!')
              return reject(false)
            } else {
              return resolve(true)
            }
          }
        }
      })
    },
    // 判断尺寸方法
    limitFileWH (E_width, E_height, file) {
      const _this = this
      let imgWidth = ''
      let imgHight = ''
      const isSize = new Promise(function (resolve, reject) {
        const width = E_width
        const height = E_height
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function () {
          imgWidth = img.width
          imgHight = img.height
          let valid
          if(width === 16 && height === 9) {
            valid = imgWidth === imgHight
          }else {
            valid = img.width === width && img.height === height
          }
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        _this.$message.warning({
          message: '上传图片的尺寸比例应为' + E_width + '*' + E_height + '，当前上传图片的尺寸为：' + imgWidth + '*' + imgHight,
          btn: false
        })
        return false
      })
      return isSize
    }
  }
}
</script>
<style scoped>

::v-deep .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
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
    width: 250px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar {
    width: 250px;
    height: 140px;
    display: block;
  }
</style>
