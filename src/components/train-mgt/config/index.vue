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
          新增
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
          编辑
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="enable"
        >
          启用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="forbidden"
        >
          禁用
        </el-button>
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
          label="栏目名称"
          align="center"
          prop="configColumn"
        >
          <template slot-scope="scope">
            {{scope.row.configColumn | dict('configColumn')}}
          </template>
        </el-table-column>
        <el-table-column
          label="配置类型"
          align="center"
          prop="configValue"
        >
          <template slot-scope="scope">
            {{scope.row.configValue | dict('configValue')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          prop="status"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'ENABLE'">启用</span>
            <span v-if="scope.row.status === 'UNABLE'">禁用</span>
          </template>
        </el-table-column>
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
    <!-- 新建栏目 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="700"
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
        :set-table-datas="setTableData"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
     <!-- 启用 禁用 -->
    <Modal
      v-model="enableModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="enableId"
      />
      <operate
        v-if="enableModal"
        :type="'enable'"
        :methods="'put'"
        :operate-url="enablePath"
        :post-data="enableData"
        :json-string="true"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <Modal
      v-model="disEnableModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="disEnableId"
      />
      <operate
        v-if="disEnableModal"
        :type="'disEnable'"
        :methods="'put'"
        :operate-url="disEnablePath"
        :post-data="disEnablehData"
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
import add from './configAdd.vue'
import api from './api'
export default {
  components: {
    add
  },
  data () {
    return {
      api,
      type: '',
      addModal: false,
      enableModal: false,
      disEnableModal: false,
      addId: {
        id: 'addId',
        title: '新增'
      },
      enableId: {
        id: 'enableId',
        title: '启用'
      },
      disEnableId: {
        id: 'disEnableId',
        title: '禁用'
      },
      enablePath: '',
      enableData: {
        id: ''
      },
      disEnablehData: {
        id: ''
      },
      disEnablePath: '',
      dynamicHt: 700,
      tableData: [],
      multipleSelection: [],
      operailityData: {},
      listTotal: 0,
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
        this.queryQptions.params
      )
      this.ajax(this.listMessTitle)
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      this.tableData = this.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    add () {
      this.type = 'add'
      this.addId.title = '新增'
      this.openModel('add')
    },
    edit () {
      if (!this.isSelected()) { return }
      this.type = 'edit'
      this.addId.title = '修改'
      this.operailityData = this.multipleSelection[0]
      this.openModel('add')

    },
    enable () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.enableData = {
        id: ids.join(','),
        status: 'ENABLE'
      }
      this.enablePath = api.modifyConfig.path + ids.join(',')
      this.openModel('enable')
    },
    forbidden () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.disEnablehData = {
        id: ids.join(','),
        status: 'UNABLE'
      }
      this.disEnablePath = api.modifyConfig.path + ids.join(',')
      this.openModel('disEnable')
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
