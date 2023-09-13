<template>
  <div>
    <selectSchool v-if="operailityData.types==='BKS'&&operailityData.id<0" @add="addCallBack(type)" :type="type"
                  @cancel="cancel" :operailityData="operailityData"></selectSchool>
    <div v-else>
      <el-form ref="formValidate" :model="formValidate" :rules="rules" class="demo-form-inline" label-width="110px">
        <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="部门名称：" prop="name">
              <el-input v-model="formValidate.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="管理员：" prop="parentId">
              <el-input readonly v-model="userNames" @focus="addUser" placeholder="请输选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="1">
            <el-form-item label="简介：" prop="leaf">
              <el-input v-model="formValidate.remark" type="textarea" resize="none" :rows="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="10" :offset="10">
          <load-btn @listenSubEvent="listenSubEvent" :btnData="loadBtn"></load-btn>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
      <!--选择人员-->
      <Modal width="890" v-model="selectUserModal" class-name="vertical-center-modal">
        <modal-header slot="header" :content="selectUserId"></modal-header>
        <select-user v-if="selectUserModal" @cancel="closeModal" @setUsers="setUsers" :initUser="users"></select-user>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>
<script>
// 当前组件引入全局的util
let Util = null
import { tree as rules } from '../baseRules/rules'
import selectSchool from './left-tree/selectSchool.vue'

export default {
  // props接收父组件传递过来的数据
  props: ['operailityData', 'type'],
  data () {
    console.log(this.operailityData)
    return {
      rules,
      // 保存按钮基本信息
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      //选择人员
      selectUserId: {
        id: 'selectUserId',
        title: '选择人员',
        usersData: '',
      },
      //存储已选择人员的信息
      users: [],
      userNames: '',
      selectDepArr: [],
      hospitalDepartmentNames: '',
      //form表单bind数据
      formValidate: {
        name: '',
        parentId: this.operailityData.id,
        remark: '',
        types: this.operailityData['types'],
        path: this.operailityData['path'] + this.operailityData['id'] + '/',
        managerList: [
          /* {
            "id":1000,
            "name":"张三"
          },*/
        ],
        hospitalDepartmentIds: '', // 院内科室
      },
      updateCount: 0,
      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      addMessTitle: {
        type: 'add',
        successTitle: '添加成功!',
        errorTitle: '添加失败!',
        ajaxSuccess: 'ajaxSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: '/passport/pc' + this.operailityData['getTreeUrl'] + '/add',
          method: 'post',
          jsonString: true,
          data: {},
        },
      },
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
    },
    // 设置科室
    setDep (arr) {
      console.log(arr)
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
        if (!isLoadingFun) {isLoadingFun = function () {
        }}
        isLoadingFun(true)
        let data = this.getFormData(this.formValidate)
        data.hospitalDepartmentIds = this.selectDepArr.join(',')
        this.addMessTitle.ajaxParams.data = data
        // console.log(data)
        this.ajax(this.addMessTitle, isLoadingFun)
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
    /*
     * 默认组件第一次请求数据
     * @param res JSON  数据请求成功后返回的数据
     * */
    SuccessGetCurrData (responseData) {
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
          name: item.label,
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
    addCallBack (type) {
      this.$emit(type, type)
    },
    /*
     * 获取表单数据
     * @return string  格式:id=0&name=aa
     * */
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    }
  },
  watch: {
    formValidate: {
      handler (newVal) {
        this.updateCount++
      },
      deep: true,
    }
  },
  components: {
    selectSchool
  }
}
</script>
