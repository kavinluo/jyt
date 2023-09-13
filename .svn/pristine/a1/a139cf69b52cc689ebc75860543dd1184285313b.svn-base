<template>
  <div>
    <el-form ref="allForm" :model="allForm"  inline>
      <div  style="max-height: 500px;overflow:auto;">
        <table  v-if = "allForm.dataTable1!=null && allForm.dataTable1.length!=0 && allForm.dataTable1[0].subAttrVOFristList.length!=0" v-for="(item,index) in allForm.dataTable1" :key="item.id" style="width: 100%;font-size: 13px;">
          <tr style="height: 35px;"  v-if="item.subName!=null&&item.subName!=''">
            <td colspan="2">第{{item.orderBy|numberfilter}}栏：分栏名称:{{item.subName}}</td>
          </tr>
          <tr v-if = "item.subAttrVOFristList.length!=0" v-for="(item0,index0) in item.subAttrVOFristList" :key="item0.id" style="height: 35px;">
            <td v-if="item0.attrName!=null&&item0.attrName!=''" style="width:100px;text-align: right">{{item0.attrName}}:</td>
            <td style="margin: 5px; float: left" v-if="item0.inputType!=null&&item0.inputType!=''">
              <span v-if="item0.inputType==='TXT'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
              <span v-if="item0.inputType==='MEDIA'">
             <img src="../../../assets/images/pg.png" height="120" width="90"/>
          </span>
              <span v-if="item0.inputType==='DICTIONARY'">字典是个啥</span>
              <span v-if="item0.inputType==='FILE'">XXXXXXXXXXXXXXXXXXXXXXXX.pdf</span>
            </td>
          </tr>
          <tr v-else>暂无数据</tr>
        </table>
      </div>
      <el-row>
        <el-col style="text-align: center" >
          <el-button type="primary" size="small" @click="cancel" >关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
let Util = null
/* eslint-disable */
import knowledgeApi from '../knowledgeApi'
export default {
  name: 'settingLeaveShow',
  props:['businessType','businessId','level'],
  data () {
    return {
      knowledgeApi,
      orderBy:0,
      allForm:{
        dataTable1:[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]}]
      },
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'KnowledgeConfigSubList',
        ajaxParams: {
          url: knowledgeApi.getKnowledgeConfigSubList.path,
          method: knowledgeApi.getKnowledgeConfigSubList.method,
          params: {}
        }
      },
    }
  },
  filters :{
    numberfilter:function (num) {
      if(num===null){
        num=1;
      }
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      const unit = ['', '十', '百']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (let i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 100)
      let noWan = num % 100
      if (noWan.toString().length < 2) noWan = '0' + noWan
      return overWan ? getWan(overWan) + '百' + getWan(noWan) : getWan(num)
    },
  },
  created () {
    this.init();
  },
  mounted () {
    // 页面dom稳定后调用
    this.$nextTick(function () {
      this.$forceUpdate();
    })
  },
  methods:{
    init(){
      this.allForm.dataTable1[0]={};
      this.allForm.dataTable1[0].orderBy=1;
      this.orderBy=1;
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          businessType:this.businessType,
          businessId:this.businessId,
          level:this.level,
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      this.setTableData()
    },
    setTableData () {
      this.listMessTitle.ajaxParams.params = Object.assign(
          this.listMessTitle.ajaxParams.params,
          this.queryQptions.params,
          this.formInline
      )
      this.ajax(this.listMessTitle);
    },
    KnowledgeConfigSubList(res){
      let data = res.data;
      this.allForm.dataTable1=data[0].dataList;
      if(this.allForm.dataTable1.length==0){
        this.allForm.dataTable1=[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]}];
        this.allForm.dataTable1[0].orderBy=1;
      }
    },
    //解决无法输入的问题
    change(){
      this.$forceUpdate();
    },
    // 增加分栏行
    addColumnRow(index,$index,item){
      let data0={subName:"",attrName:"",inputType:"",code:"",isKeyword:false,isKeywordFlag:false,isKeywordExplain:false,isShow:false,deleted:false,key:Date.now()}
      item.subAttrVOFristList.push(data0);
    },
    //删除分栏行
    delColumnRow(index,$index,item){
      const dataListSize=item.subAttrVOFristList.length;
      if(dataListSize<2){
        this.errorMess("对不起，最后一行数据不允许删除");
        return false;
      }else{
        item.subAttrVOFristList.splice($index, 1);
      }
    },
    //删除分栏
    delColumn(index,item){
      const len=this.allForm.dataTable1.length;
      if(len<2){
        this.errorMess("对不起，最后一项分栏数据不允许删除");
        return false;
      }else {
        this.allForm.dataTable1.splice(index, 1);
        const dataList=this.allForm.dataTable1;
        this.sortData(dataList);
        this.$forceUpdate();
      }
    },
    //增加分栏
    addColumn(){
      const addNewVal={"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]};
      addNewVal.businessType=this.businessType;
      addNewVal.businessId=this.businessId;
      this.orderBy+=1;
      addNewVal.orderBy=this.orderBy;
      this.allForm.dataTable1.push(addNewVal);
      this.$forceUpdate();
    },
    //强制重新排序
    sortData(dataList){
      if(dataList.length!=0){
        for(let i=0;i<dataList.length;i++){
          this.allForm.dataTable1[i].orderBy=i+1;
          this.orderBy=this.allForm.dataTable1[i].orderBy;
        }
      }else {this.orderBy=0;}
    },
    //用户直接点击取消
    cancel () {
      this.$emit('cancelAdd', false);
    },
  }
}
</script>

<style scoped>

</style>
