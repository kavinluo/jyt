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


      <div style="width: 98%;padding: 20px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="轮播图片" prop="homePhoto">
            <sf-upload
                :showFileList="false"
                accept="image/*"
                :on-success="uploadCoverSuccess"
                class="cover-uploader-1"
            >
              <el-image
                  v-if="form.homePhoto"
                  :src="form.homePhoto"
                  fit="contain"
                  class="cover"
              ></el-image>
              <i v-else class="el-icon-plus cover-uploader-icon"></i>
            </sf-upload>
          </el-form-item>
          <el-form-item label="标题" prop="homeName">
            <el-input v-model="form.homeName" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="跳转链接" prop="link">
            <el-input v-model="form.link" placeholder="请输入跳转链接" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入排序" />
          </el-form-item>
          <el-form-item label="状态" prop="state">

              <el-radio-group v-model="form.state">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group>

          </el-form-item>
<!--          <el-form-item label="备注" prop="remark">-->
<!--            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />-->
<!--          </el-form-item>-->
        </el-form>

      </div>


      <div slot="footer" class="dialog-footer">
        <el-button
            type="primary"
            size="small"
            @click="cmdSubmit"
        >
          确定
        </el-button>

        <el-button size="small" @click="closeDialog">
          取消
        </el-button>
      </div>
    </sf-dialog>
  </div>
</template>

<script>
import SfUpload from './Upload/Upload.vue'
import SfDialog from './Dialog/Dialog.vue'
import {create, update} from '../api/banner'
export default {
  name: "DlgEditClass",
  props:{
    visible: Boolean,
    data: Object
  },
  components:{
    SfDialog,
    SfUpload,

  },
  data() {
    return {

      previewImagePath:'',
      saveLoading:false,

      title: '新增',
      dialogVisible:false,
      formData:{},
      options:[],

      // 表单参数
      form: {
          state:'1',
          homePhoto: ''
      },
      // 表单校验
      rules: {
        // homePhoto: [
        //   { required: true, message: "轮播图片不能为空", trigger: "blur" }
        // ],
        homeName: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],

        sort: [
          { required: true, message: "排序不能为空", trigger: "blur" }
        ],
        //0禁用 1启用
        state: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
      }
    }
  },


  methods: {

    uploadCoverSuccess(res){
      this.$set(this.form,'homePhoto',res.data.url)
    },

    cmdSubmit(){

      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true;
          let _request = this.data.id?update:create
          _request(this.form).then(res => {
            this.$message.success('保存成功！')
            this.loading = false;
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
    console.log(' this.data:',this.data )
    if (this.data.id){
      this.title ='编辑'
      this.form = Object.assign({},this.data)

    } else {
      this.title = '新增'
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
