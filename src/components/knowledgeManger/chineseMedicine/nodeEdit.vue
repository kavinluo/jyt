<template>
  <div>
    <el-form ref="allForm"  inline>
      <table style="width: 100%;font-size: 13px;">
        <tr style="height: 45px;">
          <td style="width:100px;text-align: right">分级名称：&nbsp;&nbsp;&nbsp;</td>
          <td style="margin: 5px; float: left"> <el-input style="width:700px" v-model="parameterData.treeName" placeholder="请输入内容"/></td>
        </tr>
        <tr style="height: 45px;">
          <td style="width:100px;text-align: right">类型：&nbsp;&nbsp;&nbsp;</td>
          <td style="margin: 5px; float: left">
            <el-select v-model="parameterData.treeDes" placeholder="请选择">
              <el-option key="FOLDER" label="目录" value="FOLDER"></el-option>
              <el-option key="CONTENT" label="内容" value="CONTENT"></el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <div style="max-height: 500px;overflow:auto;">
        <table v-for="item in parameterData.treeMapMain" :key="item.id" style="width: 100%;font-size: 13px;">
          <tr style="height: 45px;"  v-if="item.subName!=null&&item.subName!=''">
            <td colspan="2">第{{item.orderBy|numberfilter}}栏 &nbsp;&nbsp;&nbsp;分栏名称:&nbsp;&nbsp;&nbsp;{{item.subName}}</td>
          </tr>
          <tr v-for="(item0,i) in item.subList" :key="item0.id" style="height: 45px;">
            <td v-if="item0.attrName!=null&&item0.attrName!=''" style="width:100px;text-align: right">{{item0.attrName}}:&nbsp;&nbsp;&nbsp;</td>
            <td style="margin: 5px; float: left" v-if="item0.inputType!=null&&item0.inputType!=''">
              <span v-if="item0.inputType==='TXT'">
                <el-row>
                  <el-col :span="20">
                    <el-input  type="textarea" :rows="5" style="width:700px" v-model="item0[item0.code]" placeholder="请输入"></el-input>
                    <!--           v-if="tmContentShowType"         <editor-bar v-else v-model="item0[item0.code]"  @change="changeEditor($event, 'tmContent')" :idEdit="editorType"></editor-bar>-->
                  </el-col>
                <!--                  <el-col :span="4" style="line-height: 35px" align="center">-->
                <!--                    <el-button class="blueBtn" @click="changeInput('tmContent',item0,item0.code,item0[item0.code])">{{tmContentShowType ? '图文编辑' : '文本编辑'}}</el-button>-->
                <!--                  </el-col>-->
                </el-row>
                <!--                 <el-input  v-model="item0[item0.code]" placeholder="请输入内容"/>-->
              </span>
              <span v-if="item0.inputType==='MEDIA'">
                <el-upload
                  :action="actionUrl"
                  :headers="headers"
                  v-model="item0[item0.code]"
                  :data="upData"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="(response, file) => handleRemove(response,file, i, item0)"
                  :show-file-list="true"
                  :file-list="item0.fileList"
                  :on-success="(response, file, fileList) => handleFileSuccessImage(response,file,fileList,item0)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </span>
              <span v-if="item0.inputType==='DICTIONARY'"><el-input v-model="item0[item0.code]" placeholder="请输入内容"></el-input></span>
              <span v-if="item0.inputType==='FILE'">
                <el-upload
                  :action="actionUrl"
                  :headers="headers"
                  v-model="item0[item0.code]"
                  :data="upData"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="(response, file, fileList) => handleFileSuccessImage(response,file,fileList,item0,item0.code, i)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <el-form-item label="是否收费:">
        <el-radio v-model="parameterData.isPay" :label="1">是</el-radio>
        <el-radio v-model="parameterData.isPay" :label="0">否</el-radio>
      </el-form-item>
      <el-row>
        <el-col style="text-align: center">
          <el-button type="primary" size="small" @click="saveData" >确定</el-button>
          <el-button type="primary" size="small" @click="cancel" >关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/* 当前组件必要引入*/
import editorBar from '../../tiku/jichutiku/editor/editoritem.vue'
import uploadFile from '../../common/uploadFile.vue'
/* eslint-disable */
let Util = null
import knowledgeApi from '../knowledgeApi'
import config from '../../../config/config'
export default {
  components: {editorBar, uploadFile},
  name: 'nodeEdit',
  data () {
    return {
      headers: {'Token': this.$util.getCookie('Token')},
      actionUrl:config.urlPrefix +"/passport/infra/file/upload",
      upData :{bsModule:"knowledge"},
      fileArr:[],
      treeName:'',
      editorType: 'edit',
      tmContentShowType: true,
      dialogImageUrl: '',
      dialogVisible: false,
      knowledgeApi,
      parameterData:{},
      nodeData:{},
      dataList:[{"businessId":67,"businessType":"KNOWLEDGE_CONFIG_LEVEL","level":1,"orderBy":1,"subList":[{"attrName":"释      义2","code":"paraphrase2","inputType":"TXT","isKeyword":false,"isKeywordExplain":false,"isKeywordFlag":false,"isShow":false,"knowledgeConfigSubId":67,"paraphrase2":"q\teq\teq\te"},{"attrName":"释      义","code":"paraphrase","inputType":"MEDIA","isKeyword":false,"isKeywordExplain":false,"isKeywordFlag":false,"isShow":false,"knowledgeConfigSubId":67,"paraphrase":"q\teq\teq\te"}],"subName":"释义"},{"businessId":67,"businessType":"KNOWLEDGE_CONFIG_LEVEL","level":1,"orderBy":2,"subList":[{"attrName":" 分    类","classify":"q\teq\teq\te","code":"classify","inputType":"TXT","isKeyword":false,"isKeywordExplain":false,"isKeywordFlag":false,"isShow":false,"knowledgeConfigSubId":67}],"subName":"分类"},{"businessId":67,"businessType":"KNOWLEDGE_CONFIG_LEVEL","level":1,"orderBy":3,"subList":[{"attrName":"功    用","code":"usage","inputType":"TXT","isKeyword":false,"isKeywordExplain":false,"isKeywordFlag":false,"isShow":false,"knowledgeConfigSubId":67,"usage":"q\teq\teq\te"}],"subName":"功用"}],
    }
  },
  methods: {
    handleFileSuccessImage(response, file, fileList,item0) {
      item0.fileList.push({name: response.data.name, url:response.data.url});
      this.$forceUpdate();
    },


    changeInput (content,obj,code,val) {
      this.tmContentShowType=!this.tmContentShowType;
    },
    changeEditor (res, type) {

    },
    setUploadFiles (file, content) {

    },
    handleRemove(file, fileList, index, item) {
      item.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //解决无法输入的问题
    change(){
      this.$forceUpdate();
    },
    initData(permeabilityData){
      this.nodeData=permeabilityData;
      const knowledgeConfigSubVO=new Object();
      knowledgeConfigSubVO.treeId=permeabilityData.id;
      knowledgeConfigSubVO.businessType="KNOWLEDGE_CONFIG_LEVEL";
      knowledgeConfigSubVO.level=permeabilityData.level-1;
      knowledgeConfigSubVO.businessId=permeabilityData.knowledgeConfigId;
      let opt = {
        ajaxSuccess: 'submitSuccess',
        ajaxParams: {
          url: this.knowledgeApi.getknowledgeClumnTreeContetn.path,
          method: this.knowledgeApi.getknowledgeClumnTreeContetn.method,
          jsonString: true,
          params: knowledgeConfigSubVO
        }
      }
      this.ajax(opt);  //保存数据

    },
    submitSuccess(res){
      this.parameterData= res.data;
      const fileList = []
      res.data.treeMapMain.forEach(i => {
        i.subList.forEach(j => {
          this.$set(j, 'fileList', [])
          if(j.code === 'image' && j.image) {
           let imageList =  j.image.split(',')
           imageList.forEach(y => {j.fileList.push({name: j.attrName, url:y})})
          } 
          if(j.code === 'autherlmage' && j.autherlmage) {
            let imageList =  j.autherlmage.split(',')
            imageList.forEach(y => {j.fileList.push({name: j.attrName, url:y})})
          }
        })
      })

      console.log(' res.data.treeMapMain',  res.data.treeMapMain)
      if(this.parameterData.treeMapMain.length===0){
        this.errorMess("未配置模板信息");
        this.cancel();
        return false;
      }
    },
    // 处理图像
    framteImage () {
      this.parameterData.treeMapMain.forEach(i => {
        i.subList.forEach(j => {
          if(j.code === 'image') {
           let imageList =  []
           j.fileList.forEach(y => {imageList.push(y.url) })
           j.image = imageList.join(',')
          } 
          if(j.code === 'autherlmage') {
            let imageList =  []
           j.fileList.forEach(y => {imageList.push(y.url) })
           j.autherlmage = imageList.join(',')
          }
        })
      })
    },
    saveData(){
      this.framteImage()
      this.parameterData.type=this.nodeData.type;
      this.parameterData.depth=this.nodeData.depth;
      this.parameterData.contentType="TREE";
      let opt = {
        ajaxSuccess: 'saveDataSuccess',
        ajaxParams: {
          url: this.knowledgeApi.updateknowledgeClumnTreeContetn.path,
          method: this.knowledgeApi.updateknowledgeClumnTreeContetn.method,
          jsonString: true,
          data: this.parameterData
        }
      }
      this.ajax(opt);  //保存数据
    },
    saveDataSuccess(res){
      const data=res.data;
      if(data===false){
        this.errorMess("请输入信息后再提交数据");
        return false;
      }
      this.cancel();
    },
    cancel() {
      this.$emit('cancel', 'edit');
    },
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
}
</script>

<style scoped>

</style>
