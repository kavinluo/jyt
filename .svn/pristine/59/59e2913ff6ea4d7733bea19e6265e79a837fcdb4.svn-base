<!----------------------------------
****--@name     系统练习
****--@role     ${*}
****--@date     2022/12/15
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          新建用户
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:25px;"
      >
        <el-button
          class="blueBtn"
          @click="importUser"
        >
          导入用户
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:35px;"
      >
        <el-button
          class="blueBtn"
          @click="enable"
        >
          启用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="disEnable"
        >
          禁用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="remove"
        >
          删除
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="openMoreSearch"
        >
          权限设置
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
          搜索
        </el-button>
      </el-col>
      <el-col
        :span="3"
        style="float:right;"
      >
        <el-input
          v-model="formInline.mobile"
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
          align="center"
        />
        <el-table-column
          prop="arrangeName"
          label="权限划分"
          align="center"
        />
        <el-table-column
          prop="dept.name"
          label="分类标识"
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
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.status === 0 ?'启用' : '禁用' }}
          </template>
        </el-table-column>
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
      <div style="margin: 10px">
        <div style="float: right">
          <el-pagination
            id="el-pagination"
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
        :delete-url="api.deleteList + operailityData.id"
        :operaility-data="operailityData"
        @remove="subCallback"
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
  </div>
</template>
<script>
/* 当前组件必要引入*/
let Util = null
import add from './yonghuguanli_add.vue'
import importUser from './yonghuguanli_importUser.vue'
import userOperate from './userOperate.vue'
import api from './api'
export default {
  components: {
    add,
    importUser,
    userOperate
  },
  data () {
    return {
      api,
      addModal: false,
      removeModal: false,
      toChannelModal: false,
      enableModal: false,
      disEnableModal: false,
      memModal: false,
      addId: {
        id: 'addId',
        title: '新建用户'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      toChannelId: {
        id: 'toChannelId',
        title: '导入'
      },
      enableId: {
        id: 'enableId',
        title: '启用'
      },
      disEnableId: {
        id: 'disEnableId',
        title: '停用'
      },
      memId: {
        id: 'memId',
        title: '会员设置'
      },
      formInline: {
        mobile: ''
      },
      operailityData: {},
      multipleSelection: [],
      enableData: {},
      disEnableData: {},
      disEnablPath: '',
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
      }
    }
  },
  created () {
    this.init()
  },
  mounted () {
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
    init () {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          registType: 'PC'
        }
      }
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      this.ajax(this.listMessTitle)
    },
    // 删除节点
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      let opt = {
        ajaxSuccess: res => {
          // this.tableData = this.addIndex(res)
        },
        ajaxParams: {
          url: api.getMobile.path,
          method: 'get',
          jsonString: true,
          params: this.formInline
        }
      }
      this.ajax(opt)
    },
    add () {
      this.type = 'add'
      this.addId.title = '新建用户'
      this.openModel('add')
    },
    // 导入用户
    importUser () {
      this.openModel('toChannel')
    },
    // 启用
    enable () {
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
    disEnable () {
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
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
    },
    isSelected () {
      let len = this.multipleSelection.length
      console.log(this.multipleSelection, 'len')
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
      let content = this.$refs.content
      let parHt = content.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 60
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    }
  }
}
</script>
