<template>
  <div
    id="content"
    ref="content"
    class="modal"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      max-height="450"
      :header-cell-style="{ background: '#eef1f6' }"
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
        label="排考名称"
        align="center"
      />
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
    <br>
    <div class="ivu-tabs-bar" />
    <div style="text-align: center">
      <load-btn
        :btn-data="loadBtn"
        @listenSubEvent="listenSubEvent"
      />
      <el-button
        class="cancelBtn"
        @click="cancel"
      >
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
let Util = null
export default {
  props: ['initUser', 'isOnlyOne', 'url', 'unSelect', 'treeOptions', 'selectOption', 'searchParams', 'type', 'getTreeUrl'],
  data () {
    return {
      // tree默认项设置
      selectionKeys: [],
      upDateNumber: 0,
      listTotal: 0,
      searchUserInfo: '', // 全局查询人员信息
      leftListData: [], // 左侧列表的数据
      tableData: [],
      listStyle: {
        width: '260px',
        height: '400px'
      },
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      //        clickId: '',
      selectTreeData: {
        id: '', // 当前选中的树节点id,
        node: null, self: null, isLeaf: null
      },
      examList: [],
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: '/paper/examArrange/listPage',
          method: 'get',
          params: {}
        }
      }
    }
  },
  mounted () {
    const { selectionKeys, tableData } = this
    selectionKeys.forEach(key => {
      tableData.forEach(row => {
        if (row.id === key) {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        }
      })
    })
  },
  created () {
    Util = this.$util
    this.init()
  },
  methods: {

    // 初始化
    init () {
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          status: 'PUBLISH'
        }
      }
      this.setTableData()
    },

    /*
       * 初始化时获取左侧框中的数据
       * @return mockData [{},{}]  左侧框的源数据
       * */
    // 保存成功回调
    listenSubEvent () {
      if (!this.isSelected()) { return }
      this.$emit('setUsers', this.examList)
    },
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = []
      this.listTotal = data.total || 0
      that.tableData = that.addIndex(data.list)
    },
    // 调用父组件关闭当前模态框
    cancel () {
      this.$emit('cancel', 'selectUser', false)
    },
    isSelected () {
      let len = this.examList.length
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
      this.examList = val
      let selectArr = []
      selectArr = val.map(item => item.id)
      this.selectionKeys = JSON.parse(JSON.stringify(selectArr))
    },
    /*
       * 查询叶子节点数据
       * @param id number | string  当前选中的节点的ID
       * */
    setTableData (obj, isLeaf, node) {
      this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.queryQptions.params)
      this.ajax(this.listMessTitle)
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
.ivu-tabs-bar {
    /* border-bottom: 1px solid #dcdee2; */
    margin-bottom: 16px;
}
</style>
