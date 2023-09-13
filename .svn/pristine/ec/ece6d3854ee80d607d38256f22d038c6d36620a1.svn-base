<template>
  <div
    ref="content"
    class="content"
  >
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          新增
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="edit"
        >
          编辑
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="release"
        >
          发布
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:40px;"
      >
        <el-button
          class="blueBtn"
          @click="revocation"
        >
          撤销发布
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
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
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="termination"
        >
          终止活动
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:40px;"
      >
        <el-button
          class="blueBtn"
          @click="activate"
        >
          激活
        </el-button>
      </el-col>
      <el-col
        align="right"
        style="width:70px;float:right;margin:9px 0 0 15px;"
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
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="number"
          label="编号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="栏目名"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="typeValue"
          label="栏目类型"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="description"
          label="标题"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="moduleNum"
          label="活动模块数"
          align="center"
        />
        <el-table-column
          prop="beginTime"
          label="活动时间"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="status"
          label="发布状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'RELEASE'">发布</span>
            <span v-if="scope.row.status === 'NO_RELEASE'">未发布</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="processStatus"
          label="终止状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.processStatus === 'ONGOING'">运行中</span>
            <span v-if="scope.row.processStatus === 'END'">终止</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userNum"
          label="报名人数"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="signUp(scope.row)"
            >
              {{ scope.row.userNum }}
            </el-link>
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
    <!-- 新建栏目 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1000"
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
        :set-table-data="setTableData"
        :operaility-data="operailityData"
        v-bind="$attrs"
        @cancel="cancel"
        v-on="$listeners"
      />
      <div slot="footer" />
    </Modal>
    <!--发布弹窗-->
    <Modal
      v-model="publishModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="publishId"
      />
      <operate
        v-if="publishModal"
        :type="'publish'"
        :methods="'put'"
        :operate-url="publishPath"
        :post-data="publishData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 撤销考试 -->
    <Modal
      v-model="revocationModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="revocationId"
      />
      <operate
        v-if="revocationModal"
        :type="'revocation'"
        :methods="'put'"
        :operate-url="revocationPath"
        :post-data="revocationData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 删除弹窗 -->
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
        :operaility-data="operailityData"
        :delete-url="'/cms/activityInfo/remove/' + operailityData.id"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!--终止活动-->
    <Modal
      v-model="terminateModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="terminateId"
      />
      <operate
        v-if="terminateModal"
        :type="'terminate'"
        :methods="'put'"
        :operate-url="terminatePath"
        :post-data="terminateData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!--激活-->
    <Modal
      v-model="activateModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="activateId"
      />
      <operate
        v-if="activateModal"
        :type="'activate'"
        :methods="'put'"
        :operate-url="activatePath"
        :post-data="activateData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util
import add from './activity/activity_add.vue'
import api from './api'
export default {
  components: {add},
  data () {
    return {
      api,
      type: '',
      addModal: false,
      addId: {
        id: 'addId',
        title: '新增活动'
      },
      publishModal: false,
      revocationModal: false,
      removeModal: false,
      terminateModal: false,
      activateModal: false,
      activateId: {
        id: 'activateId',
        title: '激活'
      },
      terminateId: {
        id: 'terminateId',
        title: '终止活动'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      publishId: {
        id: 'publishId',
        title: '发布'
      },
      revocationId: {
        id: 'revocationId',
        title: '撤销发布'
      },
      publishData: {
        id: ''
      },
      revocationData: {
        id: ''
      },
      terminateData: {
        id: ''
      },
      activateData: {
        id: ''
      },
      activatePath: '',
      publishPath: '',
      revocationPath: '',
      terminatePath: '',
      dynamicHt: 300,
      tableData: [],
      listTotal: 0,
      formInline: {
        searchValue: ''
      },
      operailityData: [],
      multipleSelection: [],
      myPages: {},
      queryQptions: {}
    }
  },
  created () {
    Util = this.$util
    this.init()
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
    init () {
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
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
          url: api.listPage.path,
          method: api.listPage.method,
          params: params
        }
      })
    },
    // 添加活动
    add () {
      this.type = 'add'
      this.addId.title = '新增活动'
      this.openModel('add')
    },
    // 编辑活动
    edit () {
      if (!this.isSelected()) { return }
      if (this.multipleSelection[0].status === 'NO_RELEASE') {
        this.operailityData = this.multipleSelection[0]
        this.addId.title = '编辑活动'
        this.type = 'edit'
        this.openModel('add')
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    // 删除活动
    remove () {
      if (!this.isSelected()) { return }
      if (this.multipleSelection[0].status === 'NO_RELEASE') {
        this.operailityData = this.multipleSelection[0]
        this.openModel('remove')
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    // 报名人数
    signUp (row) {
      this.$emit('setStep', 'details', row)
    },
    // 发布
    release () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.publishData = {
        id: ids.join(','),
        status: 'RELEASE'
      }
      this.openModel('publish')
      this.publishPath = api.modifyStatus.path + ids.join(',')
    },
    // 撤销发布
    revocation () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.revocationData = {
        id: ids.join(','),
        status: 'NO_RELEASE'
      }
      this.openModel('revocation')
      this.revocationPath = api.modifyStatus.path + ids.join(',')
    },
    // 终止活动
    termination () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.terminateData = {
        id: ids.join(','),
        processStatus: 'END'
      }
      this.openModel('terminate')
      this.terminatePath = api.modifyProcessStatus.path + ids.join(',')
    },
    // 激活
    activate () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.activateData = {
        id: ids.join(','),
        processStatus: 'ONGOING '
      }
      this.openModel('activate')
      this.activatePath = api.modifyProcessStatus.path + ids.join(',')
    },
    openMoreSearch () {
      console.log('查询')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isSelected () {
      let len = this.multipleSelection.length
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
      let parHt = content.parentNode.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 60
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    }
  }
}
</script>
<style scoped>

</style>
