<!--菜单管理-->
<!--业务字典-->
<template>
  <div
    class="depContainer my-leftTree"
    :class="defaults.cls"
  >
    <div
      v-if="defaults.isShowSearch"
      class="treeSearchBox"
    >
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />
    </div>
    <div
      v-if="defaults.isShowMenus"
      class="treeMenus"
      style=""
    >
      <el-button
        class="blueBtn"
        @click="add"
      >
        新建
      </el-button>
      <el-button
        class="blueBtn"
        @click="edit"
      >
        修改
      </el-button>
      <el-button
        class="dangerBtn"
        :disabled="sltParentId===0 || currentNodeKey == 627?true:false"
        @click="remove"
      >
        删除
      </el-button>
    </div>
    <div
      class="treeContent"
      :style="defaults.selectUser?'top:36px':''"
    >
      <el-tree
        :style="style"
        highlight-current
        node-key="id"
        class="filter-tree"
        :data="defaults.treeData"
        :props="defaultProps"
        :current-node-key="currentNodeKey || -1"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="filterNode"
        :empty-text="defaults.emptyText"
        :lazy="defaults.asyn"
        :render-content="renderContent"
        @node-click="treeClick"
        :indent="10"
        :load="loadNode"
        ref="treeId"
        @node-expand="getOpenNode"
        @node-collapse="nodeCollapse"
      >
        <i class="el-icon-delete" />
      </el-tree>
<!--      :expand-on-click-node="false"-->
    </div>
    <!--新建弹窗-->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :closable="false"
      :width="800"
    >
      <span
        class="btn-close"
        @click="checkCloseModal()"
      >X</span>
      <modal-header
        slot="header"
        :content="addId"
      />
      <template v-if="fromWhereTree === 'custom'">
        <add-custom
          v-if="addModal"
          :operaility-data="operailityData"
          @cancel="cancel"
          @add="subCallback"
        />
      </template>
      <template v-else>
        <add-dep
          v-if="addModal"
          ref="addChild"
          type="add"
          :operaility-data="operailityData"
          @cancel="cancel"
          @add="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!--修改弹窗-->
    <Modal
      v-model="editModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :closable="false"
      :width="800"
    >
      <span
        class="btn-close"
        @click="checkCloseModal()"
      >X</span>
      <modal-header
        slot="header"
        :content="editId"
      />
      <template v-if="fromWhereTree === 'custom'">
        <edit-custom
          v-if="editModal"
          :operaility-data="operailityData"
          @cancel="cancel"
          @edit="subCallback"
        />
      </template>
      <template v-else>
        <edit-dep
          v-if="editModal"
          ref="editChild"
          type="edit"
          :operaility-data="operailityData"
          @cancel="cancel"
          @edit="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!--删除弹窗-->
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <remove
        v-if="removeModal"
        :delete-url="deleteUrl"
        :operaility-data="operailityData"
        @cancel="cancel"
        @remove="subCallback"
      />
      <div slot="footer" />
    </Modal>
    <!--关闭新建弹窗前确认-->
    <Modal
      v-model="confirmCloseModal"
      :mask-closable="false"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="confirmCloseId"
      />
      <div v-if="confirmCloseModal">
        <div class="remove">
          确定关闭页面吗？
        </div>
        <el-row>
          <el-col
            :span="22"
            align="right"
          >
            <el-button
              class="sureBtn"
              @click="closeModal('confirmClose')"
            >
              确定
            </el-button>
            <el-button
              class="but-col cancelBtn"
              type="danger"
              @click="confirmCloseModal=false"
            >
              取消
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<style>
.depContainer {
  position: relative;
  height: 100%;

}

.depHasSearch .treeContent {
  top: 36px;
}

.depHasMenus .treeContent {
  top: 40px;
}

.depHasSearchAndMenus .treeContent {
  top: 82px;
}

.my-leftTree .el-tree-node > .el-tree-node__children {
  overflow: inherit;
}

.treeContent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.my-leftTree .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 16px !important;
}

.treeSearchBox {
}

.treeMenus {
  padding: 5px 0;
  text-align: center
}
</style>
<script>
import addDep from './addDep.vue'
import editDep from './editDep.vue'
import addCustom from './addCustom' // 自定义增加节点
import editCustom from './editCustom' // 自定义编辑节点
let Util = null
// eslint-disable-next-line no-unused-vars
let store = null
export default {
  name: 'LeftTree',
  components: {
    addDep,
    editDep,
    addCustom,
    editCustom
  },
  // comparisonAssignment  是否比较赋值 如果是，则不重置treeData
  props: [
    'treeOptions',
    'fromWhereTreeType',
    'clickAddChange',
    'initSltedNode',
    'currentKey',
    'upDateNumber',
    'comparisonAssignment'],
  data () {
    return {
      // tree
      defaults: {
        getTreeUrl: '/passport/dept/tree', // 目录树结构请求地址
        baseUrl: '/dept',
        getDataUrl: '', // 获取目录树叶子节点请求数据地址
        asyn: false, // 是否异步加载
        isShowSearch: true, // 是否显示目录树查询
        isShowMenus: false, // 是否显示目录树菜单
        cls: [], // 控制目录树布局class
        treeData: this.treeOptions.tempData || [],
        isInitSltedNode: true, // 是否需要默认选中tree节点
        selectUser: false, // 选择弹窗与有目录树页面
        emptyText: '暂无数据'
      },
      confirmCloseModal: false,
      loadNodeInit: true,
      sltParentId: 0, // 0为根节点id
      parentTreeRoad: 0, // 父节点路径
      // 按钮操作
      operailityData: {},
      operailityType: '',
      deleteUrl: '',
      baseUrl: {},
      addModal: false,
      editModal: false,
      removeModal: false,
      addId: {
        id: 'add',
        title: '添加'
      },
      removeId: {
        id: 'remove',
        title: '删除'
      },
      editId: {
        id: 'edit',
        title: '修改'
      },
      confirmCloseId: {
        id: 'confirmCloseId',
        title: '提示'
      },
      sltedTreeData: {}, // 选中的数据
      sltedTreeParData: {}, // 当前选中节点父节点的数据
      expandedKeys: [], // 目录树默认暂开
      temExpandedKeys: [], // 目录树默认暂存
      currentNodeKey: '', // 默认选中项key
      fromWhereTree: this.fromWhereTreeType || 'user', // 哪里用的目录树   user  questionBank custom(自定义节点)
      operTypeFun: 'formUserTree',
      filterText: '',
      style: 'height: 100%;overflow: auto;border: 1px solid #d1dbe5;',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      listStyle: {
        margin: '10px 50px'
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.treeId.filter(val)
    },
    clickAddChange (val) {
      this.$emit('clickAdd', this.isSltedTreeNode)
    },
    upDateNumber (val) {
      this.init()
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  methods: {
    // 初始
    // eslint-disable-next-line complexity
    init () {
      this.defaults.treeData = this.treeData
      // 父组件是否给当前组件窗体相关配置项
      if (typeof this.treeOptions !== 'undefined') {
        this.defaults = Object.assign(this.defaults, this.treeOptions)
      }
      // 自定义
      // if (this.fromWhereTree === 'custom') {
      this.baseUrl.getTreeUrl = this.defaults.baseUrl
      // }
      let {
        isShowSearch,
        isShowMenus
      } = this.defaults
      if (isShowSearch && isShowMenus) {
        this.defaults.cls = ['depHasSearchAndMenus']
      } else if (isShowSearch) {
        this.defaults.cls = ['depHasSearch']
      } else if (isShowMenus) {
        this.defaults.cls = ['depHasMenus']
      } else {
        this.defaults.cls = ['']
      }
      // 设置树的默认列表
      console.log(this.treeOptions.defaultProps, 2121)
      if (this.treeOptions.defaultProps) {
        this.defaultProps = Object.assign(this.defaultProps, this.treeOptions.defaultProps)
      }
      console.log(this.defaultProps, 568)
      if (this.expandedKeys === 0 && this.currentKey) {
        this.currentNodeKey = +this.currentKey
        this.expandedKeys = [+this.currentKey]
        this.temExpandedKeys = [+this.currentKey]
      }
      if (!this.defaults.asyn) {
        this.postParamToServer()
      }
    },
    // 从server端获取tree数据
    getTreeData (responseData) {
      this.defaults.treeData = responseData.data
      console.log(this.defaults.treeData)
      if (this.operailityType === 'remove') {
        // 删除成功后情况所有的选中状态
        this.clearCurrSltedData()
        this.$emit('tree-remove-node')
      }
      // this.openNode()
    },
    // 清空当前选中的节点临时存储的所有数据
    clearCurrSltedData () {
      this.sltedTreeData = {}
      this.sltedTreeParData = {}
    },
    /**
     * 异步请求树节点
     * @param node {}
     * @param resolve
     * */
    loadNode (node, resolve) {
      let getSubNode = {
        ajaxSuccess: (res) => {
          let data = res.data
          setTimeout(() => {
            resolve(data)
          }, 100)
          if (!node.parent) { // 如果node parent为null则打开该节点并选中
            let nodeId = res.data[0].id
            this.expandedKeys = [nodeId]
            this.temExpandedKeys = [nodeId]
            this.sltedTreeData = res.data[0]
            this.$emit('setCurrSltNodeId', nodeId, res.data[0])
          }
        },
        errorTitle: '节点数据加载失败!',
        ajaxParams: {
          url: this.defaults.getTreeUrl,
          params: {
            parentId: node.data.id
          }
        }
      }
      this.ajax(getSubNode)
    },
    // 获取要展开节点的id
    getOpenNode (obj, Node, vue) {
      this.temExpandedKeys.push(obj.id)
    },
    // 节点被关闭取法的函数
    nodeCollapse (obj, Node, vue) {
      let index = this.temExpandedKeys.indexOf(obj.id)
      if (index > -1) {
        this.temExpandedKeys.splice(index, 1)
        console.log(this.expandedKeys, this.currentNodeKey)
      }
    },
    /*
     * 展开对应节点
     * @param id number 要展开的树节点的id
     * */
    // eslint-disable-next-line complexity
    openNode (id) {
      let isEmpty = Util.isEmptyObject(this.sltedTreeData)
      let defaults = this.defaults
      let nodeId = null
      if (!isEmpty) {
        if (this.operailityType === 'remove') {
          nodeId = this.sltedTreeParData.id
        } else {
          nodeId = this.sltedTreeData.id
        }
      } else {
        nodeId = defaults.treeData[0].id
        this.sltedTreeData = defaults.treeData[0]
      }
      if (typeof id !== 'undefined') {
        nodeId = id
      }
      // 是否默认选中tree节点
      if (this.defaults.isInitSltedNode) {
        if (this.expandedKeys !== 0) {
          nodeId = this.currentNodeKey
          this.sltedTreeData = this.recursionTree(defaults.treeData, nodeId) || defaults.treeData[0]
        } else {
          this.sltedTreeData = this.recursionTree(defaults.treeData, nodeId) || defaults.treeData[0]
          this.currentNodeKey = nodeId
        }
      } else {
        this.sltedTreeData = {}
      }
      if (this.expandedKeys === 0) {
        this.expandedKeys = [nodeId]
        this.temExpandedKeys = [nodeId]
      }
      try {
        this.$emit('setCurrSltNodeId', nodeId, this.sltedTreeData)
      } catch (e) {}
    },
    // 递归数结构
    recursionTree (data, id) {
      let obj
      for (var i = 0; i < data.length; i++) {
        data[i].id = data[i].id || data[i].treeId
        data[i].name = data[i].name || data[i].treeName
        if (data[i].id === id) {
          obj = data[i]
          return obj
        } else {
          if (typeof data[i][this.defaultProps.children] !== 'undefined' && data[i][this.defaultProps.children].length > 0) {
            let tempData = this.recursionTree(data[i][this.defaultProps.children], id)
            if (tempData) {return tempData}
          }
        }
      }
    },
    // 向服务器发送数据
    postParamToServer () {
      let url = this.defaults.getTreeUrl
      let ajaxOptions = {
        ajaxSuccess: 'getTreeData',
        ajaxParams: {
          url: url
        }
      }
      this.ajax(ajaxOptions)
    },
    // 更新目录树数据
    updataTree () {
      this.defaults.isInitSltedNode = true
      this.sltParentId = 0
      this.clearCurrSltedData()
      this.postParamToServer()
    },
    // 是否选择节点
    isSltedTreeNode (treeClickInit) {
      if (treeClickInit) {treeClickInit(this.sltedTreeData)}
      let isEmpty = Util.isEmptyObject(this.sltedTreeData)
      let flag = true
      if (isEmpty) {
        flag = false
        this.$message.error('请选择目录节点!')
      }
      return flag
    },
    /* tree*/
    // 搜索
    filterNode (value, data, node) {
      let parent = node.parent
      if (!value) {return true}
      if (data.name.indexOf(value) !== -1) {
        return true
      }
      while (parent.name) {
        if (parent.name.indexOf(value) !== -1) {
          return true
        } else {
          parent = parent.parent
        }
      }
      return false
    },
    /*
     * 判断当前节点类型
     * @param treeNode {} 当前选中的节点
     *
     * @return type string 根节点:root 有子节点:node  叶子节点:leaf
     * */
    setCurrTreeType () {
      if (this.fromWhereTree === 'user') {
        this.operTypeFun = 'formUserTree'
      }
      if (this.fromWhereTree === 'questionBank') {
        this.operTypeFun = 'formTmTree'
      }
      // 自定义
      if (this.fromWhereTree === 'custom') {
        this.operTypeFun = 'formCustomTree'
      }
      // fromWhereTree
      // return type;
    },
    /*
     * 判断当前是不是根节点类型 ----- 来自账户的tree
     * @param treeNode {} 当前选中的节点
     *
     * @return type string 文件夹:folder 叶子节点:leaf
     * */
    isRootNode (treeNode) {
      let flag = false
      if (treeNode.level === 1) {
        flag = true
      }
      return flag
    },
    /*
     * 判断当前节点类型 ----- 来自账户的tree
     * @param treeNode {} 当前选中的节点
     *
     * @return type string 文件夹:folder 叶子节点:leaf
     * */
    formUserTree (treeNode) {
      let type = ''
      if (treeNode.isLeaf) {
        type = 'leaf'
      } else {
        type = 'folder'
      }
      return type
    },
    // 来自题库的tree
    formTmTree () {
    },
    // 自定义节点
    /**
     * 判断当前节点类型
     * @return type string 文件夹:folder 叶子节点:leaf
     * */
    formCustomTree (treeNode) {
      let type = ''
      if (treeNode.isLeaf) {
        type = 'leaf'
      } else {
        type = 'folder'
      }
      return type
    },
    // 点击节点
    treeClick (obj, node, self) {
      if (obj.treeId) {
        obj.id = obj.treeId
      }
      this.currentNodeKey = obj.id
      // 同一级节点重复点击
      // 设置根节点id
      obj = Util._.defaultsDeep({}, obj)
      // obj 现在无法拿到level属性故做异步处理
      setTimeout(() => {
        if (typeof obj.parentId !== 'undefined') {
          this.sltParentId = obj.parentId
        } else {
          // eslint-disable-next-line eqeqeq
          if (obj.level == 1 && this.defaults.treeData.length == 1) {
            this.sltParentId = 0
          } else {
            this.sltParentId = obj.id
          }
        }
        if (obj.id < 0) {
          this.sltParentId = 0
        }
      }, 10)
      this.parentTreeRoad = obj.treeRoad && obj.treeRoad || this.parentTreeRoad
      // if (this.sltedTreeData && (this.sltedTreeData.id == obj.id)) return;
      // 为当前存储选中数据对象赋值
      this.sltedTreeData = obj
      this.sltedTreeData.level = node.level
      this.sltedTreeParData = node.parent.data
      this[this.operTypeFun](node)
      // 出现切换按钮
      // 点击的是叶节点则不更新列表数据
      let isLeaf = false
      if (!node.childNodes.length) {
        isLeaf = true
      }
      this.$emit('tree-click', obj, node, self, isLeaf)
    },
    expendNode (treeStore, store, data) {
      treeStore.expanded = !treeStore.expanded
    },
    // 设置选中节点的parentId
    getCurrNodeParentId (id) {
      return this.sltedTreeParData.id
    },
    // 自定义节点内容
    renderContent (h, {
      node,
      data,
      store
    }) {
      let icon = <i class="ivu-icon ivu-icon-md-folder-open ambuf-tree-icon"> </i>
      if (node.isLeaf) {
        icon = <i class="ivu-icon ivu-icon-ios-document-outline ambuf-tree-icon"> </i>
      } else {
        if (node.expanded) {
          icon = <i class="ivu-icon ivu-icon-md-folder-open ambuf-tree-icon"> </i>
        }
      }
      if (this.defaults.asyn && data.leaf) {
        icon = <i class="ivu-icon ivu-icon-ios-document-outline ambuf-tree-icon"> </i>
      }
      // ${icon}
      return (<span> < span> {icon} <span> {node.label} </span></span> <span style="float:right;margin-right:20px"> </span></span>)
    },
    // 新建部门、修改部门、删除部门
    operationTreeData (type) {
      let isSltNode = this.isSltedTreeNode()
      if (isSltNode) {
        this.operailityData = Object.assign({}, this.sltedTreeData, this.baseUrl, {
          parentTreeRoad: this.parentTreeRoad
        }, {
          fromWhereTre: this.fromWhereTre
        })
        this.operailityData.parentId = this.getCurrNodeParentId()
        if (type === 'remove') {
          this.operailityData = [this.sltedTreeData]
          this.deleteUrl = '/passport/pc' + this.baseUrl.getTreeUrl + '/remove'
        }
        this.openModel(type)
      }
    },
    // 新建
    add () {
      this.operailityType = 'add'
      this.operationTreeData('add')
    },
    // 修改
    edit () {
      this.operailityType = 'edit'
      this.operationTreeData('edit')
    },
    /* --点击--删除--按钮--*/
    remove () {
      let isRoot = this.isRootNode(this.sltedTreeData)
      if (isRoot) {
        this.$message.error('不能删除根节点!')
        return
      }
      this.operailityType = 'remove'
      this.operationTreeData('remove')
    },
    checkCloseModal () {
      if(this.$refs.addChild && this.$refs.addChild.updateCount > 0 || this.$refs.editChild && this.$refs.editChild.updateCount > 1) {
        this.confirmCloseModal = true
      }else {
        this.addModal = false
        this.editModal = false
      }
    },
    closeModal () {
      this.confirmCloseModal = false
      this.addModal = false
      this.editModal = false
    },
    /*
     * 监听子组件通讯的方法
     * 作用:根据不同的参数关闭对应的模态
     * @param targer string example:"add"、"edit"
     * */
    cancel (targer) {
      this[targer + 'Modal'] = false
    },
    /*
     * 监听子组件通讯的方法
     * 作用:ajax请求成功回调,该监听方法在libs/util 中的混合模式下定义回调
     * @param targer string example:"add"、"edit"
     * @param targer string 提示返回的ajax回调返回的信息改信息在对应的子组件中定义
     * 例如:errorTitle、errorTitle
     *addMessTitle:{
     *    type:'add',
     *    successTitle:'添加成功!',
     *    errorTitle:'添加失败!',
     *    ajaxSuccess:'ajaxSuccess',
     *    ajaxError:'ajaxError',
     *    ajaxParams:{
     *      url:'/role/add',
     *      method:'post'
     *    }
     *    }
     * @param udata boolean 默认false  是否不需要刷新当前表格数据
     * */
    subCallback (target, title, updata) {
      this.cancel(target)
      this.expandedKeys = this.$util._.defaultsDeep([], this.temExpandedKeys)
      if (title) {
        this.successMess(title)
      }
      if (!updata) {
        this.updataTree()
      }
    },
    /*
     * 打开指定的模态窗体
     * @param options string 当前指定的模态:"add"、"edit"
     * */
    openModel (options) {
      this[options + 'Modal'] = true
    }
  }
}
</script>
