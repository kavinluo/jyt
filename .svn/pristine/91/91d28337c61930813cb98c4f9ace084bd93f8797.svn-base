<template>
  <div ref="content">
    <el-form>
      <el-row>
        <el-col :span="3" align="right">
          <el-form-item>
            <span>考试有效起始时间：从 &nbsp;&nbsp;</span>
          </el-form-item>
        </el-col>
        <el-col :span="3.5">
          <el-form-item>
            <el-date-picker v-model="startTime" type="datetime" @change="handleStartTimeChange" ref="startPicker"></el-date-picker>
            <span style="padding: 0 10px;">到</span>
          </el-form-item>
        </el-col>
        <el-col :span="4.5">
          <el-form-item>
            <el-date-picker v-model="endTime" type="datetime" :picker-options="endPickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button class="blueBtn" @click="revocation" style="margin-left: 10px;">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="nosocomialTable" ref='nosocomialTable'>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="tenantName" label="试卷名称" align="center" />
        <el-table-column prop="mobile" label="试卷模式" align="center" />
        <el-table-column prop="nickname" label="有效时间" align="center" />
        <el-table-column prop="idNumberType" label="考试次数" align="center" />
        <el-table-column prop="idNumber" label="试卷人数" align="center" width="205" />
        <el-table-column prop="integral" label="评卷人设置" align="center">
          <template slot-scope="scope">
            <el-button @click="settings(scope.row)" class="blueBtn" >
              设置评卷人
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="shareUserName" label="详细情况" align="center">
          <template slot-scope="scope">
            <el-button @click="showDetails(scope.row)" class="blueBtn" >
              查看详情
            </el-button>
          </template>
        </el-table-column>
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
      examId: { id: 'examId',title: '新增人员' },
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
        userIdList: []
      },
      operailityData: {},
      multipleSelection: [],
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      endPickerOptions: {// 结束时间的选择器选项
        showNow: false,
        disabledDate: (time) => {
          // 判断结束时间是否小于等于开始时间，若小于等于则禁用该日期
          return time.getTime() < new Date(this.startTime).getTime()
        }
      },
      startPickerOptions: {
        showNow: false // 隐藏“此刻”按钮
      }
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
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页位置
      this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      let Event = Util.events
      Event.addHandler(window,'resize',this.setTableDynHeight)
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
          courseType : 1
        }
      }
      this.setTableData()
    },
    handleStartTimeChange() {
      // // 当开始时间改变时，重新设置结束时间的选择范围
      // this.$nextTick(() => {
      //   this.$refs.endTimePicker.$children[0].focus()
      // })
    },
    // 设置评卷人
    settings (row) {
      this.$emit('setStep','setting',row)
    },
    // 查看详情
    showDetails (row) {
      this.$emit('setStep','details',row)
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
      this.formInline.userIdList = examId
      this.examModal = false
    },
    revocation () {
      console.log('查询')
    },
    // 初始化加载列表数据
    setTableData () {
      // this.listMessTitle.ajaxParams.params = Object.assign(
      //   this.listMessTitle.ajaxParams.params,
      //   this.queryQptions.params)
      // this.ajax(this.listMessTitle)
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
    subCallback (target,title,updata) {
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
