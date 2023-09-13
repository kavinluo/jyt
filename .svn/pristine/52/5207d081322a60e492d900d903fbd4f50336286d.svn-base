<template>
  <div id="content" ref="content">
    <p style="text-align: center;font-size:18px;">
      <!-- {{ rowObj.arrangeName }} -->
    </p>
    <el-row style="margin-top:5px;">
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
        align="right"
        style="width:70px;float:right;margin-left:85px;"
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
          style="width:200px;"
          v-model="formInline.userName"
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
          prop="userIdnumber"
          label="考生身份证"
          align="center"
        />
        <el-table-column
          prop="userName"
          label="考生姓名"
          align="center"
        />
        <el-table-column
          label="注册状态"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.userId !== null">已注册</span>
            <span v-else style="color:red;">未注册</span>
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
        :delete-url="api.removeUser.path + idStr"
        :operaility-data="operailityDatas"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import api from './api'
export default {
  props: ['operailityData'],
  data () {
    return {
      api,
      operailityDatas: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 600,
      removeModal: false,
      idStr: '',
      removeId: {id: 'removeId', title: '删除'},
      formInline: {
        userName: ''
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.userListPage.path,
          method: api.userListPage.method,
          params: {}
        }
      }
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  // mounted () {
  //   // 页面dom稳定后调用
  //   this.$nextTick(function () {
  //     // 初始表格高度及分页位置
  //     this.setTableDynHeight()
  //     // 为窗体绑定改变大小事件
  //     let Event = Util.events
  //     Event.addHandler(window, 'resize', this.setTableDynHeight)
  //   })
  // },
  methods: {
    // 初始化请求列表数据
    init () {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          examArrangePlaceId: this.operailityData.id
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
    remove () {
      // if (!this.isSelected()) { return }
      // this.operailityDatas = this.multipleSelection[0]
      this.openModel('remove')
    },
    openMoreSearch () {
      this.setTableData()
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
    }
    // 设置表格及分页的位置
    // setTableDynHeight (n) {
    //   // 操作dom
    //   let content = this.$refs.content
    //   let parHt = content.parentNode.parentNode.offsetHeight
    //   let nosocomialTable = this.$refs.nosocomialTable
    //   let paginationHt = 60
    //   this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    // }
  }

}
</script>
