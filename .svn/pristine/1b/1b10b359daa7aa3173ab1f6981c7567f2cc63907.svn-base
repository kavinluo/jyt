<template>
  <div id="content" ref="content">
    <el-row style="margin-bottom:20px">
      <el-col align="left" style="width:70px;float:left;margin-right:15px;">
        <el-button class="blueBtn" @click="generate">
          生成授权码
        </el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:30px;">
        <el-button class="blueBtn" @click="derive">
          导出授权码
        </el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:40px;">
        <el-button class="blueBtn" @click="remove">
          删除授权码
        </el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;">
        <el-button class="blueBtn" @click="openMoreSearch">
          查询
        </el-button>
      </el-col>
      <el-col align="right" style="width:200px;float:right;margin-right:10px;">
        <el-input v-model="formInline.useUserName" placeholder="请输入考生姓名"></el-input>
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" border :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="index" label="序号" />
        <el-table-column prop="authReExamCode" label="继续考试授权码" />
        <el-table-column prop="useUserName" label="使用考生姓名" />
        <el-table-column prop="useTime" label="使用时间">
          <template slot-scope="scope">
            <span v-if="scope.row.useTime !== null">{{ scope.row.useTime| filterTime }}</span>
            <span v-if="scope.row.useTime === null">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="useArrangeName" label="使用试卷名称" />
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span v-if="scope.row.createTime !== null">{{ scope.row.createTime| filterTime }}</span>
            <span v-if="scope.row.createTime === null">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" />
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
      width="500"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="addId"
      />
      <generate
        v-if="addModal"
        @cancel="cancel"
        :set-table-data="setTableData"
      />
      <div slot="footer" />
    </Modal>
    <!-- :operaility-data="operailityData"
        :set-table-data="setTableData"
        :type="type"
        :current-tree-data="currentTreeData" -->
    <!--导出弹窗-->
    <Modal :mask-closable="false" height="200" v-model="exportModal"
           class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="exportId"></modal-header>
      <ajaxDerive v-if="exportModal" type='excel' fileName='授权码' :url="api.exportCode.path" :params="params"
                  messTitle="确定要导出到excel吗？"
                  @cancel='exportModal = false'></ajaxDerive>
      <div slot="footer"></div>
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
        :operaility-data="operailityDatas"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import api from '../api'
import generate from './generate.vue'
import ajaxDerive from '@/components/common/ajax-derive.vue'
export default {
  props: ['operailityData'],
  components: {generate, ajaxDerive},
  data () {
    return {
      api,
      tableData: [],
      addModal: false,
      exportModal: false,
      removeModal: false,
      listTotal: 0,
      dynamicHt: 600,
      idStr: '',
      formInline: {
        useUserName: ''
      },
      params: {
        arrangeId: this.operailityData.arrangeId
      },
      operailityDatas: {},
      removeId: {id: 'removeId', title: '删除'},
      addId: {id: 'addId', title: '生成授权码'},
      exportId: {
        id: 'exportId',
        title: '导出'
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: api.codeListPage.path,
          method: api.codeListPage.method,
          params: {}
        }
      }
    }
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页设置
      // this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      // let Event = Util.events
      // Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize,
          arrangeId: this.operailityData.arrangeId
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
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    generate () {
      this.openModel('add')

    },
    openMoreSearch () {
      this.setTableData()
    },
    derive () {
      this.exportModal = true
    },
    remove () {
      this.openModel('remove')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
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
    // 设置表格及分页的位置
    // setTableDynHeight (n) {
    // // 操作dom
    //   let content = this.$refs.content
    //   let parHt = content.parentNode.parentNode.offsetHeight
    //   let nosocomialTable = this.$refs.nosocomialTable
    //   let paginationHt = 60
    //   this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    // }
  }

}
</script>
