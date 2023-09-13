<template>
  <div class="list-class">
    <div class="search-box">
      <el-button-group>
        <el-button type="primary"    class="blueBtn"  @click="cmdAdd()">新建课程</el-button>
        <el-button type="primary"    class="blueBtn" @click="cmdRelease()" style="margin:0 20px">批量发布</el-button>
        <el-button type="primary"    class="blueBtn" @click="cmdCancel()" style="margin-right:20px">批量撤销</el-button>
        <el-button type="danger"    size="mini" @click="cmdDel()" style="background-color: orangered">删除</el-button>
        <div style="display: inline-block;margin-left: 20px;cursor:pointer;" @click="showTips">
            <img src="@/assets/images/explain.png" style="width: 20px;height: 20px"/>
            <span>直播说明</span>
        </div>
<!--        <div style="display: inline-block;margin-left: 20px;cursor:pointer;" @click="cmdReturn()">-->
<!--          <img src="@/assets/images/back.png" style="width: 20px;height: 20px"/>-->
<!--          <span>返回班级管理</span>-->
<!--        </div>-->
      </el-button-group>
      <div class="search-cmd">
        <el-input v-model="searchParams.trainName" placeholder="请输入关键性文字"></el-input>
        <el-button  class="blueBtn" type="primary" style="margin-left: 30px" @click="cmdSearch">查询</el-button>
        <el-button  class="blueBtn" type="primary" style="margin-left: 10px" @click="cmdReturn">返回</el-button>
      </div>
    </div>
    <el-table
        v-loading="dataLoading"
        :data="tableData"
        :height="650"
        style="width: 100%"
        :header-cell-style="{ background: '#eef1f6' }"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"

      />
      <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
      />
      <el-table-column
          prop="trainName"
          label="名称"
          width="180"
          align="center">
        <template slot-scope="scope">
          <el-link  style="color: #0b8aec" @click="cmdToLive(scope.row)">{{scope.row.trainName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="releaseFlag"
          label="状态"
          width="80"
          align="center">
        <template slot-scope="scope">
          <span>{{scope.row.releaseFlag=='1'?'已发布':'未发布'}}</span>
        </template>
      </el-table-column>

      <el-table-column
          prop="speaker"
          label="主讲"
          width="120"
          align="center"
      />
      <el-table-column
          prop="courseType"
          label="课程类型"
          align="center"
          width="50"
          :show-overflow-tooltip="true"
      >
      <template slot-scope="scope">
        <el-tag :type="scope.row.courseType=='1'?'':scope.row.courseType=='2'?'success':scope.row.courseType=='3'?'info':'warning'">{{scope.row.courseType=='1'?'直播':scope.row.courseType=='2'?'视频':scope.row.courseType=='3'?'文章':'链接'}}</el-tag>
<!--        <span>{{scope.row.courseType=='1'?'直播':scope.row.courseType=='2'?'视频':scope.row.courseType=='3'?'文章':'链接'}}</span>-->
      </template>
      </el-table-column>
      <el-table-column
          prop="isReview"
          label="是否回看"
          width="50"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isReview=='0'?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
      prop="roomState"
      label="直播状态"
      width="80"
      align="center"
  >
    <template slot-scope="scope">
      <span>{{scope.row.roomState=='0'?'待开播':scope.row.roomState=='1'?'正在直播':'直播结束'}}</span>
    </template>
  </el-table-column>
      <el-table-column
          prop="isComment"
          width="50"
          label="是否评论"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isComment=='0'?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          width="50"
          prop="isDownload"
          label="是否下载"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isDownload=='0'?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="courseDuration"
          label="课程时间"
          align="center"
          width="180"
      >
        <template slot-scope="scope">
<!--          <span>{{scope.row.beginTime+'至'+scope.row.endTime+'('+scope.row.courseDuration+'分钟)'}}</span>-->
          <span>{{scope.row.courseDuration+'分钟'}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间"
          width="160"
          align="center"
      >
      </el-table-column>

      <el-table-column
          label="操作"
          width="320px"
          fixed="right"
          align="center"
      >
        <template slot-scope="scope">
          <el-button :disabled="scope.row.releaseFlag!='1'?false:true" type="primary" size="mini" @click="cmdRelease(scope.row)">
            发布
          </el-button>
          <el-button :disabled="scope.row.releaseFlag=='1'?false:true" type="primary" size="mini" @click="cmdCancel(scope.row)">
            撤销发布
          </el-button>
          <el-button  :disabled="scope.row.releaseFlag=='1'?true:false" type="primary" size="mini" @click="cmdEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger"  :disabled="scope.row.releaseFlag=='1'?true:false" size="mini" @click="cmdDel(scope.row)">
            删除
          </el-button>

        </template>
      </el-table-column>
      <el-table-column
          label="移动"
          width="160px"
          fixed="right"
          align="center"
      >
        <template slot-scope="scope">

          <el-button style="margin-top: 10px" type="primary" size="mini" @click="cmdUp(scope.row)">
            上移
          </el-button>
          <el-button style="margin-top: 10px" type="primary" size="mini" @click="cmdDown(scope.row)">
            下移
          </el-button>

        </template>
      </el-table-column>
      <el-table-column
          label="直播管理"
          width="80px"
          fixed="right"
          align="center"
      >
        <template slot-scope="scope">
          <!--          :disabled="scope.row.releaseFlag=='1'?false:true"-->
          <el-button style="margin-top: 10px"  type="primary" size="mini" @click="goZBMgt(scope.row)">
            管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center;padding-top: 10px">
      <el-pagination
          :current-page="searchParams.pageNo"
          :page-size="searchParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="sizeChange"
          @current-change="currentChange"
      />
    </div>
     <el-dialog title="直播说明：" :visible="tipsVisible" width="500px" @close="tipsVisible=false" append-to-body>
       <el-result v-if="showError==true" icon="error" title="唤起直播失败" subTitle="请检查您是否安装了开播小助手，若没有，则先下载安装对应环境的开播小助手后再重试！">
         <template slot="extra">
           <div>
             <div class="download-tips">
               <p>Windows:</p>
               <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8Bwindows-Setup-1.0.0.zip?spm=a2c4g.609798.0.0.36f22950feHpjk&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8Bwindows-Setup-1.0.0.zip">Windows端开播小助手</el-link>
             </div>
             <div class="download-tips">
                <p>macOS端开播小助手需要根据您使用的电脑芯片来下载对应的安装包</p>
                <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0-arm64.zip?spm=a2c4g.609799.0.0.3d1933a9yyvdaC&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0-arm64.zip">Apple芯片</el-link>
                <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0.zip?spm=a2c4g.609799.0.0.3d1933a9yyvdaC&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0.zip">Intel芯片</el-link>
             </div>
             <el-button type="primary" style="margin:20px 0" size="medium" @click="tipsVisible=false">关闭</el-button>
           </div>

         </template>
       </el-result>
       <div v-else>
         <h2 style="color:#000;margin-bottom: 10px">开播前请注意：</h2>
         <div>1.开播前请下载对应电脑环境的开播小助手并以默认安装路径安装；</div>
         <div>2.仅针对课程类型为“直播”类型的课程才能进行直播；</div>
         <div>3.已经开启过的直播不能再进行直播；</div>
         <div>4.请点击课程名称直接进入直播。</div>

         <h5 style="color:#000;margin-top: 10px">下载提示：</h5>

         <div class="download-tips">
           <p>Windows:</p>
           <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8Bwindows-Setup-1.0.0.zip?spm=a2c4g.609798.0.0.36f22950feHpjk&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8Bwindows-Setup-1.0.0.zip">Windows端开播小助手</el-link>
         </div>
         <div class="download-tips">
           <p>macOS端开播小助手需要根据您使用的电脑芯片来下载对应的安装包</p>
           <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0-arm64.zip?spm=a2c4g.609799.0.0.3d1933a9yyvdaC&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0-arm64.zip">Apple芯片</el-link>
           <el-link type="primary" href="https://alivc-demo-cms.alicdn.com/versionProduct/installPackage/AUI_interaction/deskDevice/%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0.zip?spm=a2c4g.609799.0.0.3d1933a9yyvdaC&file=%E5%BC%80%E6%92%AD%E5%B0%8F%E5%8A%A9%E6%89%8B-1.0.0.zip">Intel芯片</el-link>
         </div>

       </div>
     </el-dialog>
    <dlg-edit-course  v-if="visible" :visible.sync="visible" :classId="classId" :data="formData" @success="search"></dlg-edit-course>
    <el-dialog :title="courseName" :visible="courseVisible" width="70%" @close="courseVisible=false" append-to-body>
      <rich-editor-display v-if="courseType=='3'" :content="richText"></rich-editor-display>

      <video
          v-else-if="courseType=='2'"
          style="width:100%;height: 400px;"
          v-bind:src="courseUrlVideo"
          controls="controls"/>
    </el-dialog>

  </div>
</template>
<script>
import {getList,updateBatch,getLiveUrl,sort} from '../api/course'

import customProtocolCheck from "custom-protocol-check";
import  DlgEditCourse from './DlgEditCourse.vue'
import  RichEditorDisplay from './RichEditorDisplay/index.vue'
import {mapGetters} from "vuex";

export default {
  components: {DlgEditCourse,RichEditorDisplay},
  data () {
    return {
      dataLoading:false,
      visible:false,
      formData:{},
      tableData:[],
      total:0,
      tipsVisible:false,
      searchParams: {
        pageNo:1,
        pageSize:10,
        trainName:'',
      },

      // 遮罩层
      loading: false,
      loadingText:'正在拉取直播链接，请耐心等等',
      // 选中数组
      rows: [],

      showError:false,

      courseName:'',
      courseVisible:false,
      richText:'',
      courseType:'',
      courseUrlVideo:''
    }
  },
  props:{
    classId:[Number,String],
    treeId:[Number,String]
  },
  watch:{

  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created () {
    this.searchParams.classId = this.classId
    if(sessionStorage.getItem('c_searchParams')){
      this.searchParams = JSON.parse(sessionStorage.getItem('c_searchParams'))
      sessionStorage.removeItem('c_searchParams')
    }
    this.search();
  },
  mounted () {

  },
  methods: {

    cmdReturn(){
       this.$emit('showClass')
    },
    showTips(){
      this.showError=false
      this.tipsVisible = true

    },
    async cmdToLive(row){
    console.log('测试',11111111,row,row.releaseFlag)
    if(row.roomState ==2){
        this.$message.error('直播已结束')
      }else if(row.roomState ==0 || row.roomState ==1){
        this.courseType = row.courseType
      //直播
      if(row.courseType=='1'){
        if(row.roomId&&row.userId&&row.speaker){
          this.loading=true
          const url =await this.getLiveUrl(row)
          this.loadingText='正在唤起直播，请稍后'
          let _this = this

          customProtocolCheck(
              url,
              (res) => {
                // console.log("000:",res)
                // 没有协议
                // 建议此处实现提示下载的弹窗
                _this.loading=false
                _this.loadingText='唤起失败'
                _this.showError=true
                _this.tipsVisible = true

              },
              (res) => {
                // console.log("111:",res)
                // 呼起成功
                _this.loading=false
                _this.loadingText='唤起成功'

              },
          );
        }
        else{
          this.$message.error('直播数据错误，请联系管理员！')
        }
      }
      //视频
      else if(row.courseType=='2'){
        this.courseName = row.trainName
        this.courseUrlVideo = row.uploadUrl
        this.courseVisible = true
      }
      //文章
      else if(row.courseType=='3'){
         this.courseName = row.trainName
         this.richText = row.articleContent
         this.courseVisible = true
      }
      //链接
      else if(row.courseType=='4'){
        window.open(row.uploadUrl, '_blank');
      }

      }
    
    

    },
    async getLiveUrl(row){
      let url
      await getLiveUrl({user_id:row.userId,user_name:row.speaker,live_id:row.roomId}).then(res => {
           url = res.live_jump_url
      });
      return url
    },
    /**
     * 新增
     */
    cmdAdd(){
      this.formData={}
       this.visible=true
    },


    /**
     * 发布
     */
    cmdRelease(row){
      this.batchUpdateRe(0,row)
    },
    /**
     * 撤销
     */
    cmdCancel(row){
      this.batchUpdateRe(1,row)
      if(row.releaseFlag ==1){
        this.$confirm('确认撤销吗', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parm2=[{trainId:row.trainId,releaseFlag:0}]
        updateBatch(parm2).then((res)=>{
          this.search()
          this.$message({
            type: 'success',
            message: '撤销成功!'
          });
        })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      }
    },
    /**
     * 删除
     */
    cmdDel(row){
      this.batchUpdateRe(2,row)
    },

    /**
     * actionType:0 发布  1 撤销  2 删除
     * status：0 未发布 1 已发布 2 撤销 3 删除
     * @param actionType
     */
    batchUpdateRe(actionType,row){
      console.log('测试111111',row)
      let _this = this
      let actionText = actionType==0?'发布':actionType==1?'撤销':'删除'
      let confirmTips = '确认'+actionText+'吗'
      let errorTips = '请选择需要'+actionText+'的课程!'

      let selectRows = row?[row]:this.rows

      let select = []
      //操作发布
      if(actionType==0){
        select = selectRows.filter(item => item.releaseFlag != '1')
        if(select.length==0){
          errorTips="课程已发布！"
          return
        }

      }
      //操作撤销
      else if(actionType==1){
        select = selectRows.filter(item => item.releaseFlag == '1'&&item.roomState=='0')
        if(select.length==0){
          errorTips="仅已发布且直播状态为待开播的课程才能撤销发布！"
          return
        }
      }
      //操作删除
      else if(actionType==1){
        select = selectRows.filter(item =>item.releaseFlag != '1')
        if(select.length==0) {
          errorTips="仅非已发布的课程才能进行删除！"
          return
        }
      }

      //有需要更新的数据
     
      if(select.length>0){
        let status =  actionType==0?'1':actionType==1?'2':'3'
        select = select.map(item=>{
          return {classId:item.classId,trainId:item.trainId,releaseFlag:status}
        })
        let params = row?[{classId:row.classId,trainId:row.trainId,releaseFlag:status}]:select
        this.$confirm(confirmTips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          updateBatch(params).then(res => {

            if(res.data==true){
              _this.$message.success(actionText+'成功！')
              _this.search()
            }

          });
        }).catch(() => {

        });
      }


    },


    cmdSearch() {
      this.searchParams.pageNo = 1;
      this.search();
    },
    /**
     * 编辑
     */
    cmdEdit(row){
         this.formData = row||{}
         this.visible=true
    },
    cmdUp(row){
        this.sortRequest({trainId:row.trainId,classId:this.classId,sort:true})
    },
    cmdDown(row){
        this.sortRequest({trainId:row.trainId,classId:this.classId,sort:false})
    },
    /**
     *
     * @param sortValue
     */
    sortRequest(params){
      sort(params).then(res => {
          if(res.code==0){
            this.search()
          }
      });
    },
    goZBMgt(row){

      sessionStorage.setItem('c_searchParams',JSON.stringify(this.searchParams))
      this.$router.push('/manage/commentMgt?trainId='+row.trainId)
    },
    /**
     * 查询数据
     */
    search(){
      this.dataLoading = true;
      console.log('查询数据',this.searchParams)
      getList(this.searchParams).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.dataLoading = false;
        this.$emit('closeLoading')
      });
    },
    sizeChange(val){
      this.searchParams.pageSize=val
      this.search()
    },
    currentChange(val){
      this.searchParams.pageNo=val
      this.search()
    },
    /**
     * 多选
     * @param val
     */
    handleSelectionChange (val) {
      this.rows = val.map(item=>{
        return {classId:item.classId,releaseFlag:item.releaseFlag,trainId:item.trainId}
      })
    },

  }
}
</script>
<style scoped>
.search-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.search-cmd{
  display: flex;
  align-items: center;
}
.download-tips{
  margin-bottom: 20px;
}

</style>
