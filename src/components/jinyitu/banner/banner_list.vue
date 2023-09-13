<template>
  <div>
    <el-form
      ref="formValidate"
      :model="formValidate"
      class="demo-ruleForm"
    >
      <el-form-item>
        <draggable
          animation="400"
          @update="dragEnd"
        >
          <div class="img" v-for="(item, index) in contentList" :key="index">
            <div class="box">
              <span style="font-size:20px;margin:10% 0 0 35%;">{{ index + 1 }}</span>
            </div>
            <i class="el-icon-close" style="float: right;font-size: 22px;margin-top: -48px;cursor: pointer;" @click="removeImg(index)"></i>
            <uploadBanner
              :image-url="item.url"
              :uploadUrl="'api/passport/infra/file/upload'"
              :show-file-list="false"
              @setUploadFiles="setUploadFiles($event)"
            />
            <el-input v-model="item.path"  style="width: 200px;margin-left:23%;"/>
          </div>
        </draggable>
        <div class="minus">
          <span style="margin:25% 0 0 20%;font-size:50px;cursor: pointer;"><i class="el-icon-plus" @click="add"></i></span>
          <span style="margin:25% 0 0 25%;font-size:50px;cursor: pointer;"><i class="el-icon-minus" @click="remove()"></i></span>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:5%;">
        <el-button
          type="primary"
          @click="submitForm('formValidate')"
        >
          更新
        </el-button>
        <el-button @click="resetForm('formValidate')">
          更新并发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api'
import uploadBanner from '@/components/common/uploadBanner.vue'
import draggable from 'vuedraggable'
export default {
  components: {
    uploadBanner,
    draggable
  },
  data () {
    return {
      formValidate: {
        contentImg: [],
        contentDisplay: '',
        categoryId: '1329257282518720513',
        contentType: 'BASE',
        // categoryTitle: this.operailityData.categoryTitle
        categoryTitle: '课程Banner'
      },
      imgId: '',
      contentArr: [],
      path: '',
      imgList: {},
      contentList: [],
      contentLis: [],
      canEdit: true
    }
  },
  created () {
    this.init()
    // 设置请求头部
    this.headers = {
      'Token': this.$util.getCookie('Token')
    }
  },
  methods: {
    init () {
      let opt = {
        ajaxSuccess: res => {
          if (res.data.contentImg !== null) {
            this.contentList = JSON.parse(res.data.contentImg)
          }else {
            this.contentList = []
          }
          this.imgId = res.data.id

        },
        ajaxParams: {
          url: 'cms/cmsContent/getByLinkCategoryId/' + '1329257282518720513',
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    dragEnd (e) {
      e.preventDefault() // 通知 Web 浏览器不要执行与事件关联的默认动作
      let oldItem = this.contentList[e.oldIndex]
      // 将图片数组改变前的索引数据保存到临时数组 oldItem
      let newItem = this.contentList[e.newIndex]
      // 将图片数组改变后的索引数据保存到临时数组 newItem
      this.contentList[e.oldIndex] = newItem
      // 替换拖动前图片数组索引数据
      this.contentList[e.newIndex] = oldItem
      // 替换拖动后图片数组索引数据
      // this.$forceUpdate()
    },
    // 添加
    add () {
      // if (this.contentList.length < 3) {
      this.contentList.push({
        url: '',
        name: '',
        path: '',
        id: ''
      })
      // }else {
      // this.$message({
      //   message: '最多只能添加三张图片',
      //   type: 'warning'
      // })
      // }
    },
    // 删除
    remove () {
      if (this.contentList.length === 1) {
        this.$message({
          message: '最后一张图片不可删除',
          type: 'warning'
        })
        return
      }
      this.contentList.pop()
    },
    removeImg (index) {
      // if (index !== -1) {
      this.contentList.splice(index, 1)
      this.$forceUpdate()
      this.formValidate.contentImg = JSON.stringify(this.contentList)
      let opt = {
        ajaxSuccess: res => {
          if (res.code === 0) {}
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        },
        ajaxParams: {
          url: api.modify.path + this.imgId,
          method: 'put',
          jsonString: true,
          data: this.formValidate
        }
      }
      this.ajax(opt)
      // }
    },
    setUploadFiles (res) {
      this.imgList = res
      this.contentList.forEach(item => {
        if (item.url === '') {
          item.url = this.imgList.url
          item.name = this.imgList.name
          item.id = this.imgList.id
        }
      })
    },
    // 保存
    submitForm (formName) {
      if (this.contentList.length > 0) {
        this.formValidate.contentImg = this.contentList
      }
      this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
      this.formValidate.contentDisplay = '0'
      this.$refs[formName].validate((valid) => {
        let opt = {
          ajaxSuccess: 'submitSuccess',
          ajaxParams: {
            url: this.imgId !== null ? api.modify.path + this.imgId : api.addList.path,
            method: this.imgId !== null ?'put' : 'post',
            jsonString: true,
            data: this.formValidate
          }
        }
        this.ajax(opt)
      })
    },
    // 保存并发布
    resetForm (formName) {
      if (this.contentList.length > 0) {
        this.formValidate.contentImg = this.contentList
      }
      this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
      this.formValidate.contentDisplay = '1'
      this.$refs[formName].validate((valid) => {
        let opt = {
          ajaxSuccess: 'submitSuccess',
          ajaxParams: {
            url: this.imgId !== null ? api.modify.path + this.imgId : api.addList.path,
            method: this.imgId !== null ?'put' : 'post',
            jsonString: true,
            data: this.formValidate
          }
        }
        this.ajax(opt)
      })
    },
    submitSuccess (res) {
      if (res.code === 0) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
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
</style>
