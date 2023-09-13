<template>
  <div id="contentSettingContent"  ref="contentSettingContent" >
    <table style="width: 100%;font-size: 13px;">
      <tr v-if = "dataTable0!=null&&dataTable0[0]!=null && dataTable0[0].subAttrVOFristList.length!=0" v-for="item in dataTable0[0].subAttrVOFristList" :key="item.id" style="height: 35px;">
        <td style="width:100px;text-align: right">{{item.attrName}}:</td>
        <td style="margin: 5px; float: left">
          <span v-if="item.inputType==='TXT'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <span v-if="item.inputType==='MEDIA'">
             <img src="../../../assets/images/pg.png" height="120" width="90"/>
          </span>
          <span v-if="item.inputType==='IMAGE'">
             <img src="../../../assets/images/pg.png" height="120" width="90"/>
          </span>
          <span v-if="item.inputType==='DICTIONARY'">字典是个啥</span>
          <span v-if="item.inputType==='FILE'">XXXXXXXXXXXXXXXXXXX.pdf</span>
        </td>
      </tr>
      <tr v-else>暂无数据</tr>
    </table>
    <table  v-if = "dataTable1!=null && dataTable1.length!=0 && dataTable1[0].subAttrVOFristList.length!=0" v-for="(item,index) in dataTable1" :key="item.id" style="width: 100%;font-size: 13px;">
      <tr style="height: 35px;">
        <td colspan="2">第{{item.orderBy|numberfilter}}栏：分栏名称:{{item.subName}}</td>
      </tr>
      <tr v-if = "item.subAttrVOFristList.length!=0" v-for="(item0,index0) in item.subAttrVOFristList" :key="item0.id" style="height: 35px;">
        <td  style="width:100px;text-align: right">{{item0.attrName}}:</td>
        <td style="margin: 5px; float: left">
          <span v-if="item0.inputType==='TXT'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
          <span v-if="item.inputType==='IMAGE'">
             <img src="../../../assets/images/pg.png" height="120" width="90"/>
          </span>
          <span v-if="item0.inputType==='MEDIA'">
             <img src="../../../assets/images/pg.png" height="120" width="90"/>
          </span>
          <span v-if="item0.inputType==='DICTIONARY'">字典是个啥</span>
          <span v-if="item0.inputType==='FILE'">XXXXXXXXXXXXXXXXXXXXXXXX.pdf</span>
        </td>
      </tr>
      <tr v-else>暂无数据</tr>
    </table>
    <table v-else> 暂无数据</table>
    <el-row>
      <el-col style="text-align: center" >
        <el-button type="primary" size="small" @click="cancel" >关闭</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
let Util = null;
import knowledgeApi from '../knowledgeApi'

export default {
  name: 'contentSettingShow',
  data () {
    return {
      dataTable0: {},
      dataTable1: {},
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
  filters: {
    // 将阿拉伯数字转换为汉字的算法
    numberfilter: function (num) {
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
      this.dataTable0=null;
      this.dataTable1=null;
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
      if(data[0]!=null&&data[0].dataTable0!=undefined&&data[0].dataTable0.length>0){
        this.dataTable0=data[0].dataTable0;
      }
      if(data[0]!=null&&data[0].dataTable1!=undefined&&data[0].dataTable1.length>0){
        this.dataTable1=data[0].dataTable1;
      }


      if( this.dataTable0==null|| this.dataTable1==null||this.dataTable0==undefined|| this.dataTable1==undefined){
         this.errorMess("暂无可以预览的数据");
         this.cancel();
         return;
      }
      if( this.dataTable0.length==0|| this.dataTable1.length==0){
        this.errorMess("暂无可以预览的数据");
        this.cancel();
        return;
      }
      if(this.dataTable0[0]==undefined||this.dataTable1[0]==undefined){
        this.errorMess("暂无可以预览的数据");
        this.cancel();
        return;
      }
      if( this.dataTable0[0].subAttrVOFristList==undefined||this.dataTable1[0].subAttrVOFristList==undefined){
        this.errorMess("暂无可以预览的数据");
        this.cancel();
        return;
      }
    },
    //用户直接点击取消
    cancel () {
      this.dataTable0=null;
      this.dataTable1=null;
      this.$emit('cancelAdd', false);
    },
  }
}
</script>

<style scoped>

</style>
