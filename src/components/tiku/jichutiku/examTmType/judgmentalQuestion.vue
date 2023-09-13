<!----------------------------------
****--@name     判断题
****--@role     ${*}
****--@date     2022/12/19
****--@author   yyl
----------------------------------->
<template>
  <div>
    <div class="tmContent">题目内容：</div>
    <el-row>
      <el-col :span="20">
        <el-input v-if="tmContentShowType" type="textarea" :rows="5" v-model="formValidate.tmContent" placeholder="请输入"></el-input>
        <editor-bar v-else v-model="formValidate.tmContent" :isClear="formValidate.isClear"
                    @change="changeEditor($event, 'tmContent')" :idEdit="editorType"></editor-bar>
      </el-col>
      <el-col :span="4" style="line-height: 35px" align="center">
        <el-button class="blueBtn" @click="changeInput('tmContent')">{{tmContentShowType ? '图文编辑' : '文本编辑'}}</el-button>
        <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :length="1" :uploadFiles="formValidate.fileRespVO"
                     @setUploadFiles="setUploadFiles($event, 'videoFileId')"
                     :tipShow="false">
        </upload-file>
      </el-col>
    </el-row>
    <div v-if="formValidate.tmType === '判断题'">
      <div class="tmReferenceData">候选项：</div>
      <el-radio v-model="formValidate.tmAnswer" label="1" style="line-height: 30px">对</el-radio>
      <br>
      <el-radio v-model="formValidate.tmAnswer" label="0" style="line-height: 30px">错</el-radio>
    </div>
    <div v-else-if="formValidate.tmType !== '判断题'">
      <div class="tmExplain">标准答案：</div>
      <el-row>
        <el-col :span="20">
          <el-input v-if="tmAnswerShowType" type="textarea" :rows="4" v-model="formValidate.tmAnswer" placeholder="请输入"></el-input>
          <editor-bar v-else v-model="formValidate.tmAnswer" :isClear="formValidate.isClear"
                      @change="changeEditor($event, 'tmAnswer')" :idEdit="editorType"></editor-bar>
        </el-col>
        <el-col :span="4" style="line-height: 35px" align="center">
          <el-button class="blueBtn" @click="changeInput('tmAnswer')">{{tmAnswerShowType ? '图文编辑' : '文本编辑'}}</el-button>
          <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :length="1"
                       @setUploadFiles="setUploadFiles($event, 'videoAnswerFileId')" :uploadFiles="formValidate.answerFileRespVO"
                       :tipShow="false">
          </upload-file>
        </el-col>
      </el-row>
    </div>
    <div class="tmExplain">答案解析：</div>
    <el-row>
      <el-col :span="20">
        <el-input v-if="tmExplainShowType" type="textarea" :rows="4" v-model="formValidate.tmExplain" placeholder="请输入"></el-input>
        <editor-bar v-else v-model="formValidate.tmExplain" :isClear="formValidate.isClear"
                    @change="changeEditor($event, 'tmExplain')" :idEdit="editorType"></editor-bar>
      </el-col>
      <el-col :span="4" style="line-height: 35px" align="center">
        <el-button class="blueBtn" @click="changeInput('tmExplain')">{{tmExplainShowType ? '图文编辑' : '文本编辑'}}</el-button>
        <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :length="1"
                     @setUploadFiles="setUploadFiles($event, 'videoAnswerExplainFileId')" :uploadFiles="formValidate.answerExplainFileRespVO"
                     :tipShow="false">
        </upload-file>
      </el-col>
    </el-row>
    <div class="tmReferenceData">参考资料：</div>
    <el-row>
      <el-col :span="24">
        <el-input type="textarea" :rows="4" v-model="formValidate.tmReferenceData" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <div style="margin-top: 20px;text-align: center">
      <el-button class="blueBtn" @click="submit('continue')">保存并继续录入</el-button>
      <el-button class="blueBtn" @click="submit('close')">保存并关闭录入</el-button>
    </div>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import editorBar from '../editor/editoritem'
import uploadFile from '../../../common/uploadFile'
// 当前组件引入全局的util
export default {
  props: ['tmTypeObj', 'examTmTypeObj', 'editData'],
  data () {
    return {
      editorType: 'add',
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      formValidate: {
        tmMark: '',
        tmContent: '', // 题目内容
        tmExplain: '', // 答案解析
        tmAnswer: '', // 题目答案
        tmReferenceData: '',
        isVideo: 0,
        videoFileId: '',
        tmType: '',
        tmTypeId: '',
        tmBaseType: '',
        isClear: false, // 用于富文本
        videoAnswerExplainFileId: '',
        isAnswerExplainVideo: 0,
        isAnswerVideo: 0,
        videoAnswerFileId: '', // 标准答案
        textTmContent: '',
        isEnclosure: false, // 此题是否有附件
        answerExplainFileRespVO: null,
        answerFileRespVO: null,
        fileRespVO: null
      },
      tmContentShowType: true, // 题目内容输入框方式  true为input false为富文本
      tmExplainShowType: true,
      tmAnswerShowType: true
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.tempData = this.$options.data().tempData
      this.formValidate = this.$options.data().formValidate
      if(this.editData.id) {
        console.log(this.editData)
        let tmDetailQuestionVO = this.editData.tmDetailQuestionVO
        for(let k in this.formValidate) {
          this.formValidate[k] = tmDetailQuestionVO[k] != null ? tmDetailQuestionVO[k] : this.formValidate[k]
        }
        console.log(this.formValidate)
      }
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      this.tempData[type] = res.textContent
    },
    changeInput (content) {
      if((typeof content === 'string') && content.constructor === String) {
        if(!this[content + 'ShowType'] || !this[content + 'ShowType']) {
          this.formValidate[content] = this.tempData[content]
        }
        this[content + 'ShowType'] = !this[content + 'ShowType']
      }else {
        if(!content.showInnput) {
          content.selectContent = content.textContent
        }
        content.showInnput = !content.showInnput
      }
    },
    // eslint-disable-next-line complexity
    setUploadFiles (file, content) {
      if((typeof content === 'string') && content.constructor === String) {
        this.formValidate[content] = file || ''
        console.log(this.formValidate[content])
        if(this.formValidate.videoFileId) {
          this.formValidate.isVideo = 1
        }else {
          this.formValidate.isVideo = 0
          this.formValidate.fileRespVO = null
        }
        if(this.formValidate.videoAnswerExplainFileId) {
          this.formValidate.isAnswerExplainVideo = 1
        }else {
          this.formValidate.isAnswerExplainVideo = 0
          this.formValidate.answerExplainFileRespVO = null
        }
        if(this.formValidate.videoAnswerFileId) {
          this.formValidate.isAnswerVideo = 1
        }else {
          this.formValidate.isAnswerVideo = 0
          this.formValidate.answerFileRespVO = null
        }
      }else {
        content.videoFileId = file || ''
        if(content.videoFileId) {
          content.isVideo = 1
        }else {
          content.isVideo = 0
          content.fileRespVO = null
        }
      }
      if(this.formValidate.isVideo === 1 || this.formValidate.isAnswerExplainVideo === 1 || this.formValidate.isAnswerVideo === 1) {
        this.formValidate.isEnclosure = true
      }else {
        this.formValidate.isEnclosure = false
      }
    },
    submit (type) {
      if(this.formValidate.tmType === '填空题') { // 如果是填空题  把分号换成@#@
        for(let i = 0; i < this.formValidate.tmAnswer.length; i++) {
          if (this.formValidate.tmAnswer[i] === ';') {
            this.formValidate.tmAnswer = this.formValidate.tmAnswer.replace(';', '@#@') // 注意替换之后就变成新数组了
          }
          if (this.formValidate.tmAnswer[i] === '；') {
            this.formValidate.tmAnswer = this.formValidate.tmAnswer.replace('；', '@#@') // 注意替换之后就变成新数组了
          }
        }
      }
      if(this.tempData.tmContent) {
        this.formValidate.textTmContent = this.tempData.tmContent
      }
      console.log(this.formValidate)
      this.$emit('submit', this.formValidate, type, 'judgmentalQuestion')
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.formValidate.tmTypeId = this.tmTypeObj.tmTypeId
    this.formValidate.tmType = this.examTmTypeObj[this.tmTypeObj.tmTypeId].basicType
    this.formValidate.tmBaseType = this.examTmTypeObj[this.tmTypeObj.tmTypeId].basicType
  },
  components: {editorBar, uploadFile}
}
</script>
