<!--知识库_内容_纠错 修改-->
<template>
  <div >
    <el-form :model="formValidate1"  ref="formValidate" :rules="rules"   class="demo-form-inline"  label-width="100px" >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="知识库_内容ID" prop="knowledgeContentId">
            <el-input v-model="formValidate1.knowledgeContentId"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="模块名称" prop="knowledgeConfigName">
            <el-input v-model="formValidate1.knowledgeConfigName"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="内容名称" prop="knowledgeContentName">
            <el-input v-model="formValidate1.knowledgeContentName"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="错误类型（多个逗号拼接）" prop="errorTypes">
             <el-input type="textarea" resize="none" :rows="5" v-model="formValidate1.errorTypes"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="错误描述" prop="remark">
             <el-input type="textarea" resize="none" :rows="5" v-model="formValidate1.remark"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="图片（多个逗号拼接）" prop="images">
             <el-input type="textarea" resize="none" :rows="5" v-model="formValidate1.images"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
      	<el-row >
         <el-col :span="20" :offset="2">
          <el-form-item label="创建时间">
            <el-date-picker  prop="createTime"
              v-model="formValidate1.createTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime">
            </el-date-picker>
          </el-form-item>
        </el-col>
       </el-row >
      	<el-row >
         <el-col :span="20" :offset="2">
          <el-form-item label="修改时间">
            <el-date-picker  prop="updateTime"
              v-model="formValidate1.updateTime"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="handleStartTime">
            </el-date-picker>
          </el-form-item>
        </el-col>
       </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="创建者" prop="creator">
            <el-input v-model="formValidate1.creator"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="更新者" prop="updater">
            <el-input v-model="formValidate1.updater"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="是否删除 0：否 1：是" prop="deleted">
            <el-input v-model="formValidate1.deleted"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
    </el-form>
    <el-row >
      <el-col :span="8" :offset="16">
        <el-button type="primary" @click="confirm" >提交</el-button>
        <el-button  >取消</el-button>
      </el-col>
    </el-row >
  </div>
</template>
<script>
/* eslint-disable */
  export default {
    props: ['editData'],
    data (){
      return{
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
         	knowledgeConfigName:[
         	{ max: 50, message: '长度最多50个字符', trigger: 'blur' }
         	],
         	knowledgeContentName:[
         	{ max: 50, message: '长度最多50个字符', trigger: 'blur' }
         	],
         	errorTypes:[
         	{ max: 200, message: '长度最多200个字符', trigger: 'blur' }
         	],
         	remark:[
         	{ max: 500, message: '长度最多500个字符', trigger: 'blur' }
         	],
         	images:[
         	{ max: 500, message: '长度最多500个字符', trigger: 'blur' }
         	],
         	creator:[
         	{ max: 64, message: '长度最多64个字符', trigger: 'blur' }
         	],
         	updater:[
         	{ max: 64, message: '长度最多64个字符', trigger: 'blur' }
         	],
        },
         formValidate1:{
         	knowledgeContentId:'',
         	knowledgeConfigName:'',
         	knowledgeContentName:'',
         	errorTypes:'',
         	remark:'',
         	images:'',
         	createTime:'',
         	updateTime:'',
         	creator:'',
         	updater:'',
         	deleted:''
         },
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
    methods:{
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
        alert(this.editData)
      },
      newspapers(){
        alert('上报 ')
      }
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
