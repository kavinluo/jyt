<template>
  <div>
    <el-form ref="allForm" :model="allForm"  inline>
      <el-row>
        <el-col>
          <el-button type="primary" size="small" @click="addColumn" style="margin: 5px;">增加分栏</el-button>
        </el-col>
      </el-row>
      <div style="max-height: 500px;overflow:auto;">
        <el-row style="margin: 5px;">
          <el-col>
            <el-table :data="allForm.dataTable0[0].subAttrVOFristList"  border style="width: 100%" slot-align="center">
              <el-table-column prop="date" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-plus" @click="addRow"></el-button>
                  <el-button type="text" icon="el-icon-delete"  @click="delRow(scope.$index,scope.row)"></el-button>
                </template>
              </el-table-column>
              <el-table-column prop="attrName" label="字段名称" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.attrName"  placeholder="字段名称" style="width: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="inputType" label="输入类型" width="180" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.inputType" placeholder="请选择">
                    <el-option label="文本" value="TXT">文本</el-option>
                    <el-option label="多媒体" value="MEDIA">多媒体</el-option>
                    <el-option label="图片" value="IMAGE">图片</el-option>
                    <el-option label="字典" value="DICTIONARY">字典</el-option>
                    <el-option label="文件" value="FILE">文件</el-option>
                    <el-option label="超链接" value="LINK">超链接</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="编码" width="160" align="center">
                <template slot-scope="scope">
                  <el-input  placeholder="编码" v-model="scope.row.code" style="width: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="isKeyword" label="关键字" width="70" align="center">
                <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeyword"></el-checkbox></template>
              </el-table-column>
              <el-table-column prop="isShow" label="列表显示" width="80" align="center">
                <template slot-scope="scope"> <el-checkbox v-model="scope.row.isShow"></el-checkbox></template>
              </el-table-column>
              <el-table-column prop="isKeywordFlag" label="关键字打标" width="100" align="center">
                <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordFlag"></el-checkbox></template>
              </el-table-column>
              <el-table-column prop="isKeywordExplain" label="关键释义" width="80" align="center">
                <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordExplain"></el-checkbox></template>
              </el-table-column>
              <el-table-column prop="isSearchShow" label="搜索显示" width="80" align="center">
                <template slot-scope="scope"> <el-checkbox v-model="scope.row.isSearchShow"></el-checkbox></template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <span v-for="(item,index) in allForm.dataTable1">
          <el-row  style="height: 35px; top: 8px;">
            <el-col>
              <el-form-item style="height: 35px;">
                <el-col :span="7">第{{item.orderBy|numberfilter}}栏：分栏名称</el-col>
                <el-col :span="12"><el-input v-model="item.subName" style="width:98%" @input="change"></el-input>&nbsp;&nbsp;</el-col>
                <el-col :span="4"><el-button type="danger" plain style="float: left" @click="delColumn(index,item)">删除分栏</el-button></el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-table :data="item.subAttrVOFristList"  border style="width: 100%" slot-align="center">
                <el-table-column prop="date" label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-plus" @click="addColumnRow(index,scope.$index,item,scope.row)"></el-button>
                    <el-button type="text" icon="el-icon-delete"  @click="delColumnRow(index,scope.$index,item,scope.row)"></el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="attrName" label="字段名称" align="center"  width="110">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.attrName"  placeholder="字段名称" style="width: 100%"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="inputType" label="输入类型" width="180" align="center">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.inputType" placeholder="请选择">
                      <el-option label="文本" value="TXT">文本</el-option>
                      <el-option label="多媒体" value="MEDIA">多媒体</el-option>
                      <el-option label="图片" value="IMAGE">图片</el-option>
                      <el-option label="字典" value="DICTIONARY">字典</el-option>
                      <el-option label="文件" value="FILE">文件</el-option>
                      <el-option label="超链接" value="LINK">超链接</el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="code" label="编码" width="160" align="center">
                  <template slot-scope="scope">
                    <el-input  placeholder="编码" v-model="scope.row.code" style="width: 100%"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="isKeyword" label="关键字" width="70" align="center">
                  <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeyword"></el-checkbox></template>
                </el-table-column>
                <el-table-column prop="isShow" label="列表显示" width="80" align="center">
                  <template slot-scope="scope"> <el-checkbox v-model="scope.row.isShow"></el-checkbox></template>
                </el-table-column>
                <el-table-column prop="isKeywordFlag" label="关键字打标" width="100" align="center">
                  <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordFlag"></el-checkbox></template>
                </el-table-column>
                <el-table-column prop="isKeywordExplain" label="关键释义" width="80" align="center">
                  <template slot-scope="scope"> <el-checkbox v-model="scope.row.isKeywordExplain"></el-checkbox></template>
                </el-table-column>
                <el-table-column prop="isSearchShow" label="搜索显示" width="80" align="center">
                  <template slot-scope="scope"> <el-checkbox v-model="scope.row.isSearchShow"></el-checkbox></template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </span>
      </div>
      <el-row>
        <el-col style="text-align: center">
          <el-button type="primary" size="small" @click="submitData" >保存</el-button>
          <el-button type="primary" size="small" @click="cancel" >取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
let Util = null
/* eslint-disable */
import knowledgeApi from '../knowledgeApi.js'
let _this;
export default {
  name: 'contentSetting',
  data () {
    return {
      knowledgeApi,
      allForm:{
        dataTable0:[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false, "isSearchShow":false}]}],
        dataTable1:[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false,"isSearchShow":false}]}]
      },
      //记录当前最大的排序号
      orderBy:0,
      // 初始化加载页面信息
      listMessTitle: {
        ajaxSuccess: 'KnowledgeConfigSubList',
        ajaxParams: {
          url: knowledgeApi.getKnowledgeConfigSubList.path,
          method: knowledgeApi.getKnowledgeConfigSubList.method,
          params: {}
        }
      },
      delIds:[],
      loading: false,
      businessId:null,
      businessType:"",
      rules: {
        attrName:[
          { required:true, message: '名称不能为空', trigger: 'blur' }
        ],
        inputType:[
          { required:true, message: '字段类型不能为空', trigger: 'blur' }
        ],
        code:[
          { required:true, message: '编码不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  beforeCreate() {
    _this = this;
  },
  filters: {
    // 将阿拉伯数字转换为汉字的算法
    numberfilter: function (num) {
      _this.orderBy=num;
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
    }
  },
  methods: {
    init (businessId,businessType) {
      this.businessType=businessType;
      this.businessId=businessId;
      this.allForm.dataTable0[0].businessType=this.businessType;
      this.allForm.dataTable1[0].businessType=this.businessType;
      this.allForm.dataTable0[0].businessId=this.businessId;
      this.allForm.dataTable1[0].businessId=this.businessId;
      this.cancelAll();
      Util = this.$util
      this.myPages = Util.pageInitPrams
      this.queryQptions = {
        params: {
          businessType:businessType,
          businessId:businessId,
          pageNo: 1,
          pageSize: Util.pageInitPrams.pageSize
        }
      }
      this.delIds = [];
      this.setTableData()
    },
     //解决无法输入的问题
    change(){
      this.$forceUpdate();
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
      let that=this;
      if(data[0]!=null&&data[0].dataTable0.length>0){
        that.allForm.dataTable0=data[0].dataTable0;
      }
      if(data[0]!=null&&data[0].dataTable1.length>0){
        that.allForm.dataTable1=data[0].dataTable1;
      }
      //检验分栏下有没有属性数据
      for(let i=0;i<this.allForm.dataTable0.length;i++){
        if(this.allForm.dataTable0[i].subAttrVOFristList.length===0){
          this.allForm.dataTable0[i].subAttrVOFristList=[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}];
        }
      }
      for(let i=0;i<this.allForm.dataTable1.length;i++){
        if(this.allForm.dataTable1[i].subAttrVOFristList.length===0){
          this.allForm.dataTable1[i].subAttrVOFristList=[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}];
        }
      }
    },
    submitData(){
      this.$refs["allForm"].validate(valid => {
        let isKeywordNum=0;
        let subAttrVOFristList=this.allForm.dataTable0[0].subAttrVOFristList;
         for(let  k=0;k<subAttrVOFristList.length;k++){
             if(subAttrVOFristList[k].isKeyword){
               isKeywordNum++;
             }
         }
        for(let i=0;i<this.allForm.dataTable1.length;i++){
          for (let j=0;j<this.allForm.dataTable1[i].subAttrVOFristList.length;j++){
              if(this.allForm.dataTable1[i].subAttrVOFristList[j].isKeyword){
                isKeywordNum++;
              }
          }
        }
        if(isKeywordNum>1){
          this.$Message.error("一个内容中只能出现一个关键字");
          return false;
        }
        this.allForm.businessType=this.businessType;
        this.allForm.businessId=this.businessId;
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
        if(this.delIds.length>0)
            for(let i = 0; i < this.delIds.length; i++) {
                let opt = {
                  ajaxSuccess: 'deleteSuccess',
                  ajaxParams: {
                    url: this.knowledgeApi.delKnowledgeConfigSub.path+this.delIds[i],
                    method: this.knowledgeApi.delKnowledgeConfigSub.method,
                    jsonString: true
                  }
                }
                this.ajax(opt);  //提交数据
            }
      });
    },
    submitSuccess(){
      this.successMess("数据操作成功");
      this.cancel ();
    },
    //首栏增加行
    addRow(){
      let data0={
        subName:null,
        attrName:null,
        inputType:null,
        code:null,
        isKeyword:false,
        isKeywordFlag:false,
        isKeywordExplain:false,
        isShow:false,
        deleted:false,
        key: Date.now()
      };
      this.allForm.dataTable0[0].subAttrVOFristList.push(data0);
    },
    // 增加分栏行
    addColumnRow(index,$index,item,row){
      let data0={subName:"",attrName:"",inputType:"",code:"",isKeyword:false,isKeywordFlag:false,isKeywordExplain:false,isShow:false,deleted:false,key:Date.now()}
      item.subAttrVOFristList.push(data0);
    },
    //增加分栏
    addColumn(){
      let that=this;
      const addNewVal={"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]};
      addNewVal.businessType=this.businessType;
      addNewVal.businessId=this.businessId;
      this.orderBy+=1;
      addNewVal.orderBy=this.orderBy;
      that.allForm.dataTable1.push(addNewVal);
      this.$forceUpdate();
    },
    //删除分栏
    delColumn(index,item){
      if(item.id!=null){
        this.delIds.push(item.id);
      }
      this.allForm.dataTable1.splice(index, 1);
      const dataList=this.allForm.dataTable1;
      this.sortData(dataList);
      this.$forceUpdate();
    },
    //删除主栏行
    delRow(index,row){
      // alert(JSON.stringify(row));
      const dataListSize=this.allForm.dataTable0[0].subAttrVOFristList.length;
      if(dataListSize<2){
          this.errorMess("对不起，最后一行数据不允许删除");
          return false;
      }else{
        this.allForm.dataTable0[0].subAttrVOFristList.splice(index, 1);
      }
      if(row.id!=null){//执行删除
        this.delRowData(row.id);
      }
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
        this.delRowData(row.id);
      }
    },
    delRowData(id){
      let opt = {
        ajaxSuccess: 'deleteSuccess',
        ajaxParams: {
          url: this.knowledgeApi.delKnowledgeConfigSubAttr.path+id,
          method: this.knowledgeApi.delKnowledgeConfigSubAttr.method,
          jsonString: true
        }
      }
      this.ajax(opt);  //提交数据
    },
   //强制清空所有的表单数据
    cancelAll(){
        const  defaultValue={dataTable0:[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]}],dataTable1:[{"id":null,"businessType":"","businessId":null,"subName":"","orderBy":0,"deleted":false,"subAttrVOFristList":[{"id":null,"knowledgeConfigId":null,"knowledgeConfigSubId":null,"attrName":"","inputType":"","code":"","isKeyword":false,"isKeywordFlag":false,"isKeywordExplain":false,"isShow":false,"deleted":false}]}]};
        defaultValue.businessType=this.businessType;
        defaultValue.businessId=this.businessId;
        this.allForm=defaultValue;
        this.sortData(this.allForm.dataTable1);
        this.$forceUpdate();
    },
  //强制重新排序
    sortData(dataList){
      if(dataList.length!=0){
        for(let i=0;i<dataList.length;i++){
          this.allForm.dataTable1[i].orderBy=i+1;
          this.orderBy=this.allForm.dataTable1[i].orderBy;
        }
      }else {
        this.orderBy=0;
      }
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
