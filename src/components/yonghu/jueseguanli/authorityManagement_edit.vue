<template>
  <div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      class="demo-form-inline"
      label-width="90px"
    >
      <el-row>
        <el-col
          :span="6"
          :offset="2"
        >
          <el-form-item
            label="角色名称"
            prop="name"
          >
            <el-input
              v-model="formValidate.name"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>

        <el-col
          :span="6"
          :offset="1"
        >
          <el-form-item
            label="角色编码"
            prop="code"
          >
            <el-input
              v-model="formValidate.code"
              :disabled="true"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          :offset="1"
        >
          <el-form-item
            label="显示顺序"
            prop="sort"
          >
            <el-input
              v-model="formValidate.sort"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col
          :span="19"
          :offset="2"
        >
          <el-form-item
            label="角色描述"
            prop="remark"
          >
            <el-input
              v-model="formValidate.remark"
              type="textarea"
              resize="none"
              :rows="2"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        :span="16"
        :offset="6"
      >
        <div class="itemLayout">
          <fieldset>
            <legend style="font-size:16px">
              添加人员 <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addUser"
              />&nbsp;&nbsp;
            </legend>

            <div style="max-height: 316px;overflow-y: auto;">
              <span
                v-for="(item,index) in users"
                class="userName"
              ><em class="nameText">{{ item.label }}</em><el-button
                type="danger"
                size="mini"
                icon="el-icon-close"
                @click="removeUser(index)"
              /></span>
            </div>
          </fieldset>
        </div>
      </el-row>
      <br>
      <el-row
        :span="16"
        :offset="6"
      >
        <div class="itemLayout">
          <fieldset>
            <legend style="font-size:16px">
              功能菜单
            </legend>
            <div class="funMeus">
              <el-row style="height: 100%">
                <el-col
                  :span="7"
                  style="height: 100%"
                >
                  <Menu
                    :theme="theme1"
                    :active-name="active"
                    style="height: 100%;width: 200px;overflow: auto;"
                    @on-select="selectMenus"
                  >
                    <Menu-group title="">
                      <Menu-item
                        v-for="(item,index) in funMenus"
                        :key="index"
                        :name="(index+1)"
                      >
                        <el-checkbox
                          v-model="item.checked"
                          @change="sltAllCheckbox"
                        >
&nbsp;
                        </el-checkbox>{{ item.name }}
                      </Menu-item>
                    </Menu-group>
                  </Menu>
                </el-col>
                <el-col
                  :span="17"
                  style="overflow: auto;height: 100%;"
                >
                  <div
                    v-for="(treeItem,index) in treeData"
                    v-show="index==showIdx"
                    class="checkWrapper"
                  >
                    <el-tree
                      :ref="treeItem.treeId"
                      :data="treeItem.data"
                      :props="defaultProps"
                      :default-checked-keys="storeTreeSltKeys"
                      node-key="id"
                      show-checkbox
                      default-expand-all
                      :expand-on-click-node="false"
                      :render-content="renderContent"
                      @check-change="handleCheckChange"
                    />
                  </div>
                </el-col>
              </el-row>
            </div>
          </fieldset>
        </div>
      </el-row>
    </el-form>
    <br>
    <el-row>
      <el-col
        :span="16"
        :offset="2"
      >
        <div style="text-align: center">
          <load-btn
            :btn-data="loadBtn"
            @listenSubEvent="listenSubEvent"
          />
          <el-button @click="cancel">
            取消
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--选择人员-->
    <Modal
      v-model="selectUserModal"
      width="890"
      title="新建教学活动"
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
  </div>
</template>
<script>

let firstLevelTreeId = []
import selectUser from '@/components/common/selectUser.vue'
// 当前组件引入全局的util
let Util = null
export default {
  components: {
    selectUser
  },
  props: ['operailityData'],
  data () {
    return{
      // 功能菜单
      theme1: 'light',
      showIdx: 0,
      active: 1,
      slted: false,
      rootNode: {},
      funMenus: [],

      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        title: 'remark'
      },
      storeTreeSlted: {},
      storeTreeSltKeys: [],
      treeLen: 0,

      // 保存按钮基本信息
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      countDate: 0,

      // form表单bind数据
      formValidate: {
        name: '',
        code: '',
        remark: '',
        sort: 0
      },

      // 选择人员
      selectUserId: {
        id: 'selectUserId',
        title: '选择人员',
        usersData: ''
      },
      // 存储已选择人员的信息
      users: [],

      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      editMessTitle: {
        type: 'edit',
        successTitle: '修改成功!',
        errorTitle: '修改失败!',
        ajaxParams: {
          url: '/passport/system/role/update',
          method: 'put',
          params: {
            id: this.operailityData.id
          }
        }
      }
    }
  },
  created () {
    // 给当前组件注入全局util
    Util = this.$util
    this.init()
  },
  methods: {

    /*
       * 组件初始化入口
       * */
    init () {
      // 初始化数据
      let postData = {
        ajaxSuccess: (res)=>{
          let responseData = res.data
          this.formatInitData(responseData)
        },
        ajaxParams: {
          url: '/passport/system/role/get',
          params: {
            id: this.operailityData.id
          }
        }
      }

      this.ajax(postData)
    },

    /*
      * 格式化从后台请求的数据
      * @param responseData [{},……] | json  后台返回的数据格式
      * */
    formatInitData (responseData) {
      // let myTreeData = responseData.menuTreeList
      // this.setFirstNodes(myTreeData)
      // this.storeTreeSltKeys = []
      // this.setTreeSltKeys(myTreeData)

      // 设置左侧一节几点是否需要选中
      // 当前一级节点所有子节点的个数
      /* setTimeout(()=>{
          for(var i=0;i<this.treeData.length;i++){
            this.treeLen = 0;
            let nodeLen = this.getTreeNodeLen(this.treeData[i]["data"]);
            let checkedKeys = this.getCheckedKeys(i);
            this.setFirstNodeSlt(checkedKeys,nodeLen,i);
          }
        },10)*/

      let users = []
      Util._.forEach(responseData.userMap, (name, key) =>{
        if(name && key) {
          users.push({
            key: key,
            label: name,
            description: '人员id---' + key + '的描述信息',
            disabled: false
          })

        }
      })
      this.users = users
      this.formValidate = {
        id: responseData.id,
        name: responseData.name,
        remark: responseData.remark
      }
    },

    /*
      * 设置一级数据及选中功能项的菜单tree的数据
      * @param data [{},……] | json  后台返回的树结构数据
      * */
    setFirstNodes (data) {
      this.rootNode = {id: data[0].id}
      // this.setTreeRoad(data, true)
      this.treeData = []
      for(var i = 0;i < data.length;i++) {
        // 设置权限选项的左侧一级、右侧tree结构数据
        this.funMenus.push({
          id: data[i].id,
          name: data[i].name,
          checked: data[i].checked
        })
        this.treeData.push({
          treeId: 'tree' + i,
          data: data[i].children
        })
      }
    },

    /*
       * 获取tree中所有选中的tree id|key
       *
       * @param data [{},……] | json  后台返回的树结构数据
       *
       * */
    setTreeSltKeys (data) {
      for(var i = 0, item;i < data.length;i++) {
        item = data[i]
        if(item.checked && item.leaf) {
          this.storeTreeSltKeys.push(item.id)
        }
        if(typeof item.children !== 'undefined' && item.children.length > 0) {
          this.setTreeSltKeys(item.children)
        }
      }
    },

    /*
       * 获取tree中所有选中的tree id|key
       *
       * @param data [{},……] | json  后台返回的树结构数据
       * @param first {boolean}  是否是初始调用
       * @param parItem   {object}   当前节点的父级节点
       *
       * */
    setTreeRoad (data, first, parItem) {
      for(var i = 0, item;i < data.length;i++) {
        item = data[i]
        if(first) {
          item.treeRoad = -1 + ',' + item.id
          item.level = 2
        }else{
          if(parItem.treeRoad === -1) {
            item.treeRoad = parItem.id + ',' + item.id
          }else {
            item.treeRoad = parItem.treeRoad + ',' + item.id
          }
          item.level = parItem.level + 1
        }
        if(typeof item.children !== 'undefined' && item.children.length > 0) {
          this.setTreeRoad(item.children, false, item)
        }
      }
    },

    /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
    listenSubEvent (isLoadingFun) {
      let isSubmit = this.submitForm('formValidate')
      if(isSubmit) {
        if(!isLoadingFun) {isLoadingFun = function () {}}
        isLoadingFun(true)
        this.editMessTitle.ajaxParams.data = this.getFormData(this.formValidate)
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

    // 删除人员
    removeUser (index) {
      this.users.splice(index, 1)
    },

    // 点击功能菜单时触发
    selectMenus (name) {
      this.showIdx = --name
    },

    // 关闭选择人员弹窗
    closeUserModal () {
      this.selectUserModal = false
    },

    // 获取选中的所有叶子节点的key
    getSltVal () {
      let tree = ''
      let that = this
      let tempArr = []
      Util._.forEach(this.treeData, function (treeItem, key) {
        tree = treeItem.treeId
        // tempArr=that.$refs[tree][0].getCheckedKeys(true); //若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false
        tempArr = tempArr.concat(that.$refs[tree][0].getCheckedNodes())
      })
      let idsArr = []
      for(var i = 0, item, isHasComma, treeRoad;i < tempArr.length;i++) {
        item = tempArr[i]
        treeRoad = item.treeRoad + ''
        isHasComma = treeRoad.indexOf(',')
        if(isHasComma === -1) {
          idsArr.push(treeRoad)
        }else{
          let splArr = treeRoad.split(',')
          idsArr = idsArr.concat(splArr)
        }

      }
      idsArr = Util._.uniq(idsArr)
      return idsArr
    },

    // 全选左侧功能
    sltAllCheckbox (event) {
      // this.funMenus[this.showIdx]["checked"] = true;
      let isChecked = event.target.checked
      let tree = this.treeData[this.showIdx].treeId
      if(isChecked) {
        let arr = this.isCheckAll(this.treeData[this.showIdx].data)
        this.$refs[tree][0].setCheckedKeys(arr)
      }else{
        this.$refs[tree][0].setCheckedKeys([])
      }
    },

    isCheckAll (data) {
      for(var i = 0, item;i < data.length;i++) {
        item = data[i]
        firstLevelTreeId.push(item.id)
        if(item.children && item.children.length > 0) {
          this.isCheckAll(item.children)
        }
      }
      return firstLevelTreeId
    },

    // 获取当前tree所有节点个数
    getTreeNodeLen (data) {
      if(data.length === 0) {return this.treeLen}
      for(var i = 0, item;i < data.length;i++) {
        this.treeLen++
        item = data[i]
        if(item.children && item.children.length > 0) {
          this.getTreeNodeLen(item.children)
        }
      }
      return this.treeLen
    },

    /*
      * 是否需要选中右侧一节节点
      *
      * @param checkedKeys string | number 一级节点所有选中的子节点的个数
      *
      * @param nodeLen string | number 一级节点所有子节点的个数
      *
      * @param
      *
      * */
    setFirstNodeSlt (checkedKeys, nodeLen, index) {
      let idx = this.showIdx
      let tree = this.treeData[idx].treeId
      if(typeof index !== 'undefined') {
        idx = index
      }
      if(this.$refs[tree][0].getCheckedNodes().length > 0) {
        this.funMenus[idx].checked = true
      }else {
        this.funMenus[idx].checked = false
      }
    },

    // 获取选中的节点
    getCheckedKeys (index) {
      let idx = this.showIdx
      if(typeof index !== 'undefined') {
        idx = index
      }
      let tree = this.treeData[idx].treeId
      return this.$refs[tree][0].getCheckedKeys()
    },

    /*
       * 当节点选中状态放生改变是触发
       * 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
       */
    handleCheckChange (data, selfCheck, subIsCheck) {
      this.treeLen = 0
      // 当前一级节点所有子节点的个数
      let nodeLen = this.getTreeNodeLen(this.treeData[this.showIdx].data)
      let checkedKeys = this.getCheckedKeys()
      this.setFirstNodeSlt(checkedKeys, nodeLen)
    },

    renderContent (h, { node, data, store }) {
      return (
        <span style="width:100%">
          <span style="width:200px;">
            <span>{node.label}</span>
          </span>
          <span>
            {data.title}
          </span>
        </span>)
    },

    /*
       * 默认组件第一次请求数据
       * @param res JSON  数据请求成功后返回的数据
       * 注:当前为添加页面暂时未用到,属于预留
       * */
    oneDataSuccess (res) {
      /* let responseData = res.data;
         if(this.$util._.isObject(responseData["status"])&&responseData["status"]["code"]==0) {
         let type = [];
         let data = responseData.data;
         type.push(data.type+"");
         this.formValidate = data;
         this.formValidate.type = type;
         }*/
    },

    /*
       * 获取选择人员的人员信息并赋值
       * @param users [{id:'',name:''},{}]  已选人员信息
       * */
    setUsers (users) {
      this.users = users
      this.closeUserModal()
    },

    /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
    cancel () {
      this.$emit('cancel', 'edit')
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
      let tempUserIds = []
      let tempMenuIds = this.getSltVal()
      if(this.users.length !== 0) {
        for(var i = 0;i < this.users.length;i++) {
          tempUserIds.push(this.users[i].key)
        }
      }

      myData.menuIds = tempMenuIds.join(',')
      myData.userIds = tempUserIds.join(',')
      return myData
    }

  }
}
</script>
