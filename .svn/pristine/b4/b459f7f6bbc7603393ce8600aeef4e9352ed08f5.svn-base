<!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/15
****--@author   yyl
----------------------------------->
<template>
  <div ref="content">
    <el-form :inline="true" class="el-form-item-search" onsubmit="return false">
      <el-row>
        <el-col :span="18">
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_SELF_TK'" class="blueBtn" @click="addTopic">新建题目</el-button>
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_SELF_TK'" class="blueBtn" @click="editTopic">修改题目</el-button>
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_SELF_TK'" class="blueBtn" @click="deleteTopic">删除题目</el-button>
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_SELF_TK'" class="blueBtn" @click="impoTopic">导入题目</el-button>
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_SELF_TK'" class="blueBtn" @click="derive">导出题目</el-button>
          <el-button class="blueBtn" @click="search">查询数据</el-button>
          <el-button class="blueBtn" @click="search">题目分布分析</el-button>
          <el-button v-if="tkType === 'TK' || tkType === 'ORG_TK'" class="blueBtn" @click="synchronization">同步试题</el-button>
        </el-col>
        <el-col :span="6" align="right">
          <el-form-item>
            <el-input v-model="seacrchObj.name" placeholder="请输入关键性文字"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="blueBtn" @click="search">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div ref="nosocomialTable">
      <el-table :data="tableData" style="width: 100%" :height="dynamicHt" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="tmType" label="类型" align="center">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @dblclick="cellClick(scope.row)">{{ scope.row.tmType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tmRequire" label="认知层次" align="center"/>
        <el-table-column prop="tmKnowledge" label="知识点" align="center"/>
        <el-table-column prop="tmMark" label="学分" align="center"/>
        <el-table-column prop="tmDifficulty" label="难度" align="center"/>
        <el-table-column prop="tmUseNum" label="使用次数" align="center"/>
        <el-table-column prop="tmContentDescription" label="题目内容" align="center"/>
        <el-table-column prop="isVideo" label="是否包含音频" align="center">
          <template slot-scope="scope">
            {{scope.row.isVideo === 1 ? '是' : '否'}}
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
    <Modal
      v-model="addModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1100"
    >
      <modal-header
        slot="header"
        :content="addId"
      />
      <template>
        <new-topic
          v-if="addModal"
          :current-tree-data="currentTreeData"
          :type="type"
          :tkType="tkType"
          :rowData="rowData"
          @cancel="cancel"
          @add="subCallback"
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
        :operaility-data="operailityData"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <Modal :mask-closable="false" height="200" v-model="deriveModal" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="deriveId"></modal-header>
      <ajaxDerive v-if="deriveModal" type='derive' fileName='导出' :url="deriveUrl"
      messTitle="确定要导出题目吗？" @derive="subCallback"
                  @cancel='deriveModal = false'></ajaxDerive>
      <div slot="footer"></div>
    </Modal>
    <!--导出弹窗-->
    <!-- <Modal :mask-closable="false" v-model="deriveModal" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="deriveId"></modal-header>
      <derive v-if="deriveModal" type="derive" :url="deriveUrl" messTitle="确定要导出题目吗？" @derive="subCallback"
              @cancel="cancel"></derive>
      <div slot="footer"></div>
    </Modal> -->
    <!-- 导入题目 -->
    <Modal
      v-model="fileModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="600"
    >
      <modal-header
        slot="header"
        :content="fileId"
      />
      <template>
        <uploadFile
          v-if="fileModal"
          :current-tree-data="currentTreeData"
          :set-table-data="setTableData"
          @cancel="cancel"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 在线同步试题 -->
    <Modal
      v-model="syncModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="600"
    >
      <modal-header
        slot="header"
        :content="syncId"
      />
      <template>
        <sync
          v-if="syncModal"
          :current-tree-data="currentTreeData"
          :set-table-data="setTableData"
          @cancel="cancel"
        />
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import newTopic from './newTopic'
import uploadFile from './importTopic.vue'
import sync from './synchronization.vue'
import ajaxDerive from '@/components/common/ajax-derive.vue'

// 当前组件引入全局的util
let Util = null
export default {
  components: {newTopic, uploadFile, sync, ajaxDerive},
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      type: '',
      seacrchObj: {
        name: ''
      },
      deriveModal: false,
      deriveId: {id: 'deriveId', title: '导出'},
      fileModal: false,
      fileId: {id: 'fileId', title: '导入'},
      syncModal: false,
      syncId: {id: 'syncId', title: '同步试题'},
      deriveUrl: '/tkmanage/examTmDetail/exportTmDetail',
      tableData: [],
      addModal: false,
      addId: {id: 'addId', title: '新建题目'},
      multipleSelection: [],
      removeModal: false,
      removeId: {id: 'removeModal', title: '删除'},
      deleteUrl: '/tkmanage/examTmDetail/remove/',
      operailityData: [],
      listTotal: 0,
      dynamicHt: 700,
      rowData: {}, // 修改题目基础信息  id
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'updateListData',
        ajaxParams: {
          url: '/tkmanage/examTmDetail/listPage',
          method: 'get',
          params: {}
        }
      }
    }
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
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      this.ajax(this.listMessTitle)
      // this.ajax({
      //   ajaxSuccess: (res) => {
      //     console.log(res)
      //     this.tableData = res.data.list
      //   },
      //   ajaxParams: {
      //     url: '/tkmanage/examTmDetail/listPage',
      //     method: 'get',
      //     // jsonString: true,
      //     params: {
      //       pageNo: 1,
      //       pageSize: 9999,
      //       treeId: this.currentTreeData.id
      //     }
      //   }
      // })
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
      console.log(res)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    cellClick (row) {
      this.type = 'edit'
      this.addId.title = '修改题目'
      this.rowData = row
      this.addModal = true
    },
    search () {
      this.setTableData()
    },
    // 新建题组
    addTopic () {
      this.rowData = {}
      this.addId.title = '新建题目'
      this.type = 'add'
      this.addModal = true
    },
    // 修改题目
    editTopic () {
      if(!this.isSelected(true)) {return}
      this.type = 'edit'
      this.addId.title = '修改题目'
      this.rowData = this.multipleSelection[0]
      this.addModal = true
    },
    // 删除题目
    deleteTopic () {
      if(!this.isSelected()) {return}
      this.operailityData = this.multipleSelection
      this.removeModal = true
    },
    isSelected (isOnly) {
      let len = this.multipleSelection.length
      let flag = true
      if(len === 0) {
        this.showMess('请选择数据!')
        flag = false
      }
      if(len > 1 && isOnly) {
        this.showMess('只能选择一条数据!')
        flag = false
      }
      return flag
    },
    derive () {
      this.deriveModal = true
    },
    // 导入题目
    impoTopic () {
      this.openModel('file')

    },
    // 在线同步试题
    synchronization () {
      this.openModel('sync')
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
  },
  watch: {
    currentTreeData: {
      handler (newVal, oldVal) {
        if(newVal) {
          this.tableData = []
          this.init()
        }
      },
      deep: true, // 深度监听
      immediate: true // 初始化监听
    }
  },
  created () {
    Util = this.$util
    // this.init()
  }
}
</script>
