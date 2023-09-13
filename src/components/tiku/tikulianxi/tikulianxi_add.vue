<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" class="nosocomial" label-width="130px">
      <el-form-item label="文件夹名称：" prop="categoryName">
        <el-input v-model="formValidate.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="简介：" prop="categoryCode">
        <el-input v-model="formValidate.remark" type="textarea" :rows="4" placeholder="请输入简介"/>
      </el-form-item>
      <el-form-item label="新建类别：" prop="categoryCode">
        <el-radio v-model="formValidate.treeDes" label="FOLDER" >新建节点</el-radio>
        <el-radio v-model="formValidate.treeDes" label="QUESTION" >新建题组</el-radio>
      </el-form-item>
      <el-form-item label="选择试题：" prop="containsPath"  v-if="formValidate.treeDes === 'QUESTION'">
        <el-button @click="selectTtitle">
          选择
        </el-button>
        {{ selectTreeDatas }}
      </el-form-item>
      <el-form-item label="可查看权限设置：" prop="categoryCode">
        <el-radio-group v-model="formValidate.resource">
          <el-radio :label="1">
            所有账户都可查看
          </el-radio>
          <el-radio :label="2">
            选择查看人员或机构
          </el-radio>
        </el-radio-group>
        <el-input v-if="formValidate.resource === 2" style="width:150px"   v-model="selectUsers" @focus="selectUser"/>
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
    <!-- 试题弹窗 -->
    <Modal
      v-model="selectTreeModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="selectTreeId"
      />
      <association-tree-node
        v-if="selectTreeModal"
        :init-tree="treeInitKey"
        get-tree-url="/tkmanage/examTree/tree"
        @cancel="selectTreeModal = false"
        @setTree="setTree"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import associationTreeNode from './associationTreeNode.vue'
let Util = null
export default {
  name: 'ExamCategoryAdd',
  components: {associationTreeNode},
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
        isTest: '',
        resource: ''
      },
      treeInitKey: [],
      selectTreeDatas: '',
      selectTreeModal: false,
      selectTreeId: { id: 'selectTreeId', title: '选择试题' },
      selectUsers: '',
      users: [],
      userModal: false,
      userId: {id: 'userId', title: '选择管理员'},
      treeUrl: '/tkmanage/examTree/tree?isTest=1'
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
    this.formValidate.type = this.tkType
    console.log(this.tkType, 'this.tkTypethis.tkType')
    if(this.operailityType === 'edit') {
      this.formValidate.parentId = this.operailityData.parentId
      this.formValidate.path = this.operailityData.path + this.operailityData.id
      this.formValidate.path = this.operailityData.path.slice(0, this.operailityData.path.length - 6) + this.operailityData.id + ','
      console.log(this.formValidate.path)
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
      console.log(res)
      let data = res.data
      this.formValidate.name = data.name
      this.formValidate.remark = data.remark
      this.formValidate.examTreeManageVOList = res.data.examTreeManageVOList
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
    // 选择试题
    selectTtitle () {
      this.selectTreeModal = true
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
      console.log(userData)
      this.formValidate.examTreeManageVOList = []
      let userArr = []
      userData.forEach(item => {
        userArr.push(item.label)
        this.formValidate.examTreeManageVOList.push({
          userName: item.label,
          userId: item.key,
          treeId: this.operailityData.id
        })
      })
      this.selectUsers = userArr.join('，')
      this.userModal = false
    }
  }

}
</script>

<style scoped>

</style>
