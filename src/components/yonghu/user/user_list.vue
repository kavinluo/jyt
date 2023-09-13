<!--
 * @Author: luo
 * @Date: 2023-08-16 11:55
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-09-13 19:04
 * @Description: import signUpImport from './signUp_important'

-->
<template>
  <div ref="content">
    <el-row>
      <el-col
        align="left"
        :span="8"
      >
        <el-button
          class="blueBtn"
          @click="enable"
        >
          启用
        </el-button>
        <el-button
          class="blueBtn"
          @click="disEnable"
        >
          禁用
        </el-button>
        <el-button
          class="blueBtn"
          @click="removeList"
        >
          注销
        </el-button>
        <el-button
          class="blueBtn"
          @click="memBerShip"
        >
          会员设置
        </el-button>
        <el-button
          class="blueBtn"
          @click="handlerSetting"
        >
          课程权限
        </el-button>
      </el-col>
      <el-col
        align="right"
        :span="16"
      >
        <el-form
          ref="formInline"
          :model="formInline"
          label-width="80px"
          inline
        >
        <el-form-item label="课程权限">
          <el-cascader
            ref="cascaderHandle"
            :props="props"
            @change="handleChange"
            collapse-tags
            :show-all-levels="false"
            @expand-change="expandChange">
          </el-cascader>
          <!-- <Cascader :data="data4" :load-data="loadData"></Cascader> -->
        </el-form-item>
          <el-form-item label="会员筛选">
            <el-select
              v-model="formInline.vipStatus"
              placeholder="选择会员权限"
            >
              <el-option
                label="全部"
                value="0"
              />
              <el-option
                label="会员"
                value="1"
              />
              <el-option
                label="非会员"
                value="2"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="机构筛选">
            <el-select
              v-model="formInline.tenantName"
              placeholder="选择机构"
              style="width:200px;margin-right:20px;"
            >
              <el-option
                label="全部"
                value="0"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="机构筛选">
            <el-input
              v-model="formInline.mobile"
              placeholder="请输入关键性文字"
            />
          </el-form-item>
          <el-button
            class="blueBtn"
            @click="openMoreSearch"
          >
            搜索
          </el-button>
        </el-form>
      </el-col>
    </el-row>
    <div
      id="nosocomialTable"
      ref="nosocomialTable"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6' }"
        :height="dynamicHt"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          type="index"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="vipStatus"
          label="会员状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.vipStatus === 0 ? '非会员' : '会员' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="vipEndTime"
          label="会员有效期"
          align="center"
        >
          <template slot-scope="scope">
            <!-- {{ scope.row.loginDate | formatDate("yyyy-MM-dd HH:mm") }} -->
            <span v-if="scope.row.vipEndTime === null">-</span>
            <span v-if="scope.row.vipEndTime !== null">{{ scope.row.vipEndTime | filterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenantName"
          label="课程权限"
          align="center"
        />
        <el-table-column
          prop="tenantName"
          label="机构名称"
          align="center"
        />
        <el-table-column
          prop="mobile"
          label="注册手机号"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="idNumberType"
          label="证件类型"
          align="center"
        />
        <el-table-column
          prop="idNumber"
          label="证件号"
          align="center"
          width="205"
        />
        <el-table-column
          prop="integral"
          label="积分"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="signUp(scope.row)"
            >
              {{ scope.row.integral }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="shareUserName"
          label="推荐的人"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="signUp(scope.row)"
            >
              {{ scope.row.shareUserName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="loginDate"
          label="最近一次登录时间"
          align="center"
        >
          <template slot-scope="scope">
            <!-- {{ scope.row.loginDate | formatDate("yyyy-MM-dd HH:mm") }} -->
            <span v-if="scope.row.loginDate === null">-</span>
            <span v-if="scope.row.loginDate !== null">{{ scope.row.loginDate | filterTime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin: 10px">
      <div style="float: right">
        <el-pagination
          id="el-pagination"
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
    <!--启用弹窗-->
    <Modal
      v-model="enableModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="enableId"
      />
      <userOperate
        v-if="enableModal"
        :type="'enable'"
        :methods="'put'"
        :operaility-data="enableData"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 停用考试 -->
    <Modal
      v-model="disEnableModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="disEnableId"
      />
      <userOperate
        v-if="disEnableModal"
        :type="'disEnable'"
        :methods="'put'"
        :operaility-data="disEnableData"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 删除用户 -->
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <remove
        v-if="removeModal"
        :delete-url="api.deleteList + operailityData.id"
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 会员设置 -->
    <Modal
      v-model="memModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="800"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="memId"
      />
      <memBerShip
        v-if="memModal"
        :type="type"
        :operaility-data="operailityData"
        :set-table-data="setTableData"
        @cancels="cancels"
      />
      <div slot="footer" />
    </Modal>
    <Modal
      v-model="settingModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="settingId"
      />
      <settingPer
        v-if="settingModal"
        @cancel="subCallback"
        :select-data="selectData"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
// /* 当前组件必要引入*/
import api from './api'
import memBerShip from './membership.vue'
import userOperate from '../yonghuguanli/userOperate.vue'
import settingPer from './settingPer.vue'

let Util = null
export default {
  components: {
    memBerShip,
    userOperate,
    // signUpImport,
    settingPer
  },
  data() {
    return {
      api,
      formInline: {
        mobile: ''
        // vipStatus: '',
        // tenantName: ''
      },
      memModal: false,
      enableModal: false,
      disEnableModal: false,
      removeModal: false,
      toChannelModal: false,
      settingModal: false,
      toChannelId: {
        id: 'toChannelId',
        title: '导入人员'
      },
      settingId: {
        id: 'settingId',
        title: '课程设置'
      },
      memId: {
        id: 'memId',
        title: '会员设置'
      },
      enableId: {
        id: 'enableId',
        title: '启用'
      },
      disEnableId: {
        id: 'disEnableId',
        title: '停用'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      enableData: {},
      disEnableData: {},
      operailityData: {},
      multipleSelection: [],
      deptId: '',
      deptName: '',
      leaf: '',
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      type: '',
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: api.listPage.method,
          params: {}
        }
      },
      treeIdList:[],
      props: {
        checkStrictly: true,
        multiple: true,
        lazy: true,
        value:'id',
        label: 'name',
        children: 'children',
        leaf: 'leaf',
        lazyLoad: this.lazyLoad
      },
      hasChildren: true
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页设置
      this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      let Event = Util.events
      Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  },
  methods: {
    // 初始化请求列表数据
    init() {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          registType: 'APP'

        }
      }
      this.setTableData()
    },
    lazyLoad (node, resolve) {
      this.getSelectList(node, resolve)
    },
    expandChange(val) {
      console.log('val', val)
      // this.treeIdList = val
    },
    handleChange(selectArea) {
      console.log('selectArea', selectArea)
      this.treeIdList = [...new Set([].concat(...selectArea))]
      console.log('this.treeIdList', this.treeIdList)
    },

    getSelectList(node, resolve) {
      let params = null
      console.log('node', node)
      const { level } = node
      if (level == 0) {
        params = {
          parentId: -1,
          path: 'celebrity',
          types: ''
        }
      } else {
        params = {
          parentId: node.data.id
        }
      }
      this.ajax({
        ajaxSuccess: (res) => {
          console.log('res', res)
          if(res.data.length) {
            resolve(res.data)
          } else {
            node.loading = false
            this.$refs.cascaderHandle.dropDownVisible = false
          }
        },
        ajaxParams: {
          isLoading: false,
          url: api.listTree.path,
          method: api.listTree.method,
          params
        }
      })
    },
    importantUse() {
      this.toChannelModal = true
    },
    handlerSetting () {
      // this.toChannelModal = true
      this.selectData = []
      this.multipleSelection.forEach(item =>this.selectData.push(item.id))
      this.settingModal = true
    },
    // 初始化加载列表数据
    setTableData() {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      this.listMessTitle.ajaxParams.params.treeIdList = this.treeIdList.join(',')
      this.ajax(this.listMessTitle)
    },
    // 删除节点
    removeList() {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    // 会员设置
    memBerShip() {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.memModal = true
    },
    cancels(i) {
      this.memModal = i
    },
    // 启用
    enable() {
      if (!this.isSelected()) { return }
      let ids = []
      let status = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
        status.push('0')

      })
      this.enableData = {
        id: ids,
        status: status
      }
      this.openModel('enable')
    },
    // 停用
    disEnable() {
      console.log(this.multipleSelection, 'this.multipleSelectionthis.multipleSelection')
      if (!this.isSelected()) { return }
      let ids = []
      let status = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
        status.push('1')
      })
      this.disEnableData = {
        id: ids,
        status: status
      }
      this.openModel('disEnable')
    },
    // 表格数据列表
    updateListData(res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch() {
      this.setTableData()
    },
    add() {
      this.type = 'add'
      this.addId.title = '新建用户'
      this.openModel('add')
    },
    // 修改节点
    editTree() {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.type = 'edit'
      this.addId.title = '修改设置'
      this.openModel('add')
    },
    signUp() {
      console.log(213)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    isSelected() {
      let len = this.multipleSelection.length
      console.log(this.multipleSelection, 'len')
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据')
        flag = false
      } else if (len > 1) {
        this.showMess('仅选择一条数据')
        flag = false
      }
      return flag
    },
    subCallback(target, title, updata) {
      console.log('target', target)
      this.cancel(target)
      if (title) {
        this.successMess(title)
      }
      if (!updata) {
        this.setTableData()
      }
    },
    // 设置表格及分页的位置
    setTableDynHeight(n) {
      // 操作dom
      let content = this.$refs.content
      let parHt = content.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 60
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    }
  }

}
</script>
