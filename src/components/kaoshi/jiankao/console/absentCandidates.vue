<template>
  <div id="content" ref="content">
    <el-row style="margin-bottom:20px">
      <el-col align="left" style="width:70px;float:left;margin-right:15px;">
        <el-button class="blueBtn" @click="deriveExcel">
          导出excel
        </el-button>
      </el-col>
      <!-- <el-col align="left" style="width:70px;float:left;margin-left:30px;">
        <el-button class="blueBtn">
          查询
        </el-button>
      </el-col> -->
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
        <el-input placeholder="请输入考生姓名" style="width:200px;" v-model="formInline.key"></el-input>
      </el-col>
    </el-row>
<!--    <table border="1" height="60px">
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
          通过分数:
        </td>
        <td width="300px">
          {{ operailityData.arrangeName }}
        </td>
      </tr>
      <tr>
        <td width="100px" style="background-color:#f2f2f2">
          缺考时间：
        </td>
        <td width="400px">
          {{ operailityData.arrangeName }}
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          统一考试:
        </td>
        <td width="400px">
          {{ operailityData.arrangeName }}
        </td>
        <td width="100px" style="background-color:#f2f2f2">
          有效时间范围:
        </td>
        <td width="100px">
          {{ operailityData.arrangeName }}
        </td>
      </tr>
    </table>-->
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" border :height="dynamicHt">
        <el-table-column prop="index" label="序号" />
        <el-table-column prop="nickname" label="用户名" />
        <el-table-column prop="realName" label="姓名" />
        <el-table-column prop="hasSigned" label="是否签到">
          <template slot-scope="scope">
            <span v-if="scope.row.hasSigned === false">否</span>
            <span v-else>是</span>
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
    <Modal :mask-closable="false" height="200" v-model="exportModal"
           class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="exportId"></modal-header>
      <ajaxDerive v-if="exportModal" type='excel' fileName='缺席考生' :url="'/mark/admin/examMark/console/exportMissExam'" :params="params"
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
      exportModal: false,
      exportId: {id: 'exportId', title: '签到表'},
      listTotal: 0,
      params: {
        arrangeId: this.operailityData.arrangeId
      },
      formInline: {
        key: ''
      },
      dynamicHt: 600,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listMissExamPage.path,
          method: api.listMissExamPage.method,
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
    query () {
      this.setTableData()
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    deriveExcel () {
      this.exportModal = true
    },
    refresh () {
      this.setTableData()
    }
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
