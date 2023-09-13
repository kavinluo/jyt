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
          @click="remove"
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
          发布
        </el-button>
      </el-col>
      <el-col
        align="left"
        style="width:70px;float:left;margin-left:15px;"
      >
        <el-button
          class="blueBtn"
          @click="revocation"
        >
          撤销发布
        </el-button>
      </el-col>
      <el-col
        align="right"
        style="width:70px;float:right;margin:9px 0 0 15px;"
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
          v-model="formInline.contentTitle"
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
          label="权值"
          align="center"
          prop="contentSort"
        />
        <el-table-column
          label="置顶"
          align="center"
          prop="top"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.top === false">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contentType"
          label="分类标识"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.contentType === 'BASE'">仅标题</span>
            <span v-if="scope.row.contentType === 'IMAGE1'">标题配一图</span>
            <span v-if="scope.row.contentType === 'IMAGE3'">标题配三图</span>
            <span v-if="scope.row.contentType === 'VIDEO_LANDSCAPE'">标题配横视频</span>
            <span v-if="scope.row.contentType === 'VIDEO_PORTRAIT'">标题配竖视频</span>
            <span v-if="scope.row.contentType === 'WEITU'">微途文章</span>
            <span v-if="scope.row.contentType === 'WEITU_IMAGE'">微途图片</span>
            <span v-if="scope.row.contentType === 'WEITU_VIDEO'">微途视频</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contentTitle"
          label="标题"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary">{{ scope.row.contentTitle }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="作者"
          align="center"
        />
        <el-table-column
          prop="contentOutLink"
          label="超链接"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="remarkNum"
          label="评论"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="comment">{{ scope.row.remarkNum }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="likesNum"
          label="点赞"
          align="center"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="giveLike(scope.row)">{{ scope.row.likesNum }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="contentDatetime"
          label="发布时间"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.contentDatetime !== null ">
              {{ scope.row.contentDatetime| filterTime }}
            </span>
            <span v-if="scope.row.contentDatetime === null ">
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contentDisplay"
          label="发布状态"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.contentDisplay === '1'">已发布</span>
            <span v-if="scope.row.contentDisplay === '0'">未发布</span>
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
        :operaility-datas="operailityDatas"
        :operaility-data="operailityData"
        :multiple-selection="multipleSelection"
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
        :operaility-data="operailityDatas"
        :delete-url="'/cms/cmsContent/remove/' + operailityDatas.id"
        @remove="subCallback"
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
        :operaility-data="publishData"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 撤销发布 -->
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
        :operaility-data="revocationData"
        @operate="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 点赞 -->
    <Modal
      v-model="giveModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="700"
      height="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="giveId"
      />
      <giveLike
        v-if="giveModal"
        :type="type"
        :operaility-datas="operailityDatas"
        :operaility-data="operailityData"
        :multiple-selection="multipleSelection"
        :set-table-data="setTableData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
    <!-- 评论 -->
    <Modal
      v-model="commentModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="1200"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="commentId"
      />
      <comment
        v-if="commentModal"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
let Util = null
import add from './zixunfabu_add.vue'
import giveLike from './zixunfabu_giveLike.vue'
import comment from './zixunfabu_comment.vue'
import api from './api'
export default {
  components: {add, giveLike, comment},
  props: ['operailityData'],
  data () {
    return {
      type: '',
      api,
      addModal: false,
      addId: {
        id: 'addId',
        title: '新增咨询'
      },
      removeModal: false,
      removeId: {
        id: 'removeId',
        title: '删除'
      },
      revocationModal: false,
      revocationId: {
        id: 'revocationId',
        title: '撤销发布'
      },
      publishModal: false,
      publishId: { id: 'publishId', title: '发布' },
      giveModal: false,
      giveId: {id: 'giveId', title: '点赞'},
      commentModal: false,
      commentId: {id: 'commentId', title: '内容查看'},
      formInline: {
        contentTitle: ''
      },
      dynamicHt: 700,
      tableData: [],
      multipleSelection: [],
      operailityDatas: {},
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
          pageSize: Util.pageInitPrams.pageSize,
          categoryId: '1329257213283344385',
          myDisplay: 0
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
      this.tableData = this.addIndex(data.list)
      this.listTotal = data.total || 0
    },
    openMoreSearch () {
      this.setTableData()
    },
    // 添加
    add () {
      this.type = 'add'
      this.addId.title = '新增'
      this.operailityDatas = this.multipleSelection[0]
      this.openModel('add')
    },
    // 编辑
    edit () {
      if (!this.isSelected()) { return }
      this.operailityDatas = this.multipleSelection[0]
      if (this.operailityDatas.contentDisplay === '0') {
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
    pass () {
      let opt = {
        ajaxSuccess: res => {},
        ajaxParams: {
          url: '/cms/cmsContent/audit/' + this.multipleSelection[0].id,
          method: 'put',
          jsonString: true,
          data: {
            auditReason: '',
            flag: 1
          }
        }
      }
      this.ajax(opt)
    },
    // 发布
    release () {
      if (!this.isSelected()) { return }
      this.type = 'publish'
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.publishData = {
        id: ids
      }
      this.publishPath = api.releaseList.path
      this.openModel('publish')
    },
    // 撤销发布
    revocation  () {
      if (!this.isSelected()) { return }
      let ids = []
      this.multipleSelection.map((item) => {
        ids.push(item.id)
      })
      this.revocationData = {
        id: ids
      }
      this.revocationPath = api.unReleaseList.path
      this.openModel('revocation')
    },
    // 删除
    remove () {
      if (!this.isSelected()) { return }
      this.operailityDatas = this.multipleSelection[0]
      if (this.operailityDatas.contentDisplay === '0') {
        this.openModel('remove')
      }else {
        this.$message({
          message: '请撤销发布后操作',
          type: 'warning'
        })
      }
    },
    // 点赞
    giveLike (row) {
      this.operailityDatas = row
      this.openModel('give')
    },
    comment () {
      this.openModel('comment')
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
