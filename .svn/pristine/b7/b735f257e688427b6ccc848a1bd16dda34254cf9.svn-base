<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="organization"
        >
          控制台
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
          label="考试名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="examPaperName"
          label="试卷名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="paperConversion100"
          label="分值"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="paperTime"
          label="答题时间"
          width="180"
          align="center"
        />
        <el-table-column
          prop="date"
          label="考试时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.paperBegintime !== null ">
              {{ scope.row.paperBegintime |filterTime }}~{{ scope.row.paperEndtime| filterTime }}
            </span>
            <span v-if="scope.row.paperBegintime === null ">
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="releaseState"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.releaseState === 'NO_RELEASE'">未发布</span>
            <span v-if="scope.row.releaseState === 'RELEASE'">已发布</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime| filterTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="placeName"
          label="考场"
          align="center"
        />
        <el-table-column
          prop="isSign"
          label="签到"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" v-if="scope.row.isSign != 0" @click="signIn(scope.row)">需要</el-link>
            <span v-else>不需要</span>
          </template>
        </el-table-column>
      </el-table>
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
    </div>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1400"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <control
        v-if="showModal"
        :type="type"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import control from './consoleHome.vue'
import api from './api'
// import api from './api'
export default {
  components: {
    control
  },
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      api,
      showModal: false,
      showId: {
        id: 'showId',
        title: '控制台'
      },
      formInline: {
        arrangeName: ''
      },
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
      }
    }
  },
  created () {
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
    // 初始化请求列表数据
    init () {
      Util = this.$util
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
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      this.setTableData()
    },
    organization () {
      if (!this.isSelected()) {return}
      this.operailityData = this.multipleSelection[0]
      this.type = 'show'
      this.showId.title = '控制台'
      this.openModel('show')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val

    },
    signIn (row) {
      let routeUrl = this.$router.resolve({
        path: '/signin',
        query: row
      })
      window.open(routeUrl.href, '_blank')
    },
    isSelected (isOnly) {
      let len = this.multipleSelection.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据!')
        flag = false
      }
      if (len > 1) {
        this.showMess('只能选择一条数据!')
        flag = false
      }
      return flag
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
