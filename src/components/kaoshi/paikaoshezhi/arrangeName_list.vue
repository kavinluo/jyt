<template>
  <div ref="content">
    <p style="text-align: center;font-size:18px;">
      {{ rowObj.arrangeName }}
    </p>
    <el-button
      class="blueBtn"
      style="margin-left:94%;"
      @click="returnUp"
    >
      返回上一级
    </el-button>
    <el-row style="margin-top:5px;">
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="importExcel"
        >
          导入
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="selectExam"
        >
          设置监考员
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left: 40px;"
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
        style="width:70px;float:right;margin-left:15px;"
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
          v-model="form.placeName"
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
          prop="placeName"
          label="考场"
          align="center"
        />
        <el-table-column
          prop="roomName"
          label="考室"
          align="center"
        />
        <el-table-column
          label="注册考生数/总考生数"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span><el-button
              class="blueBtn"
              @click="userNum(scope.row)"
            >{{ scope.row.registeredUserNum }}</el-button>&nbsp;&nbsp;
              /&nbsp;&nbsp;{{ scope.row.allUserNum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="examinerMobiles"
          label="监考员手机号"
          align="center"
        />
        <el-table-column
          prop="examinerNames"
          label="监考员姓名"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="添加时间"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.updateTime !== null ">
              {{ scope.row.updateTime |filterTime }}
            </span>
            <span v-if="scope.row.updateTime === null ">
              -
            </span>
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
    <!-- 选择监考员弹窗-->
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
    <!-- 导入考场 -->
    <Modal
      v-model="toChannelModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="toChannelId"
      />
      <arrangeNameImport
        v-if="toChannelModal"
        :row-obj="rowObj"
        :dept-id="operailityData.id"
        :set-table-data="setTableData"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 选择监考员弹窗-->
    <Modal
      v-model="showModal"
      :mask-closable="false"
      height="800"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <showUserNum
        v-if="showModal"
        :operaility-data="operailityData"
        @cancel="showModal = false"
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
        :delete-url="api.removePlace.path + idStr"
        :operaility-data="operailityData"
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
import arrangeNameImport from './arrangeName_import.vue'
import showUserNum from './arrangeName_userNum.vue'
export default {
  components: {arrangeNameImport, showUserNum},
  props: ['rowObj'],
  data () {
    return {
      api,
      publishPath: '',
      revocationPath: '',
      searchValue: '',
      formInline: {
        examinerNames: '',
        examinerMobiles: '',
        examinerIds: ''
      },
      form: {
        placeName: ''
      },
      idStr: '',
      operailityData: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      examModal: false,
      toChannelModal: false,
      showModal: false,
      removeModal: false,
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      showId: {
        id: 'showId',
        title: '考生信息'
      },
      toChannelId: {
        id: 'toChannelId',
        title: '导入'
      },
      exam: [],
      examId: { id: 'examId', title: '选择监考员' },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.placeListPage.path,
          method: api.placeListPage.method,
          params: {}
        }
      }
    }
  },
  created () {
    Util = this.$util
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
    // 初始化请求列表数据
    init () {
      Util = this.$util
      // ajax请求参数设置
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          examArrangeId: this.rowObj.id
        }
      }
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.form
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.tableData = this.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    // 返回上一级
    returnUp () {
      this.$emit('setStep', 'entrance')
    },
    // 考生数
    userNum (row) {
      this.operailityData = row
      this.showModal = true
    },
    openMoreSearch () {
      this.setTableData()
    },
    importExcel () {
      this.toChannelModal = true
    },
    selectExam () {
      if (!this.isSelected()) { return }
      this.examModal = true
    },
    // 监考员
    setExams (examData) {
      this.operailityData = this.multipleSelection[0]
      let examName = []
      let examId = []
      let examMobile = []
      examData.forEach(item => {
        examName.push(item.label)
        examId.push(item.key)
        examMobile.push(item.mobile)
      })
      this.formInline.examinerNames = examName.join(',')
      this.formInline.examinerIds = examId.join(',')
      this.formInline.examinerMobiles = examMobile.join(',')
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('cancel', 'add')
            this.setTableData()
          }
        },
        ajaxParams: {
          url: api.placeModify.path + this.operailityData.id,
          method: 'put',
          jsonString: true,
          data: this.formInline
        }
      }
      this.ajax(opt)
      this.examModal = false
    },
    remove () {
      // if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
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
