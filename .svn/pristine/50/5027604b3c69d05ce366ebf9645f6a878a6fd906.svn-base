<template>
  <div>
    <div style=" text-align: center;border-bottom: 1px dashed #ccc; line-height: 40px;">
      <span style="color:#0b8aec;font-size:17px;margin-right:20px;">1.活动入口</span>
      <span style="font-size: 17px;">2.活动详情</span>
      <el-button
        style="float:right"
        class="blueBtn"
        @click="nextStep('formValidate')"
      >
        下一步
      </el-button>
    </div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      :rules="formRules"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="活动名称："
        prop="name"
      >
        <el-input
          v-model="formValidate.name"
          style="width:200px;"
        />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="标识:"
            prop="code"
          >
            <el-select
              v-model="formValidate.code"
              placeholder="请选择"
            >
              <el-option
                v-for="item in codeList"
                :key="item.id"
                :label="item.remark"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="编号:"
            prop="number"
          >
            <el-input
              v-model="formValidate.number"
              style="width:200px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="排序:"
            prop="sort"
          >
            <el-input
              v-model="formValidate.sort"
              style="width:200px;"
              type="number"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item
        label="活动图片："
        prop="img"
      >
        <el-upload
          class="avatar-uploader"
          action="/api/passport/infra/file/upload"
          :show-file-list="false"
          :data="upData"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUploada"
        >
          <img
            v-if="formValidate.picture"
            style="width:330px;height:146px;"
            :src="formValidate.picture"
          >
          <!-- :src="api + backdrop" -->
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>
        <p style="color:#aaaaaa;">
          请上传宽高比330:146的图片!
        </p>
      </el-form-item>
      <el-form-item label="报名表类型：">
        <el-select
          v-model="formValidate.type"
          placeholder="请选择活动区域"
          @change="formValidate.typeValue = ''"
        >
          <el-option
            label="富文本"
            value="TEXT"
          />
          <el-option
            label="数据对接"
            value="JOIN"
          />
          <el-option
            label="数据链接"
            value="URL"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formValidate.type === 'TEXT'">
        <editor-bar
          v-model="formValidate.typeValue"
          :is-clear="true"
          :id-edit="editorType"
          @change="changeEditor($event, 'typeValue')"
        />
      </el-form-item>
      <el-form-item
        v-if="formValidate.type === 'JOIN'"
        label="数据对接："
      >
        <span>因多接口问题，开发需线下对接。</span>
      </el-form-item>
      <el-form-item
        v-if="formValidate.type === 'URL'"
        label="链接地址："
      >
        <el-input
          v-model="formValidate.typeValue"
          style="width:300px;"
        />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="报名费用：">
            <span><el-input
              v-model="formValidate.fee"
              style="width:90px;"
              type="number"
              oninput="value=value.replace(/[^\d]/g,'')"
            /></span><span>元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报名截至日期："
            prop="joinEndTime"
          >
            <el-date-picker
              v-model="formValidate.joinEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="按钮名称："
        prop="btnName"
      >
        <el-input
          v-model="formValidate.btnName"
          style="width:90px;"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import editorBar from '../../../tiku/jichutiku/editor/editoritem.vue'
import api from '../api'
export default {
  components: {editorBar},
  props: ['operailityData', 'type'],
  data () {
    return {
      loadingstate: false,
      backdrop: '',
      formValidate: {
        name: '',
        code: '',
        type: 'TEXT',
        fee: '',
        picture: '',
        typeValue: '',
        joinEndTime: '',
        number: '',
        sort: '',
        btnName: ''
      },
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      editorType: 'edit',
      codeList: [],
      headers: '',
      name: '',
      upData: {bsModule: 'cms'},
      formRules: {
        name: [
          { required: true, message: '请输入活动名称', pattern: '[^ \x22]+', trigger: 'blur' }
        ],
        joinEndTime: [
          { required: true, message: '请选择报名时间', trigger: 'change' }
        ]
      }
    }
  },
  destroyed () {
    this.$store.commit('setfirstStepContents', {})
  },
  created () {
    let firstStepContent = this.$store.getters.getfirstStepContents
    for(let k in this.formValidate) {
      this.formValidate[k] = firstStepContent[k]
    }
    this.name = this.$store.getters.getfirstStepContents.name
    this.$store.commit('setfirstStepContents', {})
    this.init()
  },
  methods: {
    init () {
      let firstStepContent = this.$store.getters.getFirstStepContent
      if (this.type === 'edit') {
        if(firstStepContent && Object.keys(firstStepContent).length) {
          for(let k in this.formValidate) {
            this.formValidate[k] = this.$store.getters.getFirstStepContent[k]
          }
        }
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getList.path + this.operailityData.id,
            method: 'get'
          }
        }
        this.ajax(opt)
      }
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
      let opt = {
        ajaxSuccess: (res) => {
          this.codeList = res.data
        },
        ajaxParams: {
          url: '/passport/dict-data/queryList?dictType=activity_type',
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    getSuccess (res) {
      if (this.name === undefined) {
        for (let k in this.formValidate) {
          this.formValidate[k] = res.data[k]
        }
      }
    },
    // 封面上传
    handleAvatarSuccess (response, file, fileList) {
      this.formValidate.picture = response.data.url
      this.loadingstate = false
    },
    // 文件格式验证
    beforeAvatarUploada (file) {
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
        this.limitFileWH(330, 146, file).then((res) => {
          file.isFlag = res
          if (file.isFlag) {
            return resolve(true)
          } else {
            return reject(false)
          }
        })
      })
    },
    // 判断尺寸方法
    limitFileWH (E_width, E_height, file) {
      const _this = this
      let imgWidth = ''
      let imgHight = ''
      return new Promise(function (resolve, reject) {
        const width = E_width
        const height = E_height
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function () {
          imgWidth = img.width
          imgHight = img.height
          const valid = img.width === width && img.height === height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        _this.$message.warning({
          message: '上传图片的尺寸应为' + E_width + '*' + E_height + '，当前上传图片的尺寸为：' + imgWidth + '*' + imgHight,
          btn: false
        })
        return false
      })
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      // this.tempData[type] = res.textContent
    },
    nextStep (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('setFirstStepContent', this.formValidate)
          this.$emit('setStep', 'details')
        } else {
          return false
        }
      })
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
    width:  330px;
    height: 146px;
    line-height: 146px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
