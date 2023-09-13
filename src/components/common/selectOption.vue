<template>
  <div>
    <el-option
      v-for="item in optionData"
      :key="item.id"
      :label="item[name||'name']"
      :value="item[id||'id']"
    />
  </div>
</template>
<script>
let Util=null
export default {
  name: 'SelectOption',
  props: ['type','url','selectOptions','unAll','setSltOptionValue','currSelectOne','id','isCode','userType','userId','name','role','codeType','params'],
  data() {

    //条件过滤，如果没有url 由type决定url 如果没有type默认科室url
    let url
    let type
    let idOptions={
      name:'name',
      id:'id'
    }
    let codOptions={
      name:'name',
      id:'value'
    }
    let Options={}

    if(!this.type){
      type = 'dep'
    }else {
      type = this.type
    }
    let typeUrl={
      dep:'/passport/pc/hospital/dept/query/allNameId',
      role:'/passport/pc/role/list?name=&identify=&type=',
      school:'/passport/pc/schools/queryList',
      allBuild:'/dormitory/build/query/allBuild', //添加-查询所有大楼(用于添加房间时，选择大楼的下拉框)
      teachActivityType:'/passport/pc/dictionary/getByCode/TEACH_ACTIVITY_TYPE', //获取教学活动类型
      getItemByCode:'/passport/pc/dictionary/getItemByCode/'+this.codeType, //根据CODE获取 单项 字典配置。(通用)
      getByCode:'/passport/pc/dictionary/getByCode/'+this.codeType, //根据父CODE获取父项，以及子项。(通用)
      aysUserType:'/passport/pc/dictionary/getByCode/SYS_USER_TYPE', //生源类型
      userRotaryDeptlist:'/traineeRotary/arrangeRotary/userRotaryDeptlistTreeData/'+(this.userType)+'-'+this.userId, //轮转科室用
      getDepByTeacher:'/rotationProcess/rotaryTable/getDepByTeacher/'+this.userId, //轮转科室用
      byUserType:'/passport/pc/hospital/dept/query/byUserType/', //轮转科室用   //获取当前角色科室
      //根据不同角色获取科室 (科室主任和带教秘书用) 获取当前角色下的科室
      byNowUser: '/passport/pc/hospital/dept/get/byNowUser/', //uesrId
      getThreeFourDepthHosiptalDep: '/passport/pc/hospital/dept/getThreeFourDepthHosiptalDep' // 获取院内三级四级科室(树形结构,四级不显示)
    }
    url = typeUrl[type]
    if(this.url){url = this.url}

    //通过type定义sltOptions
    if(this.selectOptions){
      Options = this.selectOptions
    }else if(type =='teachActivityType' || type =='teachActivityType'){
      Options = codOptions
    }else {
      Options = idOptions
    }
    let params = this.params || {}
    let userInfo = this.$store.getters.getUserInfo
    if(this.type=='byUserType'){
      params = {
        userType:this.role,
        userId:userInfo.id
      }
    }
    return {
      optionData: [],

      //选择框的参数配置
      sltOptions:Options,
      value:'', //当multiple为true时value为[];

      //当前组件默认请求(list)数据时,ajax处理的 基础信息设置
      listMessTitle:{
        ajaxSuccess:'updateListData',
        ajaxParams:{
          url:url, //向后台请求数据的地址
          params:params
        }
      }
    }
  },
  created(){
    Util = this.$util
    this.init()
  },
  methods:{

    //初始化组件信息
    init(){

      this.ajax(this.listMessTitle)
    },

    //通过get请求列表数据
    updateListData(responseData){
      let data = responseData.data
      if(this.isCode){
        data = data.child
      }
      if(!this.type || this.type=='dep'){
        for(let i=0;i<data.length;i++){
          if(data[i].id=='-1'){
            data.splice(i,1)
            continue
          }
        }
      }
      if(!this.unAll){
        data.unshift({
          [this.id||'id']: '',
          [this.name||'name']:'全部'
        },)
      }
      if(this.type=='userRotaryDeptlist'){
        this.optionData = this.getQTBObj(data)
      } else {
        this.optionData = data
      }
      this.$emit('getOptionData',data)
    },

    //父组件调用返回获取到的数据
    getOptionData(){
      return this.optionData
    },

    // 处理科室数据结构（三级以下）
    getQTBObj(arr,res,depth=-1){
      depth++
      let t = res || []
      if(arr && arr.length) {
        arr.map(item => {
          item.label='　'.repeat(depth)+item.depName
          t.push(item)
          if (item.childList){
            return t.concat(this.getQTBObj(item.childList,t,depth))
          }
        })
      }
      return t
    },

    getQTBObj(arr,res,depth=-1){
      depth++
      let t = res || []
      if(arr && arr.length) {
        arr.map(item => {
          item[this.name||'name']='　'.repeat(depth)+item[this.name||'name']
          t.push(item)
          if (item.childList){
            return t.concat(this.getQTBObj(item.childList,t,depth))
          }
        })
      }
      return t
    }

  }
}
</script>
