<!----------------------------------
****--@name     报名人员
****--@role     ${*}
****--@date     2023/2/26
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col align="right" style="width:70px;float:right;margin:9px 55px 0 15px;">
        <el-button class="blueBtn" @click="activeReturn">
          返回活动列表
        </el-button>
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
          prop="useUserNikName"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="vipStatus"
          label="用户身份"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.vipStatus === 0">非会员</span>
            <span v-if="scope.row.vipStatus === 1">会员</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userMobile"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="hasCertification"
          label="实名"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.hasCertification === '0'">未实名</span>
            <span v-if="scope.row.hasCertification === '1'">已实名</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenantName"
          label="机构"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="抽奖日期"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | filterTime }}
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
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['rowObj'],
  data () {
    return {
      api,
      type: '',
      addModal: false,
      addId: {
        id: 'addId',
        title: '新增'
      },
      revocationModal: false,
      revocationPath: '',
      dynamicHt: 300,
      listTotal: 0,
      tableData: [],
      formInline: {
        searchValue: ''
      },
      operailityData: {},
      multipleSelection: [],
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
    init () {
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          joinDay: this.filterTime(this.rowObj.joinDay)
        }
      }
      this.setTableData()
    },
    // 返回活动列表
    activeReturn () {
      this.$emit('setStep', 'entrance')
    },
    // 时间格式转换
    filterTime (time) {
      const date = new Date(time)
      const Y = date.getFullYear()
      const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const D = date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate()
      return `${Y}-${M}-${D}`
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      console.log(res)
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      console.log('查询')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
