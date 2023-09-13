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
          @click="remove"
        >
          删除
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:100px;float:left;"
      >
        <el-button
          class="blueBtn"
          @click="importUser"
        >
          导入人员
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin:9px 55px 0 15px;">
        <el-button class="blueBtn" @click="activeReturn">
          返回活动列表
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin:9px 0 0 15px;">
        <el-button class="blueBtn" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.searchValue" placeholder="请输入关键性文字" />
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
          prop="userName"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="vipSatus"
          label="用户身份"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.vipSatus === '0'">非会员</span>
            <span v-if="scope.row.vipSatus === '1'">会员</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="hasCertification"
          label="实名"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.hasCertification === '0'">未实名</span>
            <span v-if="scope.row.hasCertification === '1'">已实名</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenantName"
          label="机构"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="报名时间"
          align="center"
          :show-overflow-tooltip="true"
        >
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
    <!-- 新建栏目 -->
    <Modal v-model="addModal" :mask-closable="false" close-on-click-modal="false" width="600" title="对话框标题" class-name="vertical-center-modal">
      <modal-header slot="header" :content="addId" />
      <add v-if="addModal" :type="type" :operaility-data="operailityData" @cancel="cancel" :setTableData="setTableData"/>
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
      <removePost
        v-if="removeModal"
        :operaility-data="operailityData"
        :delete-url="'/cms/activityInfo/deleteUser/' + multipleSelection[0].id"
        :method-type="'post'"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
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
      <signUpImport
          v-if="toChannelModal"
          :row-obj="rowObj"
          :set-table-data="setTableData"
          @successImport="subCallback"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import add from './signUp_add.vue'
import signUpImport from './signUp_important'
import api from './api'
import removePost from '@/components/common/removePost.vue'
export default {
  props: ['rowObj'],
  components: {add, removePost, signUpImport},
  data () {
    return {
      api,
      type: '',
      addModal: false,
      addId: {
        id: 'addId',
        title: '新增'
      },
      revocationModal: false,
      removeModal: false,
      toChannelModal: false,
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      toChannelId: {
        id: 'toChannelId',
        title: '导入人员'
      },
      revocationPath: '',
      dynamicHt: 300,
      listTotal: 0,
      tableData: [],
      formInline: {
        searchValue: ''
      },
      operailityData: {},
      multipleSelection: []
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
          activityId: this.rowObj.id
        }
      }
      this.setTableData()
    },
    // 添加活动
    add () {
      this.addId.title = '新增'
      this.type = 'add'
      this.openModel('add')
    },
    // 编辑活动
    edit () {
      if (!this.isSelected()) { return }
      this.addId.title = '编辑'
      this.type = 'edit'
      this.openModel('add')
    },
    // 删除活动
    remove () {
      if (!this.isSelected()) { return }
      this.openModel('remove')
    },
    // 导入人员
    importUser () {
      this.toChannelModal = true
    },
    // 返回活动列表
    activeReturn () {
      this.$emit('setStep', 'entrance')
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
          url: api.listPages.path,
          method: api.listPages.method,
          params: params
        }
      })
    },
    openMoreSearch () {
      console.log('查询')
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
