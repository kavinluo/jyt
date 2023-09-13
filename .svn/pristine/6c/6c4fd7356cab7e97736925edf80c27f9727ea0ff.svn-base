<template>
  <div>
    <div class="img" v-for="(item, index) in imgList" :key="index">
      <div class="box">
        <span style="font-size:20px;margin:30% 0 0 35%;">{{ index + 1 }}</span>
      </div>
      <i class="el-icon-close" style="float: right;font-size: 22px;margin-top: -48px;cursor: pointer;"></i>
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUploada"
      >
        <img
          v-if="item.covericon"
          class="avatar"
          :src="item.covericon"
        />
        <!-- :src="api + coverImg" -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p style="color:#aaaaaa;text-align: center;font-size:15px;">请上传JPG/PNG/JPEG格式的图片。</p>
    </div>
    <div class="minus">
      <span style="margin:25% 0 0 20%;font-size:50px;cursor: pointer;"><i class="el-icon-plus" @click="add"></i></span>
      <span style="margin:25% 0 0 25%;font-size:50px;cursor: pointer;"><i class="el-icon-minus" @click="remove()"></i></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loadingstate: false,
      imgList: [
        {
          covericon: ''
        }
      ]
    }
  },
  methods: {
    add () {
      this.imgList.push({covericon: '' })
      console.log(this.imgList)
    },
    remove () {
      this.imgList.forEach((item, index)=> {
        if (index !== 0) {
          this.imgList.splice(index, 1)
        }
      })
      console.log(this.imgList, ';this.imgList')
    },
    // 封面上传
    handleAvatarSuccess (response, file, fileList) {
      this.loadingstate = false
    },
    // 文件格式验证
    beforeAvatarUploada (file) {
      this.loadingstate = true
      let index = file.name.lastIndexOf('.')
      let extension = file.name.substr(index + 1)
      let extensionList = [
        'png',
        'PNG',
        'jpg',
        'JPG',
        'jpeg',
        'JPEG'
      ]
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message({
          message: '封面不可超出10M',
          type: 'warning',
          center: true
        })
        return false
      }
      if (extensionList.indexOf(extension) < 0) {
        this.$message({
          message: '当前文件格式不支持',
          type: 'error',
          center: true
        })
        return false
      }
      // }
    }
  }
}
</script>
<style scoped>
.img {
  width:370px;
  height:230px;
  border: 1px solid #d7d7d7;
  display:inline-block;
}
.minus {
  width:370px;
  height:230px;
  border: 1px solid #d7d7d7;
}
.box {
  width:50px;
  height:50px;
  border: 1px solid #d7d7d7;
  border-radius: 50%;
}
::v-deep .el-upload.el-upload--text {
    border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
