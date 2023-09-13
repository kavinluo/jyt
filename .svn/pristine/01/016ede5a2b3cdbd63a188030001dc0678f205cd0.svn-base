<template>
  <div ref="content">
    <el-form>
      <el-row>
        <el-col align="right" style="width:70px;float:right;margin:10px 55px 15px 15px;">
          <el-button class="blueBtn" @click="activeReturn">
            返回试卷列表
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="tenantName" label="成绩" align="center" />
        <el-table-column prop="mobile" label="开始时间" align="center" />
        <el-table-column prop="nickname" label="结束时间" align="center" />
        <el-table-column prop="integral" label="查看答卷" align="center">
          <template slot-scope="scope">
            <el-button class="blueBtn">
              取消评卷人
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="评卷人" align="center" />
        <el-table-column prop="nickname" label="复审人" align="center" />
      </el-table>
    </div>
    <div style="margin: 10px">
      <div style="float: right">
        <el-pagination id="el-pagination" :current-page="myPages.currentPage" :page-sizes="myPages.pageSizes" :page-size="myPages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal" @size-change="changePageSize" @current-change="changePage" />
      </div>
    </div>
  </div>
</template>
<script>
// /* 当前组件必要引入*/
let Util = null
export default {
  // props: ['rowObj'],
  data () {
    return {
      // api,
      type: '',
      addModal: false,
      addId: {
        id: 'addId',
        title: '新增'
      },
      examId: { id: 'examId', title: '新增人员' },
      examModal: false,
      revocationModal: false,
      removeModal: false,
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      exam: [],
      idStr: '',
      revocationPath: '',
      dynamicHt: 300,
      listTotal: 0,
      tableData: [
        {
          tenantName: '试卷名称',
          mobile: '试卷模式',
          nickname: 'nickname',
          idNumberType: 'idNumberType'
        }
      ],
      formInline: {
        classId: '',
        userIdList: []
      },
      operailityData: {},
      multipleSelection: []
      // 初始化加载页面信息
      // listMessTitle: {
      //   ajaxSuccess: 'updateListData',
      //   ajaxParams: {
      //     url: api.listCourse.path,
      //     method: api.listCourse.method,
      //     params: {}
      //   }
      // }
    }
  },
  created () {
    this.init()
    console.log(this.rowObj)
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
          classId: this.rowObj.classId,
          courseType : 1
        }
      }
      this.setTableData()
    },
    // 添加
    add () {
      this.examModal = true
    },
    // 编辑
    edit () {
      if (!this.isSelected()) { return }
      this.addId.title = '编辑'
      this.type = 'edit'
      this.openModel('add')
    },
    // 删除
    remove () {
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    // 返回
    activeReturn () {
      this.$emit('setStep', 'entrance')
    },
    // 新增人员
    setExams (examData) {
      let examName = []
      let examId = []
      let examMobile = []
      examData.forEach(item => {
        examName.push(item.label)
        examId.push(item.key)
        examMobile.push(item.mobile)
      })
      this.formInline.classId = this.rowObj.classId
      this.formInline.userIdList = examId
      this.examModal = false
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params)
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.tableData = data.list
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      console.log('查询')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.courseId).toString()
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
