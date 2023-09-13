<!----------------------------------
****--@name     咨询审核
****--@role     ${*}
****--@date     2023/4/15
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row>
      <el-col align="left" style="width:70px;float:left;">
        <el-button class="blueBtn" @click="remove">
          删除
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin-left:15px;">
        <el-button class="blueBtn" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6'}" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="name" label="发布人"  align="center" />
        <!-- <el-table-column prop="basicType" label="发布内容" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="content">{{ scope.row.basicType }}</el-link>
          </template>
        </el-table-column> -->
        <el-table-column prop="tipType" label="举报内容"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.tipType === 'WFXX'">违法信息</span>
            <span v-if="scope.row.tipType === 'WLBL'">网络暴力</span>
            <span v-if="scope.row.tipType === 'XJYY'">虚假谣言</span>
            <span v-if="scope.row.tipType === 'XXGG'">营销广告</span>
            <span v-if="scope.row.tipType === 'YHSQ'">淫秽色情</span>
            <span v-if="scope.row.tipType === 'YLZP'">养老诈骗</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="发布时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime === null">-</span>
            <span v-if="scope.row.createTime !== null">{{ scope.row.createTime | filterTime }}</span>
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
      <!-- 退回 -->
      <Modal v-model="returnsModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="returnsId" />
        <returns v-if="returnsModal" :operaility-data="operailityData" :type="type" @cancel="cancel" />
        <div slot="footer" />
      </Modal>
      <!-- 举报查看 -->
      <Modal v-model="reportViewModal" :mask-closable="false" close-on-click-modal="false" width="900" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="reportViewId" />
        <reportView v-if="reportViewModal" :operaility-data="operailityData" :type="type" @cancel="cancel" />
        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script>
import returns from './zixunjubao_return.vue'
import reportView from './zixunjubao_reportView.vue'
import api from './api'
/* 当前组件必要引入 */
let Util = null
export default {
  components: {
    returns,
    reportView

  },
  data () {
    return {
      api,
      formInline: {
        searchValue: ''
      },
      dynamicHt: 300,
      returnsModal: false,
      reportViewModal: false,
      returnsId: {id: 'returnsId', title: '退回'},
      reportViewId: {id: 'reportViewId', title: '举报查看'},
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
    // 删除
    remove () {
      console.log('删除')
    },
    openMoreSearch () {
      console.log('查询')
    },
    handleSelectionChange (val) {
      console.log(val)
    },
    // 忽略
    ignore () {
    },
    // 退回
    returns () {
      this.openModel('returns')
    },
    // 内容
    content () {
      this.openModel('reportView')
    },
    subCallback (target, title, updata) {
      this.cancel(target)
      if (title) {
        this.successMess(title)
      }
      if (!updata) {
        // this.setTableData()
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
