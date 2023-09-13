<!----------------------------------
****--@name     T型题
****--@role     ${*}
****--@date     2022/12/21
****--@author   yyl
----------------------------------->
<template>
  <div>
    <div v-for="(Item, Index) in everyScene" :key="Index">
      <div class="tmContent">第{{ getAct(Index+1) }}幕：</div>
      <el-row>
        <el-col :span="20">
          <el-input v-if="Item.tmContentShowType" v-model="Item.tmContent" type="textarea" :rows="5" :disabled="Item.isSaveThemeStem" placeholder="请输入"/>
          <editor-bar v-else v-model="Item.tmContent" :is-clear="Item.isClear" :id-edit="Item.isSaveThemeStem ? 'show' : ''"
                      @change="changeEditor($event, Item, 'tmContent', 'textTmContent')"/>
        </el-col>
        <el-col :span="4" style="line-height: 35px" align="center">
          <el-button class="blueBtn" @click="saveThemeStem(Item)">保存主题干</el-button>
          <el-button class="blueBtn" @click="addSubtitle(Item)">添加小题</el-button>
        </el-col>
      </el-row>
      <div v-if="!Item.isSaveThemeStem">
        <el-button class="blueBtn" @click="changeInput('tmContent', Item, 'textTmContent')">{{ Item.tmContentShowType ? '图文编辑' : '文本编辑' }}</el-button>
        <span>
          <upload-file :upload-url="'/passport/infra/file/upload'" :show-file-list="false"  :uploadFiles="Item.fileRespVO" :length="1"
            :tip-show="false" @setUploadFiles="setUploadFiles($event, Item, 'videoFileId')"/>
        </span>
      </div>
      <template>
        <el-table
          :data="Item.tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="tmContent"
            label="题干内容"
            width="180"
          >
            <template slot-scope="scope">
              <span v-html="scope.row.tmContent" />
            </template>
          </el-table-column>
          <el-table-column
            prop="tmAnswer"
            label="答案"
            width="180"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                class="blueBtn"
                @click="editOne(Item, scope.$index)"
              >
                修改
              </el-button>
              <el-button
                class="blueBtn"
                @click="removeSubtitle(Item, scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-if="Item.saved">
        <div
          v-for="(item, index) in Item.tmDetailQuestionVO"
          :key="index"
        >
          <el-form
            ref="formValidate"
            :model="item"
            :rules="rules"
            :inline="true"
            class="el-form-item-search"
            label-width="110px"
            onsubmit="return false"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="知识点："
                  prop="tmKnowledge"
                >
                  <el-input
                    v-model="item.tmKnowledge"
                    placeholder="请输入关键性文字"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="题目难度："
                  prop="tmDifficulty"
                >
                  <el-select
                    v-model="item.tmDifficulty"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in tmDifficultyOption"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="分数："
                  prop="tmMark"
                >
                  <el-input
                    v-model="item.tmMark"
                    placeholder="请输入关键性文字"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="题目类型："
                  prop="tmTypeId"
                >
                  <el-select
                    v-model="item.tmTypeId"
                    placeholder="请选择"
                    @change="tmTypeIdChange($event, item)"
                  >
                    <el-option
                      v-for="ite in examTmTypeOptions"
                      :key="ite.id"
                      :label="ite.name"
                      :value="ite.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="教学要求："
                  prop="tmRequire"
                >
                  <el-select
                    v-model="item.tmRequire"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in tmRequireOption"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选项数：">
                  <el-select
                    v-model="item.tmSelectNum"
                    placeholder="请选择"
                    @change="tmSelectNumChange($event,item)"
                  >
                    <el-option
                      v-for="item in 10"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="tmContent">
            题目内容：
          </div>
          <el-row>
            <el-col :span="20">
              <el-input
                v-if="item.tmContentShowType"
                v-model="item.tmContent"
                type="textarea"
                :rows="5"
                placeholder="请输入"
              />
              <editor-bar
                v-else
                v-model="item.tmContent"
                :is-clear="false"
                :id-edit="editorType"
                @change="itemChangeEditor($event, item, 'tmContent', 'textTmContent')"
              />
            </el-col>
            <el-col
              :span="4"
              style="line-height: 35px"
              align="center"
            >
              <el-button
                class="blueBtn"
                @click="changeInput('tmContent', item, 'textTmContent')"
              >
                {{ item.tmContentShowType ? '图文编辑' : '文本编辑' }}
              </el-button>
              <upload-file
                :upload-url="'/passport/infra/file/upload'"
                :show-file-list="false"
                :tip-show="false"
                :uploadFiles="item.fileRespVO"
                :length="1"
                @setUploadFiles="setUploadFiles($event, item, 'videoFileId')"
              />
            </el-col>
          </el-row>
          <el-row
            v-for="(ite, ind) in item.tmSelectList"
            :key="ind"
            style="margin-top: 20px"
          >
            <el-col
              :span="2"
              style="line-height: 100px"
            >
              <el-radio
                v-if="item.tmType === '单选题'"
                v-model="item.tmAnswer"
                :label="selectContent[ind]"
                @change="tmAnswerChange"
              >
                {{ selectContent[ind] }}
              </el-radio>
              <el-checkbox
                v-else-if="item.tmType === '多选题'"
                v-model="ite.checked"
              >
                {{ selectContent[ind] }}
              </el-checkbox>
            </el-col>
            <el-col :span="18">
              <el-input
                v-if="ite.showInnput"
                v-model="ite.selectContent"
                type="textarea"
                :rows="4"
                placeholder="请输入"
              />
              <editor-bar
                v-else
                v-model="ite.selectContent"
                :is-clear="false"
                :id-edit="editorType"
                @change="changeEditors($event, ite)"
              />
            </el-col>
            <el-col
              :span="4"
              style="line-height: 35px"
              align="center"
            >
              <el-button
                class="blueBtn"
                @click="changeInputs(ite)"
              >
                {{ ite.showInnput ? '图文编辑' : '文本编辑' }}
              </el-button>
              <upload-file
                :upload-url="'/passport/infra/file/upload'"
                :show-file-list="false"
                :tip-show="false"
                :length="1"
                :uploadFiles="ite.fileRespVO"
                @setUploadFiles="setUploadFiles($event, ite, 'videoFileId')"
              />
            </el-col>
          </el-row>
          <div class="tmExplain">
            答案解析：
          </div>
          <el-row>
            <el-col :span="20">
              <el-input
                v-if="item.tmExplainShowType"
                v-model="item.tmExplain"
                type="textarea"
                :rows="4"
                placeholder="请输入"
              />
              <editor-bar
                v-else
                v-model="item.tmExplain"
                :is-clear="false"
                :id-edit="editorType"
                @change="itemChangeEditor($event, item, 'tmExplain', 'textTmExplain')"
              />
            </el-col>
            <el-col
              :span="4"
              style="line-height: 35px"
              align="center"
            >
              <el-button
                class="blueBtn"
                @click="changeInput('tmExplain', item, 'textTmExplain')"
              >
                {{ item.tmExplainShowType ? '图文编辑' : '文本编辑' }}
              </el-button>
              <upload-file
                :upload-url="'/passport/infra/file/upload'"
                :show-file-list="false"
                :tip-show="false"
                :length="1"
                :uploadFiles="item.answerExplainFileRespVO"
                @setUploadFiles="setUploadFiles($event, item, 'videoAnswerExplainFileId')"
              />
            </el-col>
          </el-row>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <el-button
            type="primary"
            class="blueBtn"
            @click="submit(Item)"
          >
            保存小题
          </el-button>
        </div>
      </template>
      <div style="margin-top: 20px;text-align: center">
        <el-button
          type="primary"
          class="blueBtn"
          @click="submit({})"
        >
          提交
        </el-button>
        <el-button
          type="primary"
          class="blueBtn"
          @click="addNextScene"
        >
          添加下一幕
        </el-button>
      </div>
    </div>
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="500"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <template>
        <div class="remove">
          确定要删除吗？
        </div>
        <el-button
          class="blueBtn"
          @click="sureRemove"
        >
          确定
        </el-button>
        <el-button
          class="blueBtn"
          @click="removeModal = false"
        >
          取消
        </el-button>
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
/* 当前组件必要引入*/
import editorBar from '../../../../tiku/jichutiku/editor/editoritem.vue'
import uploadFile from '../../../../common/uploadFile.vue'
import {newTopic as rules} from '../../../../tiku/jichutiku/rules.js'
// 当前组件引入全局的util
let Util = null
export default {
  components: {editorBar, uploadFile},
  props: ['tmSelectNum', 'tmTypeObj', 'currentTreeData', 'examTmTypeObj', 'editData'], // 选项
  data () {
    return {
      rules,
      tableData: [],
      saved: true, // 是否显示每个小题的详细信息
      currentIndex: '',
      removeModal: false,
      removeId: {id: 'removeId', title: '删除'},
      editorType: 'add',
      tmDifficultyOption: ['0.1', '0.2', '0.3', '0.4', '0.5'],
      tmRequireOption: ['掌握', '熟悉', '了解', '超纲'],
      changeNum: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
      isEnclosure: false, // 此题是否有附件
      tempData: {
        tmContent: '',
        tmExplain: ''
      },
      everySceneTitle: {
        tmContent: '',
        textTmContent: '',
        tmContentShowType: true,
        isSaveThemeStem: false, // 是否已经保存主题干
        tableData: [],
        saved: true, // 是否显示每个小题的详细信息
        tmDetailQuestionVO: [],
        tmDetailQuestionVOList: []
      },
      everyScene: [ // 每一幕
        {
          tmContent: '',
          textTmContent: '',
          tmContentShowType: true,
          isSaveThemeStem: false, // 是否已经保存主题干
          tableData: [],
          saved: true, // 是否显示每个小题的详细信息
          tmDetailQuestionVO: [],
          tmDetailQuestionVOList: []
        }
      ],
      tmDetailQuestionVO: [],
      subtitleObj: {
        tmKnowledge: '',
        tmDifficulty: '',
        tmMark: '',
        tmTypeId: '',
        tmType: '',
        tmRequire: '',
        tmGroupType: '',
        tmSelectNum: 5,
        tmContentShowType: true,
        tmContent: '',
        textTmContent: '',
        tmSelectList: [],
        tmExplain: '',
        textTmExplain: '',
        tmExplainShowType: true,
        tmAnswer: '',
        isVideo: 0,
        videoFileId: '',
        isAnswerExplainVideo: 0,
        videoAnswerExplainFileId: '',
        fileRespVO: null,
        answerExplainFileRespVO: null
      },
      selectOption: {
        selectNo: '',
        selectContent: '',
        selectOrder: '',
        isVideo: 0,
        videoFileId: '',
        showInnput: true,
        textContent: '',
        checked: false,
        fileRespVO: null
      },
      examTmTypeOptions: [],
      selectContent: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G'],
      addId: '' // 保存小题后返回的id  再次保存 需传此参数
    }
  },
  created () {
    Util = this.$util
    this.init()
  },
  mounted () {
  },
  methods: {
    // 初始化请求列表数据
    init () {
      this.getExamTmType()
      if(this.editData.id) {
        this.setEditData()
      }
    },
    // 获取所有题型
    getExamTmType () {
      this.ajax({
        ajaxSuccess: (res) => {
          let arr = this.examTmTypeObj[this.tmTypeObj.tmTypeId].basicType.split(',')
          this.examTmTypeOptions = res.data.filter(item => {
            return arr.includes(item.name)
          })
          this.subtitleObj.tmTypeId = this.examTmTypeOptions[0].id
          this.subtitleObj.tmType = this.examTmTypeOptions[0].name
        },
        ajaxParams: {
          url: '/tkmanage/examTmType/allList',
          method: 'get'
        }
      })
    },
    tmTypeIdChange (val, item) {
      let arr = this.examTmTypeOptions.filter(Item => {
        return Item.id === val
      })
      item.tmType = arr[0].name
    },
    setEditData () {
      console.log(this.editData)
      this.everyScene = this.editData.tmDetailQuestionVO && this.editData.tmDetailQuestionVO.tmDetailQuestionVOList
      this.everyScene.forEach(item => {
        item.tableData = item.tmDetailQuestionVOList
        item.tableData.forEach(ite => {
          let tmAnswerArr = ite.tmAnswer.split(',')
          let indexArr = []
          // 根据选项找到答案的下标
          for(let i = 0; i < tmAnswerArr.length; i++) {
            indexArr.push(this.selectContent.findIndex((item) => item === tmAnswerArr[i]))
          }
          ite.tmSelectList.forEach((item, index) => {
            this.$set(item, 'checked', false)
          })
          ite.tmSelectList.forEach((item, index) => {
            if(indexArr.includes(index)) {
              this.$set(item, 'checked', true)
            }
          })
        })
        item.tmDetailQuestionVO = item.tmDetailQuestionVOList
        item.currentIndex = ''
        item.saved = false
      })
    },
    // 获取富文本数据内容
    changeEditor (res, Item, type, textType) {
      Item[type] = res.res // 这个res就是实时输入的富文本的内容，打印出来是实时输入的字符串html
      Item[textType] = res.textContent
    },
    itemChangeEditor (res, item, type, textType) {
      item[type] = res.res
      item[textType] = res.textContent
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
    // 切换富文本输入框
    changeInput (content, item, textContent) {
      if(!item) {
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
      }else {
        if(!item[content + 'ShowType']) {
          item[content] = item[textContent]
        }
        item[content + 'ShowType'] = !item[content + 'ShowType']
      }
      // this.$forceUpdate()
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
    // 保存主题干
    saveThemeStem (Item) {
      if(!Item.tmContent) {
        this.errorMess('请输入主题干内容进行保存')
        return
      }
      Item.isSaveThemeStem = true
    },
    addSubtitle (Item) {
      if(!Item.isSaveThemeStem) {
        this.errorMess('请首先填写主题干内容并进行保存')
        return
      }
      let obj = this.$util._.defaultsDeep({}, this.subtitleObj)
      this.tmSelectNumChange(obj.tmSelectNum, obj)
      // this.formValidate.tmDetailQuestionVOList = this.$util._.defaultsDeep([], this.tmDetailQuestionVO)
      Item.tmDetailQuestionVO = [obj]
      Item.saved = true
      console.log(this.tmDetailQuestionVO)
    },
    // 设置选项数
    tmSelectNumChange (tmSelectNum, item) {
      let length = item.tmSelectList.length
      // 如果减少了选项
      if(length > tmSelectNum) {
        let reduceLen = length - tmSelectNum
        item.tmSelectList.splice(length - reduceLen, reduceLen)
      }else if(length < tmSelectNum) {
        let reduceLen = tmSelectNum - length
        for(let i = 0; i < reduceLen; i++) {
          let obj = Util._.defaultsDeep({}, this.selectOption)
          obj.selectOrder = i + 1
          obj.selectNo = i + 1
          if(item.tmType === '多选题') {
            this.$set(obj, 'checked', false)
          }
          item.tmSelectList.push(obj)
        }
      }
    },
    // 添加下一幕
    addNextScene () {
      let everySceneTitle = this.$util._.defaultsDeep({}, this.everySceneTitle)
      this.everyScene.push(everySceneTitle)
    },
    // 获取第几幕
    getAct (Index) {
      if(Index < 10) {
        return this.changeNum[Index]
      }else if(Index >= 10 && Index < 20) {
        return '十' + this.changeNum[Index % 10]
      }else if(Index >= 20 && Index < 99) {
        let index = Math.floor(Index / 10) < 2 ? (Math.floor(Index / 10) + 1) : Math.floor(Index / 10)
        return this.changeNum[index] + '十' + this.changeNum[Index % 10]
      }
    },
    // eslint-disable-next-line complexity
    submit (Item) {
      console.log(Item)
      console.log(Object.keys(Item))
      console.log(Object.keys(Item).length > 1)
      if(Object.keys(Item).length && !Item.tmContent) {
        this.errorMess('请填写主题干内容')
        return
      }
      if(Item.tmDetailQuestionVO && !Item.tmDetailQuestionVO.length) {
        this.errorMess('请添加小题后进行保存')
        return
      }
      let currentTitle = Item.tmDetailQuestionVO && Item.tmDetailQuestionVO[0]
      if(currentTitle && !currentTitle.tmContent) {
        this.errorMess('请填写题目内容')
        return
      }
      if(Object.keys(Item).length) {
        let isSubmit = this.submitForm('formValidate')
        if (!isSubmit) {return}
      }
      // 验证是否设置选项
      if(currentTitle && (!currentTitle.tmSelectList || !currentTitle.tmSelectList.length)) {
        this.errorMess('请选择选项数')
        return
      }
      if(Object.keys(Item).length > 1) {
        // 验证每个选项是否填写内容
        for(let i = 0; i < currentTitle.tmSelectList.length; i++) {
          let item = currentTitle.tmSelectList[i]
          if(!item.selectContent) {
            this.errorMess('请设置第' + (i + 1) + '个选项的内容')
            return
          }
        }
        // 验证是否选择正确答案
        if(currentTitle.tmType === '单选题' && !currentTitle.tmAnswer) {
          this.errorMess('请选择正确答案')
          return
        }
        if(currentTitle.tmType === '多选题') {
          let arr = []
          currentTitle.tmSelectList.forEach((ite, ind) => {
            if(ite.checked) {
              arr.push(ind)
            }
          })
          if(arr.length === 0) {
            this.errorMess('请选择正确答案')
            return
          }
          // 根据勾选的下标找到选项
          let answerArr = []
          for(let i = 0; i < arr.length; i++) {
            answerArr.push(this.selectContent[arr[i]])
          }
          currentTitle.tmAnswer = answerArr.join(',')
        }
        // 验证是否填写答案解析
        if(!currentTitle.tmExplain) {
          this.errorMess('请填写答案解析内容')
          return
        }
      }
      if(Object.keys(Item).length > 1) {
        if(Item.currentIndex || Item.currentIndex === 0) { // 修改小题
          Item.tmDetailQuestionVOList.splice(Item.currentIndex, 1, Item.tmDetailQuestionVO[0])
        }else { // 添加小题
          Item.tmDetailQuestionVOList.push(Item.tmDetailQuestionVO[0])
        }
      }

      let obj = {
        tmAnswerVOList: [],
        tmDetailQuestionVO: {
          tmDetailQuestionVOList: []
        },
        tmType: this.tmTypeObj.tmType,
        tmTypeId: this.tmTypeObj.tmTypeId,
        tmGroupType: this.tmTypeObj.tmGroupType,
        treeId: this.currentTreeData.id,
        treePath: this.currentTreeData.path,
        tmContentDescription: '',
        isVideo: 0
      }
      this.everyScene.forEach(IItem => { // 每一幕
        IItem.tmDetailQuestionVOList.map((item) => { // 每一小题
          this.$set(item, 'tmBaseType', item.tmType)
          let arrObj = []
          item.tmSelectList.forEach((itemCheck, indexCheck) => {
            if(itemCheck.checked) {
              arrObj.push(this.selectContent[indexCheck])
            }
          })
          obj.tmAnswerVOList.push({
            tmAnswer: item.tmType === '多选题' ? arrObj.join(',') : item.tmAnswer,
            tmExplain: item.tmExplain,
            isAnswerExplainVideo: item.isAnswerExplainVideo,
            videoAnswerExplainFileId: item.videoAnswerExplainFileId
          })
        })
      })
      obj.tmDetailQuestionVO.tmDetailQuestionVOList = this.everyScene
      obj.tmAnswerVOList.forEach((item, index) => {
        this.$set(item, 'tmNo', index + 1)
      })
      console.log(obj)
      let num = 0
      let tmDetailQuestionVOList = obj.tmDetailQuestionVO.tmDetailQuestionVOList
      tmDetailQuestionVOList.forEach(Item => { // Item 每一幕
        Item.tmDetailQuestionVOList.forEach(item => { // 每一幕里的每一小题
          num = ++num
          console.log(num)
          item.tmNo = num
        })
      })
      let tmDetailQuestionVOListArr = tmDetailQuestionVOList[0].tmDetailQuestionVOList[0] || tmDetailQuestionVOList[0].tmDetailQuestionVO[0]
      obj.tmContentDescription = tmDetailQuestionVOListArr.textTmContent || tmDetailQuestionVOListArr.tmContent
      obj.tmContentDescription = obj.tmContentDescription.substring(0, 10)
      obj.id = this.editData && this.editData.id ? this.editData.id : this.addId ? this.addId : ''
      // 判断此题是否选择了附件
      for(let i = 0; i < this.everyScene.length; i++) {
        let Item = this.everyScene[i]
        if(Item.isVideo === 1) {
          obj.isVideo = 1
          break
        }
        for(let k = 0; k < Item.tmDetailQuestionVO.length; k++) {
          let item = Item.tmDetailQuestionVO[k]
          if(item.isVideo === 1 || item.isAnswerExplainVideo === 1) {
            obj.isVideo = 1
            break
          }
          for(let q = 0; q < item.tmSelectList.length; q++) {
            let ite = item.tmSelectList[q]
            if(ite.isVideo === 1) {
              obj.isVideo = 1
              break
            }
          }
        }
      }
      this.save(obj, Item)
    },
    save (data, Item) {
      if(Object.keys(Item).length > 0) {
        Item.saved = false
        Item.currentIndex = ''
      }
      this.ajax({
        ajaxSuccess: (res) => {
          if(Object.keys(Item).length === 0 && res.code === 0) {
            this.$emit('close')
          }else {
            Item.tableData = this.$util._.defaultsDeep([], Item.tmDetailQuestionVOList)
            this.addId = res.data
            this.$forceUpdate()
          }
        },
        ajaxParams: {
          url: this.editData.id ? '/tkmanage/examTmDetail/modify/' + this.editData.id : '/tkmanage/examTmDetail/add',
          method: this.editData.id ? 'put' : 'post',
          jsonString: true,
          data: data
        }
      })
    },
    submitForm (formName) {
      let flag = true
      for (let i = 0; i < this.$refs[formName].length; i++) {
        this.$refs[formName][i].validate((valid) => {
          if (!valid) {
            flag = false
          }
        })
      }
      return flag
    },
    // 删除小题
    removeSubtitle (Item, index) {
      Item.currentIndex = index
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
    editOne (Item, index) {
      Item.currentIndex = index
      let obj = this.$util._.defaultsDeep({}, Item.tableData[index])
      Item.tmDetailQuestionVO = [obj]
      console.log(Item.tmDetailQuestionVO)
      Item.saved = true
      this.$forceUpdate()
    },
    tmAnswerChange () {
      this.$forceUpdate()
    }
  }
}
</script>
