<template>
  <div class="list-class">
    <div class="search-box">
      <el-button-group>
        <el-button type="primary"    class="blueBtn"  @click="cmdAdd()">新建班级</el-button>
        <el-button type="primary"    class="blueBtn" @click="cmdRelease()" style="margin:0 20px">批量发布</el-button>
        <el-button type="primary"    class="blueBtn" @click="cmdCancel()" style="margin-right:20px">批量撤销</el-button>
        <el-button type="danger"    size="mini" @click="cmdDel()" style="background-color: orangered">删除</el-button>
      </el-button-group>
      <div class="search-cmd">
        <el-input v-model="searchParams.className" placeholder="请输入关键性文字"></el-input>
        <el-button  class="blueBtn" type="primary" style="margin-left: 30px" @click="cmdSearch">查询</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="dataLoading"
      :height="650"
      :header-cell-style="{ background: '#eef1f6' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center"
      />
      <el-table-column
        prop="className"
        label="名称"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-link @click="cmdToCourseMgt(scope.row)" style="color: #0b8aec">{{scope.row.className}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="releaseFlag"
        label="状态"
        width="120"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.releaseFlag=='1'?'已发布':'未发布'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" align="center" prop="classPhoto" width="100">
        <template slot-scope="scope">
          <img  :src="scope.row.classPhoto" :width="50" :height="50"/>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="dept.name"-->
<!--          label="分类"-->

<!--          align="center"-->

<!--      />-->
      <el-table-column
        prop="classTeacher"
        label="班主任"
        align="center"
      />
      <el-table-column
        prop="speaker"
        label="主讲"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="是否评论"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isComment=='0'?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="是否下载"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.isDownload=='0'?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180px"
        prop="annex"
        label="资料附件"
        align="center"
      >
        <template slot-scope="scope">
          <el-link @click="cmdDownLoad(scope.row.annex)" style="color: #0b8aec">{{fileName(scope.row.annex)}}</el-link>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="courseDuration"-->
<!--          label="有效时间"-->
<!--          align="center"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.beginTime+'至'+scope.row.endTime+'('+scope.row.effectiveTime+'天)'}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        prop="createTime"
        width="180"
        label="创建时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        min-width="450px"
        label="操作"
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
          <el-button type="primary" size="mini" @click="addPersonnel(scope.row)">
            新增人员
          </el-button>
          <el-button  :disabled="scope.row.releaseFlag=='1'?true:false" type="primary" size="mini" @click="cmdEdit(scope.row)">
            编辑
          </el-button>
          <el-button  :disabled="scope.row.releaseFlag=='1'?true:false"  type="danger" size="mini" @click="cmdDel(scope.row)">
            删除
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
        @size-change="changePageSize"
        @current-change="changePage"
      />
    </div>

    <dlg-edit-class  v-if="visible" :treeId="treeId" ref="child" :visible.sync="visible" :data="formData" @success="search"></dlg-edit-class>
  </div>
</template>
<script>
import {getList,del,updateBatch} from '../api/class'

import DlgEditClass from './DlgEditClass.vue'
import {download} from "../utils/DownloadUtils";

export default {
  components: {DlgEditClass},
  data () {
    return {
      currentClass:null,
      showCourseMgt:false,
      visible:false,
      formData:{},
      tableData:[],
      total:0,
      searchParams: {
        pageNo:1,
        pageSize:10,
        className:'',
        treeId:''
      },
      dataLoading:false,

      // 遮罩层
      loading: true,
      // 选中数组
      rows: [],
    }
  },
  watch:{
    treeId(val){
      if(val){
        if(this.dataLoading==false){
          this.searchParams.treeId = val
          this.searchParams.pageNo=1
          this.searchParams.className=''
          this.search()
        }else this.$message.warning('正在加载数据，请勿频繁点击！')

      }
    }
  },
  props:{
    treeId:[Number,String]
  },
  computed:{
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

  created () {
    this.searchParams.treeId = this.treeId
    this.search();
  },
  mounted () {

  },
  methods: {
    cmdDownLoad(file){
      download(file,this.fileName(file))
    },
    cmdToCourseMgt(row){
      this.$emit('showCourse',row.classId)
    },
    /**
     * 新增
     */
    cmdAdd(){
      if(this.treeId){
        this.formData = {}
        this.visible=true
      }else{
        this.$message.error('请先在左侧树选择班级类型！')
      }

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
      let _this = this
      let actionText = actionType==0?'发布':actionType==1?'撤销':'删除'
      let confirmTips = '确认'+actionText+'吗'
      let errorTips = '请选择需要'+actionText+'的班级!'

      //针对行内操作已经通过行内状态判断按钮的disabled，故此处针对批量操作判断
      let select = row?[row]:[]
      if(!row) {
        if (this.rows.length > 0) {
          //针对发布和删除的操作，需要过滤出未发布的数据
          if (actionType == 0 || actionType == 2)
            select = this.rows.filter(item => item.releaseFlag != '1')
          else if (actionType == 1) {
            select = this.rows.filter(item => item.releaseFlag == '1')
          }
        }
        else{
          _this.$message.error(errorTips)
          return
        }
      }

      //有需要更新的数据
      if(select.length>0){
        let status =  actionType==0?'1':actionType==1?'2':'3'
        select = select.map(item=>{
          return {classId:item.classId,releaseFlag:status}
        })
        let params = row?[{classId:row.classId,releaseFlag:status}]:select
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
      else if(this.rows.length>0){
        errorTips = actionType==1?'未发布的班级不存在批量撤销！':actionType==0?'班级已发布！':actionType==2?'已发布的班级不能删除！':null
        if(errorTips)
          _this.$message.error(errorTips)
      }

    },

    cmdSearch() {
      this.searchParams.pageNo = 1
      this.search()
    },
    /**
     * 编辑
     */
    cmdEdit(row){
      this.formData = row||{}
      this.visible=true

    },
    /**
     * 查询数据
     */
    search(){
      this.dataLoading = true;
      getList(this.searchParams).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.dataLoading = false;
        this.$emit('closeLoading')
        sessionStorage.setItem('classTotal_'+this.searchParams.treeId,this.total)
      });
    },
    // 新增人员
    addPersonnel (row) {
      this.$emit('setStep','detail',row)
    },
    changePageSize(val){
      this.searchParams.pageSize=val
      this.search()
    },
    changePage(val){
      this.searchParams.pageNo=val
      this.search()
    },
    /**
     * 多选
     * @param val
     */
    handleSelectionChange (val) {
      this.rows = val.map(item=>{
        return {classId:item.classId,releaseFlag:item.releaseFlag}
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

</style>
