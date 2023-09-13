<template>
  <div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      :type="type"
      :rules="rules"
      class="demo-form-inline"
      label-width="110px"
    >
      <el-row>
        <el-col
          :span="10"
          :offset="6"
        >
          <el-form-item
            label="部门名称："
            prop="remark"
          >
            <el-select
              v-model="formValidate.remark"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in schoolOptions"
                :key="index"
                :label="item.name"
                :value="item.id+''"
              />
            </el-select>
            <!--<el-input v-model="formValidate.name" placeholder="请输入"></el-input>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col
        :span="10"
        :offset="10"
      >
        <load-btn
          :btn-data="loadBtn"
          @listenSubEvent="listenSubEvent"
        />
        <el-button @click="cancel">
          取消
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 当前组件引入全局的util
let Util = null
import {tree as rules} from '../../baseRules/rules'

export default {
  components: {},
  // props接收父组件传递过来的数据
  props: ['operailityData', 'type'],
  data () {
    // eslint-disable-next-line no-unused-vars
    let fromWhereTre = this.operailityData.fromWhereTre == 'custom' ? '/get' : '/tree'
    return {
      rules,
      // 保存按钮基本信息
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},

      schoolOptions: [],
      schoolObj: {},
      selectDepModal: false,
      // 选择人员
      selectUserId: {
        id: 'selectUserId',
        title: '选择人员',
        usersData: ''
      },
      selectDepId: {
        id: 'selectDepId',
        title: '选择科室'
      },
      options: [],

      // 存储已选择人员的信息
      users: [],
      userNames: '',

      selectDepArr: [],
      hospitalDepartmentNames: '',

      // form表单bind数据
      formValidate: {
        name: '',
        parentId: this.operailityData.id,
        remark: '',
        types: this.operailityData.types,
        path: this.operailityData.path + this.operailityData.id + '/',
        managerList: [],
        hospitalDepartmentIds: '' // 院内科室
      },
      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      addMessTitle: {
        type: 'add',
        successTitle: '添加成功!',
        errorTitle: '添加失败!',
        ajaxSuccess: 'ajaxSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: this.operailityData.getTreeUrl + '/add',
          method: 'post',
          jsonString: true,
          data: {}
        }
      },
      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      editMessTitle: {
        type: 'edit',
        successTitle: '修改成功!',
        errorTitle: '修改失败!',
        ajaxSuccess: 'ajaxSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: this.operailityData.getTreeUrl + '/modify/' + this.operailityData.id,
          method: 'put',
          jsonString: true,
          data: {}
        }
      },
      // 当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      listMessTitle: {
        paramsData: 'listUrl',
        ajaxSuccess: 'SuccessGetCurrData',
        ajaxParams: {
          url: this.operailityData.getTreeUrl + '/get/' + this.operailityData.id
        }
      }
    }
  },
  created () {
    // 给当前组件注入全局util
    Util = this.$util
  },
  mounted () {
    // 初始化
    this.init()
  },
  methods: {
    /*
       * 组件初始化入口
       * */
    init () {
      // 默认请求加载数据
      this.getSchool()
      if (!this.isAdd()) {
        console.log(414111)
        this.ajax(this.listMessTitle)
      }
    },

    getSchool () {
      // 当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      let listMessTitle = {
        ajaxSuccess: (res) => {
          let data = res.data
          this.schoolOptions = data
          let schoolObj = {}
          data.map(item => {
            schoolObj[item.id] = item
          })
          this.schoolObj = schoolObj
        },
        ajaxParams: {
          url: '/schools/querySchools'
        }
      }
      this.ajax(listMessTitle)

    },

    // 获取成功
    SuccessGetCurrData (res) {
      let data = res.data
      this.formValidate = data
      let obj = {
        id: data.remark,
        name: data.name
      }
      this.schoolOptions.unshift(obj)
      this.schoolObj[data.remark] = obj
    },

    // 选择科室
    selectHospitalDepart () {
      this.openModel('selectDep')
    },

    // 设置科室
    setDep (arr) {
      let ids = []
      let names = []
      arr.map(item => {
        ids.push(item.id)
        names.push(item.name)
      })
      this.selectDepArr = ids
      this.hospitalDepartmentNames = names.join('、')
    },

    // 关闭弹窗
    closeModal (targer) {
      this[targer + 'Modal'] = false
    },

    /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
    listenSubEvent (isLoadingFun) {
      let isSubmit = this.submitForm('formValidate')
      if (isSubmit) {
        if (!isLoadingFun) {
          isLoadingFun = function () {
          }
        }
        isLoadingFun(true)
        let data = this.getFormData(this.formValidate)
        let messTitle = this.isAdd() ? this.addMessTitle : this.editMessTitle
        messTitle.ajaxParams.data = data
        this.ajax(messTitle, isLoadingFun)
      }
    },
    /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
        }
      })
      return flag
    },

    // 添加人员
    addUser () {
      this.openModel('selectUser')
    },

    /*
       * 获取选择人员的人员信息并赋值
       * @param users [{id:'',name:''},{}]  已选人员信息
       * */
    setUsers (users) {
      this.users = users
      this.formValidate.managerList = []
      let tempArr = []
      for (var i = 0, item; i < this.users.length; i++) {
        item = this.users[i]
        tempArr.push(item.label)
        this.formValidate.managerList.push({
          id: item.key,
          name: item.label
        })
      }
      this.userNames = tempArr.join(',')
      this.closeModal('selectUser')
    },

    /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
    cancel () {
      this.$emit('cancel', 'add')
    },

    /*
       * 打开指定的模态窗体
       * @param options string 当前指定的模态:"add"、"edit"
       * */
    openModel (options) {
      this[options + 'Modal'] = true
    },

    /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      myData.name = this.schoolObj[myData.remark].name
      return myData
    },
    isAdd () {
      return this.type === 'add'
    }
  }
}
</script>
