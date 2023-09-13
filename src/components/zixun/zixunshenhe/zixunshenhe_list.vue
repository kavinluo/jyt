<!----------------------------------
****--@name     咨询审核
****--@role     ${*}
****--@date     2023/4/15
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row>
      <el-col align="left" style="width:70px;float:left; margin-right:30px;">
        <el-button class="blueBtn" @click="batchPass">
          批量通过
        </el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;">
        <el-button class="blueBtn" @click="remove">
          删除
        </el-button>
      </el-col>
      <el-col align="right"  style="width:70px;float:right;margin:9px 0 0 15px;">
        <el-button class="blueBtn" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.nickname" placeholder="请输入昵称"/>
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6'}" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="nickname" label="发布人"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.nickname !== null">{{ scope.row.nickname }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="contentDetails" label="发布内容" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="content">{{ scope.row.basicType }}</el-link>
          </template>
        </el-table-column> -->
        <el-table-column prop="manWeight" label="审核权值"  align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="contentDatetime" label="发布时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.contentDatetime === null">-</span>
            <span v-if="scope.row.contentDatetime !== null">{{ scope.row.contentDatetime | filterTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="content(scope.row)">
              查看内容
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 10px">
        <div style="float: right">
          <el-pagination id="el-pagination" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal" @size-change="changePageSize" @current-change="changePage" />
        </div>
      </div>
      <!-- 删除 -->
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
          :delete-url="api.remove.path + idStr"
          :operaility-data="operailityData"
          @remove="subCallback"
          @cancel="cancel"
        />
        <div slot="footer" />
      </Modal>
      <!-- 审核查看 -->
      <Modal v-model="contentModal" :mask-closable="false" close-on-click-modal="false" width="900" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="contentId" />
        <contents v-if="contentModal" :operaility-data="operailityData" :set-table-data="setTableData"  @cancel="cancel" />
        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script>
import contents from './zixunshenhe_content.vue'
import api from './api'
/* 当前组件必要引入 */
let Util = null
export default {
  components: {
    contents
  },
  data () {
    return {
      api,
      idStr: '',
      formInline: {
        nickname: ''
      },
      operailityData: {},
      dynamicHt: 300,
      batchModal: false,
      passModal: false,
      contentModal: false,
      removeModal: false,
      contentId: {id: 'contentId', title: '审核查看'},
      removeId: {id: 'removeId', title: '删除'},
      tableData: [],
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
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          contentDisplay: 1,
          auditStatus: 'IN_REVIEW'

        }
      }
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline,

      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.tableData = this.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    // 批量通过
    batchPass () {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.auditPut.path + this.idStr,
          method: 'put',
          jsonString: true,
          data: {
            ids: this.idStr,
            flag: 1
          }
        }
      }
      this.ajax(opt)
    },
    // 删除
    remove () {
      this.openModel('remove')
      this.operailityData = this.multipleSelection[0]
    },
    openMoreSearch () {
      this.setTableData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
    },
    // 设置权值
    weight (row) {
      this.operailityData = row
      this.openModel('batch')
    },
    // 通过
    clickPass (row) {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '已通过',
              type: 'success'
            })
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.auditPut.path + row.id,
          method: 'put',
          jsonString: true,
          data: {
            ids: row.id,
            vo: {
              auditReason: '',
              flag: true
            }
          }
        }
      }
      this.ajax(opt)
    },
    // 不通过
    notPass (row) {
      this.openModel('pass')
      this.operailityData = row
    },
    // 内容
    content (row) {
      this.operailityData = row
      this.openModel('content')
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
<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
