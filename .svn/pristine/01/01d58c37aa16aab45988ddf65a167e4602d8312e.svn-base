<template>
  <div>
    <div style=" text-align: center;border-bottom: 1px dashed #ccc; line-height: 40px;">
      <span style="font-size:17px;margin:0 20px 0 75px;">1.活动入口</span>
      <span style="color:#0b8aec;font-size:17px;">2.活动详情</span>
      <el-button
        style="float:right;margin-left:15px;"
        class="blueBtn"
        @click="lastStep"
      >
        上一步
      </el-button>
      <el-button
        style="float:right;"
        class="blueBtn"
        @click="onSubmit"
      >
        确定
      </el-button>
    </div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      :rules="formRules"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="主办单位:"
        prop="hostUnit"
      >
        <el-input
          v-model="formValidate.hostUnit"
          style="width:200px;"
        />
      </el-form-item>
      <el-form-item
        label="活动简介:"
        prop="intro"
      >
        <el-input
          v-model="formValidate.intro"
          style="width:300px;"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="图标:"
            prop="icon"
          >
            <el-upload
              class="avatar-uploader"
              action="/api/passport/infra/file/upload"
              :show-file-list="false"
              :data="upData"
              :headers="headers"
              :on-success="handleAvatarSuccessIcon"
              :before-upload="beforeAvatarUploadaIcon"
            >
              <img
                v-if="formValidate.icon"
                style="width:80px;height:80px;"
                :src="formValidate.icon"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
            <p style="color:#aaaaaa;">
              宽高比1:1
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="背景:"
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
                v-if="formValidate.backdrop"
                :src="backdrop"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>
            <p style="color:#aaaaaa;">
              375:235
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动开始日期：" prop="activityBeginTime">
            <el-date-picker
              v-model="formValidate.activityBeginTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动结束日期：" prop="activityEndTime">
            <el-date-picker
              v-model="formValidate.activityEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="模块数量:">
        <el-select
          v-model="formValidate.moduleNum"
          placeholder="请选择模块数量"
          @change="tmSelectNumChange"
        >
          <el-option
            v-for="item in 6"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <div
        v-for="(item, index) in moduleList "
        :key="index"
        class="box"
      >
        <el-row>
          <div class="num">
            <span>{{ selectContent[index] }}</span>
          </div>
          <el-col :span="6">
            <el-form-item label="模块名称:">
              <el-input
                v-model="item.name"
                style="width:150px;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="模块类型：">
              <el-select
                v-model="item.type"
                placeholder="请选择模块类型"
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="排序:">
              <el-input
                v-model="item.sort"
                style="width:150px;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="item.type === 'TEXT'">
          <editor-bar
            v-model="item.typeValue"
            :is-clear="true"
            :id-edit="editorType"
            @change="changeEditor($event, item, 'typeValue')"
          />
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item
              v-if="item.type === 'JOIN'"
              label="数据对接："
            >
              <el-select
                v-model="item.code"
                placeholder="请选择"
              >
                <el-option
                  v-for="i in codeList"
                  :key="i.id"
                  :label="i.remark"
                  :value="i.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              v-if="item.code === 'KS'"
              label="试卷:"
            >
              <el-input
                v-model="item.businessNames"
                style="width:200px;margin-left:-120px"
                placeholder="请选择试卷"
                @focus="examination"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          v-if="item.type === 'URL'"
          label="链接地址："
        >
          <el-input
            v-model="item.typeValue"
            style="width:300px;"
          />
        </el-form-item>
      </div>
    </el-form>
    <!-- 选择考试弹窗-->
    <Modal
      v-model="examinModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="examinId"
      />
      <select-examin
        v-if="examinModal"
        :init-user="exam"
        url="tkmanage/examTree/tree?type=EXAM_PAPER"
        @cancel="examinModal = false"
        @setUsers="setexamin"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import editorBar from '../../../tiku/jichutiku/editor/editoritem.vue'
import selectExamin from '../../../common/selectExamination.vue'
import api from '../api'
export default {
  components: {editorBar, selectExamin},
  props: ['operailityData', 'type', 'setTableData'],
  data () {
    return {
      api,
      loadingstate: false,
      examinModal: false,
      selectExamination: '',
      examinId: {id: 'examinId', title: '选择试卷'},
      exam: [],
      coverImg: '',
      covericon: '',
      formValidate: {
        hostUnit: '',
        intro: '',
        icon: '',
        backdrop: '',
        activityBeginTime: '',
        moduleNum: 1,
        moduleList: [],
        activityEndTime: ''
      },
      pickerOptions: {
        disabledDate (time) {
          console.log(time.getTime(), 'time')
          // return time.getTime() < Date.now()
        }
      },
      formRules: {
        activityBeginTime: [
          { required: true, message: '请填写活动开始时间', trigger: 'change' }
        ],
        activityEndTime: [
          { required: true, message: '请填写活动结束时间', trigger: 'change' }
        ]
      },
      icon: '',
      backdrop: '',
      region: '',
      headers: '',
      upData: {bsModule: 'cms'},
      selectContent: ['1', '2', '3', '4', '5', '6'],
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      editorType: 'edit',
      selectOption: {
        name: '',
        typeValue: '',
        type: '',
        code: '',
        sort: 0,
        businessNames: '',
        businessIds: ''
      },
      moduleList: [],
      firstStepContent: {}, // 第一步数据
      secondStepContent: {},
      codeList: [],
      examinationList: []
    }
  },
  computed: {
    StepContent () {
      let First = this.$store.getters.getFirstStepContent || {}
      return First
    }
  },
  created () {
    this.init()
    Util = this.$util
    this.firstStepContent = this.$store.getters.getFirstStepContent // 第一步设置的内容  提交用
    this.secondStepContent = this.$store.getters.getSecondStepContent
    if(Object.keys(this.secondStepContent) && Object.keys(this.secondStepContent).length) {
      for(let k in this.formValidate) {
        this.formValidate[k] = this.secondStepContent[k]
      }
      this.moduleList = this.formValidate.moduleList || []
      this.$store.commit('setSecondStepContent', {})
    }else {
      this.tmSelectNumChange(1)
    }
  },
  methods: {
    init () {
      this.headers = {
        'Token': this.$util.getCookie('Token')
      }
      if (this.type === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getList.path + this.operailityData.id,
            method: 'get'
          }
        }
        this.ajax(opt)
      }
      let opt = {
        ajaxSuccess: (res) => {
          this.codeList = res.data
          console.log(res)
        },
        ajaxParams: {
          url: '/passport/dict-data/queryList?dictType=activity_module_type',
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    getSuccess (res) {
      for (let k in this.formValidate) {
        this.formValidate[k] = res.data[k]
      }
      this.moduleList = this.formValidate.moduleList
      this.backdrop = this.formValidate.backdrop
      this.icon = this.formValidate.icon

      this.exam = []
      // this.exam.push({
      //   codeNumber: '无',
      //   key: item.userId,
      //   label: item.userName,
      //   data: {
      //     id: item.userId,
      //     nickname: item.userName
      //   }
      // })
    },
    handleAvatarSuccessIcon (response, file, fileList) {
      this.icon = URL.createObjectURL(file.raw)
      this.formValidate.icon = response.data.url
    },
    handleAvatarSuccess (response, file, fileList) {
      this.backdrop = URL.createObjectURL(file.raw)
      this.formValidate.backdrop = response.data.url
    },
    beforeAvatarUploadaIcon (file) {
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
        this.limitFileWH(375, 235, file).then((res) => {
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
    },
    limitAspectRatio (E_width, E_height, file) {
      const _this = this
      let imgWidth = ''
      let imgHight = ''
      const isSize = new Promise(function (resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function () {
          imgWidth = img.width
          imgHight = img.height
          const valid = imgWidth === imgHight
          console.log(valid)
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return true
      }, () => {
        _this.$message.warning({
          message: '上传图片的尺寸比' + E_width + '：' + E_height + '，当前上传图片的尺寸为：' + imgWidth + '*' + imgHight,
          btn: false
        })
        return false
      })
      return isSize
    },
    // 获取富文本数据内容
    changeEditor (res, item, type) {
      item[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      // this.tempData[type] = res.textContent
    },
    lastStep () {
      this.formValidate.moduleList = this.moduleList
      this.$store.commit('setSecondStepContent', this.formValidate)
      this.$store.commit('setFirstStepContent', this.StepContent)
      this.$store.commit('setfirstStepContents', this.firstStepContent)
      this.$emit('setStep', 'entrance')
    },
    onSubmit () {
      if (this.formValidate.activityBeginTime > this.formValidate.activityEndTime) {
        this.$message({
          message: '活动开始时间必须小于活动结束时间',
          type: 'warning'
        })
        return
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.formValidate.moduleList = this.moduleList
          let opt = {
            ajaxSuccess: (res) => {
              if (res.code === 0) {
                this.$message({ message: '添加成功', type: 'success'})
                this.setTableData()
                this.$emit('turnOff')
              }
            },
            ajaxParams: {
              url: this.type === 'edit' ? api.modify.path + this.operailityData.id : api.add.path,
              method: this.type === 'edit' ? 'put' : 'post',
              jsonString: true,
              data: Object.assign(this.formValidate, this.firstStepContent)
            }
          }
          this.ajax(opt)
        } else {
          return false
        }
      })
    },
    // 选择试卷
    examination () {
      this.examinModal = true
    },
    // 选择试卷
    setexamin (examAction) {
      // this.examinationList = []
      let mechanismArr = []
      let mechanismId = []
      examAction.forEach(item => {
        mechanismArr.push(item.label)
        mechanismId.push(item.key)
      })
      this.moduleList.forEach(i => {
        i.businessNames = mechanismArr.join(',')
        i.businessIds = mechanismId.join(',')
      })
      this.examinModal = false
    },
    tmSelectNumChange (tmSelectNum) {
      let length = this.moduleList.length

      // 如果减少了选项
      if(length > tmSelectNum) {
        let reduceLen = length - tmSelectNum
        this.moduleList.splice(length - reduceLen, reduceLen)
        this.selectOption.sort--
      }else if(length < tmSelectNum) {
        let reduceLen = tmSelectNum - length
        this.selectOption.sort++
        for(let i = 0; i < reduceLen; i++) {
          let obj = Util._.defaultsDeep({}, this.selectOption)
          this.moduleList.push(obj)
        }
      }
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
    font-size: 18px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .box {
    width: 100%;
    height:100%;
    border: 1px solid rgb(1 2 92);
    border-radius: 20px;
    margin-bottom: 20px;
  }
  .num {
    width:40px;
    height:40px;
    text-align: center;
    font-size:16px;
    line-height: 40px;
    border:1px solid rgb(1 2 92);
    border-radius:50%;
    margin: 5px 0 0 10px;
  }
  .el-upload el-upload--text img {
    width: 60px;
    height:60px;
  }
</style>
