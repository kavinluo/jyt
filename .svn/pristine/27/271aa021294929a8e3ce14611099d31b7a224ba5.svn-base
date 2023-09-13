<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/15
****--@author   yyl
----------------------------------->
<template>
  <div>
    <el-form ref="formValidate" :model="formValidate" class="nosocomial" label-width="110px">
      <el-form-item label="题组名称：" prop="categoryName">
        <el-input v-model="formValidate.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="题组简介：" prop="categoryCode">
        <el-input v-model="formValidate.remark" type="textarea" :rows="4" placeholder="请输入简介"/>
      </el-form-item>
      <el-form-item v-if="tkType !== 'TK' && tkType !== 'ORG_SELF_TK'" label="选择试题：" prop="categoryCode">
        <el-button class="submitBtn" @click="selectTtitle">选择</el-button>
        <span>{{selectTreeDatas}}</span>
      </el-form-item>
      <div style="text-align: center">
        <el-button class="submitBtn" @click="submit">保存</el-button>
        <el-button class="cancelBtn" @click="cancel">取消</el-button>
      </div>
    </el-form>
    <!-- 选择关联树节点 -->
    <Modal v-model="selectTreeModal" :mask-closable="false" height="200"
           title="对话框标题" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content ="selectTreeId"/>
      <association-tree-node v-if="selectTreeModal" @cancel="selectTreeModal = false"
                             @setTree="setTree" :initTree="treeInitKey" getTreeUrl="/tkmanage/examTree/tree"></association-tree-node>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import associationTreeNode from './associationTreeNode'
// 当前组件引入全局的util
let Util = null
export default {
  props: ['operailityData', 'operailityType', 'tkType'],
  data () {
    return {
      formValidate: {
        name: '',
        remark: '',
        type: '',
        parentId: '',
        path: '',
        depth: '',
        treeDes: 'QUESTION',
        containsPath: '', // 选择的关联树节点数据  整理题库用
        containsPathName: ''
      },
      selectTreeDatas: '',
      treeInitKey: [],
      selectTreeModal: false,
      selectTreeId: {id: 'selectTreeId', title: '关联树节点'}
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.formValidate.type = this.tkType
      if(this.operailityType === 'edit') {
        this.formValidate.parentId = this.operailityData.parentId
        this.getEditData()
      }else {
        this.formValidate.parentId = this.operailityData.id
        this.formValidate.depth = this.operailityData.depth + 1
      }
      this.formValidate.path = this.operailityData.path
    },
    getEditData () {
      let opt = {
        ajaxSuccess: 'getSuccess',
        ajaxParams: {
          url: '/tkmanage/examTree/get/' + this.operailityData.id,
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    getSuccess (res) {
      console.log(res.data)
      let data = res.data
      this.formValidate.name = data.name
      this.formValidate.remark = data.remark
      this.formValidate.containsPath = data.containsPath // 选择的关联树节点数据  整理题库用
      this.formValidate.containsPathName = data.containsPathName // 选择的关联树节点数据  整理题库用
      this.treeInitKey = data.containsPath.split('@')
      this.selectTreeDatas = data.containsPathName.split('@').join('，')
    },
    submit () {
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
    submitSuccess (res) {
      let mess = this.operailityType === 'edit' ? '修改成功' : '添加成功'
      if(this.operailityType === 'edit') {
        this.$emit('add', 'edit', mess)
      }else {
        this.$emit('add', 'add', mess) // 新建树节点的id
      }

    },
    cancel () {
      this.$emit('cancel')
    },
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      return myData
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
      this.selectTreeDatas = nameArr.join('，')
      this.selectTreeModal = false
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  mounted () {
  },
  components: {associationTreeNode}
}
</script>
