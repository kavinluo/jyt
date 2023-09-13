<template>
  <div class="list-class">
    <div class="search-box">
        <el-button type="danger" @click="cmdDel()"     size="mini">删除</el-button>
      <div class="search-cmd">
        <el-input v-model="searchParams.commentContent" placeholder="请输入关键性文字"></el-input>
        <el-button  class="blueBtn"  type="primary" style="margin-left: 30px" @click="cmdSearch">查询</el-button>
        <el-button v-if="$route.query.trainId"  class="blueBtn" type="primary" style="margin-left: 10px" @click="cmdBack">返回</el-button>
      </div>
    </div>
    <el-table
        :data="tableData"
        v-loading="dataLoading"
        :height="650"
        style="width: 100%"
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
          label="课程班"
          width="120"
          align="center"
      >
      <template slot-scope="{ row }">
         <el-link @click="cmdDetail(row)"  style="color: #0b8aec" >{{row.className}}</el-link>
      </template>
      </el-table-column>
      <el-table-column
          prop="commentContent"
          label="评论内容"
          align="center"
      />
      <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          :show-overflow-tooltip="true"
      />
      <el-table-column

          label="头像"
          align="center"
      >
      <template slot-scope="{ row }">
        <img v-if="row.avatar!=null&&row.avatar.length>0" :src="row.avatar" alt="" style="height: 64px;width: 64px">
      </template>
      </el-table-column>
      <el-table-column
          prop="userName"
          label="发布人"
          align="center"
          :show-overflow-tooltip="true"
      />
      <el-table-column
          prop="createTime"
          label="发布时间"
          width="180"
          align="center"
      />
      <el-table-column
          label="操作"
          v-if="$route.query.trainId"
          width="350px"
          fixed="right"
          align="center"
      >
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="cmdReturn(scope.row)">
            回复
          </el-button>
          <el-button  type="primary" size="mini" @click="cmdForbidden(scope.row)">
            禁言
          </el-button>
          <el-button  type="danger" size="mini" @click="cmdDel(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>


    </el-table>

    <div style="text-align: right;padding-top: 10px">
      <el-pagination
          :current-page="searchParams.pageNo"
          :page-size="searchParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="changePageSize"
          @current-change="changePage"
      />
    </div>

    <dlg-detail-comment  v-if="visible" :visible.sync="visible" :data="formData" ></dlg-detail-comment>
    <dlg-return  v-if="visible1" :visible.sync="visible1" :data="formData" @success="search()"></dlg-return>
  </div>
</template>
<script>
import  DlgDetailComment from '../components/DlgDetailComment.vue'
import  DlgReturn from '../components/DlgReturn.vue'
import {getList,del} from '../api/comment'
import {update} from "../api/course";

export default {
  components: {DlgDetailComment,DlgReturn},
  data () {
    return {
      dataLoading:false,
      tableData:[],
      total:0,
      searchParams: {
        pageNo:1,
        pageSize:10,
        commentContent:'',
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      visible:false,
      visible1:false,
    formData:{},

    }
  },

  created () {
    if(this.$route.query.trainId){
      this.searchParams.commentType=2
      this.searchParams.classId = this.$route.query.trainId
    }
     this.search()
  },
  mounted () {

  },
  methods: {
    changePageSize(e){
      this.searchParams.pageSize=e
      this.search()
    },
    changePage(e){
      this.searchParams.pageNo=e
      this.search()
    },
    cmdBack(){
      sessionStorage.setItem('showCourse',true)
      this.$router.go(-1)
    },
    cmdReturn(row){
      this.formData = row||{}
      this.visible1=true
    },
    cmdForbidden(row){
      update({isComment:'1',trainId:row.classId}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.dataLoading = false;
      });
    },
    cmdDetail(row){
      this.formData = row||{}
      this.visible=true
    },
    cmdSearch() {
      this.searchParams.pageNo = 1;
      this.search();
    },

    search(){
      this.dataLoading = true;
      getList(this.searchParams).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.dataLoading = false;
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
     * 删除
     */
    cmdDel(row){
      let _this = this
      let selectIds = row?row.commentId:this.ids

      if( selectIds&&selectIds!=null&&  selectIds.toString().length>0){
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(selectIds).then(res => {
            if(res.code==0){
              _this.$message.success('删除成功！')
              _this.search()
            }

          });
        }).catch(() => {

        });
      }
      else{
        _this.$message.error('请选择需要删除的评论！')
      }

    },



    /**
     * 多选
     * @param val
     */
    handleSelectionChange (val) {
      this.ids = val.map(item => item.commentId).toString()

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
