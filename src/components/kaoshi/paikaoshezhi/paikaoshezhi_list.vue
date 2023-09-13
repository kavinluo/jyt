<template>
  <div
    ref="content"
    class="content"
  >
    <el-row>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          新建
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="edit"
        >
          修改
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
        align="left"
        style="width:70px;float:left;"
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
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="revocation"
        >
          撤销发布
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
          v-model="formInline.arrangeName"
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
          label="排考名称"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="setUpArrange(scope.row)">{{ scope.row.arrangeName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="考室数"
          align="center"
        />
        <el-table-column
          prop="userNum"
          label="考生数"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.status != 'UN_PUBLISH' ? '已发布' : '未发布' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.createTime !== null ">
              {{ scope.row.createTime | filterTime }}
            </span>
            <span v-if="scope.row.createTime === null ">
              -
            </span>
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
    <!-- 新建弹窗 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="500"
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
        :delete-url="api.removeList.path + idStr"
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
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
    <!-- 撤销发布 -->
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
  </div>
</template>
<script>
let Util
import api from './api'
import add from './paikaoshezhi_add.vue'
export default {
  components: {
    add
  },
  data () {
    return {
      api,
      addModal: false,
      addId: {
        id: 'addId',
        title: '添加'
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
      publishModal: false,
      revocationModal: false,
      publishPath: '',
      revocationPath: '',
      formInline: {
        arrangeName: ''
      },
      operailityData: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      type: '',
      idStr: '',
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
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.tableData = this.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    // 发布考试
    release () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.publishData = {
        id: ids.join(','),
        status: 'PUBLISH '
      }
      this.publishPath = api.modifyStatus.path + ids.join(',')
      this.openModel('publish')
    },
    // 撤销考试
    revocation () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.revocationData = {
        id: ids.join(','),
        status: 'UN_PUBLISH'
      }
      this.revocationPath = api.modifyStatus.path + ids.join(',')
      this.openModel('revocation')
    },
    // 删除节点
    remove () {
      if (this.multipleSelection[0].status === 'PUBLISH') {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
        return
      }
      this.openModel('remove')
    },
    openMoreSearch () {
      this.setTableData()
    },
    // 添加
    add () {
      this.type = 'add'
      this.addId.title = '添加'
      this.openModel('add')
    },
    // 修改节点
    edit () {
      if (!this.isSelected()) { return }
      if (this.multipleSelection[0].status === 'PUBLISH') {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
        return
      }
      this.operailityData = this.multipleSelection[0]
      this.type = 'edit'
      this.addId.title = '修改'
      this.openModel('add')
    },
    // 报名人数
    signUp (row) {
      this.$emit('setStep', 'details', row)
    },
    // 排考名称
    setUpArrange (row) {
      this.$emit('setStep', 'details', row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
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
