<template>
  <div>
      <el-form ref="allForm" :model="allForm"  inline>
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="addColumn" style="margin: 5px;">增加分栏</el-button>
        </el-col>
      </el-row>
        <div  style="max-height: 500px;overflow:auto;">
           <div v-for="(item,index) in allForm.dataTable1">
              <el-row  style="height: 35px; top: 8px;">
                <el-col :span="24">
                  <el-form-item style="height: 35px;">
                    <el-col :span="7">第{{item.orderBy | numberfilter}}栏：分栏名称</el-col>
                    <el-col :span="12"><el-input v-model="item.subName" style="width:98%" @input="change"></el-input>&nbsp;&nbsp;</el-col>
                    <el-col :span="4"><el-button type="danger" plain style="float: left" @click="delColumn(index,item)">删除分栏</el-button></el-col>
                   </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-table :data="item.subAttrVOFristList"  border style="width: 100%" slot-align="center">
                    <el-table-column  prop="date" label="操作" width="100" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-plus" @click="addColumnRow(index,scope.$index,item,scope.row)"></el-button>
                        <el-button type="text" icon="el-icon-delete"  @click="delColumnRow(index,scope.$index,item,scope.row)"></el-button>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="attrName" label="字段名称" align="center"  width="180">
                      <template slot-scope="scope">
                         <el-input v-model="scope.row.attrName"  placeholder="字段名称" style="width: 100%"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="inputType" label="输入类型" width="180" align="center">
                      <template slot-scope="scope">
                        <el-select  v-model="scope.row.inputType" placeholder="请选择">
                          <el-option label="文本" value="TXT">文本</el-option>
                          <el-option label="多媒体" value="MEDIA">多媒体</el-option>
                          <el-option label="字典" value="DICTIONARY">字典</el-option>
                          <el-option label="文件" value="FILE">文件</el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="code" label="编码" width="160" align="center">
                      <template slot-scope="scope">
                        <el-input  placeholder="编码" v-model="scope.row.code" style="width: 100%"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="isKeyword" label="关键字" width="70" align="center">
                      <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeyword"></el-checkbox></template>
                    </el-table-column>
                    <el-table-column  prop="isShow" label="列表显示" width="80" align="center">
                      <template slot-scope="scope"> <el-checkbox v-model="scope.row.isShow"></el-checkbox></template>
                    </el-table-column>
                    <el-table-column  prop="isKeywordFlag" label="关键字打标" width="100" align="center">
                      <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordFlag"></el-checkbox></template>
                    </el-table-column>
                    <el-table-column  prop="isKeywordExplain" label="关键释义" width="80" align="center">
                      <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordExplain"></el-checkbox></template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </div>
        </div>
        <el-row>
          <!--<el-col style="text-align: center" >
            <el-button type="primary" size="small" @click="submitData" >保存</el-button>
            <el-button type="primary" size="small" @click="cancel" >取消</el-button>
          </el-col>-->
        </el-row>
    </el-form>
  </div>
</template>

<script>
let Util = null
/* eslint-disable */
import knowledgeApi from '../knowledgeApi'
export default {
  name: 'settingLeave',
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
    test(){
        console.log("hello");
    },
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
      this.sortData(this.allForm.dataTable1);
    },
    submitData(){
      this.$refs["allForm"].validate(valid => {
        this.allForm.businessType=this.businessType;
        this.allForm.businessId=this.businessId;
        this.allForm.level=this.level;
        if(valid){
          let opt = {
            ajaxSuccess: 'submitSuccess',
            ajaxParams: {
              url: this.knowledgeApi.addKnowledgeConfigSub.path,
              method: this.knowledgeApi.addKnowledgeConfigSub.method,
              jsonString: true,
              data: {dataList:JSON.stringify(this.allForm)}
            }
          }
         this.ajax(opt);  //保存数据
        }
      });
    },
    submitSuccess(){
      this.successMess("数据操作成功");
      this.cancel ();
    },
    //解决无法输入的问题
    change(){
      this.$forceUpdate();
    },
    // 增加分栏行
    addColumnRow(index,$index,item,row){
      let data0={subName:"",attrName:"",inputType:"",code:"",isKeyword:false,isKeywordFlag:false,isKeywordExplain:false,isShow:false,deleted:false,key:Date.now()}
      item.subAttrVOFristList.push(data0);
    },
    //删除分栏行
    delColumnRow(index,$index,item,row){
      const dataListSize=item.subAttrVOFristList.length;
      if(dataListSize<2){
        this.errorMess("对不起，最后一行数据不允许删除");
        return false;
      }else{
        item.subAttrVOFristList.splice($index, 1);
      }
      if(row.id!=null){//执行删除
        let opt = {
          ajaxSuccess: 'deleteSuccess',
          ajaxParams: {
            url: this.knowledgeApi.delKnowledgeConfigSubAttr.path+row.id,
            method: this.knowledgeApi.delKnowledgeConfigSubAttr.method,
            jsonString: true
          }
        }
        this.ajax(opt);  //提交数据
      }
    },
    //删除分栏
    delColumn(index,item){
      if(item.id!=null){
        let opt = {
          ajaxSuccess: 'deleteSuccess',
          ajaxParams: {
            url: this.knowledgeApi.delKnowledgeConfigSub.path+item.id,
            method: this.knowledgeApi.delKnowledgeConfigSub.method,
            jsonString: true
          }
        }
        this.ajax(opt);  //提交数据
      }
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
