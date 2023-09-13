<!----------------------------------
****--@name     机构题库
****--@role     ${*}
****--@date     2023/1/10
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:5px;"
      >
        <el-button
          class="blueBtn"
          @click="add"
        >
          新建
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:5px;"
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
        style="width:70px;float:left;margin-left:5px;"
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
        style="width:70px;float:left;margin-left:5px;"
      >
        <el-button
          class="blueBtn"
          @click="disable"
        >
          禁用
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:5px;"
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
        style="width:70px;float:left;margin-left:5px;"
      >
        <el-button
          class="blueBtn"
          @click="authority"
        >
          设置机构权限
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
          搜索
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
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6'}" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="90" align="center" />
        <el-table-column prop="name" label="机构名称"  align="center" />
        <el-table-column prop="contactMobile" label="注册手机号"  align="center" />
        <el-table-column prop="contactName" label="联系人" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status != 0 ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime |filterTime }}</span>
            <!-- | formatDate('yyyy-MM-dd HH:mm:ss') -->
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
    <!-- 新建机构 -->
    <Modal v-model="addModal" :mask-closable="false" close-on-click-modal="false" width="900" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="addId" />
      <add v-if="addModal" :operaility-data="operailityData" :type="type" @cancel="cancel" :set-table-data="setTableData"/>
      <div slot="footer" />
    </Modal>
    <!-- 机构权限 -->
    <Modal v-model="authModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="autId" />
      <authority v-if="authModal" :operaility-data="operailityData"  @cancel="cancel" :set-table-data="setTableData"/>
      <div slot="footer" />
    </Modal>
    <!-- 删除机构 -->
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
        :delete-url="api.remove + operailityData.id"
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
/* 当前组件必要引入 */
import api from './api'
import add from './jigouguanli_add.vue'
import authority from './authority.vue'
export default {
  components: {
    add,
    authority
  },
  data () {
    return {
      api,
      formInline: {
        searchValue: ''
      },
      operailityData: {},
      multipleSelection: [],
      tableData: [],
      listTotal: 0,
      dynamicHt: 300,
      addModel: false,
      removeModal: false,
      authModal: false,
      addId: {id: 'addId', title: '新建'},
      autId: {id: 'autId', title: '机构权限'},
      removeId: {id: 'removeId', title: '删除'},
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.listPage.path,
          method: 'get',
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
    // 初始化请求列表数据
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
      this.listMessTitle.ajaxParams.params = Object.assign(this.listMessTitle.ajaxParams.params, this.queryQptions.params, this.formInline)
      this.ajax(this.listMessTitle)
    },
    add () {
      this.type = 'add'
      this.addId.title = '新建'
      this.openModel('add')
    },
    edit () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.type = 'edit'
      this.addId.title = '修改'
      this.openModel('add')
    },
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    disable () {
      console.log('禁用')
    },
    enable () {
    },
    authority () {
      console.log('权限')
      this.openModel('auth')
    },
    openMoreSearch () {
      this.setTableData()
    },
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = []
      this.listTotal = data.total || 0
      that.tableData = that.addIndex(data.list)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isSelected () {
      let len = this.multipleSelection.length
      console.log(this.multipleSelection, 'len')
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
<style scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
