<template>
  <div>
    <!-- 新建班级 -->
    <sf-dialog
        :visible="visible"
        :title="title"
        width="50%"
        @close="closeDialog"
        @update:visible="val => $emit('update:visible', val)"
    >


      <div style="width: 98%;padding: 20px">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="文件夹名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入文件夹名称" />
          </el-form-item>
          <el-form-item label="简介" prop="trainAbstract">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入简介"
                v-model="form.trainAbstract">
            </el-input>
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="1">题组</el-radio>
              <el-radio label="0">节点</el-radio>
            </el-radio-group>

          </el-form-item>
          <el-form-item label="管理员" prop="remark" >
            <el-input v-model="form.creator" placeholder="请输入管理员" />
          </el-form-item>

          <el-form-item label="创建人" v-if="optType==1">
               <span>{{node.creator}}</span>
          </el-form-item>
          <el-form-item label="创建时间" v-if="optType==1">
            <span>{{node.createTime}}</span>
          </el-form-item>
        </el-form>

      </div>


      <div slot="footer" class="dialog-footer">
        <el-button
            type="primary"
            :loading="saveLoading"
            size="small"
            @click="cmdSubmit"
        >
          提交
        </el-button>

        <el-button size="small" @click="reset">
          重置
        </el-button>
      </div>
    </sf-dialog>
  </div>
</template>

<script>
import {create, update} from '../api/leftTree'
import {mapGetters} from "vuex";
import SfDialog from "./Dialog/Dialog.vue";
export default {
  components:{
    SfDialog
  },
  name: "DlgEditTree",
  props:{
    visible: Boolean,
    node: Object,
    optType:0,//0新增 1：修改
  },
  computed:{
    ...mapGetters(['userInfo']),
    nowTime(){
      return ''
    }
  },

  data() {
    return {

      previewImagePath:'',
      saveLoading:false,

      title: '新建节点',
      dialogVisible:false,
      formData:{},
      options:[],

      // 表单参数
      form: {
        name:'',
        trainAbstract:'',
        type:'0',
        creator:''
       },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "文件夹名称不能为空", trigger: "blur" }
        ],
        //0节点 1题组
        type: [
          { required: true, message: "请选择类别", trigger: "blur" }
        ],

        creator: [
          { required: true, message: "请输入管理员", trigger: "change" }
        ],
      }
    }
  },


  methods: {
    reset(){
      this.$refs['form'].resetFields();
    },
    cmdSubmit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.saveLoading = true;
          this.form.parentId = this.optType==1?this.node.parentId:this.node.id?this.node.id:0
          this.form.parentId=this.form.type=='1'?0:this.form.parentId
          let _request = this.optType==1?update:create
        
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

    /**
     * 关闭弹窗
     */
    closeDialog() {
      // 关闭弹窗
      this.$emit('update:visible', false)


    }
  },
  async created() {
    console.log("this.node:",this.node)
    if (this.optType==1){
      this.title ='编辑节点'
      this.form.treeId=this.node.id
      this.form.name = this.node.name
      this.form.creator = this.node.creator
      this.form.type = this.node.type
      this.form.trainAbstract=this.node.trainAbstract

    } else {
      this.title = '新增节点'

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
