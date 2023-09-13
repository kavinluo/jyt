<!--知识库_配置 修改-->
<template>
  <div >
    <el-form :model="formEditData"  ref="formEditData" :rules="rules"   class="demo-form-inline"  label-width="80px" >
      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formEditData.name"  maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="编码" prop="code">
            <el-input readonly v-model="formEditData.code"  maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col >
      </el-row >
      <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="知识分级" prop="level">
            <el-input-number v-model="formEditData.level" style="width: 100%"></el-input-number>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>
    <el-row >
      <el-col :span="8" :offset="16">
        <el-button type="primary" @click="submitData" >提交</el-button>
        <el-button   @click="cancel" >取消</el-button>
      </el-col>
    </el-row >
  </div>
</template>
<script>
let Util = null
import knowledgeApi from '../knowledgeApi.js'
/* eslint-disable */
  export default {
    props: ['editData'],
    data (){
      return{
        knowledgeApi,
        countDate:0,
        options:[{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '未审核'
        }],
        radio2:2,
        formValidate: {
          status:'',
        },
        rules: {
          name:[
            { required:true, message: '名称不能为空', trigger: 'blur' }
          ],
          code:[
            { required:true, message: '编码不能为空', trigger: 'blur' }
          ],
          level:[
            { required:true, message: '知识分级不能为空', trigger: 'blur' }
          ]
        },
        formEditData:{
          level: 1,
          createTime:'',
          updateTime:'',
         },
        pageEditData:{},
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
        ruleValidate:{}
      }
    },
    created () {
      this.pageEditData=this.editData;
    },
    methods:{
      init (pageEditData) {
        this.formEditData=pageEditData;
      },
      getFormData (data) {
        let myData = Util.defaultsDeep({}, data)
        return myData
      },
      deformatterDate(d){
        return new Date(d).getTime()-1000*60*60*24;
      },
      handleStartTime(d){
        this.starTimes = this.deformatterDate(d);
      },
      handleEndTime(d){
        this.endTimes = this.deformatterDate(d);
      },
      confirm(){
        // alert(this.editData)
      },
      submitData(){
        this.$refs["formEditData"].validate(valid => {
          if(valid){
            let opt = {
              ajaxSuccess: 'submitSuccess',
              ajaxParams: {
                url: this.knowledgeApi.updateKnowledgeConfig.path+this.formEditData.id,
                method: this.knowledgeApi.updateKnowledgeConfig.method,
                jsonString: true,
                data: this.formEditData
              }
            }
            this.ajax(opt);  //保存数据
            this.refresh();  //刷新数据
            this.resetForm ("formEditData");//重置表单
          }
        });
      },
      // 刷新父表单
      refresh () {
        this.$emit('refresh', true);
      },
      //用户直接点击取消
      cancel () {
        this.$emit('cancelEdit', false);
      },
      // 表单重置
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
    }
  }
</script>
<style>
  .date{
    line-height: 25px;
  }
  .date .countDate{
    display: inline-block;
    width:70px;
    text-align: center;
    border-bottom: 1px solid;
  }
</style>
