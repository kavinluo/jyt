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
        <el-button class="blueBtn" @click="create">新增</el-button>
      </el-col>
      <el-col align="left" style="width:70px;float:left;margin-left:15px;">
        <el-button class="blueBtn" @click="remove">删除</el-button>
      </el-col>
      <el-col align="right" style="width:70px;float:right;margin-left:15px;">
        <el-button class="blueBtn" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="3" style="float:right;">
        <el-input v-model="formInline.knowledgeConfigName" placeholder="请输入关键性文字"/>
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
        <el-table-column label="序号" fixed prop="index" type="index" width="70" />
        <el-table-column prop="knowledgeConfigName" label="类别"></el-table-column>
        <el-table-column prop="knowledgeFunctions" label="名称"></el-table-column>
        <el-table-column prop="isVip" label="是否需要会员">
          <template slot-scope="scope">
            {{ scope.row.isVip?'是':'否' }}
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
      <Modal :mask-closable="false" close-on-click-modal="false"     height="200"   v-model="createConfigModal"   title="对话框标题"  class-name="vertical-center-modal" :loading="loading" :width="800">
        <modal-header slot="header" :content="createConfigId"></modal-header>
        <el-form ref="form" :model="form" label-width="140px"  style="margin: 14px;width: 100%">
          <el-form-item label="类别">
            <el-select v-model="form.knowledgeConfigId" placeholder="请选择编码"  style="width: 420px;" @change="getLabel">
              <el-option  v-for="item in configList"  :key="item.id"  :label="item.name"  :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.knowledgeFunctions" style="width: 420px;"></el-input>
          </el-form-item>
          <el-form-item label="是否需要会员">
            <el-select v-model="form.isVip" placeholder="请选择是否需要会员"  style="width: 420px;">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="24">
            <el-button class="but-col" @click="submitConfigVip" type="primary" style="float: right;margin: 10px;">确定</el-button>
            <el-button class="but-col"  @click="cancel('createConfig')" type="danger" style="float: right;margin: 10px;">取消</el-button>
          </el-col>
        </el-row>
        <div slot="footer"></div>
      </Modal>
      <!-- 删除 -->
      <Modal v-model="removeModal" :mask-closable="false" close-on-click-modal="false" width="500" title="对话框标题" class-name="vertical-center-modal">
        <modal-header slot="header" :content="removeId"/>
        <remove v-if="removeModal" :delete-url="knowledgeApi.delKnowledgeConfigVip.path+ idStr" :operaility-data="operailityData" @remove="subCallback" @cancel="cancel"/>
        <div slot="footer" />
      </Modal>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import knowledgeApi from '../knowledgeApi'
import config from '../../../config/config'
let Util = null
export default {
  components: {
  },
  data () {
    return {
      loading:false,
      dynamicHt:300,
      icon:null,
      form:{},
      createConfigModal:false,
      querymodal:false,
      formValidate:{},
      tableData: [],
      queryQptions:{},
      upData:{bsModule:'knowledge'},
      headers: {'Token': this.$util.getCookie('Token')},
      configList:[], //配置项选择列表
      knowledgeConfigId:'', //配置项已选择值
      knowledgeConfigName:'',//配置项已选择名称
      idStr: '',
      actionUrl:config.urlPrefix +knowledgeApi.knowledgeFileUpload.path,
      knowledgeApi,
      showData: {},
      listTotal:0,
      createConfigId:{
        id:'createConfig',
        title:'新建'
      },
      removeId:{id: 'removeId',title: '删除'},
      removeModal: false,
      multipleSelection:[],
      formInline: {
        knowledgeConfigName: ''
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxParams: {
          url: knowledgeApi.knowledgeConfigVipList.path,
          method: knowledgeApi.knowledgeConfigVipList.method,
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
      this.queryConfigList()
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
          url: knowledgeApi.knowledgeConfigVipList.path,
          method:knowledgeApi.knowledgeConfigVipList.method,
          params: this.listMessTitle.ajaxParams.params
        }
      }
      this.ajax(ajaxOptions)
    },
    //提交事件
    submitConfigVip(){
      const id=this.form.id
      let url=knowledgeApi.addKnowledgeConfigVip.path+id
      let method=knowledgeApi.addKnowledgeConfigVip.method
      if(id===undefined||id===0){
        url=knowledgeApi.addKnowledgeConfigVip.path
        method=knowledgeApi.addKnowledgeConfigVip.method
      }
      this.form.knowledgeConfigId=this.knowledgeConfigId
      this.form.knowledgeConfigName=this.knowledgeConfigName
      let ajaxOptions = {
        ajaxSuccess: res => {
          if(res.code===0){
            this.$Message.success('会员设置更新成功')
            this.form={}
            this.createConfigModal=false
            this.init()
          }
        },
        ajaxParams: {
          url: url,
          method:method,
          data:this.form
        }
      }
      this.ajax(ajaxOptions)
    },
    //查询知识库配置列
    queryConfigList(){
      let ajaxOptions = {
        ajaxSuccess: res => {
          this.configList = res.data
        },
        ajaxParams: {
          url: '/knowledge/knowledgeConfig/list'
        }
      }
      this.ajax(ajaxOptions)
    },
    //新建
    create(){
      this.createConfigModal = true
    },
    getLabel(value) {
      let configId=''
      let configName=''
      this.configList.find(item => {
        if((item.id).toString() === value.toString()){
          configId = item.id
          configName = item.name
        }
      })
      this.knowledgeConfigId = configId
      this.knowledgeConfigName = configName
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
