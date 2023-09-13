<!----------------------------------
****--@name     系统题型
****--@role     ${*}
****--@date     2022/12/15
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row>
      <el-col align="right" style="width:70px;float:right;margin-left:15px;">
        <el-button type="primary" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6'}" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="90" align="center" />
        <el-table-column prop="name" label="题型名称" width="180" align="center" />
        <el-table-column prop="basicType" label="题型结构" width="180" align="center" />
        <el-table-column prop="remark" label="题型描述" width="580" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="setofQuestions" label="组题" width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.isGroup != 0 ? '否' : '是' }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | filterTime }}</span>
            <!-- | formatDate('yyyy-MM-dd HH:mm:ss') -->
          </template>
        </el-table-column>
        <el-table-column label="样题" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px">
        <div style="float: right">
          <el-pagination id="el-pagination" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal" @size-change="changePageSize" @current-change="changePage" />
        </div>
      </div>
    </div>
    <Modal v-model="viewModal" :mask-closable="false" close-on-click-modal="false" width="900" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="viewId" />
      <xitongtixing-View v-if="viewModal" :operaility-data="operailityData" :type="type" @cancel="cancel" />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import api from './api'
import xitongtixingView from './xitongtixing_view.vue'
let Util = null
export default {
  components: {
    xitongtixingView
  },
  data () {
    return {
      api,
      myPages: '',
      queryQptions: '',
      listTotal: 0,
      text: '',
      type: '',
      dynamicHt: 30,
      operailityData: '',
      formInline: {
        searchValue: ''
      },
      tableData: [],
      multipleSelection: [],
      viewId: { id: 'viewId', title: '查看' },
      viewModal: false,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: 'get',
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
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      this.setTableData()
    },
    handleEdit (row) {
      this.type = 'view'
      this.viewId.title = row.name
      this.openModel('view')
      console.log(row)
      this.operailityData = row
    },
    openMoreSearch () {
      // this.operailityData = this.multipleSelection[0]
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.queryQptions.params)
      this.ajax(this.listMessTitle)
    },
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = []
      that.tableData = that.addIndex(data.list)
      that.listTotal = data.total || 0
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
<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
