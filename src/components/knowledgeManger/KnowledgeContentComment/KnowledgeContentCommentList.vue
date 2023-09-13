<!----------------------------------
****--@name     系统练习
****--@role     ${*}
****--@date     2022/12/15
****--@author   lm
----------------------------------->
<template>
  <div ref="content">
    <el-row>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="remove">删除</el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin-left:15px;">
        <el-button class="blueBtn" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.commentName" placeholder="请输入关键性文字"/>
      </el-col>
    </el-row>
    <div id="nosocomialTable" ref="nosocomialTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6' }"
        :height="dynamicHt"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" prop="index" type="index" width="70" />
        <el-table-column prop="knowledgeConfigName" label="模块" width="180" />
        <el-table-column prop="noteContent" label="内容名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="viewContent(scope.row)">{{scope.row.knowledgeContentName}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="creatorName" label="发布人"  width="100"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"  width="160"></el-table-column>
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
      <Modal :mask-closable="false" close-on-click-modal="false" height="800" v-model="viewModal" title="对话框标题"  class-name="vertical-center-modal" :loading="loading"  :width="800">
        <modal-header slot="header" :content="viewId"></modal-header>
        <el-descriptions class="margin-top" :column="1">
          <el-descriptions-item label="课程名称">{{ showData.fromContent }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ showData.createTime }}</el-descriptions-item>
          <el-descriptions-item label="发布人">{{ showData.creatorName }}</el-descriptions-item>
          <el-descriptions-item label="笔记内容">
            <template>
              <div style="max-height: 400px;overflow:auto;">
                {{ showData.noteContent }}
              </div>
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <el-row>
          <el-col :span="10" :offset="14">
            <el-button class="but-col"  @click="cancel('view')" type="danger">关闭</el-button>
          </el-col>
        </el-row>
        <div slot="footer"></div>
      </Modal>
      <!-- 删除 -->
      <Modal v-model="removeModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="removeId"/>
        <remove v-if="removeModal" :delete-url="knowledgeApi.delContentComment.path+ idStr" :operaility-data="operailityData" @remove="subCallback" @cancel="cancel"/>
        <div slot="footer" />
      </Modal>
      <!--查看评论-->
      <Modal :mask-closable="false" close-on-click-modal="false" height="800" v-model="viewModal" title="对话框标题"  class-name="vertical-center-modal" :loading="loading"  :width="800">
        <modal-header slot="header" :content="viewId"></modal-header>
        <el-descriptions class="margin-top" :column="1">
          <el-descriptions-item label="模块"> {{showData.knowledgeConfigName}}</el-descriptions-item>
          <el-descriptions-item label="内容名称">{{showData.knowledgeContentName}}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{showData.createTime}}</el-descriptions-item>
          <el-descriptions-item label="发布人">{{showData.creatorName}}</el-descriptions-item>
          <el-descriptions-item label="评论内容">
            <template>
              <div style="max-height: 400px;overflow:auto;">
                {{showData.content}}
              </div>
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <el-row>
          <el-col :span="10" :offset="14">
            <el-button class="but-col"  @click="cancel('view')" type="danger">关闭</el-button>
          </el-col>
        </el-row>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import knowledgeApi from '../knowledgeApi'
let Util = null
export default {
  components: {
  },
  data () {
    return {
      loading:false,
      dynamicHt:300,
      idStr: '',
      knowledgeApi,
      formValidate:{},
      tableData: [],
      showData: {},
      listTotal:0,
      removeId:{id: 'removeId',title: '评论删除'},
      viewId:{id: 'viewId',title: '评论查看'},
      removeModal: false,
      viewModal:false,
      queryQptions:{},
      multipleSelection:[],
      formInline: {
        commentName: ''
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxParams: {
          url: knowledgeApi.queryContentCommentList.path,
          method: knowledgeApi.queryContentCommentList.method,
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
      this.listMessTitle.ajaxParams.params = Object.assign(
        this.listMessTitle.ajaxParams.params,
        this.queryQptions.params,
        this.formInline
      )
      let that = this
      let ajaxOptions = {
        ajaxSuccess: res => {
          that.tableData=res.data.list
          that.listTotal = res.data.total || 0
          that.myPages.listTotal= res.data.total
        },
        ajaxParams: {
          url: knowledgeApi.queryContentCommentList.path,
          method: knowledgeApi.queryContentCommentList.method,
          params: this.listMessTitle.ajaxParams.params
        }
      }
      this.ajax(ajaxOptions)
    },
    viewContent(row){
      this.targer= this.viewId.id
      this.openModel('view')
      this.showData= {}
      this.showData=row
    },
    // 删除节点
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
    },
    search () {
      this.setTableData()
    },
    // 表格数据列表
    updateListData (res) {
      let data = res.data
      let that = this
      that.tableData = that.addIndex(data.list)
      this.listTotal = data.total || 0
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
