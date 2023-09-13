  <!----------------------------------
****--@name     ${*}
****--@role     ${*}
****--@date     2022/12/19
****--@author   yyl
----------------------------------->
<template>
  <div>
    <el-row>
      <el-col :span="4" style="position: relative" :style="{height: selectNum * 100 + 'px'}">
        <div style="position: absolute;top: 50%;left: 0;line-height: 35px;width: 90%">
          项数：<el-select v-model="selectNum" @change="tmSelectNumChange" :disabled="isSaveCandidates" placeholder="请选择">
                 <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
                </el-select>
        </div>
      </el-col>
      <el-col :span="20">
        <el-row v-for="(ite, ind) in tmSelectList" :key="ind" style="margin-top: 20px">
          <el-col :span="2" style="line-height: 100px">
            <el-radio v-model="tmAnswer" :label="selectContent[ind]">{{selectContent[ind]}}</el-radio>
          </el-col>
          <el-col :span="18">
            <el-input v-if="ite.showInnput" type="textarea" :rows="4" v-model="ite.selectContent" :disabled="isSaveCandidates" placeholder="请输入"></el-input>
            <editor-bar v-else v-model="ite.selectContent" :isClear="false"
                        @change="changeEditors($event, ite)" :idEdit="isSaveCandidates ? 'show' : ''"></editor-bar>
          </el-col>
          <el-col v-if="!isSaveCandidates" :span="4" style="line-height: 35px" align="center">
            <el-button class="blueBtn" @click="changeInputs(ite)">{{ite.showInnput ? '图文编辑' : '文本编辑'}}</el-button>
            <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :uploadFiles="ite.fileRespVO"
                         @setUploadFiles="setUploadFiles($event, ite, 'videoFileId')" :length="1"
                         :tipShow="false">
            </upload-file>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;text-align: center">
      <el-button class="blueBtn" @click="saveCandidates">保存候选项</el-button>
      <el-button class="blueBtn" @click="addSubtitle">添加小题</el-button>
    </div>
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="tmContent" label="题干内容" width="180">
          <template slot-scope="scope">
            <span v-html="scope.row.tmContent"></span>
          </template>
        </el-table-column>
        <el-table-column prop="tmAnswer" label="答案" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="blueBtn" @click="editOne(scope.$index)">修改</el-button>
            <el-button class="blueBtn" @click="removeSubtitle(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="saved">
      <div v-for="(item, index) in tmDetailQuestionVO" :key="index">
        <el-form :model="item" ref="formValidate" :inline="true" class="el-form-item-search" label-width="110px" onsubmit="return false">
          <el-row>
            <el-col :span="6">
              <el-form-item label="知识点：" prop="tmKnowledge">
                <el-input v-model="item.tmKnowledge" placeholder="请输入关键性文字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分数：" prop="tmMark">
                <el-input v-model="item.tmMark" placeholder="请输入关键性文字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="教学要求：" prop="tmRequire">
                <el-select v-model="item.tmRequire" placeholder="请选择">
                  <el-option v-for="item in tmRequireOption" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="题目难度：" prop="tmDifficulty">
                <el-select v-model="item.tmDifficulty" placeholder="请选择">
                  <el-option v-for="item in tmDifficultyOption" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="tmContent">小题目内容：</div>
        <el-row>
          <el-col :span="20">
            <el-input v-if="item.tmContentShowType" type="textarea" :rows="5" v-model="item.tmContent" placeholder="请输入"></el-input>
            <editor-bar v-else v-model="item.tmContent" :isClear="false"
                        @change="itemChangeEditor($event, item, 'tmContent', 'textTmContent')" :idEdit="editorType"></editor-bar>
          </el-col>
          <el-col :span="4" style="line-height: 35px" align="center">
            <el-button class="blueBtn" @click="changeInput('tmContent', item, 'textTmContent')">{{item.tmContentShowType ? '图文编辑' : '文本编辑'}}</el-button>
            <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :length="1"
                         @setUploadFiles="setUploadFiles($event, item, 'videoFileId')" :uploadFiles="item.fileRespVO"
                         :tipShow="false">
            </upload-file>
          </el-col>
        </el-row>
        <div class="tmExplain">答案解析：</div>
        <el-row>
          <el-col :span="20">
            <el-input v-if="item.tmExplainShowType" type="textarea" :rows="4" v-model="item.tmExplain" placeholder="请输入"></el-input>
            <editor-bar v-else v-model="item.tmExplain" :isClear="false"
                        @change="itemChangeEditor($event, item, 'tmExplain', 'textTmExplain')" :idEdit="editorType"></editor-bar>
          </el-col>
          <el-col :span="4" style="line-height: 35px" align="center">
            <el-button class="blueBtn" @click="changeInput('tmExplain', item, 'textTmExplain')">{{item.tmExplainShowType ? '图文编辑' : '文本编辑'}}</el-button>
            <upload-file :uploadUrl="'/passport/infra/file/upload'" :showFileList="false" :length="1"
                         @setUploadFiles="setUploadFiles($event, item, 'videoAnswerExplainFileId')" :uploadFiles="item.answerExplainFileRespVO"
                         :tipShow="false">
            </upload-file>
          </el-col>
        </el-row>
      </div>
    </template>
    <div v-if="!saved && (this.editData && this.editData.id)" style="margin-top: 20px;text-align: center">
      <el-button type="primary" class="blueBtn" @click="submit('close')">提交</el-button>
    </div>
    <Modal v-model="removeModal" :mask-closable="false" height="200"
           title="对话框标题" class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content  ="removeId"/>
      <template>
        <div class="remove">确定要删除吗？</div>
        <el-button class="blueBtn" @click="sureRemove">确定</el-button>
        <el-button class="blueBtn" @click="removeModal = false">取消</el-button>
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import editorBar from '../../../../tiku/jichutiku/editor/editoritem.vue'
import uploadFile from '../../../../common/uploadFile.vue'
// 当前组件引入全局的util
let Util = null
export default {
  props: ['tmSelectNum', 'tmTypeObj', 'examTmTypeObj', 'currentTreeData', 'editData', 'examPaperList', 'getExamTmDetail'], // 选项
  data () {
    return {
      tableData: [],
      saved: true, // 是否显示每个小题的详细信息
      isSaveCandidates: false, // 是否已经保存候选项
      editorType: 'add',
      tmDifficultyOption: ['0.1', '0.2', '0.3', '0.4', '0.5'],
      tmRequireOption: ['掌握', '熟悉', '了解', '超纲'],
      isEnclosure: false, // 此题是否有附件
      tmDetailQuestionVOList: [],
      tmSelectList: [],
      selectNum: 5,
      tmAnswer: '',
      formValidate: {
        tmDetailQuestionVOList: []
      },
      formValidates: {
        examPaperTmVOList: [{
          id: '',
          paperId: '',
          paperNo: '',
          tmInfoList: [{
            tmKnowledge: '', // 知识点
            tmDifficulty: '', // 题目难度
            tmMark: '', // 题目分数
            tmTypeId: '', // 题目类型id
            tmType: '',
            tmRequire: '', // 教学要求
            tmGroupType: '',
            tmDetailQuestionVO: {},
            tmAnswerVOList: [],
            treeId: '',
            path: '',
            id: '',
            tmContentDescription: '',
            isVideo: 0
          }]
        }]
      },
      selectOption: {
        selectNo: '',
        selectContent: '',
        selectOrder: '',
        isVideo: 0,
        videoFileId: '',
        showInnput: true,
        textContent: '',
        fileRespVO: null
      },
      tmDetailQuestionVO: [],
      subtitleObj: {
        tmKnowledge: '',
        tmDifficulty: '',
        tmMark: '',
        tmRequire: '',
        tmGroupType: '',
        tmContentShowType: true,
        tmContent: '',
        textTmContent: '',
        tmExplain: '',
        textTmExplain: '',
        tmExplainShowType: true,
        isVideo: 0,
        videoFileId: '',
        isAnswerExplainVideo: 0,
        videoAnswerExplainFileId: '',
        fileRespVO: null,
        answerExplainFileRespVO: null,
        answerFileRespVO: null
      },
      currentIndex: '',
      removeModal: false,
      removeId: {id: 'removeId', title: '删除'},
      selectContent: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G'],
      addId: '' // 保存小题后返回的id  再次保存 需传此参数
    }
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.formValidates.examPaperTmVOList[0].id = this.examPaperList[0].id
      this.formValidates.examPaperTmVOList[0].paperId = this.examPaperList[0].paperId
      this.formValidates.examPaperTmVOList[0].paperNo = this.examPaperList[0].paperNo
      this.formValidates.examPaperTmVOList[0].tmInfoList.push(...this.examPaperList[0].tmInfoList)
      this.tmSelectNumChange(5)
      if(this.editData.id) {
        let tmSelectList = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmSelectList
        // 公共候选项回显
        this.tmSelectList.forEach((item, index) => {
          for(let k in item) {
            item[k] = tmSelectList[index][k] ? tmSelectList[index][k] : item[k]
          }
        })
        let tmDetailQuestionVOList = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmDetailQuestionVOList
        this.formValidate.tmDetailQuestionVOList = tmDetailQuestionVOList
        this.tableData = tmDetailQuestionVOList
        this.tmAnswer = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmAnswer
        this.saved = false // 修改默认不展示某个小题信息
      }
    },
    tmSelectNumChange (tmSelectNum) {
      let length = this.tmSelectList.length
      // 如果减少了选项
      if(length > tmSelectNum) {
        let reduceLen = length - tmSelectNum
        this.tmSelectList.splice(length - reduceLen, reduceLen)
      }else if(length < tmSelectNum) {
        let reduceLen = tmSelectNum - length
        for(let i = 0; i < reduceLen; i++) {
          let obj = Util._.defaultsDeep({}, this.selectOption)
          obj.selectOrder = i + 1
          obj.selectNo = i + 1
          if(this.tmType === '多选题') {
            this.$set(obj, 'checked', false)
          }
          this.tmSelectList.push(obj)
        }
      }
    },
    // 获取富文本数据内容
    changeEditors (res, ite) {
      ite.selectContent = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      ite.textContent = res.textContent
    },
    // 选项切换富文本
    changeInputs (ite) {
      console.log(ite)
      if(!ite.showInnput) {
        ite.selectContent = ite.textContent
      }
      ite.showInnput = !ite.showInnput
    },
    setUploadFiles (file, item, type) {
      item[type] = file || ''
      if(item.videoFileId) {
        item.isVideo = 1
      }else {
        item.isVideo = 0
        item.fileRespVO = null
      }
      if(item.videoAnswerExplainFileId) {
        item.isAnswerExplainVideo = 1
      }else {
        item.isAnswerExplainVideo = 0
        item.answerExplainFileRespVO = null
      }
    },
    itemChangeEditor (res, item, type, textType) {
      item[type] = res.res
      item[textType] = res.textContent
    },
    // 切换富文本输入框
    changeInput (content, item, textContent) {
      if(!item[content + 'ShowType']) {
        item[content] = item[textContent]
      }
      item[content + 'ShowType'] = !item[content + 'ShowType']
      // this.$forceUpdate()
    },
    // 保存候选项
    saveCandidates () {
      this.isSaveCandidates = true
    },
    // 添加小题
    addSubtitle () {
      let obj = this.$util._.defaultsDeep({}, this.subtitleObj)
      this.tmDetailQuestionVO = [obj]
      this.saved = true
      console.log(this.tmDetailQuestionVO)
    },
    // 保存
    // eslint-disable-next-line complexity
    submit (type) {
      // 验证是否设置选项
      if(!this.tmSelectList || !this.tmSelectList.length) {
        this.errorMess('请选择选项数')
        return
      }
      // 验证每个选项是否填写内容
      for(let i = 0; i < this.tmSelectList.length; i++) {
        let item = this.tmSelectList[i]
        if(!item.selectContent) {
          this.errorMess('请设置第' + (i + 1) + '个选项的内容')
          return
        }
      }
      // 只有添加或修改小题信息才需要做的验证
      if(this.saved) {
        // 验证是否选择正确答案
        if(!this.tmAnswer) {
          this.errorMess('请选择正确答案')
          return
        }
        if(!this.tmDetailQuestionVO.length) {
          this.errorMess('请添加小题')
          return
        }

        let currentTitle = this.tmDetailQuestionVO[0] // 当前展示需要保存的小题内容
        if(!currentTitle.tmContent) {
          this.errorMess('请填写小题目内容')
          return
        }
        if(!currentTitle.tmExplain) {
          this.errorMess('请填写答案解析')
          return
        }
        this.tmDetailQuestionVO[0].tmAnswer = this.tmAnswer
        if(this.currentIndex || this.currentIndex === 0) { // 修改小题
          this.formValidate.tmDetailQuestionVOList.splice(this.currentIndex, 1, this.tmDetailQuestionVO[0])
          console.log(this.formValidate.tmDetailQuestionVOList)
        }else { // 添加小题
          this.formValidate.tmDetailQuestionVOList.push(this.tmDetailQuestionVO[0])
        }
      }
      let tmBaseType = ''
      for(let k in this.examTmTypeObj) {
        if(this.examTmTypeObj[k].name === this.tmTypeObj.tmType) {
          tmBaseType = this.examTmTypeObj[k].basicType
        }
      }
      this.formValidate.tmDetailQuestionVOList.forEach(item => {
        this.$set(item, 'tmBaseType', tmBaseType)
      })
      console.log(this.examTmTypeObj)
      // 得到选项中选择附件的数据
      let tmSelectArr = this.tmSelectList.filter(item => {
        return item.isVideo === 1
      })
      // 得到小题中选择附件的数据
      let tmDetailQuestionVOArr = this.formValidate.tmDetailQuestionVOList.filter(item => {
        return item.isVideo === 1 || item.isAnswerExplainVideo === 1
      })
      let obj = {
        tmType: this.tmTypeObj.tmType,
        tmTypeId: this.tmTypeObj.tmTypeId,
        tmBaseType: this.tmTypeObj.tmType,
        tmGroupType: this.tmTypeObj.tmGroupType,
        treeId: this.currentTreeData.id,
        treePath: this.currentTreeData.path,
        tmAnswerVOList: [],
        tmDetailQuestionVO: {
          tmSelectList: this.tmSelectList,
          tmAnswer: this.tmAnswer,
          tmDetailQuestionVOList: this.formValidate.tmDetailQuestionVOList
        },
        tmContentDescription: '',
        isVideo: tmSelectArr.length || tmDetailQuestionVOArr.length ? 1 : 0
      }
      this.formValidate.tmDetailQuestionVOList.map((item, index) => {
        this.$set(item, 'tmNo', index + 1)
        if(!item.tmAnswer) {
          item.tmAnswer = this.tmAnswer
        }
        obj.tmAnswerVOList.push({
          tmExplain: item.tmExplain,
          isAnswerExplainVideo: item.isAnswerExplainVideo,
          videoAnswerExplainFileId: item.videoAnswerExplainFileId,
          tmNo: index + 1

        })
      })
      obj.tmContentDescription = this.formValidate.tmDetailQuestionVOList[0].textTmContent || this.formValidate.tmDetailQuestionVOList[0].tmContent
      obj.tmContentDescription = obj.tmContentDescription.substring(0, 10)
      obj.id = this.editData && this.editData.id ? this.editData.id : this.addId ? this.addId : ''
      console.log(obj)
      this.save(obj, type)
    },
    save (data, type) {
      const tminfoList = this.formValidates.examPaperTmVOList[0].tmInfoList[0]
      tminfoList.tmKnowledge = data.tmKnowledge
      tminfoList.tmDifficulty = data.tmDifficulty
      tminfoList.tmMark = data.tmMark
      tminfoList.tmTypeId = data.tmTypeId
      tminfoList.tmType = data.tmType
      tminfoList.tmRequire = data.tmRequire
      tminfoList.tmDetailQuestionVO = data.tmDetailQuestionVO
      tminfoList.tmAnswerVOList = data.tmAnswerVOList
      tminfoList.treeId = data.treeId
      tminfoList.path = data.path
      tminfoList.id = data.id
      tminfoList.tmContentDescription = data.tmContentDescription
      tminfoList.isVideo = data.isVideo
      tminfoList.tmGroupType = this.tmTypeObj.tmGroupType
      this.saved = false
      this.currentIndex = ''
      this.ajax({
        ajaxSuccess: (res) => {
          this.tableData = this.$util._.defaultsDeep([], this.formValidate.tmDetailQuestionVOList)
          this.tmAnswer = ''
          if(type === 'close' && res.code === 0) {
            this.$emit('close')
          }else if(type === 'continue') {
            this.addId = res.data
          }
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/modifyPaperTm/' + this.editData.id,
          method: 'put',
          jsonString: true,
          data: this.formValidates
        }
      })
    },
    // 删除小题
    removeSubtitle (index) {
      this.currentIndex = index
      this.removeModal = true
    },
    // 确定删除
    sureRemove () {
      this.formValidate.tmDetailQuestionVOList.splice(this.currentIndex, 1)
      this.tableData = this.$util._.defaultsDeep([], this.formValidate.tmDetailQuestionVOList)
      this.removeModal = false
      this.currentIndex = ''
    },
    // 修改某一个小题
    editOne (index) {
      this.currentIndex = index
      let obj = this.$util._.defaultsDeep({}, this.tableData[index])
      this.tmDetailQuestionVO = [obj]
      this.tmAnswer = obj.tmAnswer
      this.saved = true
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  mounted () {
  },
  components: {editorBar, uploadFile}
}
</script>
