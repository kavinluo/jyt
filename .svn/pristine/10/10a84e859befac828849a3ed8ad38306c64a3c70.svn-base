<template>
  <div ref="content">
    <el-row>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="organization"
        >
          组织考试
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:25px;"
      >
        <el-button
          class="blueBtn"
          @click="editTree"
        >
          修改设置
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:45px;"
      >
        <el-button
          class="blueBtn"
          @click="removeList"
        >
          删除
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="release"
        >
          发布考试
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:35px;"
      >
        <el-button
          class="blueBtn"
          @click="revocation"
        >
          撤销考试
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
          width="90"
          align="center"
        />
        <el-table-column
          prop="arrangeName"
          label="考试名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="paperSavename"
          label="试卷名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="paperConversion100"
          label="分值"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="paperTime"
          label="答题时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.paperTime !== null && scope.row.paperTime !== 0">{{ scope.row.paperTime }}分钟</span>
            <span v-if="scope.row.paperTime === null || scope.row.paperTime === 0 ">-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="考试时间"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.paperBegintime !== null ">
              {{ scope.row.paperBegintime |filterTime }}~{{ scope.row.paperEndtime| filterTime }}
            </span>
            <span v-if="scope.row.paperBegintime === null ">
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paperReleaseState"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.paperReleaseState != 0 ? '已发布' : '未发布' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="isSign"
          label="签到"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.isSign != 0 ? '需要' : '不需要' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | filterTime }}
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
    <!-- 新建弹窗 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1200"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="addId"
      />
      <add
        v-if="addModal"
        :type="type"
        :operaility-data="operailityData"
        :current-tree-data="currentTreeData"
        :set-table-data="setTableData"
        @cancel="cancel"
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
        :delete-url="api.removeList + operailityData.arrangeId"
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!--发布弹窗-->
    <Modal
      v-model="publishModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="publishId"
      />
      <operate
        v-if="publishModal"
        :type="'publish'"
        :methods="'put'"
        :operate-url="publishPath"
        :post-data="publishData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 撤销考试 -->
    <Modal
      v-model="revocationModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="revocationId"
      />
      <operate
        v-if="revocationModal"
        :type="'revocation'"
        :methods="'put'"
        :operate-url="revocationPath"
        :post-data="revocationData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import add from './kaoshishezhi_ add.vue'
import api from './api'
export default {
  components: {
    add
  },
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      api,
      upDateNumber: 1,
      addModal: false,
      addId: {
        id: 'addId',
        title: '组织考试'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      publishId: {
        id: 'publishId',
        title: '发布'
      },
      revocationId: {
        id: 'revocationId',
        title: '撤销发布'
      },
      publishData: {
        id: ''
      },
      revocationData: {
        id: ''
      },
      publishModal: false,
      revocationModal: false,
      publishPath: '',
      revocationPath: '',
      formInline: {
        searchValue: ''
      },
      operailityData: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      type: ''
    }
  },
  watch: {
    currentTreeData: {
      handler (newVal, oldVal) {
        if(newVal) {
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
          pageSize: 20,
          treeId: this.currentTreeData.id
        }
      }
      this.setTableData()
    },
    // 初始化加载列表数据
    setTableData () {
      let params = Object.assign({},
        this.queryQptions.params,
        this.formInline
      )
      this.ajax({
        ajaxSuccess: (res) => {
          this.tableData = res.data.list
          this.listTotal = res.data.total
        },
        ajaxParams: {
          url: '/paper/examPaperInfoArrange/listPage',
          method: 'get',
          params: params
        }
      })
    },
    // 发布考试
    release () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.arrangeId)
      })
      this.publishData = {
        id: ids.join(','),
        paperReleaseState: '1'
      }
      this.publishPath = api.release.path + ids.join(',')
      this.openModel('publish')
    },
    // 撤销考试
    revocation () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.arrangeId)
      })
      this.revocationData = {
        id: ids.join(','),
        paperReleaseState: '0'
      }
      this.revocationPath = api.release.path + ids.join(',')
      this.openModel('revocation')
    },
    // 删除节点
    removeList () {
      if (!this.isSelected()) { return }
      if (this.multipleSelection[0].paperReleaseState === '0') {
        this.operailityData = this.multipleSelection[0]
        this.openModel('remove')
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    openMoreSearch () {
      this.setTableData()
    },
    organization () {
      this.type = 'add'
      this.addId.title = '组织考试'
      this.openModel('add')
    },
    // 修改节点
    editTree () {
      if (!this.isSelected()) { return }
      if(this.multipleSelection[0].paperReleaseState === '0') {
        this.operailityData = this.multipleSelection[0]
        this.type = 'edit'
        this.addId.title = '修改设置'
        this.openModel('add')
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
      let deviceTable = this.$refs.nosocomialTable
      this.dynamicHt = this.$refs.content.parentNode.parentNode.offsetHeight -
          deviceTable.offsetTop - 60
    }
  }

}
</script>
