<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          添加
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="importExcel"
        >
          导入
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="release"
        >
          启用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="revocation"
        >
          禁用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="remove"
        >
          删除
        </el-button>
      </el-col>
      <el-col
        align="right"
        style="width:70px;float:right;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="openMoreSearch"
        >
          查询
        </el-button>
      </el-col>
      <el-col
        :span="3"
        style="float:right;"
      >
        <el-input
          v-model="formInline.searchValue"
          placeholder="请输入关键性文字"
        />
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
          width="90"
          align="center"
        />
        <el-table-column
          prop="arrangeName"
          label="机构名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="paperInfo.name"
          label="权限划分"
          width="120"
          align="center"
        />
        <el-table-column
          prop="dept.name"
          label="分类标识"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="mobile"
          label="注册手机号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="用户名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="注册时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime |filterTime }}
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
    <!-- 新建用户 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="800"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="addId"
      />
      <add
        v-if="addModal"
        :type="type"
        :operaility-data="operailityData"
        :set-table-data="setTableData"
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
        :delete-url="api.deleteList + idStr"
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 启用 禁用 -->
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
      <operate
        v-if="enableModal"
        :type="'enable'"
        :methods="'put'"
        :operate-url="enablePath"
        :post-data="enableData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
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
      <operate
        v-if="disEnableModal"
        :type="'disEnable'"
        :methods="'put'"
        :operate-url="disEnablePath"
        :post-data="disEnablehData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
     <!-- 导入用户 -->
    <Modal
      v-model="toChannelModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="toChannelId"
      />
      <importUser
        v-if="toChannelModal"
        :dept-id="operailityData.id"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import api from './api.js'
import add from '../jigouyonghu/jigouyonghu_add.vue'
import importUser from './jigouyonghu_importUser.vue'
export default {
  components: {add, importUser},
  props: ['currentTreeData'],
  data () {
    return {
      api,
      addModal: false,
      addId: {
        id: 'addId',
        title: '新建用户'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      enableId: {
        id: 'publishId',
        title: '启用'
      },
      disEnableId: {
        id: 'disEnableId',
        title: '禁用'
      },
      toChannelId: {
        id: 'toChannelId',
        title: '导入'
      },
      enablePath: '',
      enableData: {
        id: ''
      },
      disEnablehData: {
        id: ''
      },
      disEnablePath: '',
      formInline: {
        searchValue: ''
      },
      enableModal: false,
      disEnableModal: false,
      toChannelModal: false,
      operailityData: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: api.listPage.method,
          params: {}
        }
      }
    }
  },
  watch: {
    currentTreeData: {
      handler (newVal, oldVal) {
        if(newVal) {
          this.init()
        }
      },
      deep: true, // 深度监听
      immediate: false // 初始化监听
    }
  },
  created () {
    Util = this.$util
    // this.init()
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页位置
      this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      let Event = Util.events
      Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          registType: 'PC',
          deptId: this.currentTreeData.id
        }
      }
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      let params = Object.assign({},
        this.queryQptions.params,
        this.formInline
      )
      this.ajax({
        ajaxSuccess: (res) => {
          this.tableData = res.data.list
          this.listTotal = res.data.total
        },
        ajaxParams: {
          url: '/passport/user/page',
          method: 'get',
          params: params
        }
      })
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      this.setTableData()
    },
    add () {
      this.type = 'add'
      this.addId.title = '新建用户'
      this.openModel('add')
    },
    // 修改节点
    importExcel () {
      this.openModel('toChannel')
    },
    // 删除节点
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    // 启用
    release () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.enableData = {
        id: ids.join(','),
        status: 0
      }
      this.enablePath = api.updateUser.path + ids.join(',')
      this.openModel('enable')
    },
    // 禁用
    revocation () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.disEnablehData = {
        id: ids.join(','),
        status: 1
      }
      this.disEnablePath = api.updateUser.path + ids.join(',')
      this.openModel('disEnable')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.arrangeId).toString()
    },
    isSelected () {
      let len = this.multipleSelection.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据')
        flag = false
      }
      return flag
    },
    subCallback (target, title, updata) {
      this.cancel(target)
      if (title) {
        this.successMess(title)
      }
      if (!updata) {
        this.setTableData()
      }
    },
    // 设置表格及分页的位置
    setTableDynHeight (n) {
      // 操作dom
      let deviceTable = this.$refs.nosocomialTable
      this.dynamicHt = this.$refs.content.parentNode.parentNode.offsetHeight -
          deviceTable.offsetTop - 60
    }
  }
}
</script>
<style scoped>

</style>
