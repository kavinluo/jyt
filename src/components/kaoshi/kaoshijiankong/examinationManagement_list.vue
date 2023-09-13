<template>
  <div ref="content">
    <el-row style="margin-bottom:20px">
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="organization"
        >
          控制台
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-right:15px;"
      >
        <el-button
          class="blueBtn"
          @click="derivedData"
        >
          导出数据加密包
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
          width="180"
          align="center"
        />
        <el-table-column
          prop="paperSavename"
          label="试卷名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="paperConversion100"
          label="分值"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="paperTime"
          label="答题时间"
          width="180"
          align="center"
        />
        <el-table-column
          prop="date"
          label="考试时间"
          width="190"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.paperBegintime !== null ">
              {{ scope.row.paperBegintime| filterTime }}~{{ scope.row.paperEndtime| filterTime }}
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
            <span v-if="scope.row.isSign != 0"><el-link type="primary" @click="signIn(scope.row)">需要</el-link></span>
            <span v-else>不需要</span>
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
    <Modal
      v-model="showModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <control
        v-if="showModal"
        :type="type"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import control from './kaoshijiankong_control.vue'
import api from './api'
import axios from 'axios'
export default {
  components: {
    control
  },
  props: ['currentTreeData', 'tkType'],
  data () {
    return {
      api,
      showModal: false,
      showId: {
        id: 'showId',
        title: '控制台'
      },
      formInline: {
        searchValue: ''
      },
      operailityData: {},
      multipleSelection: [],
      deptId: '',
      deptName: '',
      leaf: '',
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
    // 导出数据加密包
    derivedData () {
      if (!this.isSelected()) { return }
      axios.get('api' + api.encryptMark.path, {
        params: {
          arrangeId: this.multipleSelection[0].arrangeId
        }, // 传参
        responseType: 'blob', // 告诉服务器想到的响应格式
        headers: { 'Content-Type': 'application/octet-stream;', 'Token': this.$util.getCookie('Token')}
      }).then(res => {
        if (res.data.type === 'application/octet-stream') {
          const fileName = res.headers['content-disposition'].split(';')
          const filename2 = fileName[1].split('=')
          const filename3 = decodeURIComponent(filename2[1])
          let blob = new Blob([res.data], { type: res.data.type }) // 设置下载的内容以及格式
          const url = window.URL.createObjectURL(blob) // 设置路径
          const link = window.document.createElement('a') // 创建a标签
          link.href = url
          link.download = filename3 // 设置文件名
          link.style.display = 'none'
          link.click()
          URL.revokeObjectURL(url) // 释放内存
        }else {
          this.$message.error('不可导出非水平测试试题成绩')
        }
      })
    },
    openMoreSearch () {
      this.setTableData()
    },
    // 控制台
    organization () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.type = 'show'
      this.showId.title = '控制台'
      this.openModel('show')
    },
    signIn (row) {
      let routeUrl = this.$router.resolve({
        path: '/signincode',
        query: row
      })
      window.open(routeUrl.href, '_blank')
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
