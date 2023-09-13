<template>
  <div class="app-container">
    <div class="search-box">
      <el-button class="blueBtn" type="primary" @click="cmdAdd">新增</el-button>
      <div class="search-cmd">
        <el-input v-model="searchParams.homeName" placeholder="请输入关键性文字"></el-input>
        <el-button class="blueBtn" type="primary" style="margin-left: 30px" @click="cmdSearch">查询</el-button>
      </div>
    </div>
<!--    v-loading="loading"-->
    <el-table   v-loading="dataLoading"   :height="650" :data="tableData" @selection-change="handleSelectionChange">
<!--      <el-table-column type="selection" width="55" align="center" />-->
      <!-- <el-table-column label="ID" align="center" prop="id" /> -->
      <el-table-column label="轮播图片" align="center" prop="homePhoto" width="100">
        <template slot-scope="scope">
          <img  :src="scope.row.homePhoto" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" prop="homeName" />

      <el-table-column label="跳转链接" align="center" prop="link" />
      <el-table-column label="状态" align="center" prop="state">
        <template slot-scope="scope">
            <span>{{scope.row.state=='1'?'启用':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="cmdUpdate(scope.row)"

          >修改</el-button>
          <el-button
              size="mini"

              type="text"
              icon="el-icon-delete"
              @click="cmdDel(scope.row)"

          >删除</el-button>
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



    <dlg-edit-banner  v-if="visible" :visible.sync="visible" :data="formData" @success="cmdSearch"></dlg-edit-banner>
  </div>
</template>

<script>

import {getList,del} from '../api/banner'
import  DlgEditBanner from '../components/DlgEditBanner.vue'

export default {
  components: {DlgEditBanner},
  name: "Banner",
  data() {
    return {
      dataLoading:false,
      visible:false,
      formData:{},
      tableData:[],
      total:0,
      searchParams: {
        pageNo:1,
        pageSize:10,
        homeName:'',
      },

      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],




    };
  },
  created() {
    this.search();
  },
  methods: {
    cmdAdd(){
      console.log('列表1的数据',this.tableData)
      if(this.tableData.length<3){
        this.formData={}
      this.visible=true
      }else{
        this.$message.error('最多添加三种图片');
      }
     
    },
    cmdUpdate(row){
      this.formData = row||{}
      this.visible=true
    },
    cmdDel(row){
      let _this = this
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(row.id).then(res => {
          if(res.data==true){
            _this.$message.success('删除成功！')
            _this.search()
          }

        });
      }).catch(() => {

      });


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

    // 取消按钮
    cancel() {
      // this.open = false;
      // this.reset();
    },
    // // 表单重置
    reset() {
      // this.form = {
      //   id: null,
      //   imgUrl: null,
      //   title: null,
      //   group: null,
      //   linkUrl: null,
      //   orderNum: null,
      //   status: null,
      //   remark: null,
      //   createBy: null,
      //   createTime: null,
      //   updateBy: null,
      //   updateTime: null
      // };
      // this.resetForm("form");
    },
    // /** 搜索按钮操作 */

    // /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },



  }
};
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
