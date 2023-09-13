<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          导入
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="edit"
        >
          启用
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
      <el-col align="right" style="width:70px;float:right;margin:9px 0 0 15px;">
        <el-button class="blueBtn" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
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
          prop="categoryTitle"
          label="栏目名"
          align="center"
        />
        <el-table-column
          prop="categoryTitle"
          label="栏目类型"
          align="center"
        />
        <el-table-column
          prop="categoryTitle"
          label="包名"
          align="center"
        />
        <el-table-column
          prop="categoryTitle"
          label="图标数量"
          align="center"
        />
        <el-table-column
          prop="categoryTitle"
          label="导入时间"
          align="center"
        />
        <el-table-column
          prop="paperInfo.name"
          label="状态"
          align="center"
        />
      </el-table>
    </div>
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
        :operaility-data="operailityData"
        :delete-url="api.removeList.path + operailityData.id"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
// import api from './api'
let Util = null
export default {
  data () {
    return {
      type: '',
      // api,
      addModal: false,
      removeModal: false,
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      formInline: {
        searchValue: ''
      },
      dynamicHt: 300,
      tableData: [],
      operailityData: {},
      multipleSelection: [],
      listTotal: 0
      // 初始化加载页面信息
      // listMessTitle: {
      //   ajaxSuccess: 'updateListData',
      //   ajaxParams: {
      //     url: api.listPage.path,
      //     method: api.listPage.method,
      //     params: {}
      //   }
      // }
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
      // ajax请求参数设置
      // this.myPages = Util.pageInitPrams
      // this.queryQptions = {
      //   params: {
      //     pageNo: 1,
      //     pageSize: Util.pageInitPrams.pageSize
      //   }
      // }
      // this.setTableData()
    },
    // 初始化加载列表数据
    // setTableData () {
    //   this.listMessTitle.ajaxParams.params = Object.assign(
    //     this.listMessTitle.ajaxParams.params,
    //     this.queryQptions.params,
    //   )
    //   this.ajax(this.listMessTitle)
    // },
    openMoreSearch () {
      console.log('查询')
    },
    // 表格数据列表
    // updateListData (res) {
    //   let data = res.data
    //   let that = this
    //   that.tableData = that.addIndex(data.list)
    //   this.listTotal = data.total || 0
    // },
    // 添加
    add () {
      this.openModel('add')
    },
    // 编辑
    edit () {
      console.log('编辑')
    },
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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

</style>
