<template>
<div>
  <!-- 新建班级 -->
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
                 label-width="120px"
                 label-position="right"
                 size="small"
                 :rules="rules">
        <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="班级价格:" prop="coursePrice">
                <el-input v-model="form.coursePrice"   autocomplete="off"  placeholder="请输入班级价格" />
              </el-form-item>
              <el-form-item label="班级名称:" prop="className">
                <el-input v-model="form.className" autocomplete="off"  placeholder="请输入班级名称" />
              </el-form-item>
<!--              精品课程标识:0 普通课程 1 精品课程-->
<!--              <el-form-item label="课程类型" prop="boutiqueFlag">-->
<!--                <el-radio-group v-model="form.boutiqueFlag">-->
<!--                  <el-radio label="0">普通课程</el-radio>-->
<!--                  <el-radio label="1">精品课程</el-radio>-->
<!--                </el-radio-group>-->

<!--              </el-form-item>-->
            </el-col>
            <el-col :span="16">
              <div style="display: flex;">
                <el-form-item label="封面图:" prop="classPhoto">
                  <sf-upload
                      :showFileList="false"
                      accept="image/*"
                      :on-success="uploadSuccess_classPhoto"
                      class="cover-uploader-1"
                  >
                    <el-image
                        v-if="form.classPhoto"
                        :src="form.classPhoto"
                        fit="contain"
                        class="cover"
                    ></el-image>
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                  </sf-upload>
                </el-form-item>
                <el-form-item label="封面logo:" prop="classLogo">
                  <sf-upload
                      :showFileList="false"
                      accept="image/*"
                      :on-success="uploadSuccess_classLogo"
                      class="cover-uploader"
                  >
                    <el-image
                        v-if="form.classLogo"
                        :src="form.classLogo"
                        fit="contain"
                        class="cover"
                    ></el-image>
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                  </sf-upload>
                </el-form-item>
                <el-form-item label="二维码:" prop="classGroup">
                  <sf-upload
                      :showFileList="false"
                      accept="image/*"
                      :on-success="uploadSuccess_classGroup"
                      class="cover-uploader"
                  >
                    <el-image
                        v-if="form.classGroup"
                        :src="form.classGroup"
                        fit="contain"
                        class="cover"
                    ></el-image>
                    <i v-else class="el-icon-plus cover-uploader-icon"></i>
                  </sf-upload>
                </el-form-item>
              </div>
            </el-col>

        </el-row>
        <el-row>
           <el-col :span="24">
             <el-form-item label="简介:" prop="classAbstract">
               <sf-editor v-model="form.classAbstract"></sf-editor>
             </el-form-item>

           </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="班主任:" prop="classTeacher">
              <el-input v-model="form.classTeacher" autocomplete="off" placeholder="请输入班主任" />
            </el-form-item>
            <el-form-item label="主讲人:" prop="speaker">
              <el-input v-model="form.speaker" autocomplete="off" style="width:200px" placeholder="请输入主讲人" />
            </el-form-item>
            <el-form-item label="有赞IP:" prop="goodsId">
              <el-input v-model="form.goodsId" autocomplete="off" style="width:200px" placeholder="请输入IP" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="是否允许评论:" prop="isComment">
              <el-radio-group v-model="form.isComment">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="是否允许下载:" prop="isDownload">
              <el-radio-group v-model="form.isDownload">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="display: flex;align-items: center">
              <el-form-item label="有效时间:" prop="beginTime">
                <el-date-picker
                    v-model="form.beginTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getDay1"
                    type="datetime"
                    :picker-options="pickerBeginDateBefore"
                    placeholder="开始日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="endTime">
                <el-date-picker
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="form.endTime"
                    :picker-options="pickerBeginDateAfter"
                    @change="getDay2"
                    type="datetime"
                    placeholder="结束日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label-width="0" prop="effectiveTime">
                <el-input  type="number" :disabled="true" v-model="form.effectiveTime" style="width: 150px">
                  <template slot="append">天数</template>
                </el-input>
              </el-form-item>
            </div>
<!--            <el-form-item label="有效时间:" prop="validTimeTemp">-->
<!--              <div style="display: flex;align-items: center">-->
<!--                <el-date-picker-->
<!--                    value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                    v-model="form.validTimeTemp"-->
<!--                    @change="getDay"-->
<!--                    type="datetimerange"-->
<!--                    range-separator="至"-->
<!--                    start-placeholder="开始日期"-->
<!--                    end-placeholder="结束日期">-->
<!--                </el-date-picker>-->
<!--                <el-input  type="number" v-model="form.effectiveTime" style="width: 150px">-->
<!--                  <template slot="append">天数</template>-->
<!--                </el-input>-->
<!--              </div>-->

<!--            </el-form-item>-->

<!--            <el-form-item label="模拟试卷:"  >-->
<!--              <el-button type="primary" class="blueBtn" @click="showDlgPaper=true">选择试卷</el-button>-->
<!--              <div v-if="examPapersTemp&&examPapersTemp.length>0" style="color: #909399">-->
<!--                   <div class="paperr-item" v-for="(item,index) in examPapersTemp">-->
<!--                       <span class="paper-name">{{item.examName}}</span>-->
<!--                       <i class="el-icon-close"  style="color: #909399" @click="delPaper(index)"></i>-->
<!--                   </div>-->
<!--&lt;!&ndash;               {{ examPapers.map(e => e.examName).join('、')}}&ndash;&gt;-->
<!--&lt;!&ndash;                accept=".txt,.doc,.docx,.pdf"&ndash;&gt;-->
<!--              </div>-->
<!--            </el-form-item>-->
<!--            2023.07.05变更-->
            <el-form-item label="练习题库:"  >
              <el-button type="primary" class="blueBtn" @click="showDlgPaper=true">选择题库</el-button>
              <div v-if="examPapersTemp&&examPapersTemp.length>0" style="color: #909399">
                <div class="paperr-item" v-for="(item,index) in examPapersTemp">
                  <span class="paper-name">{{item.examName}}</span>
                  <i class="el-icon-close"  style="color: #909399" @click="delPaper(index)"></i>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="资料附件：" >   <!-- prop="annex" -->
              <sf-upload
                  ref="audioUploader"
                  :showFileList="true"
                  :show-submit-btn="true"
                  :multiple="false"
                  :limit="1"
                  :autoUpload="true"
                  v-model="anexListTemp"
                  :on-remove = "remove_annex"
                  :on-exceed="handleExceed"
                  :on-success="uploadSuccess_annex"
              >
                <el-button type="primary" icon="el-icon-upload" size="mini" >
                  选择上传
                </el-button>
              </sf-upload>
              <span style="color: red">注：最多只能上传1个文件</span>
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
import {create, update,getAnnexData} from '../api/class'
import DlgChoose from './DlgChoose.vue'
export default {
  name: "DlgEditClass",
  props:{
    visible: Boolean,
    data: Object,
    treeId:[Number,String]
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
      saveLoading:false,
      userId:{id:'userId',title:'新增班级'},
      title: '新增班级',
      dialogVisible:false,
      formData:{},
      options:[],
      validTime:[],

      examPapersTemp:[],//选择的试卷
      anexListTemp:[],//资料附件
      form: {
        treeId:'',
        releaseFlag:0,
        coursePrice:'',
        className:'',
        classPhoto:'',
        classGroup:'',
        classAbstract:'',
        classTeacher:'',
        speaker:'',
        isComment:'0',
        isDownload:'0',
        annex:'',
        questionIds:[],
        beginTime:'',
        endTime:'',
        effectiveTime:'',
        annexList:[],
        classLogo:'',
        goodsId: ''
        // validTimeTemp:[],//班级有效时间

      },
    }
  },
  computed: {
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
    fileName() {
      return function (item) {           //主要思想是通过此处的闭包来实现

        let result = ''
        if(item!=null&&item.length>0){
          result =item.split('headImg/')[1]
        }
        return result;
      };
    },
    rules() {
      let _rules = {
        coursePrice: [
          {
            required: true,
            message: '请输入班级价格',
            trigger: 'blur'
          }
        ],
        className: [
          {
            required: true,
            message: '请输入班级名称',
            trigger: 'blur'
          }
        ],
        classPhoto: [
          {
            required: true,
            message: '请上传班级封面图',
            trigger: 'blur'
          }
        ],
        classGroup: [
          {
            required: true,
            message: '请上传班级群二维码',
            trigger: 'blur'
          }
        ],
        classLogo:[
          {
            required: true,
            message: '请上传封面logo',
            trigger: 'blur'
          }
        ],
        classAbstract: [
          {
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }
        ],
        classTeacher: [
          {
            required: true,
            message: '请输入班主任姓名',
            trigger: 'blur'
          }
        ],
        speaker: [
          {
            required: true,
            message: '请输入主讲人姓名',
            trigger: 'blur'
          }
        ],
        isComment: [
          {
            required: true,
            message: '请选择是否允许评论',
            trigger: 'blur'
          }
        ],
        isDownload: [
          {
            required: true,
            message: '请选择是否允许下载',
            trigger: 'blur'
          }
        ],
        annex:[
          {
            required: true,
            message: '请上传班级资料',
            trigger: 'blur'
          }
        ],
        // questionIds:[
        //   {
        //     required: true,
        //     message: '请选择模拟试卷',
        //     trigger: 'blur'
        //   }
        // ],
        // validTimeTemp:[],//班级有效时间
        // examPapersTemp:[],//选择的试卷
        // anexListTemp:[],//资料附件
        anexListTemp:[
          {
            required: true,
            message: '请选择资料附件',
            trigger: 'blur'
          }
        ],
        examPapersTemp:[
          {
            required: true,
            message: '请选择模拟试卷',
            trigger: 'blur'
          }
        ],
        // validTimeTemp:[
        //   {
        //     required: true,
        //     message: '请选择班级有效时间',
        //     trigger: 'blur'
        //   }
        // ],
        beginTime:[
          {
            required: true,
            message: '请选择班级开始时间',
            trigger: 'blur'
          },
        ],
        endTime:[
          {
            required: true,
            message: '请选择班级结束时间',
            trigger: 'blur'
          },
        ],
        effectiveTime:[
          {
            required: true,
            message: '请输入班级有效期天数',
            trigger: 'blur'
          }
        ],

      }
      return _rules
    }
  },

  methods: {
    delPaper(index){
      this.examPapersTemp.splice(index,1)
    },

    chooseSure(val){
      this.examPapersTemp = val

    },
    uploadSuccess_classPhoto(res){
      this.$set(this.form,'classPhoto',res.data.url)
    },
    uploadSuccess_classLogo(res){
      this.$set(this.form,'classLogo',res.data.url)
    },
    uploadSuccess_classGroup(res){
      this.$set(this.form,'classGroup',res.data.url)
    },
    uploadSuccess_annex(res,file,fileList){
      // console.log('res:',res)
      // console.log("fileList:",fileList)
      this.$set(this.form,'annex',res.data.url)
    },
    remove_annex(res,file,fileList){
      this.$set(this.form,'annex',null)
      this.anexListTemp=[]

    },
    handleExceed(){
      this.$message.warning(`资料附件仅限上传1个文件，请将鼠标移动至已上传的文件上删除后再重新选择上传！`);
    },
    cmdSubmit(){
      this.form.treeId=this.treeId
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dealTempData()
          this.saveLoading = true;
          let _request =this.data.classId?update:create
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
      // this.form.beginTime = this.form.validTimeTemp[0]
      // this.form.endTime = this.form.validTimeTemp[1]
      this.form.annexList=[]

      let file
      let file1
      //资料附件
      // for(let m=0;m<this.form.anexListTemp.length;m++){
      //   file=this.form.anexListTemp[m]
      //   // console.log("file:",file)
      //   this.form.annexList.push({annexName:file.name,annexType:3,informationUrl:file.resData?file.resData.url:file.informationUrl,trainId:this.data.classId})
      //   //annexId:file.resData.id,
      // }

      //试卷
      if(this.examPapersTemp&&this.examPapersTemp.length>0){
        for(let m=0;m<this.examPapersTemp.length;m++){
          file1=this.examPapersTemp[m]
          this.form.annexList.push({examId:file1.examId,examName:file1.examName,annexType:1,trainId:this.data.classId})
        }
      }


    },
    initTempData(){
      // if(this.form.beginTime!=null&&this.form.endTime!=null)
      // this.$set(this.form,'validTimeTemp',[this.form.beginTime, this.form.endTime])

      //资料附件
      this.anexListTemp=[]
      this.anexListTemp.push({name:this.fileName(this.form.annex),status:'success',annexType:3,informationUrl:this.form.annex,trainId:this.data.classId})
      //模拟试卷
      if(this.form.annexList!=null&&this.form.annexList.length>0){
        //资料附件
        // let select = this.form.annexList.filter(item=>Number(item.annexType)==3)
        // let selectConvert = []
        // if(select){
        //   for(let m=0;m<select.length;m++){
        //     selectConvert.push({name:select[m].annexName,informationUrl:select[m].informationUrl})
        //   }
        // }
        // this.$set(this.form,'anexListTemp',selectConvert)
        //模拟试卷
        this.examPapersTemp = this.form.annexList.filter(item=>Number(item.annexType)==1)



      }




    },

    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 关闭弹窗
      this.$emit('update:visible', false)


    },
    getDay1(val){
      var timer=null
      if(val&&this.form.endTime)
        timer = parseInt(this.getDifferTime(val, this.form.endTime))
      this.$set(this.form,'effectiveTime',timer)
    },
    getDay2(val){
      var timer=null
      if(val!=null&&this.form.beginTime!=null){
        timer = parseInt(this.getDifferTime(this.form.beginTime, val))
      }
      this.$set(this.form,'effectiveTime',timer)
    },


    getDifferTime(startDate, endDate) {
      let startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
      let endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
      let dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
      return dates;
    }
  },
  async created() {

    if (this.data.classId){
      this.title ='编辑班级'
      this.form = Object.assign({},this.data)
      this.initTempData()

    } else {
      this.title = '新建班级'
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
.paperr-item{
  display: inline-block;
  margin-right: 10px;
}
.el-icon-close{
  display:none
}
.paperr-item:hover .el-icon-close{
    display: inline-block;
}

</style>
