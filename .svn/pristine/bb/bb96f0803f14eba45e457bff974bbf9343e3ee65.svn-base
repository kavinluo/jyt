<!----------------------------------
****--@name     A1题型
****--@role     ${*}
****--@date     2022/12/15
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
        <upload-file  ref="uploader" :uploadUrl="'/passport/infra/file/upload'" :limit="1" @upload-success="handleUploadSuccess($event, 'videoId')" @upload-error="handleUploadError" >
        </upload-file>
        <div class="echo-file-list" v-if="types === 'edit'">
          <div class="file-item">
            <span class="file-name" @click="showMedia(formValidate,'videoId')">{{ formValidate.stemFileName}}</span>
            <i v-if="formValidate.stemFileName" class="el-icon-delete" style="font-size:17px;" @click="removePath(formValidate, 'videoId')"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-for="(item, index) in formValidate.tmSelectList" :key="index" style="margin-top: 20px">
      <el-col :span="2" style="line-height: 100px">
        <el-radio v-if="formValidate.tmType === '单选题'" v-model="formValidate.tmAnswer" :label="selectContent[index]">{{selectContent[index]}}</el-radio>
        <el-checkbox v-else-if="formValidate.tmType === '多选题'" v-model="item.checked">{{selectContent[index]}}</el-checkbox>
      </el-col>
      <el-col :span="18">
        <el-input v-if="item.showInnput" type="textarea" :rows="4" v-model="item.selectContent" placeholder="请输入"></el-input>
        <editor-bar v-else v-model="item.selectContent" :isClear="formValidate.isClear"
                    @change="changeEditors($event, item)" :idEdit="editorType"></editor-bar>
      </el-col>
      <el-col :span="4" style="line-height: 35px" align="center">
        <el-button class="blueBtn" @click="changeInput(item)">{{item.showInnput ? '图文编辑' : '文本编辑'}}</el-button>
          <upload-file :uploadUrl="'/passport/infra/file/upload'" :limit="1" @upload-success="handleUploadSuccess($event, item)" @upload-error="handleUploadError" >
        </upload-file>
        <div class="echo-file-list" v-if="types === 'edit'">
          <div class="file-item">
            <span class="file-name" @click="showMedia(item,'fileId')">{{ item.fileName}}</span>
            <i v-if="item.fileName" class="el-icon-delete" style="font-size:17px;" @click="removePath(item, 'fileId')"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tmExplain">答案解析：</div>
    <el-row>
      <el-col :span="20">
        <el-input v-if="tmExplainShowType" type="textarea" :rows="4" v-model="formValidate.tmExplain" placeholder="请输入"></el-input>
        <editor-bar v-else v-model="formValidate.tmExplain" :isClear="formValidate.isClear"
                    @change="changeEditor($event, 'tmExplain')" :idEdit="editorType"></editor-bar>
      </el-col>
      <el-col :span="4" style="line-height: 35px" align="center">
        <el-button class="blueBtn" @click="changeInput('tmExplain')">{{tmExplainShowType ? '图文编辑' : '文本编辑'}}</el-button>
        <upload-file :uploadUrl="'/passport/infra/file/upload'" :limit="1" @upload-success="handleUploadSuccess($event, 'videoAnswerExplainFileId')" @upload-error="handleUploadError" >
        </upload-file>
        <div class="echo-file-list" v-if="formValidate.answerExplainFileName">
          <div class="file-item" v-if="types === 'edit'">
            <span class="file-name" @click="showMedia(formValidate,'videoAnswerExplainFileId')">{{ formValidate.answerExplainFileName}}</span>
            <i v-if="formValidate.answerExplainFileName" class="el-icon-delete" style="font-size:17px;" @click="removePath(formValidate, 'videoAnswerExplainFileId')"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tmReferenceData">参考资料：</div>
    <el-row>
      <el-col :span="24">
        <el-input type="textarea" :rows="4" v-model="formValidate.tmReferenceData" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <div class="saveBtn" v-if="!editData.id">
      <el-button class="blueBtn" @click="submit('continue')">保存并继续录入</el-button>
      <el-button class="blueBtn" @click="submit('close')">保存并关闭录入</el-button>
    </div>
    <div class="saveBtn" v-else> <el-button class="blueBtn" @click="submit('close')">保存</el-button></div>
    <!-- 查看音频/视频 -->
    <Modal
      v-model="showModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="800"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="showId"
      />
      <showVideo
        v-if="showModal"
        :type="type"
        :operaility-data="operailityData"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import editorBar from '../editor/editoritem'
import uploadFile from '../../../common/uploadMp'
import showVideo from '../showVideo.vue'
// 当前组件引入全局的util
let Util = null
export default {
  props: ['tmSelectNum', 'tmTypeId', 'examTmTypeObj', 'editData', 'types'], // 选项
  data () {
    return {
      showModal: false,
      showId: {
        id: 'showId',
        title: '查看音频/视频'
      },
      type: '',
      operailityData: {},
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      formValidate: {
        tmMark: '',
        tmContent: '', // 题目内容
        tmSelectList: [],
        tmExplain: '', // 答案解析
        tmAnswer: '', // 题目答案
        tmReferenceData: '',
        isVideo: 0,
        videoFileId: '',
        tmType: '',
        tmBaseType: '',
        tmTypeId: '',
        isClear: false, // 用于富文本
        videoAnswerExplainFileId: '',
        isAnswerExplainVideo: 0,
        textTmContent: '',
        isEnclosure: false, // 此题是否有附件
        answerExplainFilePath: '',
        stemFilePath: '',
        stemFileName: '',
        answerExplainFileName: ''
      },
      editorType: 'edit',
      tmContentShowType: true, // 题目内容输入框方式  true为input false为富文本
      tmExplainShowType: true,
      selectOption: {
        selectNo: '',
        selectContent: '',
        selectOrder: '',
        isVideo: 0,
        videoFileId: '',
        showInnput: true,
        textContent: '',
        filePath: '',
        fileName: '',
      },
      selectContent: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G']
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.tempData = this.$options.data().tempData
      this.formValidate = this.$options.data().formValidate
      this.formValidate.tmTypeId = this.tmTypeId
      setTimeout(()=> {
        this.formValidate.tmType = this.examTmTypeObj[this.tmTypeId].basicType
        this.formValidate.tmBaseType = this.examTmTypeObj[this.tmTypeId].basicType
      })
      if(this.editData.id) {
        this.formValidate.tmSelectList = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmSelectList
        this.formValidate.tmAnswer = this.editData.tmAnswerVOList[0].tmAnswer
        this.formValidate.tmExplain = this.editData.tmAnswerVOList[0].tmExplain
        this.formValidate.tmContent = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmContent
        this.formValidate.tmReferenceData = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmReferenceData
        this.formValidate.answerExplainFileName = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.answerExplainFileName
        this.formValidate.stemFileName = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.stemFileName
        this.formValidate.answerExplainFilePath = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.answerExplainFilePath
        this.formValidate.stemFilePath = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.stemFilePath
        if(this.formValidate.tmType === '多选题') { // 多选题答案回显
          let tmAnswerArr = this.editData.tmAnswerVOList[0].tmAnswer.split(',')
          let indexArr = []
          // 根据选项找到答案的下标
          for(let i = 0; i < tmAnswerArr.length; i++) {
            indexArr.push(this.selectContent.findIndex((item) => item === tmAnswerArr[i]))
          }
          this.formValidate.tmSelectList.forEach((item, index) => {
            this.$set(item, 'checked', false)
          })
          this.formValidate.tmSelectList.forEach((item, index) => {
            if(indexArr.includes(index)) {
              this.$set(item, 'checked', true)
            }
          })
        }
      }else {
        this.setSelect(4)
      }
    },
    // 设置选项个数
    setSelect (tmSelectNum) {
      let length = this.formValidate.tmSelectList.length
      // 如果减少了选项
      if(length > tmSelectNum) {
        let reduceLen = length - tmSelectNum
        this.formValidate.tmSelectList.splice(length - reduceLen, reduceLen)
      }else if(length < tmSelectNum) {
        let reduceLen = tmSelectNum - length
        for(let i = 0; i < reduceLen; i++) {
          let obj = Util._.defaultsDeep({}, this.selectOption)
          obj.selectOrder = i + 1
          obj.selectNo = i + 1
          if(this.formValidate.tmType === '多选题') {
            this.$set(obj, 'checked', false)
          }
          this.formValidate.tmSelectList.push(obj)
        }
      }
    },
    // 获取富文本数据内容
    changeEditor (res, type) {
      this.formValidate[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      this.tempData[type] = res.textContent
    },
    // 获取选项富文本内容
    changeEditors (res, item) {
      item.selectContent = res.res
      item.textContent = res.textContent
    },
    // 切换富文本输入框
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
    submit (type) {
      let arr = []
      if(this.formValidate.tmType === '多选题') {
        this.formValidate.tmSelectList.forEach((item, index) => {
          if(item.checked) {
            arr.push(this.selectContent[index])
          }
        })
        this.formValidate.tmAnswer = arr.join(',')
      }
      if(this.tempData.tmContent) {
        this.formValidate.textTmContent = this.tempData.tmContent
      }
      this.$emit('submit', this.formValidate, type, 'examTmTypeA1')
    },
    handleUploadSuccess(fileItem, file) {
      let url = fileItem.url
      if (file === 'videoId') {
        this.formValidate.stemFilePath = url
        this.formValidate.stemFileName = fileItem.name
      }else if (file === 'videoAnswerExplainFileId') {
        this.formValidate.answerExplainFilePath = url
        this.formValidate.answerExplainFileName = fileItem.name
      }else {
        file.filePath = url
        file.fileName = fileItem.name
      }
    },
    handleUploadError(error) {
      console.error('上传失败:', error)
    },
    showMedia(item, id) {
      this.type = id
      this.operailityData = item
      console.log(item, 'itemtiemtiemtiem')
      // if (id === 'videoId' || id === 'videoAnswerExplainFileId') {
      //   this.operailityData = item
      // }else {
      //   console.log(item, 'itemitemitem')
      //   this.operailityData = item
      // }
      this.openModel('show')
    },
    removePath(item, id) {
      if (id === 'videoId') {
        item.stemFileName = ''
        item.stemFilePath = ''
      }else if ( id === 'videoAnswerExplainFileId'){
        item.answerExplainFileName = ''
        item.answerExplainFilePath = ''
      }else {
        item.fileName = ''
        item.filePath = ''
      }
    },
    removeFile(index) {
      this.data.splice(index, 1)
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  components: {editorBar, uploadFile, showVideo}
}
</script>
<style scoped>
.echo-file-list {
  margin-top: 10px;
}
.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.file-name {
  flex-grow: 1;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>

