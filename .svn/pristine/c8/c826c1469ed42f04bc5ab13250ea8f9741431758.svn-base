<!--知识库_配置_会员设置 修改-->
<template>
  <div >
    <el-form :model="formValidate1"  ref="formValidate" :rules="rules"   class="demo-form-inline"  label-width="100px" >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="知识库_配置ID" prop="knowledgeConfigId">
            <el-input v-model="formValidate1.knowledgeConfigId"></el-input>
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
          <el-form-item label="功能点（多个逗号拼接）" prop="knowledgeFunctions">
            <el-input v-model="formValidate1.knowledgeFunctions"></el-input>
          </el-form-item>
        </el-col >
      </el-row >
       <el-row >
        <el-col :span="20" :offset="2">
          <el-form-item label="是否需要会员 0:否 1:是" prop="isVip">
            <el-input v-model="formValidate1.isVip"></el-input>
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
         	knowledgeFunctions:[
         	{ max: 100, message: '长度最多100个字符', trigger: 'blur' }
         	],
        },
         formValidate1:{
         	knowledgeConfigId:'',
         	knowledgeConfigName:'',
         	knowledgeFunctions:'',
         	isVip:''
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
