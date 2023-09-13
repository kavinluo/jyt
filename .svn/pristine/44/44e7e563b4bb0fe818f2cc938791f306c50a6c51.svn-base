<template>
  <div ref="content">
    <el-row>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          添加
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="edit"
        >
          修改
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
          v-model="formInline.placeName"
          placeholder="请输入考场"
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
          prop="roomVolume"
          label="考试容量"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="updateTime"
          label="添加时间"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.updateTime !== null">{{ scope.row.updateTime | filterTime }}</span>
            <span v-if="scope.row.updateTime === null">-</span>
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
      width="500"
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
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 删除弹窗 -->
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="500"
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
      <kaochangguanliImport
        v-if="toChannelModal"
        :dept-id="operailityData.id"
        :setTableData="setTableData"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import api from './api'
import add from './kaochangguanli_add.vue'
import kaochangguanliImport from './kaochangguanli_import.vue'
export default {
  components: {
    add,
    kaochangguanliImport
  },
  data () {
    return {
      api,
      upDateNumber: 1,
      addModal: false,
      addId: {
        id: 'addId',
        title: '添加'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      toChannelId: {
        id: 'toChannelId',
        title: '导入'
      },
      revocationModal: false,
      toChannelModal: false,
      formInline: {
        placeName: ''
      },
      operailityData: {},
      multipleSelection: [],
      listTotal: 0,
      tableData: [],
      dynamicHt: 300,
      idStr: '',
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
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
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
    // 添加
    add () {
      console.log('123')
      this.type = 'add'
      this.addId.title = '组织考试'
      this.openModel('add')
    },
    // 修改
    edit () {
      if (!this.isSelected()) { return }
      this.type = 'edit'
      this.operailityData = this.multipleSelection[0]
      this.addId.title = '修改设置'
      this.openModel('add')

    },
    // 删除
    remove () {
      this.openModel('remove')
    },
    // 导入
    importExcel () {
      this.toChannelModal = true
    },
    openMoreSearch () {
      this.setTableData()
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
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
      let parHt = content.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 60
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    }
  }

}
</script>
