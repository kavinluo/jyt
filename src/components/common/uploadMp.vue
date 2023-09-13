<template>
  <div>
    <el-upload
      class="media-uploader"
      :action="upurl"
      :headers="headers"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :limit="limit"
      accept="audio/*,video/*"
    >
      <template v-if="show">
        <el-button class="blueBtn">选择文件</el-button>
      </template>
    </el-upload>
    <div v-if="uploading" class="progress-bar">
      <el-progress :percentage="uploadProgress" status="uploading"></el-progress>
    </div>
    <div class="file-list">
      <div v-for="(file, index) in fileList" :key="index" class="file-item">
        <span class="file-name">{{ file.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config/config.js'
export default {
  props: ['limit', 'uploadUrl'],
  data() {
    return {
      show: true,
      upurl: config.urlPrefix + (this.uploadUrl || '/passport/pc/file/upload'),
      headers: {
        'Token': this.$util.getCookie('Token')
      },
      uploading: false,
      uploadProgress: 0,
      fileList: []
    }
  },
  methods: {
    handleProgress(event, file) {
      this.uploadProgress = event.percent || 0
      this.updateFileList(file, { status: 'uploading', percent: event.percent })
    },
    handleSuccess(response, file) {
      if (response.code === 0) {
        this.show = false
      }
      this.uploading = false
      this.uploadProgress = 0
      this.updateFileList(file, { status: 'success', response })
      this.$emit('upload-success', response.data)
    },
    handleError(error, file) {
      this.uploading = false
      this.uploadProgress = 0
      this.updateFileList(file, { status: 'error', error })
      this.$emit('upload-error', error)
    },
    beforeUpload(file) {
      const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/')
      if (!isMedia) {
        this.$message.error('只能上传音频或视频文件')
      }
      return isMedia
    },
    updateFileList(file, data) {
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      if (index !== -1) {
        this.fileList.splice(index, 1, { ...file, ...data })
      }
    },
    handleRemove(file, fileList) {
      const index = this.fileList.indexOf(file);
      if (index !== -1) {
        this.fileList.splice(index, 1)
      }
      // 如果没有附件了，则显示按钮
      if (this.fileList.length === 0) {
        this.show = true
      }
    }
  }
}
</script>

<style scoped>
.media-uploader {
  display: inline-block;
  margin-bottom: 10px;
}
.progress-bar {
  margin-top: 10px;
}
.file-list {
  margin-top: 10px;
}
.file-item {
  display: flex;
  align-items: center;
}
::v-deep  a.el-upload-list__item-name {
  width:100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-name {
  flex-grow: 1;
  margin-right: 10px;
}
</style>
