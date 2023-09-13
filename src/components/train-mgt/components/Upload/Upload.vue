<template>
  <div class="sf-upload">
    <el-upload
      ref="uploadFile"
      action="#"
      :multiple="multiple"
      :name="name"
      :showFileList="showFileList"
      :drag="drag"
      :accept="accept"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onUploadSuccess"
      :on-error="onUploadError"
      :on-progress="onProgress"
      :on-change="onFilesChange"
      :before-upload="onBeforeUpload"
      :before-remove="beforeRemove"
      :list-type="listType"
      :auto-upload="autoUpload"
      :file-list="fileList"
      :http-request="httpRequest"
      :disabled="disabled"
      :limit="limit"
      :on-exceed="onExceed"
    >
      <slot></slot>
      <div v-if="listType === 'picture-card'" slot="file" slot-scope="{ file }">
        <el-progress
          v-show="file.status !== 'success'"
          type="circle"
          :percentage="file.percentage"
        ></el-progress>
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.status === 'success' ? getFileFullUrl(file.url) : file.url"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="showDownloadBtn && file.status === 'success'"
            class="el-upload-list__item-download"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <template v-else-if="listType === 'text'">
        <a class="el-upload-list__item-name">
          <i class="el-icon-document">{{ file.name }}</i>
          <i v-if="time" class="formatDate">上传日期:{{ formatDate }}</i>
        </a>
        <label class="el-upload-list__item-status-label">
          <i :class="`el-icon-upload-${file.status} el-icon-circle-check`"></i>
        </label>
        <i
          v-if="showDownloadBtn && file.status === 'success'"
          class="el-icon-download"
          @click="handleDownload(file)"
        ></i>
        <i
          v-if="!disabled"
          class="el-icon-close"
          @click="handleRemove(file)"
        ></i>
      </template>
      <sf-button
        v-if="!autoUpload && showSubmitBtn"
        type="primary"
        :loading="loading"
        @click.stop="
          () => {
            $refs.uploadFile.submit()
          }
        "
      >
      开始上传
      </sf-button>
      <slot name="clear"></slot>
    </el-upload>
    <el-image-viewer
      v-if="showViewer"
      :z-index="2000"
      :initial-index="imageIndex"
      :on-close="closeViewer"
      :url-list="imageFileList"
    />
  </div>
</template>

<script>
import { uploadFiles } from '../../api/file'
import {download} from '../../utils/DownloadUtils'
let prevOverflow = null
import elImageViewer from 'element-ui/packages/image/src/image-viewer'

export default {
  name: 'SfUpload',
  components: { elImageViewer },

  props: {
    uploadApi: {
      type: Function,
      default: uploadFiles //uploadFiles
    },
    value: {
      type: Array,
      default: () => []
    },
    data: Object,
    multiple: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    showDownloadBtn: {
      type: Boolean,
      default: true
    },
    showRemoveBtn: {
      type: Boolean,
      default: true
    },
    showSubmitBtn: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },

    accept:String,

    onPreview: Function,
    // promise !!!
    onRemove: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    onChange: Function,
    beforeUpload: Function,
    beforeRemove: Function,
    // text/picture/picture-card
    listType: {
      type: String,
      default: 'text'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    limit: Number,
    onExceed: Function,
    time: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: 'file',
      loading: false,
      showViewer: false,
      imageIndex: 0,
      formatDate:new Date().toLocaleString()
    }
  },
  computed: {
    fileList: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    imageFileList() {
      if (this.listType === 'picture-card') {
        // return this.fileList.map(item => this.getFileFullUrl(item.url))
        return this.fileList.map(item => item.url)
      }
      return []
    }
  },
  methods: {
    /**
     * 清空已上传的文件列表（该方法不支持在 before-upload 中调用）
     */
    clearFiles() {
      this.$refs.uploadFile.clearFiles()
    },

    /**
     * 取消上传请求
     * @param file
     */
    abort(file) {
      this.$refs.uploadFile.abort(file)
    },

    /**
     * 手动上传文件列表
     */
    submit() {
      this.$refs.uploadFile.submit()
    },
    /**
     * 上传之前触发
     * @param file
     * @returns {boolean|*}
     */
    onBeforeUpload(file) {
      this.loading = true
      if (this.beforeUpload) {
        return this.beforeUpload(file)
      }
      return true
    },
    /**
     * 文件变更触发
     * @param data
     */
    onFilesChange(data) {
      this.onChange && this.onChange(data)
    },

    /**
     * 文件上传成功后触发
     * @param res
     * @param file
     * @param fileList
     */
    onUploadSuccess(res, file, fileList) {
      this.loading = false

      if (res.code === 0) {
        if (!file.resData) {
          // 解决type=text，文件上传成功之后无url属性问题
          file.resData = file.response.data
          let fileIndex = fileList.indexOf(file)
          fileList[fileIndex] = file
        }
        this.fileList = fileList
        this.$message.success('上传成功')
        // 调用回调
        this.onSuccess && this.onSuccess(res, file, fileList)
        return
      }
      this.onError && this.onError(res, file, fileList)
    },
    /**
     * 文件上传成功后触发
     * @param err
     * @param file
     * @param fileList
     */
    onUploadError(err, file, fileList) {
      console.log('err：',err)
      this.loading = false
      this.$message.error('上传失败，请联系管理员')
      // 调用回调
      this.onError && this.onError(err, file, fileList)
    },
    /**
     * 文件预览
     * @param file
     */
    handlePictureCardPreview(file) {
      this.imageIndex = this.fileList.indexOf(file)
      // prevent body scroll
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      this.showViewer = true
    },
    /**
     * 文件下载
     * @param file
     */
    handleDownload(file) {
      console.log("file:",file)
      download(file.informationUrl||file.resData.url,file.name||file.resData.name)
    },
    /**
     * 文件删除
     * @param file
     */
    handleRemove(file) {

      if (this.onRemove) {
        this.onRemove(file)?.then(() => {

          this.fileList.splice(this.fileList.indexOf(file), 1)
        })
        return
      }

      this.fileList.splice(this.fileList.indexOf(file), 1)

    },
    /**
     * 关闭预览框
     */
    closeViewer() {
      document.body.style.overflow = prevOverflow
      this.showViewer = false
    },
    /**
     * http请求
     * @param options
     */
    httpRequest(options) {

      let formData = new FormData()

      formData.append(this.name, options.file)
      formData.append('newFileName', options.file.name)
      formData.append('bsModule','headImg')
      if (this.data) {
        Object.keys(this.data).forEach(key => {
          formData.append(key, this.data[key])
        })
      }
      return this.uploadApi(formData, options.onProgress)
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .el-upload-list__item {
  transition: none;
}
::v-deep .el-upload-list--picture-card.is-disabled + .el-upload {
  display: none;
}

.el-upload-list--text {

  .el-upload-list__item {
    .el-icon-close,
    .el-icon-download {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: 0.75;

      &:hover {
        opacity: 1;
      }
    }
    .el-icon-download {
      right: 25px;
    }

    &:hover {
      .el-icon-close,
      .el-icon-download {
        display: inline-block;
      }

      .el-progress__text {
        display: none;
      }
    }
  }
}
.formatDate {
  font-style:normal;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  line-height: 20px;
}
</style>
