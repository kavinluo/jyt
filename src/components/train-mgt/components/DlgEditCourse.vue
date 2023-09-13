<template>
<div>
  <sf-dialog
      :visible="visible"
      :title="title"
      width="70%"
      @close="closeDialog"
      @update:visible="val => $emit('update:visible', val)"
  >
    <div style="width: 90%;padding: 20px 0">
       <el-form   ref="form"
                 :model="form"
                 label-width="150px"
                 label-position="right"
                 size="small"
                 :rules="rules">
        <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="名称:" prop="trainName">
                <el-input v-model="form.trainName" autocomplete="off"  placeholder="请输入名称" />
              </el-form-item>
              <el-form-item label="主讲:" prop="speaker">
                <el-input v-model="form.speaker" autocomplete="off"  placeholder="请输入主讲老师姓名" />
              </el-form-item>



<!--              <el-form-item label="" :prop="form.courseType==4?'uploadUrl':form.courseType==3?'articleContent':''">-->
<!--                <el-input v-if="form.courseType==1||form.courseType==4" v-model="form.uploadUrl" autocomplete="off" style="width:200px" placeholder="请输入链接" />-->
<!--                <sf-editor v-else-if="form.courseType==3" v-model="form.articleContent"></sf-editor>-->
<!--                <sf-upload-->
<!--                    v-else-if="form.courseType=='2'"-->
<!--                    :showFileList="true"-->
<!--                    :show-submit-btn="true"-->
<!--                    accept=".mp4"-->
<!--                    :autoUpload="true"-->
<!--                    :on-success="uploadSuccess"-->

<!--                >-->
<!--                  <el-button type="primary" icon="el-icon-upload" size="mini" >-->
<!--                    点击上传-->
<!--                  </el-button>-->
<!--                </sf-upload>-->
<!--              </el-form-item>-->


            </el-col>
            <el-col :span="8">
            <el-form-item label="封面图:" prop="coverUrl">
              <sf-upload
                  :showFileList="false"
                  accept="image/*"
                  :on-success="uploadCoverSuccess"
                  class="cover-uploader-1"
              >
                <el-image
                    v-if="form.coverUrl"
                    :src="form.coverUrl"
                    fit="contain"
                    class="cover"
                ></el-image>
                <i v-else class="el-icon-plus cover-uploader-icon"></i>
              </sf-upload>
            </el-form-item>


          </el-col>
            <el-col :span="8">

              <el-form-item label="封面logo:" prop="courseLogo">
                <sf-upload
                    :showFileList="false"
                    accept="image/*"
                    :on-success="uploadLogoSuccess"
                    class="cover-uploader-1"
                >
                  <el-image
                      v-if="form.courseLogo"
                      :src="form.courseLogo"
                      fit="contain"
                      class="cover"
                  ></el-image>
                  <i v-else class="el-icon-plus cover-uploader-icon"></i>
                </sf-upload>
              </el-form-item>

            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="课程类型" prop="courseType">
              <el-radio-group v-model="form.courseType">
                <el-radio label="1">直播</el-radio>
                <el-radio label="2">视频</el-radio>
                <!-- <el-radio label="3">文章</el-radio> -->
                <!-- <el-radio label="4">链接</el-radio> -->
              </el-radio-group>
            </el-form-item>

            <el-form-item v-if="form.courseType=='4'" label="" prop="uploadUrlVideo">
              <sf-upload
                  :showFileList="true"
                  :show-submit-btn="true"
                  accept=".mp4"
                  :limit="1"
                  v-model="uploadUrlVideoTemp"
                  :multiple="false"
                  :on-exceed="handleExceed"
                  :autoUpload="true"
                  :on-success="uploadSuccess"
              >
                <el-button type="primary" icon="el-icon-upload" size="mini" >
                  点击上传
                </el-button>
              </sf-upload>
            </el-form-item>

            <el-form-item v-else-if="form.courseType=='3'" label="" prop="articleContent">
              <sf-editor v-model="form.articleContent"></sf-editor>
            </el-form-item>
            <el-form-item v-else-if="form.courseType=='2'" label="" prop="uploadUrl">
              <el-input style="width:200px;" v-model="form.uploadUrl" autocomplete="off"  placeholder="请输入上传地址" />
            </el-form-item>
            <el-form-item label="简介:" prop="courseAbstract">
              <sf-editor v-model="form.courseAbstract"></sf-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col  :span="8">
            <el-form-item label="是否允许评论:" prop="isComment">
              <el-radio-group v-model="form.isComment">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
             </el-form-item>
          </el-col>
          <el-col  :span="8">
               <el-form-item label="是否允许回看:" prop="isReview">
            <el-radio-group v-model="form.isReview">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否允许下载:" prop="isDownload">
              <el-radio-group v-model="form.isDownload">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col  :span="24">
            <div style="display: flex;align-items: center">
              <el-form-item label="课程时间:" prop="beginTime">
                <el-date-picker
                    :picker-options="pickerBeginDateBefore"
                    v-model="form.beginTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getMinutes1"
                    type="datetime"
                    placeholder="开始日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="endTime">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerBeginDateAfter"
                    v-model="form.endTime"
                    @change="getMinutes2"
                    type="datetime"
                    placeholder="结束日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="courseDuration">
                <el-input  type="number" v-model="form.courseDuration" :disabled="true" style="width: 150px">
                  <template slot="append">分钟</template>
                </el-input>
              </el-form-item>
            </div>
            <div v-if="form.courseType==1"  style="font-size: 10px;color: red;margin-left: 120px;margin-top: 0px;margin-bottom: 10px">注：1.直播课程时间需分钟数需大于0；2.直播课程时间需大于当前时间。</div>
            <el-form-item label="练习题库:">
              <el-button type="primary"    class="blueBtn" @click="showDlgPaper=true">练习题库</el-button>
                <div v-if="examPapersTemp&&examPapersTemp.length>0" style="color: #909399;display: flex">
                  <div class="paperr-item" v-for="(item,index) in examPapersTemp" >
                    <span class="paper-name">{{item.examName}}</span>
                    <i class="el-icon-close"  style="color: #909399" @click="delPaper(index)"></i>
                  </div>
                  <!--               {{ examPapers.map(e => e.examName).join('、')}}-->
                </div>
            </el-form-item>
            <el-form-item label="课程资料：">
              <sf-upload
                  ref="audioUploader"
                  :showFileList="true"
                  :show-submit-btn="true"
                   v-model="anexListTemp"
                  :autoUpload="true"
                  :on-success="uploadSuccess_annex"
              >
                <el-button type="primary" icon="el-icon-upload" size="mini" >
                  点击上传
                </el-button>
              </sf-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
          type="primary"
          size="small"
          :loading="saveLoading"
          @click="cmdSubmit"
      >
        确定
      </el-button>

      <el-button size="small" @click="closeDialog">
          取消
      </el-button>
    </div>
  </sf-dialog>
  <dlg-choose v-if="showDlgPaper" :visible.sync="showDlgPaper" type="APP_TEST" @success="chooseSure"></dlg-choose>
</div>
</template>

<script>
import SfEditor from './Editor/Editor.vue'
import SfUpload from './Upload/Upload.vue'
import SfDialog from './Dialog/Dialog.vue'
import {create, update} from '../api/course'
import {mapGetters} from "vuex";
import DlgChoose from './DlgChoose.vue'
export default {
  name: "DlgEditCourse",
  props:{
    visible: Boolean,
    data: Object,
    classId:[Number,String],
  },
  components:{
    SfEditor,
    SfUpload,
    SfDialog,
    DlgChoose
  },
  data() {
    return {
      showDlgPaper:false,
      coureseTime:[],
      previewImagePath:'',
      saveLoading:false,
      btnValue: '',
      title: '新建课程',
      dialogVisible:false,
      formData:{},
      options:[],
      anexListTemp:[],//资料附件
      uploadUrlVideoTemp:[],//课程视频
      examPapersTemp:[],//选择的题库
      pickerOptions: {
        disabledDate(time) {
          //选择的日期大于等于当前日期（包含今天）
          return time.getTime() < Date.now() - 8.64e7;
          //若选择的日期大于当前日期（不包含今天）： time.getTime() < Date.now()
          //若选择的日期小于当前日期(不包含今天)： time.getTime() > Date.now() - 8.64e7
          //若选择的日期小于等于当前日期（包含今天）： time.getTime() > Date.now()
        }
      },
      form: {
        notice:'',
        trainName:'',
        speaker:'',
        articleContent:'',
        courseType:'',
        uploadUrl:'',
        isComment:'0',
        isDownload:'0',
        isReview:'0',
        coverUrl:'',
        beginTime:null,
        ednTime:null,
        createTime:'',
        courseDuration:'',
        courseLogo:''
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 结束时间大于开始时间
    pickerBeginDateBefore() {
      return {
        disabledDate: time => {
          let endDateVal = this.form.endTime;
          if (endDateVal) {
            return time.getTime() >= new Date(endDateVal).getTime();
          }else {
            // return time.getTime() > Date.now();   // 大于当前时间禁止选择
          }
        }
      }
    },
    pickerBeginDateAfter() {
      return {
        disabledDate: time => {
          let beginDateVal = this.form.beginTime;
          if (beginDateVal) {
            return time.getTime() <= Date.now() - 8.64e7 || time.getTime() <= new Date(beginDateVal).getTime() - 8.64e7;
            // return time.getTime() < Date.now()  || time.getTime() <= new Date(beginDateVal).getTime();
          }
        }
      }
    },
    rules() {
      let _rules = {
        trainName: [{ required: true,message: '请输入请输入名称',trigger: 'blur'}],
        speaker: [{ required: true,message: '请输入主讲老师姓名',trigger: 'blur'}],
        courseAbstract:[{required: true, message: '请输入课程简介', trigger: 'blur'}],
        articleContent: [{ required: true, message: '请输入文章描述', trigger: 'blur'}],
        courseType: [{ required: true,message: '请选择课程类型',trigger: 'blur'}],
        uploadUrlVideo:[{required: true,message: '请上传课程视频',trigger: 'blur'}],
        uploadUrl:[{required: true, message:'请输入课程链接',trigger: 'blur'}],
        isComment: [{required: true,message: '请选择是否允许评论', trigger: 'blur'}],
        isDownload: [{required: true,message: '请选择是否允许下载',trigger: 'blur'}],
        isReview: [{required: true,message: '请选择是否允许回看',trigger: 'blur'}],
        coverUrl:[{required: true,message: '请上传封面',trigger: 'blur'}],
        courseLogo:[{required: true,message: '请上传封面logo', trigger: 'blur'}],
        beginTime:[{required: true,message: '请选择课程开始时间',trigger: 'blur'}],
        endTime:[{required: true, message: '请选择课程结束时间', trigger: 'blur'}],
        courseDuration:[{required: true,message: '请输入分钟数',trigger: 'blur'}],
        anexListTemp:[{ required: true, message: '请选择课程资料', trigger: 'blur'}],
        examPapersTemp:[{required: true,message: '请选择练习题库',trigger: 'blur'}],
      }
      return _rules
    },
    fileName() {
      return function (item) {           //主要思想是通过此处的闭包来实现

        let result = ''
        if(item!=null&&item.length>0){
          result =item.split('headImg/')[1]
        }
        return result;
      };
    },
  },

  methods: {
    handleExceed(){
      this.$message.warning(`仅限上传1个视频文件！`);
    },
    delPaper(index){
      this.examPapersTemp.splice(index,1)
    },

    getMinutes1(val){
      var timer=null
      if(val&&this.form.endTime)
        timer = parseInt(this.getDifferTime(val, this.form.endTime))

      this.$set(this.form,'courseDuration',timer)
    },
    getMinutes2(val){
      var timer=null
      if(val!=null&&this.form.beginTime!=null){
        timer = parseInt(this.getDifferTime(this.form.beginTime, val))
      }
      this.$set(this.form,'courseDuration',timer)
    },

    getDifferTime(startDate, endDate){
      if((new Date(startDate).getTime()<new Date(endDate).getTime())){
        let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
        let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
        let minutes = Math.abs((startTime - endTime)) / (1000 * 60);

        if(parseInt(minutes)>0){
          return minutes;
        }else{
          this.$set(this.form,'endTime',null)
          this.$message.error('请重新选择结束时间，课程时间间隔分钟数需大于0！')
          return null;
        }
      }
      else{
          this.$set(this.form,'endTime',null)
          this.$message.error('课程结束时间需大于开始时间！')
          return null;
      }

    },
    chooseSure(val){
      // console.log("val:",val)
      this.examPapersTemp = JSON.parse(JSON.stringify(val))
    },
    uploadSuccess_annex(res,file,fileList){
      this.anexListTemp = fileList
    },
    uploadSuccess(res){
      // console.log('res：',res)
      this.$set(this.form,'uploadUrl',res.data.url)
      this.$set(this.form,'uploadUrlVideo',res.data.url)
    },
    uploadCoverSuccess(res){
      // this.form.coverUrl = res.data.url
      this.$set(this.form,'coverUrl',res.data.url)
    },
    uploadLogoSuccess(res){
      this.$set(this.form,'courseLogo',res.data.url)
    },

    cmdSubmit(){

      this.form.treeId=this.treeId

      this.form.userId = this.userInfo.id
      this.form.classId = this.classId
      this.form.releaseFlag = this.data.trainId? this.form.releaseFlag:'0'
      //releaseFlag

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dealTempData()
          this.saveLoading = true;
          let _request =this.data.trainId?update:create
          _request(this.form).then(res => {
            this.$message.success('保存成功！')
            this.saveLoading = false;
            this.$emit('success')
            this.closeDialog()
          });


        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    dealTempData(){


      this.form.annexList=[]

      //
      //     <el-radio label="1">直播</el-radio>
      // <el-radio label="2">视频</el-radio>
      // <el-radio label="3">文章</el-radio>
      // <el-radio label="4">链接</el-radio>


      let file
      let file1
      //资料附件
      for(let m=0;m<this.anexListTemp.length;m++){
        file=this.anexListTemp[m]
        // console.log('file：',file)
        this.form.annexList.push({annexName:file.name,annexType:3,informationUrl:file.informationUrl||file.resData.url,trainId:this.data.trainId})
        //annexId:file.resData.id,
      }

      //题库
      for(let m=0;m<this.examPapersTemp.length;m++){
        file1=this.examPapersTemp[m]
        this.form.annexList.push({examId:file1.examId,examName:file1.examName,annexType:2,trainId:this.data.trainId})
      }

    },
    initTempData(){


      //课程类型：
      if(this.form.courseType=='2'){
        // console.log("this.form.uploadUrl:",this.form.uploadUrl)
        this.$set(this.form,'uploadUrlVideo',this.form.uploadUrl)

        this.uploadUrlVideoTemp=[{name:this.fileName(this.form.uploadUrl),status:'success',informationUrl:this.form.uploadUrl}]
      }

      //资料附件
      if(this.form.annexList!=null&&this.form.annexList.length>0){
        let select = this.form.annexList.filter(item=>Number(item.annexType)==3)
        let selectConvert = []
        if(select){
          for(let m=0;m<select.length;m++){
            selectConvert.push({name:select[m].annexName,informationUrl:select[m].informationUrl})
          }
        }
        this.anexListTemp = selectConvert

        //题库
        this.examPapersTemp = this.form.annexList.filter(item=>Number(item.annexType)==2)

      }





    },

    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 关闭弹窗
      this.$emit('update:visible', false)


    }
  },
  async created() {
    if (this.data.trainId){
      this.title ='编辑课程'
      this.form = Object.assign({},this.data)
      this.initTempData()
    } else {
      this.title = '新建课程'
      this.form={}
    }
  }


}
</script>

<style scoped>
.cover {
  width: 150px;
  height: 150px;
  display: block;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
::v-deep .cover-uploader-1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 150px;
}
::v-deep .cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
