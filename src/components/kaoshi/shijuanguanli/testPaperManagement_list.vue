<!----------------------------------
****--@name     试卷管理右侧列表
****--@role     ${*}
****--@date     2022/12/26
****--@author   yyl
----------------------------------->
<template>
  <div ref="testPaperManagementList">
    <el-form
      :inline="true"
      class="el-form-item-search"
      onsubmit="return false"
    >
      <el-row>
        <el-col :span="16">
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="intelligentPaper"
            >
              智能组卷
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="manualPaper"
            >
              手工组卷
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="showPaper"
            >
              查看试卷
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="editPaper"
            >
              修改试卷
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="removePaper"
            >
              销毁
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="enableDisable('RELEASE')"
            >
              启用
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="enableDisable('NO_RELEASE')"
            >
              禁用
            </el-button>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          align="right"
        >
          <el-form-item>
            <el-input
              v-model="seacrchObj.searchValue"
              placeholder="请输入关键性文字"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="blueBtn"
              @click="search"
            >
              查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div ref="testPaperManagementTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="dynamicHt"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="date"
          label="序号"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="试卷名称"
          align="center"
        />
        <el-table-column
          prop="name"
          label="组卷类型"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.paperGruopType === 1 ? '智能组卷' : '手工组卷' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="试卷类型"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.paperRegular === 1 ? '随机' : '固定' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="paperTime"
          label="答题时间"
          align="center"
        />
        <el-table-column
          prop="paperConversion100"
          label="分值"
          align="center"
        />
        <el-table-column
          prop="releaseState"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.releaseState === 'NO_RELEASE' ? '未发布' : scope.row.releaseState === 'RELEASE' ? '已发布' : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="出卷时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | filterTime }}
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
    <!-- 智能组卷 -->
    <Modal
      v-model="intelligentModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1100"
    >
      <modal-header
        slot="header"
        :content="intelligentId"
      />
      <template>
        <intelligent-paper
          v-if="intelligentModal"
          :current-tree-data="currentTreeData"
          :tk-type="tkType"
          :row-data="rowData"
          @cancel="intelligentModal = false"
          @edit="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 手工组卷 -->
    <Modal
      v-model="manualModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1100"
    >
      <modal-header
        slot="header"
        :content="manualId"
      />
      <template>
        <manual-paper
          v-if="manualModal"
          :current-tree-data="currentTreeData"
          :tk-type="tkType"
          :type="type"
          :row-data="rowData"
          @cancel="manualModal = false"
          @edit="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 查看试卷-->
    <Modal
      v-model="showModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1200"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <template>
        <showPaper
          v-if="showModal"
          :current-tree-data="currentTreeData"
          :tk-type="tkType"
          :type="type"
          :row-data="rowData"
          @cancel="showModal = false"
          @edit="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 模态框 删除（del） -->
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      close-on-click-modal="false"
      height="200"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <remove
        v-if="removeModal"
        :delete-url="deleteUrl"
        :operaility-data="rowData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 启用 禁用 -->
    <Modal
      v-model="isPublishModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="isPublishId"
      />
      <operate
        v-if="isPublishModal"
        :type="operateType"
        :methods="'put'"
        :operate-url="isPublishPath"
        :model-name="'isPublish'"
        :post-data="isPublishData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入 */
import intelligentPaper from './intelligentPaper/intelligentPaper'
import manualPaper from './manualPaper/manualPaper'
import showPaper from './showPaper/showPaper.vue'
// 当前组件引入全局的util
let Util = null
export default {
  components: {intelligentPaper, manualPaper, showPaper},
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      seacrchObj: {
        searchValue: ''
      },
      tableData: [],
      listTotal: 0,
      addId: {id: 'addId', title: '新建题组'},
      addModal: false,
      dynamicHt: 200,
      intelligentModal: false,
      intelligentId: {id: 'intelligentId', title: '智能组卷'},
      manualModal: false,
      manualId: {id: 'manualModal', title: '手工组卷'},
      showModal: false,
      showId: {id: 'showId', title: '查看试卷'},
      multipleSelection: [],
      rowData: {},
      type: '',
      removeModal: false,
      removeId: {id: 'removeId', title: '删除'},
      deleteUrl: '/paper/examPaperInfo/remove/',
      isPublishModal: false,
      isPublishId: {id: 'isPublishId', title: '启用'},
      isPublishPath: '/paper/examPaperInfo/release/',
      queryQptions: {},
      isPublishData: {
        releaseState: '',
        id: ''
      },
      operateType: 'enable'
    }
  },
  watch: {
    currentTreeData: {
      handler (newVal, oldVal) {
        if (newVal) {
          this.init()
        }
      },
      deep: true, // 深度监听
      immediate: false // 初始化监听
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
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          treeId: this.currentTreeData.id
        }
      }
      this.setTableData()
    },
    setTableData () {
      let params = Object.assign({},
        this.queryQptions.params,
        this.seacrchObj
      )
      console.log(params)
      this.ajax({
        ajaxSuccess: (res) => {
          this.tableData = res.data.list
          this.listTotal = res.data.total
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/listPage',
          method: 'get',
          params: params
        }
      })
    },
    search () {
      this.setTableData()
    },
    // 智能组卷
    intelligentPaper () {
      this.rowData = {}
      this.intelligentModal = true
    },
    // 手工组卷
    manualPaper () {
      this.type = 'add'
      this.rowData = {}
      this.manualModal = true
    },
    // 查看试卷
    showPaper () {
      if (!this.isSelected(true)) {
        return
      }
      this.type = 'show'
      this.rowData = this.multipleSelection[0]
      this.showModal = true
    },
    // 修改试卷
    editPaper () {
      if (!this.isSelected(true)) {
        return
      }
      if (this.multipleSelection[0].releaseState !== 'RELEASE') {
        this.type = 'edit'
        this.rowData = this.multipleSelection[0]
        console.log(this.rowData.paperGruopType === 1)
        if (this.rowData.paperGruopType === 1) { // 智能组卷
          this.intelligentModal = true
        } else { // 手工组卷
          this.manualModal = true
        }
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    // 删除试卷
    removePaper () {
      if (!this.isSelected()) {return}
      if(this.multipleSelection[0].releaseState !== 'RELEASE') {
        this.rowData = this.multipleSelection
        this.removeModal = true
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    // 启用/禁用试卷
    enableDisable (type) {
      if (!this.isSelected(true)) {
        return
      }
      this.isPublishData = {
        id: this.multipleSelection[0].id,
        releaseState: type
      }
      this.isPublishPath = '/paper/examPaperInfo/release/' + this.multipleSelection[0].id + '?id=' + this.multipleSelection[0].id + '&releaseState=' + type
      this.isPublishId.title = type === 'NO_RELEASE' ? '禁用' : '启用'
      this.operateType = type === 'NO_RELEASE' ? 'disEnable' : 'enable'
      this.isPublishModal = true
    },
    setTableDynHeight () {
      let deviceTable = this.$refs.testPaperManagementTable
      this.dynamicHt = this.$refs.testPaperManagementList.parentNode.parentNode.offsetHeight -
          deviceTable.offsetTop - 60
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isSelected (isOnly) {
      let len = this.multipleSelection.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据!')
        flag = false
      }
      if (len > 1 && isOnly) {
        this.showMess('只能选择一条数据!')
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
  }
}
</script>
