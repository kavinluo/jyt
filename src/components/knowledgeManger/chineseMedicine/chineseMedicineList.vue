<template>
  <div class="modal" v-loading="loading" element-loading-text="正在为您拼命处理中"   element-loading-spinner="el-icon-loading"  element-loading-background="rgba(0, 0, 0, 0.8)">
    <layout-tree>
      <leftTree :id="-1" slot="left" type="TREE" ref="leftTree"  style="margin-top: 3px;min-height:900px;" :up-date-number="upDateNumber" :tree-options="treeDefaults" :is-page="true" @tree-click="treeClick"/>
      <div slot="right" id="content" ref="content">
        <el-form :inline="true" class="el-form-item-search"  ref="formValidate" onsubmit="return false">
          <el-row>
            <el-col :span="16">
              <el-form-item>
                <el-button type="primary"   class="blueBtn" @click="createContent" size="small">新建</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="single"  @click="updateContent" size="small">修改</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" :disabled="multiple" @click="remove" size="small">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-upload :on-success="handleUploadSuccess" :on-progress="handleUploadprogress" :headers="headers" ref="upload" :multiple="false" accept=".xlsx" :data="data" :show-file-list="false" :action="actionUrl">
                  <el-button size="small"    class="blueBtn" type="primary">导入</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"   class="blueBtn" :disabled="multiple" @click="dowFile" size="small">导出</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="multiple"  class="blueBtn" @click="moveOpenModal" size="small">移动</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="openUpdateList"  class="blueBtn"  size="small">批量修改</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8" align="right">
              <el-form-item>
                <el-input v-model="formValidate.keywordName" placeholder="请输入关键性文字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="blueBtn" @click="handleSubmit('formValidate')">查询</el-button>
                <el-button type="primary" class="blueBtn" @click="init">刷新</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div id="nosocomialTable" ref="nosocomialTable">
          <el-table slot-align="center" :height="dynamicHt" :context="self" :data="tableDataList" tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange"
            @row-dblclick="viewContent">
            <span v-for="(item,index) in subAttrVOList" >
              <el-table-column v-if="index==0" label="序号" fixed prop="index" type="index" width="50"></el-table-column>
              <el-table-column v-if="index==0" type="selection" fixed width="55"></el-table-column>
              <!--<el-table-column  key="index"  :label="item.attrName" :prop="item.code" align="center" show-overflow-tooltip></el-table-column>-->
              <el-table-column  key="index"  :label="item.attrName" :prop="item.code" align="center" show-overflow-tooltip></el-table-column>
            </span>
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
      </div>
    </layout-tree>
    <!--删除弹窗-->
    <Modal
      :mask-closable="false"
      close-on-click-modal="false"
      height="200"
      v-model="removeModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="500">
      <modal-header slot="header" :content="removeId"></modal-header>
      <div class="remove">确定要删除吗？</div>
      <el-row >
        <el-col :span="10" :offset="14">
          <el-button class="but-col" @click="removeConfirm" type="primary">确定</el-button>
          <el-button class="but-col"  @click="cancel('remove')" type="danger">取消</el-button>
        </el-col>
      </el-row >
      <div slot="footer"></div>
    </Modal>
    <!--新建知识库弹窗-->
    <Modal
      :mask-closable="false"
      close-on-click-modal="false"
      height="200"
      v-model="createContentModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="900">
      <modal-header slot="header" :content="createContentId"></modal-header>
      <contentKnowledgeAdd  ref="ContentKnowledgeAdd" :contentType="contentType" @addsuccess="addSuccess"></contentKnowledgeAdd>
      <el-row>
        <el-col :span="10" :offset="14">
          <el-button class="but-col" @click="submitContent" type="primary">确定</el-button>
          <el-button class="but-col"  @click="cancel('createContent')" type="danger">取消</el-button>
        </el-col>
      </el-row >
      <div slot="footer"></div>
    </Modal>
    <!--更新知识库弹窗-->
    <Modal
      :mask-closable="false"
      close-on-click-modal="false"
      height="200"
      v-model="updateContentModal"
      title="对话框标题"
      class-name="vertical-center-modal"
      :loading="loading"
      :width="900">
      <modal-header slot="header" :content="updateContentId"></modal-header>
      <updataKnowledgeUpdate  ref="updataKnowledgeUpdate" :type="this.currentTreeData.type" @addsuccess="addSuccess"></updataKnowledgeUpdate>
      <el-row>
        <el-col :span="10" :offset="14">
          <el-button v-if="editType===1"   class="but-col" @click="submitUpdateContent" type="primary">确定</el-button>
          <el-button v-if="editType===1"   class="but-col"  @click="cancel('updateContent')" type="danger">取消</el-button>
          <el-button v-if="editType===0"   class="but-col"  @click="cancel('updateContent')" type="primary">关闭</el-button>
        </el-col>
      </el-row>
      <div slot="footer"></div>
    </Modal>
    <!--移动知识节点-->
    <Modal :mask-closable="false" close-on-click-modal="false"  ref="moveContentModal" :width="500" v-model="moveContentModal">
      <modal-header slot="header" :content="moveContentId"></modal-header>
      <!-- <Tree :data="dataTree"  select-node  @on-select-change="treeMoveClick"></Tree> -->
      <Tree :data="dataTree" :props="defaultProps" :show-checkbox="true" :check-strictly="true" node-key="id" ref="tree"
         select-node @on-check-change="onCheckChange"  @on-select-change="treeMoveClick"
      ></Tree>
      <!-- <el-tree :data="dataTree" :props="defaultProps" :show-checkbox="true" node-key="id" @check="currentChange"
      :check-strictly="true"></el-tree> -->
      <el-row>
        <el-col :span="10" :offset="14">
          <el-button class="but-col" @click="moveContentSub" type="primary">确定</el-button>
          <el-button class="but-col"  @click="cancel('moveContent')" type="danger">取消</el-button>
        </el-col>
      </el-row>
      <div slot="footer"></div>
    </Modal>
    <!--批量修改弹出框 -->
    <Modal :mask-closable="false" close-on-click-modal="false"     height="200"   v-model="updateListModal"   title="对话框标题"  class-name="vertical-center-modal" :loading="loading" :width="500">
      <modal-header slot="header" :content="updateListId"></modal-header>
      <el-form ref="form"  label-width="140px"  style="margin: 14px;width: 100%">
        <el-row>
          <el-col :span="24">
            <div style="margin-bottom: 10px;font-size: 14px;color: #8492a6;">导出批量修改的内容</div>
            <el-button type="primary"   class="blueBtn"  @click="dowFile" size="small">导出</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="24">
            <div style="margin-bottom: 10px;font-size: 14px;color: #8492a6;">导入批量修改的内容</div>
            <el-upload :on-success="handleUploadSuccess" :headers="headers" ref="upload" :multiple="false" accept=".xlsx" :data="data" :show-file-list="false" :action="actionUpUrl">
              <el-button size="small" class="blueBtn" type="primary">导入</el-button>
            </el-upload>
            <div style="margin-bottom: 10px;font-size: 14px;color: #8492a6;">本次已导入记录数: {{updataNum}}条</div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24">
          <el-button class="but-col"  type="danger" @click="updateListModal=false" style="float: right;margin: 10px;">关闭</el-button>
        </el-col>
      </el-row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
/* eslint-disable */
import config from '../../../config/config'
import dowFIle from '../dowFIle'
let Util = null
/* 当前组件必要引入*/
import leftTree from './left'
import contentKnowledgeAdd from './contentKnowledgeAdd.vue'
import updataKnowledgeUpdate from './conotentKnowledgeUpdate.vue'
import knowledgeApi from '../knowledgeApi'
import $axios from 'axios';

export default {
  name: 'ChineseMedicineList',
  components: {leftTree,contentKnowledgeAdd,updataKnowledgeUpdate},
  data () {
    return {
      $axios,
      dowFIle,
      dataTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      contentType:'',
      moveContentModal:false,
      headMap: {},
      tableData: [],
      bookType: '.xlsx',
      updataNum:0,
      filename: '数据文件',
      listLoading: true,
      downloadLoading: false,
      headers:{ 'Token': this.$util.getCookie('Token')},
      actionUrl:config.urlPrefix + knowledgeApi.knowledgeExcelFileUpload.path,//导入
      data:{ knowledgeConfigId:"", treeId:""},
      actionUpUrl:config.urlPrefix + knowledgeApi.knowledgeExcelFileUploadToUpdate.path,
      knowledgeApi,
      subAttrVOList:[],
      formInline:{},
      self: this,
      queryId:{
        id:'query',
        title:'高级查询'
      },
      createContentId:{
        id:'createContent',
        title:'创建知识库'
      },
      removeId: {
        id: 'remove',
        title: '删除'
      },
      updateContentId:{
        id: 'updateContent',
        title: '更新知识库'
      },
      moveContentId:{
        id: 'moveContent',
        title: '知识库移动'
      },
      updateListId:{
        id: 'updateList',
        title: '批量修改'
      },
      path:'',//获取当前的路由
      // 选中数组
      ids: [],
      // 非多个禁用
      multiple: true,
      // 非单个禁用
      single: true,
      formValidate: {keywordName:''},
      loading: false,
      createContentModal :false,
      updateContentModal:false,
      removemodal: false,
      updateListModal:false,
      tableDataList: [],
      dynamicHt: 300,
      upDateNumber: 1,
      listTotal: 0,
      // 0 不可编辑,1 可编辑
      editType:1,
      // tree默认项设置
      treeDefaults: {
        getTreeUrl: '/tkmanage/examTree/tree',
        getDataUrl: '',
        isShowSearch: false,
        isShowMenus: true,
        defaultProps: {
          label: 'name',
          children: 'children'
        }
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'knowledgeContentListSuccess',
        ajaxParams: {
          url: knowledgeApi.getknowledgeContentList.path,
          method: knowledgeApi.getknowledgeContentList.method,
          params: {}
        }
      },
      queryQptions:{},
      currentTreeData: {}, // 当前点击的数节点数据
      currentMoveTreeData: {}, //可以移动节点数据
      treeObjId:'',
    }
  },
  created () {
    this.init();
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
    openUpdateList(){
       this.updateListModal=true;
       this.updataNum=0;
    },
    moveContentSub(){
      if(this.currentMoveTreeData.treeId==null||this.currentMoveTreeData.treeId==""||this.currentMoveTreeData.treeId==undefined){
        this.$message.error('请选择需要移至的节点');
        return false;
      }
      if(this.ids===null||this.ids.length==0){
        this.$message.error('请选择要移动的数据');
        return false;
      }
      let ajaxOptions = {
        ajaxSuccess: 'moveContentSuccess',
        ajaxParams: {
          url: '/knowledge/knowledgeContent/move',
          method:'put',
          data:  this.currentMoveTreeData,
          jsonString: true
        }
      }
      this.ajax(ajaxOptions)
    },
    moveContentSuccess(res){
      if(res.code!=0){
        this.$message.error('数据移动失败，请您重试')
      }else {
        this.$message.success("数据移动成功");
        this.currentMoveTreeData.treeId="";
        this.currentMoveTreeData.tknowledgeConfigId="";
        this.currentMoveTreeData.name="";
        // this.init ();
        this.setTableData();
        this.moveContentModal=false;
      }
    },
    onCheckChange(objs, node){
         if(node.checked) {
            //获取当前所选节点的数据数组
             let checkdata=this.$refs.tree.getCheckedNodes()
             if(checkdata.length >0) {
             for(let i=0;i<checkdata.length;i++) {
                 // setChecked方法见上面的表格，此id是el-tree属性中node-key指定的id
                 checkdata[i].checked=false;
              }
             }
             node.checked = true
         }
           this.currentMoveTreeData.ids=(this.ids).toString();
           this.currentMoveTreeData.treeId=node.id;
           this.currentMoveTreeData.tknowledgeConfigId=node.knowledgeConfigId;
           this.currentMoveTreeData.name=node.title;
    },
    treeMoveClick(objs, node){
    //获取当前所选节点的数据数组
     let checkdata=this.$refs.tree.getCheckedNodes()
     if(checkdata.length >0) {
     for(let i=0;i<checkdata.length;i++) {
         // setChecked方法见上面的表格，此id是el-tree属性中node-key指定的id
         checkdata[i].checked=false;
      }
     }
     node.checked =true
      this.currentMoveTreeData.ids=(this.ids).toString();
      this.currentMoveTreeData.treeId=node.id;
      this.currentMoveTreeData.tknowledgeConfigId=node.knowledgeConfigId;
      this.currentMoveTreeData.name=node.title;
    },
    moveOpenModal(){
      let ajaxOptions = {
        ajaxSuccess: 'getTreeMoveData',
        ajaxParams: {
          url: '/knowledge/knowledgeTree/getTreeMoveData',
          params: {type:this.currentTreeData.type}
        }
      }
      this.ajax(ajaxOptions)
        // 清空移动框的选择数据
         let checkdata=this.$refs.tree.getCheckedNodes()
         if(checkdata.length >0) {
         for(let i=0;i<checkdata.length;i++) {
             // setChecked方法见上面的表格，此id是el-tree属性中node-key指定的id
             checkdata[i].checked=false;
          }
         }
      this.moveContentModal=true;
    },
    getTreeMoveData(res){
          this.dataTree=res.data;
    },
    // 初始化请求列表数据
    init () {
      Util = this.$util;
      this.myPages = Util.pageInitPrams
      this.formValidate={};
      this.listMessTitle.ajaxParams.params.keywordName="";
      this.queryQptions = {
        params: {
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      //this.setTableData ();
    },
    //正在上传文件时钩子
    handleUploadprogress(event, file, fileList){
       this.loading=true;
    },
   //上传文件成功后的钩子
    handleUploadSuccess(response, file, fileList) {
      this.loading=false;
      this.$refs.upload.clearFiles() //上传成功之后清除历史记录
      if (response.code !== 0) {
        this.$message.error('上传出错：' + response.msg)
        return false;
      }else{
        if(response.data===0){
          this.$message.warning("没有数据保存到数据库中，请检查数据或数据格式是否有误");
        }else{
          this.$message.success("数据上传成功,总共上传了"+response.data+"条数据");
          this.updataNum=response.data;
          this.setTableData ();
        }
      }
    },
    //打开知识库新建界面
    createContent(){
         this.createContentId.title="";
        //获取模板
         this.createContentModal=true;
         this.createContentId.title="新建知识库："+this.currentTreeData.name;
         this.$refs.ContentKnowledgeAdd.initData(this.currentTreeData);
    },
    //更新知识库信息
    updateContent(){
      const data=this.multipleSelection[0];
      this.targer=this.updateContentId.id;
      this.updateContentModal=true;
      this.currentTreeData.data=data;
      this.updateContentId.title="";
      this.updateContentId.title="更新知识库："+this.currentTreeData.name;
      this.editType = 1;
      this.$refs.updataKnowledgeUpdate.initData(this.currentTreeData,this.editType);
    },
    //显示知识库
    viewContent(row){
      const data=row;
      this.targer=this.updateContentId.id;
      this.updateContentModal=true;
      this.currentTreeData.data=data;
      this.updateContentId.title="";
      this.updateContentId.title="查看知识库："+this.currentTreeData.name;
      this.editType = 0;
      this.$refs.updataKnowledgeUpdate.initData(this.currentTreeData,this.editType);
    },
    //提交新增知识库
    submitContent(){
      this.createContentModal=false;
      this.$refs.ContentKnowledgeAdd.submitData();
    },
    //提交修改知识库
    submitUpdateContent(){
      this.$refs.updataKnowledgeUpdate.submitData();
    },
    handleSubmit(name){
      this.listMessTitle.ajaxParams.params.keywordName=this.formValidate.keywordName;
      this.setTableData ();
    },
    //删除知识库内容
    remove () {
      this.targer=this.removeId.id;
      this.operailityData = this.multipleSelection[0]
      this.openModel('remove')
      this.removemodal = true
    },
    //确认知识库内容删除
    removeConfirm () {
      let ids = this.ids;
      let opt = {
        ajaxSuccess: 'deleteSuccess',
        ajaxParams: {
          url: this.knowledgeApi.delknowledgeContent.path+ids,
          method: this.knowledgeApi.delknowledgeContent.method,
          jsonString: true
        }
      }
      this.ajax(opt);  //保存数据
    },
    // 获取知识库列表
    setTableData () {
      Util = this.$util
      this.listMessTitle.ajaxParams.params.type="KNOWLEDGE";
      this.listMessTitle.ajaxParams.params.path=this.path;
      this.listMessTitle.ajaxParams.params.businessType="KNOWLEDGE_CONFIG_CONTENT";
      this.listMessTitle.ajaxParams.params.treeId= this.currentTreeData.id;
      this.listMessTitle.ajaxParams.params.knowledgeConfigId=this.currentTreeData.knowledgeConfigId;
      this.listMessTitle.ajaxParams.params = Object.assign(
          this.listMessTitle.ajaxParams.params,
          this.queryQptions.params,
      )
      this.ajax(this.listMessTitle);
      this.treeObjId=this.listMessTitle.ajaxParams.params.treeId;
    },
    addIndex (data) {
      let arr = []
      for(let i = 0, length = data.length;i < length;i++) {
        data[i].index = (this.queryQptions.params.curPage - 1) * this.queryQptions.params.pageSize + i + 1
        arr.push(data[i])
      }
      return arr
    },
    knowledgeContentListSuccess(res){
      this.tableDataList=[];
      this.tableData=[];
      this.subAttrVOList=[];
      this.headMap={};
      let data=res.data.dataList;
      this.subAttrVOList=res.data.subAttrVOList;
      let that = this
      this.tableDataList = that.addIndex(data)
      this.listTotal = res.data.total || 0;
      this.myPages.listTotal=res.data.total || 0;
      this.headMap=res.data.headMap;
      this.tableData=res.data.tableData;
      this.$forceUpdate();
    },
    //添加完成函数回调
    addSuccess(){
      this.createContentModal=false;
      this.updateContentModal=false;
      this.setTableData();
    },
    //删除回调函数
    deleteSuccess(){
      this.setTableData();
      this.removeModal = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.contentId);
      this.multipleSelection = selection;
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    treeClick (obj, node, self) {
      this.currentTreeData = obj;
      if(this.currentTreeData.id!=this.treeObjId){
        setTimeout(this.setTableData,200);
        this.data.treeId= this.currentTreeData.id;
        this.data.knowledgeConfigId= this.currentTreeData.knowledgeConfigId;
        this.data.treeName=this.currentTreeData.name;
        this.filename=this.currentTreeData.name+"文件"
        this.contentType=this.currentTreeData.type;
        this.$forceUpdate();
      }else{
        console.log("刚刚查询了："+this.treeObjId)
      }

    },
    // 设置表格及分页的位置
    setTableDynHeight (n) {
      let content = this.$refs.content
      let parHt = content.parentNode.parentNode.parentNode.parentNode.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 140
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    },
    dowFile(){
        const  fileName=this.currentTreeData.name+"_内容.xlsx";
        const configId = this.currentTreeData.knowledgeConfigId;
        const treeId= this.currentTreeData.id;
        let ids = this.ids;
        const opitons ={"fileType":"application/msexcel;text/html;charset=UTF-8","fileName":fileName};
        dowFIle.getFile(config.urlPrefix +knowledgeApi.dowContentExcelFile.path+"/"+configId+"/"+treeId+"?ids="+ids.toString(),opitons);
    },
    cancel(targer){
      this[targer + 'Modal'] = false;
    
    }
  }
}
</script>
