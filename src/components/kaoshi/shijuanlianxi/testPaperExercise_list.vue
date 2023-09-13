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
          组织练习
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
          发布练习
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
          label="练习名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="paperInfo.name"
          label="考试类别"
          width="150"
          align="center"
        />
        <el-table-column
          prop="paperSavename"
          label="试卷名称"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="paperConversion100"
          label="分值"
          width="180"
          align="center"
        />
        <el-table-column
          prop="paperReleaseState"
          label="状态"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.paperReleaseState != 0 ? '已发布' : '未发布' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime| filterTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="样题"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >
              练习统计
            </el-button>
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
    <!-- 添加、修改弹窗-->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1000"
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
        :set-table-data="setTableData"
        :current-tree-data="currentTreeData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 删除弹窗-->
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
    <!-- 数据统计弹窗-->
    <Modal
      v-model="showModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1000"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <statistics
        v-if="showModal"
        :type="type"
        :operaility-data="operailityData"
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
import add from './shijuanlianxi_add.vue'
import statistics from './shijuanlianxi_statistics.vue'
import api from './api'
export default {
  components: {
    add,
    statistics
  },
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      api,
      addModal: false,
      addId: {
        id: 'addId',
        title: '组织练习'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      showModal: false,
      showId: { id: 'showId', title: '练习统计' },
      revocationId: {id: 'revocationId', title: '撤销发布'},
      revocationModal: false,
      revocationPath: '',
      revocationData: {
        ids: ''
      },
      publishPath: '',
      publishData: {
        ids: ''
      },
      publishModal: false,
      publishId: { id: 'publishId', title: '发布' },
      formInline: {
        searchValue: ''
      },
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        isShowMenus: true,
        tempData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      },
      operailityData: {},
      multipleSelection: [],
      deptId: '',
      deptName: '',
      leaf: '',
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      type: '',
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: api.listPage.method,
          params: {}
        }
      }
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
      // 初始表格高度及分页设置
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
          treeId: this.currentTreeData.id,
          paperType: 1
        }
      }
      this.setTableData()
    },
    // 节点数据列表
    treeListData (res) {
      let data = res.data
      this.treeDefaults.tempData = data
    },
    // 初始化加载列表数据
    setTableData () {
      let params = Object.assign({},
        this.queryQptions.params,
        this.formInline)
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
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total
    },
    openMoreSearch () {
      this.setTableData()
    },
    // 发布
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
      this.publishPath = api.releaseList.path + ids.join(',')
      this.openModel('publish')
    },
    revocation () {
      if (!this.isSelected()) { return }
      this.revocationId.title = '撤销考试'
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.arrangeId)
      })
      this.revocationData = {
        id: ids.join(','),
        paperReleaseState: '0'
      }
      this.revocationPath = api.releaseList.path + ids.join(',')
      this.openModel('revocation')
    },
    // 练习统计
    handleEdit () {
      this.type = 'show'
      this.operailityData = this.multipleSelection[0]
      this.addId.title = '练习统计'
      this.openModel('show')
    },
    // 组织练习
    add () {
      this.type = 'add'
      this.addId.title = '组织练习'
      this.openModel('add')
    },
    // 修改节点
    editTree () {
      if (!this.isSelected()) { return }
      if (this.multipleSelection[0].paperReleaseState === '0') {
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
    getCurrentGateway (row) {
      this.operailityData = row
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
