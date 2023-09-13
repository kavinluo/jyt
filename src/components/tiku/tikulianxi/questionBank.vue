
<!----------------------------------
****--@name     系统练习
****--@role     ${*}
****--@date     2022/12/15
****--@author   lm
----------------------------------->
<template>
  <div
    ref="content"
    slot="right"
  >
    <el-form
      ref="dengmiQueryForm"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
      :model="formInline"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="知识点：">
            <el-input
              v-model="formInline.tmKnowledge"
              style="width:200px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="难度：">
            <el-select
              v-model="formInline.tmDifficulty"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span>
            题库筛选：请点左侧菜单
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="题目类型：">
            <el-select
              v-model="formInline.tmType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教学要求：">
            <el-select
              v-model="formInline.tmRequire"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          align="right"
          style="width:70px;float:right;margin:-25px 20px 0 0;"
        >
          <el-button
            class="blueBtn"
            @click="openMoreSearch"
          >
            查询
          </el-button>
        </el-col>
        <el-col
          align="right"
          style="width:70px;float:right;margin:10px -25px 0 0;"
        >
          <el-button
            class="blueBtn"
            @click="synchronization"
          >
            同步app节点
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div
      id="nosocomialTable"
      ref="nosocomialTable"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6' }"
        :height="dynamicHt"
      >
        <el-table-column
          width="50"
          prop="radio"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="radio"
              :label="scope.row.id"
              style="color: #fff;"
              @change.native="getCurrentGateway(scope.row)"
            >
                &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="90"
          align="center"
        />
        <el-table-column
          prop="tmType"
          label="题型"
          width="180"
          align="center"
        />
        <el-table-column
          prop="tmContentDescription"
          label="题型内容"
          width="450"
          align="center"
        />
        <el-table-column
          prop="tmMark"
          label="分值"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="setofQuestions"
          label="作答次数"
          width="180"
          align="center"
        />
        <el-table-column
          prop="date"
          label="作答用户"
          width="180"
          align="center"
        />
        <el-table-column
          prop="accuracy"
          label="正确率"
          align="center"
        />
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
      close-on-click-modal="false"
      width="800"
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
        @cancel="cancel"
        @add="subCallback"
      />
      <div slot="footer" />
    </Modal>
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
        :delete-url="api.removeTree + multipleSelection.id"
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
import add from './tikulianxi_add.vue'
export default {
  components: {
    add
  },
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      api,
      upDateNumber: 1,
      listTotal: 0,
      dynamicHt: 300,
      addModal: false,
      addId: {
        id: 'addId',
        title: '新建'
      },
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      formInline: {
        tmKnowledge: '',
        tmDifficulty: '',
        tmType: '',
        tmRequire: ''
      },
      operailityData: '',
      multipleSelection: [],
      treeData: [],
      tableData: [],
      radio: '',
      optionsType: [],
      options1: [
        {
          value: '1',
          label: '掌握'
        },
        {
          value: '2',
          label: '熟悉'
        },
        {
          value: '3',
          label: '了解'
        },
        {
          value: '4',
          label: '超纲'
        }
      ],
      options2: [
        {
          value: '1',
          label: '0.1'
        },
        {
          value: '2',
          label: '0.2'
        },
        {
          value: '3',
          label: '0.3'
        },
        {
          value: '4',
          label: '0.4'
        },
        {
          value: '5',
          label: '0.5'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
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
  watch: {
    currentTreeData: {
      handler (newVal, oldVal) {
        if(newVal) {
          this.init()
          this.tableData = []
        }
      },
      deep: true, // 深度监听
      immediate: true // 初始化监听
    }
  },
  created () {
    // this.setTableData()
    // this.init()
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
      this.topicType()
    },
    topicType () {
      let opt = {
        ajaxSuccess: res => {
          console.log(res, '12312321')
          this.optionsType = res.data.list.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
        },
        ajaxParams: {
          url: api.getlistPage.path,
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    isSelected () {
      let len = this.multipleSelection.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据')
        flag = false
      }
      return flag
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
      // console.log(res.data.list === null, 'resresres')
      // console.log(res.data, 'resresres')
      let data = res.data
      let that = this
      if (res.data.list === null) {
        that.tableData = []
      }else {
        that.tableData = that.addIndex(data.list)
      }
      this.listTotal = data.total || 0
    },
    getCurrentGateway (row) {
      console.log(row)
    },
    // 查询
    openMoreSearch () {
      this.setTableData()
    },
    // 同步app节点
    synchronization () {
      this.ajax({
        ajaxSuccess: (res) => {
          if (res.code === 0) {
            this.$message({ message: '同步成功', type: 'success'})
          }
        },
        ajaxParams: {
          url: api.statistic.path,
          method: 'post'
        }
      })
    },
    // 添加节点
    addTree () {
      this.type = 'add'
      this.addId.title = '添加节点'
      this.openModel('add')
    },
    // 修改节点
    editTree () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection
      this.type = 'edit'
      this.addId.title = '修改节点'
      this.openModel('add')
    },
    // 删除节点
    removeTree () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection
      this.openModel('remove')
      console.log(this.operailityData, '删除节点id')
    },
    // 节点数据
    handleNodeClick (data) {
      this.multipleSelection = data
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

