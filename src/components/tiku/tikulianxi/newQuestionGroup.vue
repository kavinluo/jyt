<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" class="nosocomial" label-width="110px">
      <el-form-item label="文件夹名称：" prop="categoryName">
        <el-input v-model="formValidate.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="简介：" prop="categoryCode">
        <el-input v-model="formValidate.remark" type="textarea" :rows="4" placeholder="请输入简介"/>
      </el-form-item>
      <!-- 目前仅整理题库需要 -->
      <el-form-item v-if="tkType === 'CLEAR_TK'" label="是否可用于题库练习：" prop="categoryCode">
        <el-radio :disabled="operailityData.isTest === 1 && operailityType === 'add'" v-model="formValidate.isTest" :label="0">否</el-radio>
        <el-radio :disabled="operailityData.isTest === 1 && operailityType === 'add'" v-model="formValidate.isTest" :label="1">是</el-radio>
      </el-form-item>
      <el-form-item label="新建类别：" prop="categoryCode">
        <el-radio v-model="formValidate.treeDes" label="FOLDER" @change="treeDesChange">新建节点</el-radio>
        <el-radio v-model="formValidate.treeDes" label="QUESTION" @change="treeDesChange">新建题组</el-radio>
      </el-form-item>
      <el-form-item  v-if="formValidate.treeDes === 'QUESTION'" label="选择试题：" prop="categoryCode">
        <el-button  class="submitBtn" :class="formValidate.treeDes !== 'QUESTION' ? 'defaultBtnDis' : ''" @click="selectTtitle">选择</el-button>
        <span>{{selectTreeDatas}}</span>
      </el-form-item>
      <!-- <el-form-item v-if="operailityType !== 'edit' && tkType !== 'PAPER'" label="新建类别：" prop="categoryCode">
        <el-radio v-model="formValidate.treeDes" label="FOLDER" @change="treeDesChange">新建节点</el-radio>
        <el-radio v-model="formValidate.treeDes" label="QUESTION" @change="treeDesChange">新建题组</el-radio>
      </el-form-item>
      <el-form-item v-if="tkType !== 'TK' && tkType !== 'ORG_SELF_TK' && tkType !== 'PAPER'" label="选择试题：" prop="categoryCode">
        <el-button :disabled="formValidate.treeDes !== 'QUESTION'" class="submitBtn" :class="formValidate.treeDes !== 'QUESTION' ? 'defaultBtnDis' : ''" @click="selectTtitle">选择</el-button>
        <span>{{selectTreeDatas}}</span>
      </el-form-item> -->
      <el-form-item label="选择管理员：" prop="categoryCode">
        <el-input v-model="selectUsers" @focus="selectUser" />
      </el-form-item>
      <el-form-item label="创建人：" prop="categoryCode">
        <span>{{ userInfo.username }}</span>
      </el-form-item>
      <el-form-item label="创建时间：" prop="categoryCode">
        <span>{{ getNowFormatDate() }}</span>
      </el-form-item>
      <div style="text-align: center">
        <el-button class="submitBtn" @click="submit">保存</el-button>
        <el-button class="cancelBtn" @click="cancel">取消</el-button>
      </div>
    </el-form>
    <!-- 选择管理员弹窗-->
    <Modal v-model="userModal" :mask-closable="false" height="200"
      title="对话框标题" class-name="vertical-center-modal" :width="1000">
      <modal-header slot="header" :content ="userId"/>
      <select-user v-if="userModal" @cancel="userModal = false"
                   @setUsers="setUsers" :initUser="users" url="passport/dept/tree"></select-user>
      <div slot="footer" />
    </Modal>
    <!-- 选择试题 -->
    <Modal v-model="selectTreeModal" :mask-closable="false" height="200"
           title="对话框标题" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content ="selectTreeId"/>
      <association-tree-node v-if="selectTreeModal" @cancel="selectTreeModal = false"
                               @setTree="setTree" :initTree="treeInitKey" getTreeUrl="/tkmanage/examTree/list"></association-tree-node>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import associationTreeNode from './associationTreeNode'
let Util = null
export default {
  name: 'ExamCategoryAdd',
  // operailityData 当前选中的树节点内容
  props: ['operailityData', 'operailityType', 'tkType'],
  data () {
    return {
      formValidate: {
        name: '',
        remark: '',
        parentId: '',
        path: '',
        type: '',
        depth: '',
        treeDes: 'FOLDER',
        examTreeManageVOList: [],
        isTest: 0,
        containsPath: '', // 选择的关联树节点数据  整理题库用
        containsPathName: ''
      },
      selectUsers: '',
      users: [],
      userModal: false,
      userId: {id: 'userId', title: '选择管理员'},
      selectTreeDatas: '',
      treeInitKey: [],
      selectTreeModal: false,
      selectTreeId: {id: 'selectTreeId', title: '选择试题'},
      treeEdit: []
    }
  },
  computed: {
    userInfo () {
      let info = this.$store.getters.getUserInfo || {}
      return info
    }
  },
  created () {
    Util = this.$util
    if(this.operailityData.isTest === 1) {
      this.formValidate.isTest = 1
    }
    // 如果是机构题库   传type为自建题库类型
    this.formValidate.type = this.tkType === 'ORG_TK' ? 'ORG_SELF_TK' : this.tkType
    if(this.operailityType === 'edit') {
      this.formValidate.parentId = this.operailityData.parentId
      if (this.operailityData.type === 'APP_TEST') {
        this.formValidate.path = this.operailityData.path
      }else {
        this.formValidate.path = this.operailityData.path.slice(0, this.operailityData.path.length - 6) + this.operailityData.id + ','
      }
    }else if(this.operailityType === 'add') {
      this.formValidate.parentId = this.operailityData.id
      this.formValidate.depth = this.operailityData.depth + 1
      this.formValidate.path = this.operailityData.path
    }
    this.init()
  },
  methods: {
    init () {
      if (this.operailityType === 'edit') {
        let opt = {
          ajaxSuccess: 'getSuccess',
          ajaxParams: {
            url: '/tkmanage/examTree/get/' + this.operailityData.id,
            method: 'get'
          }
        }
        this.ajax(opt)
      }
    },
    getSuccess (res) {
      this.formValidate.name = res.data.name
      this.treeInitKey = res.data.containsPath.split('@')
      this.formValidate.remark = res.data.remark
      this.formValidate.examTreeManageVOList = res.data.examTreeManageVOList
      this.formValidate.treeDes = res.data.treeDes
      this.selectTreeDatas = res.data.containsPathName
      let userArr = []
      this.users = []
      res.data.examTreeManageVOList.forEach(item => {
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
      })
      this.selectUsers = userArr.join('，')
    },
    treeDesChange (val) {
      if(val === 'FOLDER' && this.tkType !== 'TK' && this.tkType !== 'ORG_SELF_TK') { // 如果选择新建节点  清除之前选择的节点
        this.formValidate.containsPath = ''
        this.formValidate.containsPathName = ''
        this.treeInitKey = []
        this.selectTreeDatas = ''
      }
    },
    // eslint-disable-next-line complexity
    submit () {
      if(!this.formValidate.name) {
        this.errorMess('请输入文件夹名称')
        return
      }
      // if(!this.formValidate.remark) {
      //   this.errorMess('请输入文件夹简介')
      //   return
      // }
      // if(!this.formValidate.examTreeManageVOList.length) {
      //   this.errorMess('请选择管理员')
      //   return
      // }
      let opt = {
        ajaxSuccess: 'submitSuccess',
        ajaxParams: {
          url: this.operailityType === 'edit' ? '/tkmanage/examTree/modify/' + this.operailityData.id : '/tkmanage/examTree/add',
          method: this.operailityType === 'edit' ? 'put' : 'post',
          jsonString: true,
          data: this.getFormData(this.formValidate)
        }
      }
      this.ajax(opt)
    },
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
    },
    submitSuccess () {
      let mess = this.operailityType === 'edit' ? '修改成功' : '添加成功'
      this.$emit('add', this.operailityType, mess)
    },
    cancel () {
      this.$emit('cancel', this.operailityType)
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
      if(hh < 10) {
        currentdate += '0'
      }

      currentdate += hh + ':'
      if (mm < 10) {currentdate += '0'}
      currentdate += mm
      return currentdate
    },
    // 选择管理员
    selectUser () {
      this.userModal = true
    },
    setUsers (userData) {
      this.formValidate.examTreeManageVOList = []
      let userArr = []
      userData.forEach(item => {
        userArr.push(item.label)
        this.formValidate.examTreeManageVOList.push({
          userName: item.label,
          userId: item.key,
          treeId: this.operailityData.id,
          manageType: 1
        })
      })
      this.selectUsers = userArr.join('，')
      this.userModal = false
    },
    // 选择试题
    selectTtitle () {
      this.selectTreeModal = true
    },
    setTree (data) {
      let nameArr = []
      let pathArr = []
      this.formValidate.containsPath = []
      data.forEach(item => {
        nameArr.push(item.name)
        pathArr.push(item.path)
      })
      this.treeInitKey = pathArr // 选择树节点回显用
      this.formValidate.containsPath = pathArr.join('@')
      this.formValidate.containsPathName = nameArr.join('@')
      this.selectTreeDatas = nameArr.join(',')
      this.selectTreeModal = false
    }
  },
  components: {associationTreeNode}

}
</script>

<style scoped>

</style>
