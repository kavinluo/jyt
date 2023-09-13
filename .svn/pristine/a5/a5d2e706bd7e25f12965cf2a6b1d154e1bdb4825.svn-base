<template>
  <div style="max-height: 600px;overflow:auto;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col>
          <!-- <el-form-item label="名称">
            <el-input  v-model="form.name" :disabled="editType == 0"></el-input>
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-row v-for="item in dataList" :key="item.id">
        <el-col style="height: 40px;" v-if="item.orderBy!=0">第{{item.orderBy|numberfilter}}栏：分栏名称 &nbsp;&nbsp;&nbsp;{{item.subName}}</el-col>
        <el-col>
          <el-row v-for="item0 in item.subAttrVOFristList" :key="item0.id">
            <el-form-item v-bind:label="item0.attrName">
              <!--文本框-->
              <el-input type="textarea" v-model="form[item0.code]" v-if="item0.inputType==='TXT'" :disabled="editType == 0"></el-input>
              <!--图片文件-->
              <el-row  v-if="item0.inputType==='IMAGE'" style="width: 100%;flex-wrap: wrap;">
                <div v-for="(item,index) in getImageList(form[item0.code])" :key="index" style="display: inline-block;position: relative; width: 150px;height: 150px;text-align: center; margin-right: 10px;">
                    <el-image  :src="item" :preview-src-list="getPreviewImgList(index,getImageList(form[item0.code]))" style="width: 150px;height: 150px;"></el-image>
                    <i  @click="handleRemoveImg(item,item0.code)" style="color:#fff;position: absolute;left: 45%;top: 45%;"  class="el-icon-delete"></i>
                </div>
                     <el-upload  style="display: inline;"  :headers="headers"  class="avatar-uploader" accept=".jpg,.png"   :action="actionUrl" :disabled="editType == 0"
                                 v-model="form[item0.code]" :data="upData"   :show-file-list="false"  :on-success="(response, file, fileList) => handleFileSuccessImage(response,file,fileList,item0.code)">
                     <!--<img :src="form[item0.code]" class="avatar" :disabled="editType == 0">-->
                     <!--<el-image
                       style="width: 150px; height: 150px"
                       :src ="getFirstImage(form[item0.code])"
                       :preview-src-list="getImageList(form[item0.code])">
                      </el-image>-->
                     <i class="el-icon-plus avatar-uploader-icon"></i>
                   </el-upload>
             </el-row>
              <!--Excel文件文件-->
              <el-upload  v-if="item0.inputType==='FILE'"  :headers="headers"  accept=".xlsx, .xls"  class="upload-demo" :action="actionFileUrl" :disabled="editType == 0"
                          :limit="1"  :data="upData"  :file-list="convertToFileList(form[item0.code])"  :on-success="(response, file, fileList) => handleFileSuccess(response,file,fileList,item0.code)">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传Excel文件，建议大小不要超过5M</div>
              </el-upload>
              <!--视频文件-->
              <!-- <el-upload  v-if="item0.inputType==='MEDIA'" :show-file-list="true"  :headers="headers"  accept=".mp4"  class="upload-demo" :action="actionAliyunUrl" :disabled="editType == 0"
                          :limit="1"  v-model="form[item0.code]" :data="upData"  :file-list="convertToFileList(form[item0.code])"  :on-success="(response, file, fileList) => handleFileSuccessMEDIA(response,file,fileList,item0.code)">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传MP4视频文件文件，建议大小不要超过200M</div>
              </el-upload> -->
              <el-input v-model="form[item0.code]" v-if="item0.inputType==='MEDIA'" placeholder="输入视频地址"></el-input>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import config from '../../../config/config'

let Util = null
import knowledgeApi from '../knowledgeApi'
export default {
  name: 'contentKnowledgeUpdate',
  data () {
    return{
      fileArr:[],
      actionUrl:config.urlPrefix +"/passport/infra/file/upload",
      actionFileUrl:config.urlPrefix +"/passport/infra/file/upload",
      actionAliyunUrl:config.urlPrefix+knowledgeApi.uploadAliyunFile.path,
    //  actionFileUrl:config.urlPrefix + knowledgeApi.knowledgeExcelFileUpload.path,
      headers: {'Token': this.$util.getCookie('Token')},
      upData :{bsModule:"knowledge"},
      fileList:[],
      fileListMP4:[],
      dialogImageUrl: '',
      dialogVisible: false,
      knowledgeApi,
      form:{},
      currentTreeData: {},
      // 0 不可编辑,1 可编辑
      editType:1,
      //数据加载参数
      listMessTitle: {
        ajaxSuccess: 'getknowledgeContetnClumnSuccess',
        ajaxParams: {
          url: knowledgeApi.getknowledgeContetnClumn.path,
          method: knowledgeApi.getknowledgeContetnClumn.method,
          params: {}
        }
      },
      dataList:[]
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
    handleRemoveImg(img,code){
        this.form[code] = this.form[code].replace(img,'');
        this.form[code] = this.form[code].replace(',,',',');
        if(this.form[code].length >0) {
            if(this.form[code][this.form[code].length-1] ==','){
                 this.form[code] = this.form[code].slice(this.form[code].length-1) ;
            }
        }
        if(this.form[code].length >0) {
            if(this.form[code][0]==','){
                this.form[code] = this.form[code].slice(1) ;
            }
        }
        console.log(img)
    },
    //文件上传成功
    handleFileSuccess(response, file, fileList,code) {
      this.form[code]=response.data.url;
      const key=code;
      const val=response.data.url;
      const fileObj=new Object();
      fileObj.key=key;
      fileObj.val=val;
      for(let i=0;i<this.fileArr.length;i++){
        if(this.fileArr[i].key===code){
          this.fileArr.splice(i,1);
        }
      }
      this.fileArr.push(fileObj);
      const name=response.data.name;
      const url=response.data.url;
      const fileObj0=new Object();
      fileObj0.name=name;
      fileObj0.url=url;
      this.fileListMP4.push(fileObj0);
      this.$forceUpdate();
    },
    getFirstImage(imageStr) {
          if(imageStr === undefined || imageStr === '' || imageStr === null){
             return ''
          }
          imageStr = imageStr.replace("undefined,","")
          imageStr = imageStr.replace("undefined","")
          if(imageStr === ''){
                return ''
          }
          return imageStr.split(',')[0]
    },
    getImageList(imageStr) {
          if(imageStr == undefined || imageStr == '' || imageStr == null){
             return []
          }
          imageStr = imageStr.replace("undefined,","")
          imageStr = imageStr.replace("undefined","")
          if(imageStr == ''){
                return []
          }
          return imageStr.split(',')
    },
    getPreviewImgList(index, imgArr) {
      let arr = []
      let i = 0;
      for (i; i < imgArr.length; i++) {
        arr.push(imgArr[i + index])
        if (i + index >= imgArr.length - 1) {
          index = 0 - (i + 1);
        }
      }
      return arr;
    },
    handleFileSuccessImage(response, file, fileList,code) {
      if(this.form[code] === undefined || this.form[code] === 'undefined'){
         this.form[code] = ''
      }
      if (this.form[code]!== '' && this.form[code]!== null) {
        this.form[code]=this.form[code] + ","+ response.data.url;
      } else {
        this.form[code]=response.data.url;
      }
      const key=code;
      const val=this.form[code];
      const fileObj=new Object();
      fileObj.key=key;
      fileObj.val=val;
      for(let i=0;i<this.fileArr.length;i++){
        if(this.fileArr[i].key===code){
          this.fileArr.splice(i,1);
        }
      }
      this.fileArr.push(fileObj);
      this.$forceUpdate();
    },

    //文件上传成功
    handleFileSuccessMEDIA(response, file, fileList,code) {
      this.$forceUpdate();
      if(response.data==null){
        this.errorMess("文件上传失败，请重试");
        return false;
      }
      this.form[code]=response.data.url;
    },

    initData (currentTreeData,editType) {
      this.currentTreeData = currentTreeData;
      this.editType = editType
      console.log("editType:",editType)
      this.form=currentTreeData.data;
      this.setTableData();
    },
    // 单个文件转换成list
    convertToFileList(filepath){
        if(filepath === null || filepath === undefined) {
            return []
        } else {
            return [
                {
                    "name":filepath.substring(filepath.lastIndexOf("/") + 1),
                    "url":filepath
                }
            ]
        }
    },
    //界面初始化
    setTableData () {
      this.listMessTitle.ajaxParams.params.businessType="KNOWLEDGE_CONFIG_CONTENT";
      this.listMessTitle.ajaxParams.params.businessId=this.currentTreeData.knowledgeConfigId;
      this.listMessTitle.ajaxParams.params = Object.assign(
          this.listMessTitle.ajaxParams.params
      )
      this.ajax(this.listMessTitle);
    },
    getknowledgeContetnClumnSuccess(res){
      this.dataList=res.data;
    },
    //数据更新保存
    submitData(){
      const parm=new Object();
      parm.name=this.form.name;
      parm.knowledgeConfigId=this.currentTreeData.knowledgeConfigId;
      parm.contentInfo=this.form;
      parm.treeId=this.currentTreeData.id;
      parm.type="KNOWLEDGE";
      let opt = {
        ajaxSuccess: 'saveDataSuccess',
        ajaxParams: {
          url: this.knowledgeApi.updateknowledgeContent.path+this.form.contentId,
          method: this.knowledgeApi.updateknowledgeContent.method,
          jsonString: true,
          data: parm
        }
      }
    this.ajax(opt);  //保存数据
    },
    saveDataSuccess(res){
      this.dataList=res.data;
      this.form={};
      this.$emit("addsuccess","add");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>

</style>
