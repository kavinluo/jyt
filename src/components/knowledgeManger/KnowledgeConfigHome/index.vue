<!--知识库_配置_首页维护 列表-->
<template>
  <div id="content" ref="content" class="modal">
    <el-form :inline="true" class="el-form-item-search" :model="formValidate"  ref="formValidate" onsubmit="return false">
      <el-row>
        <el-col :span="16">
          <el-form-item>
            <el-button  class="but-col"  @click="add"  type="primary" size="small">添加</el-button>
            <el-button type="primary" :disabled="multiple" @click="updataStatus(false)" size="small">停用</el-button>
            <el-button type="danger" :disabled="multiple" @click="updataStatus(true)" size="small">启用</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8" align="right">
          <el-form-item>
            <el-input v-model="formValidate.keywordName" placeholder="请输入关键性文字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="blueBtn" @click="handleSubmit('formValidate')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div   id="nosocomialTable" ref="nosocomialTable">
       <el-table
        align="center"
        :height="dynamicHt"
        :context="self"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column label="序号" fixed prop="index" type="index" width="70">
           <template slot-scope="scope">
             {{scope.$index+1}}
           </template>
         </el-table-column>
      <el-table-column
          label="操作"
          align="center"
          width="140">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="text"  @click="edit(scope.$index, scope.row)">修改</el-button>
          <el-button icon="el-icon-delete" type="text"   @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          align="center"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="code"
          label="编码"
          align="center"
          width="100"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="imgPath"
          label="图片地址"
          align="center"
          width="250"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="imgUrl"
          label="图片链接"
          align="center"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="orderBy"
          label="排序"
          width="110"
          show-overflow-tooltip>
      </el-table-column>
      <!--0：停用 1：启用-->
      <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="110"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div style="margin: 10px;">
      <div style="float: right;">
        <el-pagination
            @size-change="changePageSize"
            @current-change="changePage"
            :current-page="myPages.currentPage"
            :page-sizes="myPages.pageSizes"
            :page-size="myPages.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="myPages.listTotal">
        </el-pagination>
      </div>
      <!--修改弹窗-->
      <Modal
          height="200"
          :mask-closable="false"
          v-model="editmodal"
          title="对话框标题"
          class-name="vertical-center-modal"
          :loading="true"
          :width="1000">
        <!--<div slot="header"> -->
        <!--</div>-->
        <modal-header slot="header" :content="editId"></modal-header>
        <el-form :model="formValidate1"  ref="formValidate" :rules="rules"   class="demo-form-inline"  label-width="100px" >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="名称" prop="name">
                <el-input v-model="formValidate1.name"></el-input>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="编码" prop="code">
                <el-input v-model="formValidate1.code"></el-input>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="上传图片" prop="imgPath">
                <el-upload
                    :on-preview="handlePictureCardPreview"
                    :headers="headers"
                    class="avatar-uploader"
                    :data="upData"
                    :action="actionUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="formValidate1.imgPath" :src="formValidate1.imgPath" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="图片链接" prop="imgUrl">
                <el-input   v-model="formValidate1.imgUrl"></el-input>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="排序" prop="orderBy">
                <el-input-number v-model="formValidate1.orderBy"></el-input-number>
              </el-form-item>
            </el-col >
          </el-row >
          <el-row >
            <el-col :span="20" :offset="2">
              <el-form-item label="状态" prop="status">
                <el-select v-model="formValidate1.status" placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col >
          </el-row >
        </el-form>
        <el-row >
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="confirmSub" >提交</el-button>
            <el-button   @click="cancel('edit')">取消</el-button>
          </el-col>
        </el-row >
        <div slot="footer"></div>
      </Modal>
      <!--删除弹窗-->
      <Modal
          close-on-click-modal="false"
          height="200"
          v-model="removemodal"
          title="对话框标题"
          class-name="vertical-center-modal"
          :loading="loading"
          :width="500">
        <modal-header slot="header" :content="removeId"></modal-header>
        <div class="remove">确定要删除吗？</div>
        <el-row >
          <el-col :span="10" :offset="14">
            <el-button  class="but-col" @click="removeConfirm" type="primary">确定</el-button>
            <el-button class="but-col"  @click="cancel('remove')" type="danger">取消</el-button>
          </el-col>
        </el-row >
        <div slot="footer"></div>
      </Modal>
      <!---->
    </div>
  </div>
</template>
<script >
import knowledgeApi from '../knowledgeApi'
import config from "../../../config/config";
/* eslint-disable */
let Util = null
export default{
  data() {
    return {
      knowledgeApi,
      ids:[],//数据选择记录
      dialogVisible:false,
      dialogImageUrl:'',
      headers: {'Token': this.$util.getCookie('Token')},
      upData: {bsModule: 'banner'},
      actionUrl:config.urlPrefix +"/passport/infra/file/upload",
      // 非多个禁用
      multiple: true,
      // 非单个禁用
      single: true,
      formValidate: {
        name:'',
        code:'',
        imgPath:'',
        imgUrl:'',
        orderBy:'0',
        createTimeBegin:'',
        createTimeEnd:'',
        updateTimeBegin:'',
        updateTimeEnd:'',
        creator:'',
        updater:'',
        deleted:'',
        status:''
      },
      formValidate1: {
        name:'',
        code:'',
        imgPath:'',
        imgUrl:'',
        orderBy:'',
        createTimeBegin:'',
        createTimeEnd:'',
        updateTimeBegin:'',
        updateTimeEnd:'',
        creator:'',
        updater:'',
        deleted:'',
        status:null
      },
      options: [{
        value: false,
        label: '停用'
      }, {
        value: true,
        label: '启用'
      }],
      starTimes:'',
      endTimes:'',
      pickerOptions0: {
        //选择开始时间后设置结束日期的限制
        disabledDate:(time)=> {
          if(this.endTimes!="") {
            return time.getTime() >= this.endTimes;
          }
        }
      },
      pickerOptions1: {
        //选择结束时间后设置开始日期的限制
        disabledDate:(time)=> {
          if(this.starTimes!="") {
            return time.getTime() <= this.starTimes;
          }
        }
      },
      value1:'',
      value2:'',
      showData:'',
      addmodal: false,
      editmodal: false,
      showmodal: false,
      removemodal: false,
      editId:{
        id:'edit',
        title:'数据更新'
      },
      removeId:{
        id:'remove',
        title:'数据删除'
      },
      multipleSelection: [],
      dynamicHt: 120,
      self: this,
      tableData1: [
        {
          name:'',
          code:'',
          imgPath:'',
          imgUrl:'',
          orderBy:'',
          createTime:'',
          updateTime:'',
          creator:'',
          updater:'',
          deleted:'',
          status:''
        }
      ],
      loading:false,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxParams: {
          url: "/knowledge/knowledgeConfigHome/listPage",
          method: "get",
          params: {}
        }
      },
      rules:{},
    }
  },
  methods: {
    init(){
      Util = this.$util;
      //ajax请求参数设置
      this.listUrl = "/knowledge/knowledgeConfigHome/listPage";
      this.myPages =  Util.pageInitPrams;
      this.queryQptions = {
        url:this.listUrl,
        params:{curPage: 1,pageSize: this.myPages.pageSize}
      }
      this.myPages.listTotal = this.myPages.listTotal;
      this.setTableData();
    },
    //时间
    deformatterDate(d){
      return new Date(d).getTime()-1000*60*60*24;
    },
    handleStartTime(d){
      this.starTimes = this.deformatterDate(d);
    },
    handleEndTime(d){
      this.endTimes = this.deformatterDate(d);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.multipleSelection =selection;
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    setTableData(){
      this.listMessTitle.ajaxParams.params = Object.assign(
          this.listMessTitle.ajaxParams.params,
          this.queryQptions.params,
      )
      let that=this;
      let ajaxOptions = {
        ajaxSuccess: res => {
          that.tableData1=res.data.list;
          that.listTotal = res.data.total || 0
          that.myPages.listTotal= res.data.total;
        },
        ajaxParams: {
          url:this.listUrl,
          method: 'get',
          params: this.listMessTitle.ajaxParams.params
        }
      }
      this.ajax(ajaxOptions)
    },
    changePageSize (n){
      this.queryQptions.params.pageSize = n;
      this.setTableData();
    },
    addIndex(data){
      let arr = []
      for(let i=0,length=data.length;i<length;i++){
        data[i].index = (this.queryQptions.params.curPage-1)*this.queryQptions.params.pageSize+i+1;
        arr.push(data[i])
      }
      return arr
    },
    changePage (n) {
      // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
      this.queryQptions.params.curPage = n;
      this.setTableData();
    },
    handleSubmit(name){
      //查询
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    edit(index){
      this.formValidate1 = this.tableData1[index];
      this.editmodal = true;
    },
    add(){
      this.formValidate1={};
      this.editmodal = true;
    },
    handleEdit(data){
      console.log(data)
    },
    show(index){
      this.showData =this.tableData1[index].id
      this.showmodal = true;
    },
    handleShow(data){
      this.showmodal = false
    },
    remove(row){
      this.ids.push(row.id);
      this.removemodal = true;
    },
    removeConfirm(){
      let ajaxOptions = {
        ajaxSuccess: res => {
          if(res.code===0){
            this.$Message.success("配置信息删除成功");
            this.init();
          }
        },
        ajaxParams: {
          url: "/knowledge/knowledgeConfigHome/remove/"+this.ids.toString(),
          method:"delete",
        }
      }
      this.ajax(ajaxOptions)
      this.removemodal = false;
    },
    cancel(targer){
      this[targer+'modal'] = false;
    },
    showHidden(status){
      this.loading = !!status
    },
    confirmSub(){
      const  id=this.formValidate1.id;
      let  url="/knowledge/knowledgeConfigHome/modify/"+id; //默认更新
      let method="post";
      if(id===undefined||id===0){
        url="/knowledge/knowledgeConfigHome/add";
      }
      let ajaxOptions = {
        ajaxSuccess: res => {
          if(res.code===0){
            this.$Message.success("Banner信息更新成功");
            this.formValidate1={};
            this.init();
            this.editmodal=false;
          }
        },
        ajaxParams: {
          url: url,
          method:method,
          data:this.formValidate1,
          contentType:'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
      this.ajax(ajaxOptions);
    },
    // 设置表格及分页的位置
    setTableDynHeight (n) {
      let content = this.$refs.content
      let parHt = content.parentNode.parentNode.parentNode.offsetHeight
      let nosocomialTable = this.$refs.nosocomialTable
      let paginationHt = 60
      this.dynamicHt = parHt - nosocomialTable.offsetTop - paginationHt
    },
    //文件上传成功
    handleAvatarSuccess(res, file) {
      this.formValidate1.imgPath=res.data.url;
      this.icon= URL.createObjectURL(file.raw);
      this.$forceUpdate();
    },
    //文件上传的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' ;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleRemove(file) {
      console.log(file);
    },
    updataStatus(status){//停用或者启用
      let ajaxOptions = {
        ajaxSuccess: res => {
          if(res.code===0){
            this.$Message.success("配置信息更新成功");
            this.init();
          }
        },
        ajaxParams: {
          url: "/knowledge/knowledgeConfigHome/status/"+this.ids.toString(),
          method:"get",
          params:{status:status}
        }
      }
      this.ajax(ajaxOptions)
    },
  },
  created(){
    Util = this.$util;
    this.init();
  },
  mounted(){
    // 页面dom稳定后调用
    this.$nextTick(function () {
      // 初始表格高度及分页位置
      this.setTableDynHeight()
      // 为窗体绑定改变大小事件
      let Event = Util.events
      Event.addHandler(window, 'resize', this.setTableDynHeight)
    })
  },
  components:{
  },
  watch:{
  }

}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
