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
        <el-button class="blueBtn" @click="create">新建</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="updataContentShow">修改</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="remove">删除</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="updataContentShowStatus(false)">停用</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="updataContentShowStatus(true)">启用</el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin-left:15px;">
        <el-button class="blueBtn" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.name" placeholder="请输入关键性文字"/>
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
        <el-table-column label="序号" fixed prop="index" type="index" width="70"/>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <img  v-bind:src="scope.row.icon" style="width: 38px;height: 38px" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="roleNames" label="查看人员身份名称"/>
        <el-table-column prop="hasSearch" label="是否有查询">
          <template slot-scope="scope">
             <span v-if="scope.row.hasSearch">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="isRecommend" label="是否推荐">
          <template slot-scope="scope">
            <span v-if="scope.row.isRecommend">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="hasAd" label="是否有广告位">
          <template slot-scope="scope">
            <span v-if="scope.row.hasAd">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="hasAd" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status">启用</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderBy" label="排序" width="70"></el-table-column>
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
      <Modal v-model="addModal" :mask-closable="false" close-on-click-modal="false" width="800" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="addId"/>
        <add v-if="addModal" :type="type" :operaility-data="operailityData" :set-table-data="setTableData" @cancel="cancel"/>
        <div slot="footer" />
      </Modal>
      <!-- 删除 -->
      <Modal v-model="removeModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="removeId"/>
        <remove v-if="removeModal" :delete-url="knowledgeApi.removeKnowledgeConfigShow.path+ idStr" :operaility-data="operailityData" @remove="subCallback" @cancel="cancel"/>
        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import knowledgeApi from '../knowledgeApi'
import add from './appConfig_add.vue'
let Util = null
export default {
  components: {
    add
  },
  data () {
    return {
      loading:false,
      dynamicHt:300,
      idStr: '',
      type: '',
      knowledgeApi,
      formValidate:{},
      tableData: [],
      showData: {},
      hasRecommend:false,//是否显示推荐
      listTotal:0,
      queryQptions:{},
      multipleSelection:[],
      addModal: false,
      addId: {
        id: 'addId',
        title: '新建用户'
      },
      removeId:{id: 'removeId',title: '删除'},
      removeModal:false,
      formInline: {
        name: ''
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxParams: {
          url: knowledgeApi.queryContentErrorList.path,
          method: knowledgeApi.queryContentErrorList.method,
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
      let that=this
      let ajaxOptions = {
        ajaxSuccess: res => {
          that.tableData=res.data.list
          that.listTotal = res.data.total || 0
          that.myPages.listTotal= res.data.total
        },
        ajaxParams: {
          url: knowledgeApi.queryKnowledgeConfigShowList.path,
          method:knowledgeApi.queryKnowledgeConfigShowList.method,
          params: this.listMessTitle.ajaxParams.params
        }
      }
      this.ajax(ajaxOptions)
    },
    // 删除节点
    remove () {
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      if (this.operailityData.status) {
        this.$message({
          message: '请停用后操作',
          type: 'warning'
        })
        return
      }
      this.openModel('remove')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.idStr = val.map(item => item.id).toString()
    },
    //修改
    updataContentShow(){
      if (!this.isSelected()) { return }
      this.operailityData = this.multipleSelection[0]
      if (this.operailityData.status) {
        this.$message({
          message: '请停用后操作',
          type: 'warning'
        })
        return
      }
      this.type = 'edit'
      this.addId.title = '修改'
      this.openModel('add')
    },
    //新建
    create(){
      this.type = 'add'
      this.addId.title = '新建'
      this.openModel('add')
    },
    // 启用/停用
    updataContentShowStatus(status){//停用或者启用
      if (!this.isSelected()) { return }
      let ajaxOptions = {
        ajaxSuccess: res => {
          if(res.code===0){
            this.$Message.success('配置信息更新成功')
            this.init()
          }
        },
        ajaxParams: {
          url: knowledgeApi.updataKnowledgeConfigShowStatus.path+this.idStr,
          method:knowledgeApi.updataKnowledgeConfigShowStatus.method,
          params:{status:status}
        }
      }
      this.ajax(ajaxOptions)
    },
    search () {
      this.setTableData()
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
