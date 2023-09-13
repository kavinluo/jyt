<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col align="left" style="width:70px;float:left;margin-right:35px;">
        <el-button class="blueBtn" @click="add">新增人员</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;">
        <el-button class="blueBtn" @click="remove">删除</el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin:9px 5px 0 15px;">
        <el-button class="blueBtn" @click="activeReturn">返回</el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin:9px 0 0 15px;">
        <el-button class="blueBtn" @click="openMoreSearch">查询</el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#eef1f6' }":height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" label="序号" width="90" align="center"/>
        <el-table-column prop="className" label="班级名称" align="center"/>
        <el-table-column prop="nickname" label="用户名" align="center" :show-overflow-tooltip="true"/>
        <el-table-column prop="vipStatus" label="用户身份" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.vipStatus === 0 ">非会员</span>
            <span v-if="scope.row.vipStatus === 1 ">会员</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"/>
        <el-table-column prop="hasCertification" label="实名" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.idNumber === null">未实名</span>
            <span v-else>已实名</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="报名日期" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime === null">-</span>
            <span v-if="scope.row.createTime !== null">{{ scope.row.createTime | filterTime }}</span>
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
   <!-- 新增弹窗-->
    <Modal
      v-model="examModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="examId"
      />
      <select-user
        v-if="examModal"
        :init-user="exam"
        url="passport/dept/tree"
        @cancel="examModal = false"
        @setUsers="setExams"
      />
      <div slot="footer" />
    </Modal>
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
        :delete-url="api.removeList.path + idStr"
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
import api from '../config/api'
let Util = null
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
      tableData: [],
      formInline: {
        classId: '',
        userIdList: []
      },
      operailityData: {},
      multipleSelection: [],
       // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listCourse.path,
          method: api.listCourse.method,
          params: {}
        }
      }
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
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.$emit('cancel', 'add')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: '/course/admin/trainMyCourse/manageOpen',
          method: 'post',
          jsonString: true,
          data: this.formInline
        }
      }
      this.ajax(opt)
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
<style scoped>

</style>
