<template>
  <div id="content" ref="content">
    <el-row style="margin-bottom:20px">
      <el-col align="left" style="width:70px;float:left;margin-right:15px;">
        <el-button class="blueBtn" @click="importExcel">
          导出excel
        </el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:20px;">
        <el-button class="blueBtn" @click="refresh">
          刷新控制台
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:left;margin-left:38px;">
        <el-button @click="query" class="blueBtn">
          查询
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:left;margin-left:28px;">
        <el-input placeholder="请输入考生证件号" style="width:200px;" v-model="formInline.key"></el-input>
      </el-col>
<!--      <el-col align="right" style="float:right;">
        <el-checkbox v-model="checked" @change="checkChage">
          实时刷新考生信息
        </el-checkbox>
      </el-col>-->
    </el-row>
    <table border="1" height="60px">
      <tr>
        <td width="100px" style="background-color:#f2f2f2">
          考试名称:
        </td>
        <td width="300px">
          {{ operailityData.arrangeName }}
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          试卷名称:
        </td>
        <td width="300px">
          {{ operailityData.examPaperName }}
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          缺考时间:
        </td>
        <td width="300px">
          <!-- {{ operailityData.zgksBeginTime ? ((operailityData.zgksBeginTime + 1000*60*parseInt(operailityData.zgksLateTime)) | filterTime) : ''}} -->
          <span v-if="operailityData.zgksBeginTime === null">-</span>
          <span v-else> {{operailityData.zgksBeginTime | filterTime }} </span>
        </td>
      </tr>
      <tr>
        <td width="100px" style="background-color:#f2f2f2">
          考试时长：
        </td>
        <td width="400px">
          {{ operailityData.paperTime }}分钟
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          统一考试:
        </td>
        <td width="400px">
          <span v-if="operailityData.zgksBeginTime === null && operailityData.zgksEndTime === null">-</span>
          <span v-else> {{ operailityData.zgksBeginTime | filterTime }}~{{ operailityData.zgksEndTime | filterTime }} </span>
          <!-- {{ operailityData.zgksBeginTime ? (operailityData.zgksBeginTime | filterTime) : '' }}~{{operailityData.zgksEndTime ? (operailityData.zgksEndTime | filterTime) : ''}} -->
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          有效时间范围:
        </td>
        <td width="100px">
          {{ operailityData.paperBegintime| filterTime }}~{{ operailityData.paperEndtime| filterTime }}
        </td>
      </tr>
    </table>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" border :height="dynamicHt">
        <el-table-column prop="index" label="序号" width="50" />
        <el-table-column prop="name" label="用户名" width="130"/>
        <el-table-column prop="userName" label="姓名" width="100"/>
        <el-table-column prop="idNumber" label="证件编号" width="100"/>
        <el-table-column prop="userIp" label="IP" />
        <el-table-column prop="beginTime" label="开始时间">
          <template slot-scope="scope">
            <span v-if="scope.row.beginTime !== null">{{ scope.row.beginTime| filterTime }}</span>
            <span v-if="scope.row.beginTime === null">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间">
          <template slot-scope="scope">
            <span v-if="scope.row.endTime !== null">{{ scope.row.endTime| filterTime }}</span>
            <span v-if="scope.row.endTime === null">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="answerTime" label="考试时间" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.answerTime !== null">{{ (scope.row.answerTime/60).toFixed(2) }}分钟</span>
            <span v-if="scope.row.answerTime === null">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="机构" />
        <el-table-column prop="examStatus" label="提交状态"  width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.examStatus === '0'">未开始</span>
            <span v-if="scope.row.examStatus === '1'">已提交</span>
            <span v-if="scope.row.examStatus === '2'">已提交</span>
            <span v-if="scope.row.examStatus === '3'">未提交</span>
          </template>
        </el-table-column>
        <el-table-column prop="exceptionStatus" label="异常状态"  width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.exceptionStatus === 'NORMAL'">正常</span>
            <span v-if="scope.row.exceptionStatus === 'MISS_EXAM'">缺考</span>
            <span v-if="scope.row.exceptionStatus === 'VIOLATE_RULE'" style="color:red;">违纪</span>
            <span v-if="scope.row.exceptionStatus === 'FORCE_SUBMIT'">强制提交</span>
            <span v-if="scope.row.exceptionStatus === 'SUBMIT_FAILED'">提交失败</span>
            <span v-if="scope.row.exceptionStatus === 'CANCEL_SUBMIT'">撤销提交</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="330">
          <template slot-scope="scope">
            <el-link type="primary" @click="markViolation(scope.row)">标记违纪</el-link>
            <el-link type="primary" @click="markMissing(scope.row)">标记缺考</el-link>
            <el-link type="primary" @click="cancelMissing(scope.row)">取消缺考</el-link>
            <!-- <el-link type="primary" @click="submit(scope.row)">强制提交</el-link> -->
            <el-link type="primary" @click="unsubmit(scope.row)">撤销提交</el-link>
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
    <!--导出弹窗-->
    <Modal :mask-closable="false" height="200" v-model="exportModal"
           class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="exportId"></modal-header>
      <ajaxDerive v-if="exportModal" type='excel' fileName='考试成绩' :url="api.importExcel.path" :params="params"
                  messTitle="确定要导出到excel吗？"
                  @cancel='exportModal = false'></ajaxDerive>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
let Util = null
import api from '../api'
import ajaxDerive from '@/components/common/ajax-derive.vue'
export default {
  props: ['operailityData'],
  components: {ajaxDerive},
  data () {
    return {
      api,
      tableData: [],
      checked: '',
      listTotal: 0,
      dynamicHt: 600,
      exportModal: false,
      formInline: {
        key: ''
      },
      params: {
        arrangeId: this.operailityData.arrangeId
      },
      exportId: {
        id: 'exportId',
        title: '导出'
      },
      timer: null,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.conListPage.path,
          method: api.conListPage.method,
          params: {}
        }
      }
    }
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页设置
      // this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      // let Event = Util.events
      // Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    clearInterval(this.timer)

  },
  methods: {
    init () {
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          arrangeId: this.operailityData.arrangeId
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
    query () {
      this.setTableData()
    },
    // 导出excel
    importExcel () {
      this.exportModal = true
    },
    // 刷新控制台
    refresh () {
      this.setTableData()
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({
          message: '导出成功',
          type: 'success'
        })
      }
    },
    ajaxFun (exception, markId) {
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.setTableData()
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          }
        },
        ajaxParams: {
          url: api.modifyStatus.path + markId,
          method: 'put',
          jsonString: true,
          data: {
            exceptionOperate: exception,
            markId: markId
          }
        }
      }
      this.ajax(opt)
    },
    // 设置违纪
    markViolation (val) {
      this.ajaxFun('SET_VIOLATE_RULE', val.markId)
    },
    // 标记缺考
    markMissing (val) {
      this.ajaxFun('SET_MISS_EXAM', val.markId)
    },
    // 取消缺考
    cancelMissing (val) {
      this.ajaxFun('CANCEL_MISS_EXAM', val.markId)
    },
    // 强制提交
    submit (val) {
      this.ajaxFun('FORCE_SUBMIT', val.markId)
    },
    // 撤销提交
    unsubmit (val) {
      this.ajaxFun('CANCEL_SUBMIT', val.markId)
    }
    /*    // 实时刷新
    checkChage (val) {
      if (val) {
        this.timer = setInterval(() => {
          this.setTableData()
        }, 1000)
      }else if (val === false) {
        clearInterval(this.timer)
      }
    }*/
    // 设置表格及分页的位置
    // setTableDynHeight (n) {
    // // 操作dom
    //   let content = this.$refs.content
    //   let parHt = content.parentNode.parentNode.offsetHeight
    //   let nosocomialTable = this.$refs.nosocomialTable
    //   let paginationHt = 60
    //   this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    // }
  }
}
</script>
