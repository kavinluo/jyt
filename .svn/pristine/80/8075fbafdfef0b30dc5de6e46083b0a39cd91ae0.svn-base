<template>
  <div style="overflow-y:scroll;height:100%;">
    <el-form
      ref="formValidate"
      :model="formValidate"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item>
        <editor-bar
          v-model="formValidate.contentDetails"
          :is-clear="isClear"
          :id-edit="editorType"
          @change="changeEditor($event, 'contentDetails')"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('formValidate')"
        >
          保存
        </el-button>
        <el-button @click="resetForm('formValidate')">
          保存并发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from './api'
import editorBar from '@/components/tiku/jichutiku/editor/editoritem.vue'
export default {
  components: {editorBar},
  props: ['operailityData'],
  data () {
    return {
      editorType: 'edit',
      api,
      timeLineHeight: '',
      formValidate: {
        contentDetails: '',
        contentDisplay: '',
        categoryId: '1329257498923835394',
        // categoryTitle: this.operailityData.categoryTitle,
        contentType: 'BASE',
        categoryTitle: '关于我们'
      },
      isClear: false
    }
  },
  created () {
    // this.formValidate.contentDetails = this.dataObj.contentDetails
    this.init()
  },
  mounted () {
    this.timeLineHeight = document.documentElement.clientHeight - 210
    window.onresize = () => {
      this.timeLineHeight = document.documentElement.clientHeight - 210
    }
  },
  methods: {
    init () {
      let opt = {
        ajaxSuccess: res => {
          this.formValidate.contentDetails = res.data.contentDetails
        },
        ajaxParams: {
          url: 'cms/cmsContent/getByLinkCategoryId/' + '1329257498923835394',
          method: 'get'
        }
      }
      this.ajax(opt)
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      // this.tempData[type] = res.textContent
    },
    // 保存
    submitForm (formName) {
      if (this.formValidate.contentImg !== '') {
        this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
      }
      this.formValidate.contentDisplay = '0'
      this.$refs[formName].validate((valid) => {
        let opt = {
          ajaxSuccess: 'submitSuccess',
          ajaxParams: {
            url: this.type === 'edit' ? api.modify.path + this.operailityDatas.id : api.addList.path,
            method: this.type === 'edit' ? 'put' : 'post',
            jsonString: true,
            data: this.formValidate
          }
        }
        this.ajax(opt)
      })
    },
    // 保存并发布
    resetForm (formName) {
      this.formValidate.contentImg = JSON.stringify(this.formValidate.contentImg)
      this.formValidate.contentDisplay = '1'
      this.$refs[formName].validate((valid) => {
        let opt = {
          ajaxSuccess: 'submitSuccess',
          ajaxParams: {
            url: this.type === 'edit' ? api.modify.path + this.operailityDatas.id : api.addList.path,
            method: this.type === 'edit' ? 'put' : 'post',
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
.toolbar {
    margin-top: 20px;
}
</style>
