<!--权限管理-->
<template>
  <div
    class="qxgl"
    style="height: 100%"
  >
    <Menu
      v-if="roles.length>0"
      :theme="theme1"
      :active-name="active"
      style="height: 100%;overflow: auto"
      @on-select="showLeftMenu"
    >
      <Menu-group title="">
        <Menu-item
          v-for="(item,index) in roles"
          :key="index"
          :name="(index+1)"
        >
          <Icon type="ios-people" />{{ item.name }}
        </Menu-item>
      </Menu-group>
    </Menu>
    <div
      id="content"
      ref="content"
      style="position: absolute;left: 275px;right: 8px;top: 8px;bottom: 8px;"
    >
      <!--列表操作按钮-->
      <div style="margin-bottom: 20px;">
        <el-button
          type="primary"
          @click="add"
        >
          新建角色
        </el-button>
        <el-button
          type="primary"
          @click="edit"
        >
          修改角色
        </el-button>
        <el-button
          :disabled="rolesItem.id<0?true:false"
          type="danger"
          @click="remove"
        >
          删除角色
        </el-button><span
          v-if="rolesItem.type==0"
          style="margin-left: 10px;color: #f00;"
        >注:该角色为系统默认角色不允许删除!</span>
      </div>
      <div class="row-layout" style="width: 500px">
        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" class="alginRight">名称:</el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9">{{rolesItem.name}}</el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" class="alginRight">代码:</el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9">{{rolesItem.code}}</el-col>
        </el-row>
      </div>
      <div style="width: 500px;margin-bottom: 20px">
        <el-row :gutter="10">
          <el-col
            :xs="8"
            :sm="6"
            :md="4"
            :lg="3"
            class="alginRight"
          >
            描述:
          </el-col>
          <el-col
            :xs="16"
            :sm="18"
            :md="20"
            :lg="21"
          >
            {{ rolesItem.remark }}
          </el-col>
        </el-row>
      </div>
      <div style="position: absolute;top:145px;bottom:10px;left: 0;right: 0;">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="查看权限"
            name="first"
          >
            <div class="showTabContent">
                <!-- v-if="rolesItem.menuTreeList.length>0" -->
              <el-collapse
                v-model="activeNames"
                @change="handleChange"
              >
                <el-collapse-item
                  v-for="(firstItem) in rolesItem.menuTreeList"
                  :key="firstItem.id"
                  :title="firstItem.name"
                  :name="firstItem.id"
                >
                  <view-tree :model="firstItem" />
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="查看人员"
            name="second"
          >
            <div class="showTabContent">
              <div class="row-layout">
                <el-row>
                  <el-col :span="12">
&nbsp;
                  </el-col>
                  <el-col :span="12">
                    <div class="listUpArea-searchWrapper">
                      <!--右侧查询-->
                      <el-form
                        ref="formValidate"
                        :inline="true"
                        :model="formValidate"
                        class="form-inline lose-margin"
                        label-width="60px"
                      >
                        <div class="listUpArea-searchLeft">
                          <input class="hidden">
                          <el-input
                            v-model="formValidate.name"
                            placeholder="请输入内容"
                          >
                            <div slot="prepend">
                              姓名
                            </div>
                            <el-button
                              slot="append"
                              icon="search"
                              @click="search"
                            />
                          </el-input>
                        </div>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="70"
                >
                  <template slot-scope="scope">
                    {{ scope.row.index }}
                  </template>
                </el-table-column>
                <el-table-column
                  property="name"
                  label="姓名"
                  width="160"
                />
                <el-table-column
                  property="depName"
                  label="部门"
                  width="160"
                />
                <el-table-column
                  property="rolesName"
                  label="角色"
                />
              </el-table>
              <div style="margin: 10px;">
                <div style="float: right;">
                  <el-pagination
                    :current-page="myPages.currentPage"
                    :page-sizes="myPages.pageSizes"
                    :page-size="myPages.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listTotal"
                    @size-change="changePageSize"
                    @current-change="changePage"
                  />
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!---模态框--->
    <div>
      <!--新建角色弹窗-->
      <Modal
        v-model="addModal"
        :mask-closable="false"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="960"
      >
        <modal-header
          slot="header"
          :content="addId"
        />
        <add
          v-if="addModal"
          @cancel="cancel"
          @add="subCallback"
        />
        <div slot="footer" />
      </Modal>
      <!--修改角色弹窗-->
      <Modal
        v-model="editModal"
        :mask-closable="false"
        height="200"
        title="对话框标题"
        class-name="vertical-center-modal"
        :width="1100"
      >
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header
          slot="header"
          :content="editId"
        />
        <edit
          v-if="editModal"
          :operaility-data="operailityData"
          @cancel="cancel"
          @edit="subCallback"
        />
        <div slot="footer" />
      </Modal>
      <!--删除弹窗-->
      <Modal
        v-model="removeModal"
        close-on-click-modal="false"
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
          :tree-type="'remove'"
          :operaility-data="operailityData"
          @remove="subCallback"
          @cancel="cancel"
        />

        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script >
/* 当前组件必要引入*/
// // 引入--新建角色--组件
import add from './authorityManagement_add.vue'
// 引入--修改角色--组件
import edit from './authorityManagement_edit.vue'

// // 显示tree结构视图
import viewTree from './viewTree.vue'

let Util = null

export default{
  components: {
    // 当前组件引入的子组件
    add, edit, viewTree
  },
  data () {
    return {
      theme1: 'light',
      active: 1,
      roles: [],
      rolesItem: {menuTreeList: []},
      currRoleId: '',

      /* --按钮button--*/
      addData: '',
      editData: '',
      showData: '',
      addId: {
        id: 'add',
        title: '添加'},
      removeId: {
        id: 'remove',
        title: '删除'
      },
      editId: {
        id: 'edit',
        title: '修改'
      },
      opType: '',
      // 删除角色
      deleteUrl: '/passport/system/role/delete',

      // 查看权限、查看人员
      activeName: '',
      activeNames: [],

      // 查询
      formValidate: {
        name: ''
      },

      // 查看人员列表
      tableData: [],

      // 当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      listMessTitle: {
        paramsData: 'listUrl',
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: '/passport/system/role/list-all-simple'
        }
      }
    }
  },
  created () {
    this.init()
  },

  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
    })
  },
  methods: {
    // 初始化请求列表数据
    init () {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams

      this.queryQptions = {
        // url:this.listUrl,
        params: {curPage: 1, pageSize: Util.pageInitPrams.pageSize}
      }
      this.setLeftRoleList()
    },
    showMoreSearch () {
      console.log(1)
    },

    // 通过get请求列表数据
    updateListData (responseData) {
      let data = responseData.data
      this.roles = []
      this.roles = data
      if(this.opType === '' || this.opType === 'remove') {
        this.setCurrRoleId(this.roles[0].id)
      }
      this.queryRoleAndTreeData(this.currRoleId)
    },
    setLeftRoleList () {
      this.setDefaultSltLab()
      this.listMessTitle.ajaxParams = Object.assign(this.listMessTitle.ajaxParams, this.queryQptions)
      this.ajax(this.listMessTitle)
    },

    /*
      * 设置默认选中"查看权限标签"
      * @param name string   默认选中标签的name 详见elementUI el-tabs 用法
      * */
    setDefaultSltLab (name) {
      let labName = name
      if(typeof labName === 'undefined') {
        labName = 'first'
      }
      this.activeName = labName
      this.formValidate.name = ''
    },

    // 根据角色id查询相关的角色信息、tree
    queryRoleAndTreeData (roleId) {
      let resetTitle = {
        ajaxSuccess: (res)=>{
          this.rolesItem = res.data
          this.rolesItem.menuTreeList = res.data.menuTreeList[0].children
          for (var i = 0, item;i < this.rolesItem.menuTreeList.length;i++) {
            item = this.rolesItem.menuTreeList[i]
            this.activeNames.push(item.id)
          }
        },
        errorTitle: '获取权限数据失败!',
        ajaxParams: {
          url: '/passport/system/role/get',
          params: {
            id: roleId
          }
        }
      }
      this.ajax(resetTitle)

    },

    /*
      * 设置当前选中的角色的id
      * @param id string | number  当前角色的id
      * */
    setCurrRoleId (id) {
      this.currRoleId = id
    },

    // 递归显示权限树
    getArray (data) {
      Util._.forEach(data, function (n, key) {
        if(n.children !== 'undefined') {
          return this.getArray(n.children)
        }
      })
    },

    // 点击左侧菜单
    showLeftMenu (name) {
      this.active = name
      this.setDefaultSltLab()
      this.setCurrRoleId(this.roles[name - 1].id)
      this.queryRoleAndTreeData(this.currRoleId)
    },

    // 切换查看权限、查看人员
    handleClick (tab) {
      if(tab.index === 1) {
        this.setTableData()
      }
    },

    // 查询角色下相关人员
    setTableData () {
      let params = Util._.defaultsDeep({roleId: this.rolesItem.id, name: this.formValidate.name, sortby: '', order: 'DESC'}, this.queryQptions.params)
      let postAjax = {
        ajaxSuccess: (res)=>{
          let responseData = res.data
          for(var i = 0;i < responseData.length;i++) {
            responseData[i].depName = responseData[i].dept.name
            responseData[i].rolesName = this.rolesItem.name
          }
          responseData = this.addIndex(responseData)
          this.tableData = responseData
          this.listTotal = res.totalCount || 1
        },
        ajaxParams: {
          url: '/user/search-by-role',
          params: params
        }
      }
      this.ajax(postAjax)
    },

    // 点击权限列表折叠
    handleChange () {

    },

    // 点击查询按钮
    search () {
      this.handleClick({index: 1})
    },

    /* --点击--添加--按钮--*/
    add () {
      this.opType = 'add'
      this.openModel('add')
    },

    /* --点击--删除--按钮--*/
    remove () {
      this.opType = 'remove'
      this.operailityData = [{id: this.currRoleId}]
      this.openModel('remove')
    },

    /*
       * 点击--修改角色--按钮
       * @param index string|number  当前行索引
       * */
    edit (index) {
      this.opType = 'edit'
      this.operailityData = {id: this.currRoleId}
      this.openModel('edit')
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
      if(title) {
        this.successMess(title)
      }
      if(!updata) {
        if(target === 'add') {
          this.active += 1
        }
        if(target === 'remove') {
          this.active = 1
        }

        this.setLeftRoleList()
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

<style>
  .qxgl .el-tabs,.qxgl .el-tabs__content{
    height: 100%;
  }

  .qxgl .el-tab-pane{
    position: relative;
    overflow: inherit;
    height: 100%;
  }
  .showTabContent{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 50px;
    z-index: 1000;
    overflow: auto;
  }
  .disableCheck{
    color: #e1e1e1;
  }
  .ivu-menu-vertical .ivu-menu-item-group-title{
    height: 0;
    line-height: 0;
  }
</style>
