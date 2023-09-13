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
        style="width:90px;float:left;"
      >
        <span style="font-size:17px;margin-top:10px;">活动状态：</span>
      </el-col>
      <el-col
        :span="6"
        style="width:70px;float:left;"
      >
        <span
          v-if="enableOpen === '1'"
          style="font-size:17px;margin-top:10px;color:rgb(11, 138, 236)"
        >开启中</span>
        <span
          v-if="enableOpen !== '1'"
          style="font-size:17px;margin-top:10px;color:rgb(217, 0, 27)"
        >已关闭</span>
      </el-col>
      <el-col
        v-if="enableOpen === '1'"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="shutDown"
        >
          关闭
        </el-button>
      </el-col>
      <el-col
        v-if="enableOpen !== '1'"
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="open"
        >
          开启
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="draw"
        >
          抽奖
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
          align="center"
        />
        <el-table-column
          prop="joinDay"
          label="抽奖日期"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.joinDay | filterTime }}
          </template>
        </el-table-column>
        <el-table-column
          prop="joinUserNum"
          label="报名人员"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="signUp(scope.row)"
            >
              {{ scope.row.joinUserNum }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="winningNum"
          label="中奖人员"
          align="center"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="winPrize(scope.row)"
            >
              {{ scope.row.winningNum }}
            </el-link>
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
    <!-- <el-dialog
      title="提示"
      :visible.sync="addModal"
      :before-close="handleClose"
    > -->
    <!-- <add
      v-if="addModal"
      :type="type"
      :operaility-data="operailityData"
      :set-table-data="setTableData"
      @cancel="cancel"
    /> -->
    <!-- </el-dialog> -->
  </div>
</template>
<script>
/* 当前组件必要引入*/
let Util = null
// import add from './luckyDraw.vue'
import api from './api'
export default {
  // components: {
  //   add
  // },
  data () {
    return {
      api,
      formInline: {
        searchValue: ''
      },
      addModal: false,
      addId: {id: 'addId', title: '抽奖'},
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
      enableOpen: '',
      dynamicHt: 300,
      type: '',
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listEveryDayPage.path,
          method: api.listEveryDayPage.method,
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
    init () {
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      this.enble()
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
    draw () {
      // this.$router.push('/luckyDraw')
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      let routeUrl = this.$router.resolve({
        path: '/luckyDraw'
      })
      window.open(routeUrl.href, '_blank')
    },
    enble () {
      let opt = {
        ajaxSuccess: (res) => {
          this.enableOpen = res.data.enableOpen
        },
        ajaxParams: {
          url: api.getConfig.path,
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    // 开始
    open () {
      let opt = {
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.$message({ message: '开启成功', type: 'success'})
            this.enble()
          }
        },
        ajaxParams: {
          url: api.setLucky.path,
          method: 'put',
          jsonString: true,
          data: {
            enableOpen: '1'
          }
        }
      }
      this.ajax(opt)
    },
    // 关闭
    shutDown () {
      let opt = {
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.$message({ message: '关闭成功', type: 'success'})
            this.enble()
          }
        },
        ajaxParams: {
          url: api.setLucky.path,
          method: 'put',
          jsonString: true,
          data: {
            enableOpen: '0'
          }
        }
      }
      this.ajax(opt)
    },
    // 报名人数
    signUp (row) {
      this.$emit('setStep', 'applicants', row)
    },
    // 中奖人数
    winPrize (row) {
      this.$emit('setStep', 'personnels', row)
    },
    openMoreSearch () {
      console.log('搜索')
    },
    isSelected () {
      let len = this.multipleSelection.length
      console.log(this.multipleSelection, 'len')
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
