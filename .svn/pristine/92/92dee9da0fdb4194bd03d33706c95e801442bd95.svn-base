<template>
  <el-select
    v-model="value"
    :multiple="sltOptions.multiple"
    :filterable="sltOptions.filterable"
    :allow-create="sltOptions.allowCreate"
    placeholder="选择或输入匹配搜索"
    @change="change">
    <el-option
      v-for="item in optionData"
      :key="item.name"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
  let Util=null;
  export default {
    props:["selectOptions",'isClear','selVal'],
    data() {
      return {
        optionData: [],

        //选择框的参数配置
        sltOptions:{
          multiple:true,    //是否多选
          filterable:true,   //是否可搜索
          allowCreate:false,  //是否允许用户创建新条目，需配合 filterable 使用

          value:[],   //当multiple为true时value为[];
        },
        value:[],   //当multiple为true时value为[];

        //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
        listMessTitle:{
          ajaxSuccess:'updateListData',
          ajaxParams:{
            url:'/passport/pc/role/list?name=&identify=&type=',  //向后台请求数据的地址
          }
        }

      }
    },
    created(){
      Util = this.$util;
      if(this.selVal){
        this.value=this.selVal
      }
      if(typeof this.selectOptions!="undefined"){
        this.sltOptions = Object.assign(this.sltOptions,this.selectOptions);
        if(typeof this.selectOptions.value!="undefined") {
          this.value = this.selectOptions.value;
        }
      }
      this.init();
    },
    methods:{


      //初始化组件信息
      init(){
        if(typeof this.sltOptions.url!="undefined"){
          this.listMessTitle.ajaxParams.url = this.sltOptions.url;
        }
        this.ajax(this.listMessTitle);
      },


      //通过get请求列表数据
      updateListData(responseData){
        let data = responseData.data;
        this.optionData = data;
      },


      //选中值发生变化时触发
      change(val){
        let name = "";
        if(this.optionData.length>0){
           for(var i=0,item;i<this.optionData.length;i++){
               item = this.optionData[i];
               if(item.id==val){
                 name = item.name;
               }
           }
        }
        this.$emit("setSltOptionValue",name,this.value);
      }
    },
    watch:{
      isClear(){
        this.value = [];
      },
      selVal(val){
        this.value = val;
      },
    }
  }
</script>
