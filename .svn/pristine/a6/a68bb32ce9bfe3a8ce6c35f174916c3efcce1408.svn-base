<!--
****--@file     addDepExam
****--@date     2018/10/30 9:47
****--@author   WH
****--@describe
-->
<template>
  <div style="width:400px;">
    <el-form ref="formValidate" :model="formValidate" class="demo-form-inline" label-width="110px">

      <el-row>
        <el-col>
          <el-form-item label="节点名称：" prop="treeName">
            <el-input style="width: 200px" v-model="formValidate.treeName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col style="text-align: center">
        <el-button class="sureBtn" @click="sure">确定 </el-button>
        <el-button class="cancelBtn" @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  /*当前组件必要引入*/
  let Util = null
  export default {
    props:['operailityData'],
    data () {
      return {
        formValidate:{
          treeName:''
        },
        //当前组件提交(add)数据时,ajax处理的 基础信息设置
        addMessTitle: {
          type: 'add',
          successTitle: '添加成功!',
          errorTitle: '添加失败!',
          ajaxSuccess: 'ajaxSuccess',
          ajaxError: 'ajaxError',
          ajaxParams: {
            // url: '/examParticipantTree/add',
            method: 'post',
            data: {
              treeName:'',
              parentId:'',
              treeType:'',
              parentTreeRoad:''
            }
          }
        },
      }

    },
    methods: {
      //初始化请求列表数据
      init () {
        Util = this.$util;
        console.log(this.operailityData)
      },
      sure(){
        this.formValidate.treeName= this.formValidate.treeName.replace(/(^\s*)|(\s*$)/g, "")
        if(!this.formValidate.treeName){
          this.errorMess('请输入节点名称')
          return
        }
        for(var i in this.addMessTitle.ajaxParams.data){
          this.addMessTitle.ajaxParams.data[i]=this.operailityData[i]
        }
        this.addMessTitle.ajaxParams.data.treeName=this.formValidate.treeName
        this.addMessTitle.ajaxParams.data.parentId=this.operailityData.treeId
        // this.ajax(this.addMessTitle)
      },
      cancel(){
        this.$emit('cancel','add')
      }

    },
    created () {
      this.init();
    },
    mounted () {
    },
    components: {
    }
  }

</script>
<style lang="scss">

</style>
