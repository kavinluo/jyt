<template>
  <div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="标题:"
        prop="contentTitle"
      >
        <el-input
          v-model="formValidate.contentTitle"
          autocomplete="off"
          style="width:200px"
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="分类标识:"
            prop="contentType"
          >
            <el-select
              v-model="formValidate.contentType"
              placeholder="请选择分类标识"
              @change="changeSelect(formValidate.contentType)"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="权值:"
            prop="contentSort"
          >
            <el-input v-model.number="formValidate.contentSort" style="width:150px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="作者:"
            prop="contentAuthor"
          >
            <el-input v-model="formValidate.contentAuthor"  style="width:150px;"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="置顶:"
            prop="top"
          >
            <el-select
              v-model="formValidate.top"
              placeholder="请选择置顶"
              style="width:150px;"
            >
              <el-option
                label="不置顶"
                :value="false"
              />
              <el-option
                label="置顶"
                :value="true"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        v-if="formValidate.contentType === 'IMAGE1'"
        prop="img"
      >
        <el-checkbox v-model="checked">
          超链接地址
        </el-checkbox>
        <p>
          <span>超链接地址:<el-input
            v-model="formValidate.contentOutLink"
            style="width:200px;"
          /></span>
        </p>
        <upload-file
          :content-type="formValidate.contentType"
          :image-urls="imageUrls"
          :upload-url="'/passport/infra/file/upload'"
          :show-file-list="false"
          :upload-files="formValidate.contentImg"
          :length="1"
          :tip-show="false"
          btn-text="添加音视频"
          @setUploadFiles="setUploadFiles($event, 'videoFileId')"
        />
        <p>请上传JPG/PNG/JPEG格式的图片，宽高尺寸比例16:9。</p>
      </el-form-item>
      <el-row v-if="formValidate.contentType === 'IMAGE3'">
        <div style="margin-left:110px;">
          <el-checkbox v-model="checked">
            超链接地址
          </el-checkbox>
          <p>
            <span>超链接地址:<el-input
              v-model="formValidate.contentOutLink"
              style="width:200px;"
            /></span>
          </p>
          <el-col :span="8">
            <el-upload
              class="avatar-uploader"
              action="/api/passport/infra/file/upload"
              :show-file-list="false"
              :data="upData"
              :headers="headers"
              :on-success="handleAvatarSuccessImg1"
              :before-upload="beforeAvatarUploadaImg1"
            >
               <img
                style="width:150px;height:150px;"
                v-if="imgUrlList1"
                :src="imgUrlList1"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-col>
          <el-col :span="8">
            <el-upload
              class="avatar-uploader"
              action="/api/passport/infra/file/upload"
              :show-file-list="false"
              :data="upData"
              :headers="headers"
              :on-success="handleAvatarSuccessImg2"
              :before-upload="beforeAvatarUploadaImg1"
            >
              <img
                style="width:150px;height:150px;"
                v-if="imgUrlList2"
                :src="imgUrlList2"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-col>
          <el-col :span="8">
            <el-upload
              class="avatar-uploader"
              action="/api/passport/infra/file/upload"
              :show-file-list="false"
              :data="upData"
              :headers="headers"
              :on-success="handleAvatarSuccessImg3"
              :before-upload="beforeAvatarUploadaImg1"
            >
              <img
                style="width:150px;height:150px;"
                v-if="imgUrlList3"
                :src="imgUrlList3"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
          </el-col>
          <p style="text-align:center; font-size:15px;">请上传JPG/PNG/JPEG格式的图片，宽高尺寸比例1:1。</p>
        </div>
      </el-row>
      <el-form-item v-if="formValidate.contentType === 'VIDEO_LANDSCAPE'">
        <el-checkbox v-model="checked">
          超链接地址
        </el-checkbox>
        <p>
          <span>超链接地址:<el-input
            v-model="formValidate.contentOutLink"
            style="width:200px;"
          /></span>
        </p>
        <el-row
          v-if="checked === false"
          style="margin-top:20px;"
        >
          <el-col :span="8">
            <el-form-item prop="contentImg">
              <upload-file
                :content-type="formValidate.contentType"
                :image-urls="imageUrls"
                :upload-url="'/passport/infra/file/upload'"
                :show-file-list="false"
                :upload-files="formValidate.contentImg"
                :length="1"
                :tip-show="false"
                btn-text="添加音视频"
                @setUploadFiles="setUploadFiles"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <uploadFileVideo
              :upload-url="'/passport/infra/file/upload'"
              :show-file-list="false"
              :upload-files="formValidate.contentDescription"
              :length="1"
              :tip-show="false"
              btn-text="添加音视频"
              @setUploadFiless="setUploadFiless"
            />
            <p>
              <span>视频名称:</span>{{ videoUrl }}
            </p>
          </el-col>
        </el-row>
        <p v-if="checked === false">
          请上传JPGE/PNG格式的封面、MP4/AVI/WMV格式的视频，宽高尺寸比例4:3。
        </p>
      </el-form-item>
      <el-form-item v-if="formValidate.contentType === 'VIDEO_PORTRAIT'">
        <el-checkbox v-model="checked">
          超链接地址
        </el-checkbox>
        <p>
          <span>超链接地址:<el-input
            v-model="formValidate.contentOutLink"
            style="width:200px;"
          /></span>
        </p>
        <el-row
          v-if="checked === false"
          style="margin-top:20px;"
        >
          <el-col :span="8">
            <el-form-item prop="contentImg">
              <upload-file
                :content-type="formValidate.contentType"
                :image-urls="imageUrls"
                :upload-url="'/passport/infra/file/upload'"
                :show-file-list="false"
                :upload-files="formValidate.contentImg"
                :length="1"
                :tip-show="false"
                btn-text="添加音视频"
                @setUploadFiles="setUploadFiles"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <uploadFileVideo
              :upload-url="'/passport/infra/file/upload'"
              :show-file-list="false"
              :upload-files="formValidate.contentDescription"
              :length="1"
              :tip-show="false"
              btn-text="添加音视频"
              @setUploadFiless="setUploadFiless"
            />
            <p>
              <span>视频名称:</span>{{ videoUrl }}
            </p>
          </el-col>
        </el-row>
        <p v-if="checked === false">
          请上传JPGE/PNG格式的封面、MP4/AVI/WMV格式的视频，宽高尺寸比例3:4。
        </p>
      </el-form-item>
      <el-form-item v-if="formValidate.contentTypes == '' || formValidate.contentType === 'IMAGE3'|| formValidate.contentType === 'IMAGE1' || formValidate.contentType === 'BASE'">
        <div v-if="formValidate.contentTypes !== '' && formValidate.contentType !== 'IMAGE3'&& formValidate.contentType !== 'IMAGE1' && formValidate.contentType === 'BASE'">
          <el-checkbox v-model="checked">
            超链接地址
          </el-checkbox>
          <p>
            <span>超链接地址:<el-input
              v-model="formValidate.contentOutLink"
              style="width:200px;"
            /></span>
          </p>
        </div>
        <editor-bar
          v-if="checked === false"
          v-model="formValidate.contentDetails"
          :is-clear="isClear"
          :id-edit="editorType"
          @change="changeEditor($event, 'contentDetails')"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formValidate')"
        >
          保存
        </el-button>
        <el-button @click="resetForm('formValidate')">
          保存并发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let Util = null
import api from './api'
import uploadFile from '@/components/common/uploadFileImg.vue'
import uploadFileVideo from '@/components/common/uploadFileVideo.vue'
import editorBar from '@/components/tiku/jichutiku/editor/editoritem.vue'
import config from '@/config/config.js'
export default {
  components: {editorBar, uploadFile, uploadFileVideo},
  props: ['operailityDatas', 'multipleSelection', 'setTableData', 'type', 'operailityData'],
  data () {
    return {
      api,
      formValidate: {
        contentDetails: '',
        contentSort: '1',
        contentTitle: '',
        contentAuthor: '',
        contentType: '',
        categoryId: '1329257213283344385',
        contentImg: [],
        videoFileId: '',
        contentDisplay: '',
        contentDescription: '',
        contentOutLink: '',
        auditStatus: 'PASS',
        top: false
      },
      upData: {bsModule: 'cms'},
      videoUrl: '',
      contentVideo: '',
      imageUrl: '',
      imgUrlList1: '',
      imgUrlList2: '',
      imgUrlList3: '',
      imageUrls: '',
      imgList: [],
      isClear: false,
      url: config.urlPrefix + '/passport/infra/file/upload',
      checked: false,
      coverImg: '',
      editorType: 'edit',
      rules: {
        contentTitle: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        myTop: [
          { required: true, message: '请选择置顶信息', trigger: 'blur' }
        ],
        contentSort: [
          { required: true, message: '请输入权值', trigger: 'blur' }
        ],
        contentImg: [
          { required: true, message: '请选择封面', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: 'BASE',
          label: '仅标题'
        }, {
          value: 'IMAGE1',
          label: '标题配一图'
        }, {
          value: 'IMAGE3',
          label: '标题配三图'
        }, {
          value: 'VIDEO_LANDSCAPE',
          label: '标题配横视频'
        }, {
          value: 'VIDEO_PORTRAIT',
          label: '标题配竖视频'
        }
      ],
      headers: '',
      loadingstate: false,
      contentImgArr: [],
      videoForm: {
        videoId: '',
        videoUrl: ''
      },
      videoFlag: false,
      Plus: true,
      videoUploadPercent: 0,
      contentType: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
      Util = this.$util
      if (this.type === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getList.path + this.operailityDatas.id,
            method: 'get'
          }
        }
        this.ajax(opt)
      }
    },
    change (index) {
      console.log(index)
    },
    getSuccess (res) {
      for (let k in this.formValidate) {
        this.formValidate[k] = res.data[k]
      }
      this.contentType = this.formValidate.contentType
      let contentImg = JSON.parse(res.data.contentImg)
      if(this.contentType === 'IMAGE1' && contentImg.length) {
        this.imageUrls = contentImg[0].url
      }else if(this.contentType === 'IMAGE3' && contentImg.length) {
        this.imgUrlList1 = contentImg[0].url
        this.imgUrlList2 = contentImg[1].url
        this.imgUrlList3 = contentImg[2].url
      }
      this.formValidate.contentImg = JSON.parse(this.formValidate.contentImg)
      // 截取视频名称
      if(res.data.contentDescription) {
        let ms = res.data.contentDescription.indexOf('ms/')
        let msv = res.data.contentDescription.substr(ms + 1, res.data.contentDescription.length)
        let video = msv.indexOf('/')
        let videoUrl = msv.substr(video + 1, video.length)
        this.videoUrl = videoUrl
      }
    },
    // 图片上传
    setUploadFiles (res) {
      let obj = {}
      obj = {
        url: res.url,
        name: res.name,
        path: ''
      }
      if (this.formValidate.contentType === 'IMAGE1' || this.formValidate.contentType === 'VIDEO_PORTRAIT' || this.formValidate.contentType === 'VIDEO_LANDSCAPE') {
        this.formValidate.contentImg = []
        this.formValidate.contentImg.push(obj)
        // this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)

      }
    },
    // 视频
    setUploadFiless (res) {
      this.formValidate.contentDescription = res.data.url // 视频地址
    },
    changeSelect (val) {
      if (val !== this.contentType) {
        this.imageUrls = ''
      }
      this.formValidate.contentImg = []
    },
    submitSuccess (res) {
      if (res.code === 0) {
        if (this.type === 'edit') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
        this.$emit('cancel', 'add')
        this.setTableData()
      }
    },
    utf16toEntities (str) {
      var patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
      str = str.replace(patt, function (char) {
        var H, L, code
        if (char.length === 2) {
          H = char.charCodeAt(0) // 取出高位
          L = char.charCodeAt(1) // 取出低位
          code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00 // 转换算法
          return '&#' + code + ';'
        } else {
          return char
        }
      })
      this.formValidate.contentDetails = str
      return str
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate.contentDetails = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      this.utf16toEntities(this.formValidate.contentDetails)
    },
    pass () {
      let opt = {
        ajaxSuccess: res => {},
        ajaxParams: {
          url: '/cms/cmsContent/audit/' + this.multipleSelection[0].id,
          method: 'put',
          jsonString: true,
          data: {
            auditReason: '',
            flag: 1
          }
        }
      }
      this.ajax(opt)
    },
    // 保存
    submitForm () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.formValidate.contentDisplay = '0'
          if(this.formValidate.contentType === 'IMAGE3' && this.formValidate.contentImg.length !== 3) {
            this.$message({
              message: '请上传三张封面',
              type: 'warning'
            })
            return
          }
          this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
          let opt = {
            ajaxSuccess: 'submitSuccess',
            ajaxParams: {
              url: this.type === 'edit' ? api.modify.path + this.operailityDatas.id : api.addList.path,
              method: this.type === 'edit' ? 'put' : 'post',
              jsonString: true,
              data: this.formValidate
            }
          }
          this.ajax(opt)

        }else {
          return false
        }
      })
    },
    // 保存并发布
    resetForm () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.formValidate.contentDisplay = '1'
          if(this.formValidate.contentType === 'IMAGE3' && this.formValidate.contentImg.length !== 3) {
            this.$message({
              message: '请上传三张封面',
              type: 'warning'
            })
            return
          }
          this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
          let opt = {
            ajaxSuccess: 'submitSuccess',
            ajaxParams: {
              url: this.type === 'edit' ? api.modify.path + this.operailityDatas.id : api.addList.path,
              method: this.type === 'edit' ? 'put' : 'post',
              jsonString: true,
              data: this.formValidate
            }
          }
          this.ajax(opt)

        }else {
          return false
        }
      })
    },
    // 图1
    handleAvatarSuccessImg1 (response, file, fileList) {
      this.formValidate.contentImg.splice(0, 1, {
        url: response.data.url,
        name: response.data.name,
        path: ''
      })
      this.imgUrlList1 = response.data.url
    },
    beforeAvatarUploadaImg1 (file) {
      return new Promise((resolve, reject) => {
        const suffix = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!suffix) {
          this.$message.error('只能上传图片！')
          return reject(false)
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!')
          return reject(false)
        }
        // 调用[限制图片尺寸]函数
        this.limitFileWH(1, 1, file).then((res) => {
          file.isFlag = res
          if (file.isFlag) {
            return resolve(true)
          } else {
            return reject(false)
          }
        })
      })
    },
    // 图2
    handleAvatarSuccessImg2 (response, file, fileList) {
      this.formValidate.contentImg.splice(1, 1, {
        url: response.data.url,
        name: response.data.name,
        path: ''
      })
      this.imgUrlList2 = response.data.url
    },
    // 图3
    handleAvatarSuccessImg3 (response, file, fileList) {
      this.formValidate.contentImg.splice(2, 1, {
        url: response.data.url,
        name: response.data.name,
        path: ''
      })
      this.imgUrlList3 = response.data.url

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
          if(width === 1 && height === 1) {
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
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
   .avatar-uploader-icon2 {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload-dragger {
    width: 200px;
    height: 140px;
}
.avatar-uploader-icon {
  width:150px;
  height:150px;
  line-height: 150px;
}
</style>
