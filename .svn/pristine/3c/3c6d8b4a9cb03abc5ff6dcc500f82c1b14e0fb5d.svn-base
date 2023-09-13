<template>
  <div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      label-width="110px"
      :rules="rulesForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="练习名称:"
            prop="arrangeName"
          >
            <el-input
              v-model="formValidate.arrangeName"
              placeholder="请输入练习名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="选择试卷"
            prop="paperId"
          >
            <el-button @click="selectTtitle">
              选择
            </el-button>
            <!-- <el-input v-model="formValidate.paperId" disabled/> -->
            <span>{{ selectTreeDatas }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item
            label="支持考试类别:"
            prop="examinee"
          >
            <el-select
              v-model="formValidate.examinee"
              placeholder="请选择考试类别"
            >
              <el-option
                v-for="item in examineeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="考生："
            prop="paperAlljoin"
          >
            <el-select
              v-model="formValidate.paperAlljoin"
              placeholder="请选择考生"
            >
              <el-option
                v-for="item in paperAlljoinList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <span v-if="formValidate.paperAlljoin !== 1 && formValidate.paperAlljoin !== 2 && formValidate.paperAlljoin !== 3">————————</span>
          <el-form-item
            v-if="formValidate.paperAlljoin === 3"
            prop="mechanism"
          >
            <el-input
              v-model="formValidate.mechanism"
              style="width:200px"
              placeholder="请选择机构"
            />
          </el-form-item>
          <el-form-item
            v-if="formValidate.paperAlljoin === 2 && formValidate.paperAlljoin !== 3"
            prop="personnel"
          >
            <el-input
              v-model="selectUsers"
              style="width:200px"
              placeholder="请选择人员"
              @focus="selectUser"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="练习时长:"
            prop="paperTimeType"
          >
            <el-select
              v-model="formValidate.paperTimeType"
              placeholder="请选择考试时长"
              @change="changeParperTime"
            >
              <el-option
                v-for="item in paperTimeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span
            v-if="formValidate.paperTimeType === 1"
            style="font-size:17px"
          >120分钟</span>
          <span v-if="formValidate.paperTimeType === 3"><el-input v-model="formValidate.paperTime"></el-input></span>
          <span v-if="formValidate.paperTimeType === 2">————————</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="试卷显示控制:"
            prop="paperViewType"
          >
            <el-select
              v-model="formValidate.paperViewType"
              placeholder="请选择试卷显示"
              @change="viewTypeChange"
            >
              <el-option
                v-for="item in paperViewList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="作答顺序控制:"
            prop="enableModify"
          >
            <el-select
              v-model="formValidate.enableModify"
              placeholder="请选择作答顺序"
            >
              <el-option
                v-for="item in enableModifyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="设备类型" prop="examClassify">
            <el-select
              v-model="formValidate.examClassify"
              placeholder="请选择设备类型"
            >
              <el-option
                label="APP"
                value="app"
              />
              <el-option
                label="PC"
                value="pc"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="考试说明：" prop="paperMore">
            <el-input
              v-model="formValidate.paperMore"
              style="width:250px"
              placeholder="请输入考试说明"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="创建人："
            prop="creator"
          >
            <span>{{ userInfo.username }}</span>
          </el-form-item>
          <el-form-item
            label="创建时间："
            prop="createTime"
          >
            <span>{{ getNowFormatDate() }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit('formValidate')"
        >
          确定
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 选择试卷弹窗 -->
    <Modal
      v-model="selectTreeModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="selectTreeId"
      />
      <parper
        v-if="selectTreeModal"
        :init-user="examation"
        @cancel="selectTreeModal = false"
        @setUsers="setExamination"
      />
      <div slot="footer" />
    </Modal>
    <!-- 选择管理员弹窗-->
    <Modal
      v-model="userModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="userId"
      />
      <select-user
        v-if="userModal"
        :init-user="users"
        url="passport/dept/tree"
        @cancel="userModal = false"
        @setUsers="setUsers"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
import api from './api'
import parper from '../kaoshishezhi/examination_paper.vue'
let Util = null
export default {
  components: {
    parper
  },
  props: {
    operailityData: { type: Object, default: null },
    type: { type: String, default: null },
    setTableData: { type: Function, default: null },
    currentTreeData: { type: Object, default: null }
  },
  data () {
    return {
      formValidate: {
        userList: [],
        arrangeName: '',
        paperTimeType: 1,
        examClassify: 'app',
        paperMore: '',
        paperType: 1,
        paperId: '',
        paperSavename: '',
        paperViewType: 1,
        enableModify: 1,
        paperAlljoin: 1,
        treeId: '' // 树节点id
      },
      rulesForm: {
        arrangeName: [
          { required: true, message: '请输入练习名称', trigger: 'blur' }
        ],
        examinee: [
          { required: true, message: '请选择人员', trigger: 'blur' }
        ],
        paperTimeType: [
          { required: true, message: '请选择考试时长', trigger: 'blur' }
        ],
        examClassify: [
          { required: true, message: '请输入设备类型', trigger: 'blur' }
        ],
        paperMore: [
          { required: true, message: '请输入考试说明', trigger: 'blur' }
        ],
        paperViewType: [
          { required: true, message: '请选择试卷显示控制', trigger: 'blur' }
        ],
        enableModify: [
          { required: true, message: '请选择作答顺序控制', trigger: 'blur' }
        ],
        paperAlljoin: [
          { required: true, message: '请选择考生', trigger: 'blur' }
        ],
        paperId: [
          { required: true, message: '请选择试卷', trigger: 'blur' }
        ],
        personnel: [
          { required: true, message: '请选择考生', trigger: 'blur' }
        ]
      },
      selectUsers: '',
      selectTreeDatas: '',
      users: [],
      userLists: [],
      examList: [],
      examation: [],
      examineeList: [
        {
          value: 1,
          label: '水平测试考试'
        },
        {
          value: 2,
          label: '执业医师考试'
        }
      ],
      paperAlljoinList: [
        {
          value: 1,
          label: '全部参加考试'
        }, {
          value: 2,
          label: '选择考试人员'
        }, {
          value: 3,
          label: '选择考试机构'
        }
      ],
      paperTimeList: [
        {
          value: 1,
          label: '使用试卷自有时长'
        }, {
          value: 2,
          label: '不计时'
        }, {
          value: 3,
          label: '重新定义时长'
        }
      ],
      paperViewList: [
        {
          value: 0,
          label: '在一个页面显示所有试题'
        }, {
          value: 1,
          label: '在一个页面只显示一道题'
        }, {
          value: 2,
          label: '在一个页面显示一题型'
        }
      ],
      enableModifyList: [
        {
          value: 0,
          label: '无限制'
        }, {
          value: 1,
          label: '已作答题型不可返回查看'
        }, {
          value: 2,
          label: '已作答试题不可返回查看'
        }
      ],
      selectTreeModal: false,
      selectTreeId: { id: 'selectTreeId', title: '选择试题' },
      treeInitKey: [],
      userModal: false,
      userId: { id: 'userId', title: '选择试卷人员' }
    }
  },
  computed: {
    userInfo () {
      let info = this.$store.getters.getUserInfo || {}
      return info
    }
  },
  created () {
    this.init()

  },
  methods: {
    init () {
      if (this.formValidate.enableModify === 0) {
        this.enableModifyList = this.enableModifyList.splice(0, 1)
      }
      if(!this.formValidate.paperMore) {
        this.formValidate.paperMore = this.getNowFormatDate() + this.userInfo.username + '定义'
      }
      this.formValidate.treeId = this.currentTreeData.id
      Util = this.$util
      if (this.type === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: api.getList.path + this.operailityData.arrangeId,
            method: 'get'
          }
        }
        this.ajax(opt)
      }
    },
    getSuccess (res) {
      for (let k in this.formValidate) {
        this.formValidate[k] = res.data[k]
      }
      this.userLists = res.data.userList
      let userArr = []
      this.users = []
      this.userLists.forEach(item => {
        if (item.userType === 0) {
          this.examList.push(item)
          userArr.push(item.userName)
          this.users.push({
            codeNumber: '无',
            key: item.userId,
            label: item.userName,
            data: {
              id: item.userId,
              nickname: item.userName
            }
          })
        }
      })
      this.selectUsers = userArr.join('，')
      this.selectTreeDatas = res.data.paperSavename
    },
    // 提交
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.formValidate.userList = []
          if (this.type === 'edit') {
            console.log(this.formValidate.userList, '后台', this.userLists, '本地')
            this.formValidate.userList.push(...this.examList)
          }
          let opt = {
            ajaxSuccess: 'submitSuccess',
            ajaxParams: {
              url: this.type === 'edit' ? api.modifyExamList.path + this.operailityData.arrangeId : api.addList.path,
              method: this.type === 'edit' ? 'put' : 'post',
              jsonString: true,
              data: this.getFormData(this.formValidate)
            }
          }
          this.ajax(opt)
        } else {
          return false
        }
      })
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({
          message: this.type === 'edit' ? '修改成功' : '添加成功',
          type: 'success'
        })
        this.$emit('cancel', 'add')
        this.setTableData()
      }
    },
    // 选择试卷
    selectTtitle () {
      this.selectTreeModal = true
    },
    // 选择试卷
    setExamination (examAction) {
      this.examActionList = examAction
      this.formValidate.paperId = examAction[0].id
      this.formValidate.paperSavename = examAction[0].name
      this.selectTreeDatas = examAction[0].name
      this.selectTreeModal = false
    },
    changeParperTime (val) {
      if (val === 1) {
        this.formValidate.paperTime = this.examActionList[0].paperTime
      }
    },
    // 选择管理员
    selectUser () {
      this.userModal = true
    },
    setTree (data) {
      let nameArr = []
      let pathArr = []
      let idArr = []
      data.forEach(item => {
        nameArr.push(item.name)
        pathArr.push(item.path)
        idArr.push(item.id)
      })
      this.treeInitKey = pathArr // 选择树节点回显用
      this.formValidate.paperId = idArr.join(',')
      this.selectTreeDatas = nameArr.join('，')
      this.selectTreeModal = false
    },
    // 考生
    setUsers (userData) {
      // this.formValidate.userList = this.examList
      let userArr = []
      userData.forEach(item => {
        userArr.push(item.label)
        this.examList.push({
          userName: item.label,
          userId: item.key,
          userType: 0
        })
      })
      this.selectUsers = userArr.join('，')
      this.userModal = false
      console.log(this.examList, this.selectUsers, 'zuihou考生')
    },
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    },
    getNowFormatDate () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let hh = date.getHours() // 时
      let mm = date.getMinutes()
      let currentdate = year + seperator1 + month + seperator1 + strDate + '   '
      if (hh < 10) {
        currentdate += '0'
      }

      currentdate += hh + ':'
      if (mm < 10) { currentdate += '0' }
      currentdate += mm
      return currentdate
    },
    // 试题显示控制
    viewTypeChange (val) {
      let enbleList = [{value: 0, label: '无限制'}, {value: 1, label: '已作答题型不可返回查看'}, {value: 2, label: '已作答试题不可返回查看'}]
      if (val === 0) {
        this.formValidate.enableModify = 0
        this.enableModifyList = enbleList.splice(0, 1)
      }else if (val === 1) {
        this.formValidate.enableModify = 2
        this.enableModifyList = enbleList
      }else{
        this.formValidate.enableModify = 1
        this.enableModifyList = enbleList.splice(0, 2)
      }
    }
  }
}
</script>
<style scoped>
</style>
