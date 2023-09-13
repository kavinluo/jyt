<template>
  <div>
    <selectSchool
      v-if="operailityData.types==='BKS'&&operailityData.parentId===-101"
      :type="type"
      :operaility-data="operailityData"
      @edit="addCallBack(type)"
      @cancel="cancel"
    />
    <div v-else>
      <el-form
        ref="formValidate"
        :model="formValidate"
        :rules="rules"
        class="demo-form-inline"
        label-width="110px"
      >
        <el-row>
          <el-col
            :span="11"
            :offset="1"
          >
            <el-form-item
              label="部门名称："
              prop="name"
            >
              <el-input
                v-model="formValidate.name"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="管理员："
              prop="parentId"
            >
              <el-input
                v-model="userNames"
                readonly
                placeholder="请输入"
                @focus="addUser"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="20" :offset="2">
             <el-form-item label="科室关联：">
               <el-input v-model="hospitalDepartmentNames" placeholder="点击选择需要关联的科室" @focus="selectHospitalDepart"
                         readonly></el-input>
             </el-form-item>
           </el-col>-->
          <el-col
            :span="22"
            :offset="1"
          >
            <el-form-item
              label="简介："
              prop="leaf"
            >
              <el-input
                v-model="formValidate.remark"
                type="textarea"
                resize="none"
                :rows="8"
              />
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
      <!--选择人员-->
      <Modal
        v-model="selectUserModal"
        width="1000"
        class-name="vertical-center-modal"
      >
        <modal-header
          slot="header"
          :content="selectUserId"
        />
        <select-user
          v-if="selectUserModal"
          :init-user="users"
          @cancel="closeUserModal"
          @setUsers="setUsers"
        />
        <div slot="footer" />
      </Modal>
      <!--选择科室-->
      <Modal
        v-model="selectDepModal"
        width="1000"
        class-name="vertical-center-modal"
      >
        <modal-header
          slot="header"
          :content="selectDepId"
        />
        <select-dep
          v-if="selectDepModal"
          :operaility-data="selectDepArr"
          @cancel="closeModal('selectDep')"
          @setDep="setDep"
        />
        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script>
// 当前组件引入全局的util
let Util = null
import selectDep from './selectDep'
import { tree as rules } from '../baseRules/rules'
import selectSchool from './left-tree/selectSchool.vue'

export default {
  components: {
    selectDep, selectSchool
  },
  // props接收父组件传递过来的数据
  props: ['operailityData', 'type'],
  data () {
    let fromWhereTre = this.operailityData.fromWhereTre == 'custom' ? '/get' : '/tree'
    return {
      rules,
      // 保存按钮基本信息
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
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
        managerList: [
          /* {
           "id":1000,
           "name":"张三"
           },*/
        ],
        hospitalDepartmentIds: '' // 院内科室
      },
      updateCount: 0, // 记录当前页面数据改变次数
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
          url: this.operailityData.getTreeUrl + fromWhereTre + '/' + this.operailityData.id
        }
      }
    }
  },
  watch: { // 当前页面数据改变的监听函数
    formValidate: {
      handler (newVal) {
        this.updateCount++
      },
      deep: true
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
      let postData = {
        ajaxSuccess: (res) => {
          let responseData = res.data
          this.formatInitData(responseData)
        },
        ajaxParams: {
          url: '/tkmanage/examTree/get/' + this.operailityData.id
        }
      }
      // 存在本科生修改学校节点不请求数据
      if (!(this.operailityData.types === 'BKS' && this.operailityData.parentId === -101)) {
        this.ajax(postData)
      }
    },
    // 选择科室
    selectHospitalDepart () {
      this.openModel('selectDep')
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
     * 格式化从后台请求的数据
     * @param responseData [{},……] | json  后台返回的数据格式
     * */
    formatInitData (responseData) {
      this.users = []
      let tempArr = []
      let depNames = []
      let depIds = []
      Util._.forEach(responseData.managerList, (item, key) => {
        this.users.push({
          key: item.id,
          label: item.name,
          description: '人员id---' + item.id + '的描述信息',
          disabled: false
        })
        tempArr.push(item.name)
      })
      if(responseData.hospitalDepartmentRelationList && responseData.hospitalDepartmentRelationList.length) {
        responseData.hospitalDepartmentRelationList.map(item => {
          depNames.push(item.hospitalDepartmentName)
          depIds.push(item.hospitalDepartmentId)
        })
      }
      this.userNames = tempArr.join(',')
      this.formValidate = responseData
      this.formValidate.id = this.operailityData.id
      this.selectDepArr = depIds
      this.hospitalDepartmentNames = depNames.join('、')
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
        data.hospitalDepartmentIds = this.selectDepArr.join(',')
        this.editMessTitle.ajaxParams.data = data
        this.ajax(this.editMessTitle, isLoadingFun)
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
      this.closeUserModal()
    },
    closeUserModal () {
      this.closeModal('selectUser')
    },
    /*
     * 当前组件发送事件给父组件
     * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
     * */
    cancel () {
      this.$emit('cancel', 'edit')
    },
    addCallBack (type) {
      this.$emit(type, type)
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
      return myData
    }
  }
}
</script>
