<template>
  <div>
    <el-form
      :inline="true"
      class="el-form-item-search"
      onsubmit="return false"
    >
      <el-row>
        <el-col>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="addQuestion"
            >
              添加试题
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="editQuestion"
            >
              修改试题
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="removeQuestion"
            >
              删除试题
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="handworkQuestion"
            >
              手工换题
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="addMark"
            >
              添加标记
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="cancelMark"
            >
              取消标记
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="generateExcel"
            >
              生成Excel
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="releasePaper"
            >
              发布试卷
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="generateAnswer"
            >
              生成答题卡
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="blueBtn"
              @click="generateWord"
            >
              生成Word试卷
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="试卷名称:">
            <span>{{ showData.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="试卷模式:">
            <span>{{ '网上考试' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总题数:">
            <span>{{ '总题数' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="试卷总分:">
            <span>{{ showData.paperConversion100 }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="通过分数:">
            <span
              v-if="showType"
              @dblclick="showInput"
            >{{ showData.paperPassmark }}</span>
            <span v-else><el-input
              v-model.number="showData.paperPassmark"
              size="small"
              @blur="typeScoreBlur(showData.paperPassmark)"
            /></span>
            <span style="font-size:12px;color:red">(双击可修改分数)</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分数模式:">
            <span>{{ showData.paperRegularmark = 1 ? '固定分数': '非固定分数' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-link
            :underline="false"
            @click="unfoldAll"
          >
            展开全部
          </el-link>&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link
            :underline="false"
            @click="packUpAll"
          >
            收起全部
          </el-link>
        </el-col>
        <el-col :span="9">
          <span style="font-size:12px;color:red">(双击试题分数可修改,并将导致试卷总分数随之改变，试卷分数模式不可恢复！)</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          v-for="(item, index) in showData.examPaperTmVOList"
          :key="index + 1"
        >
          <div
            v-for="(i, ix) in item.tmInfoList"
            :key="ix+ 1"
          >
            <p style=" width:100%;height: 40px;background-color:rgb(216, 216, 216);line-height:40px;font-size:16px;margin: 0;">
              {{ ix+ 1 }}.题型:{{ i.tmType }}
            </p>
            <div v-if="i.tmType === 'A1题型' ||i.tmType === 'A2题型' || i.tmtype=== '单选题'">
              <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                <span
                  :class="{active:index===activeColor}"
                  style="font-size:14px;"
                >
                  <i class="el-icon-caret-bottom" />
                  <strong>题号{{ i.tmDetailQuestionVO.tmNo }} 本题分数 {{ i.tmDetailQuestionVO.tmMark }}</strong>
                </span>
                <span style="float:right;margin:3px 60px 0 0;cursor:pointer;" @click="moveDown(ix)">下移</span>
                <span style="float:right;margin:3px 10px 0 0;cursor:pointer;" @click="moveUp(ix)">上移</span>
                <span style="float:right;margin-right:20px">
                  <el-checkbox @change="checkChange(i, ix, $event)" />
                </span>
              </div>
              <div v-if="putAways">
                <p style="font-size:14px;" v-html="i.tmDetailQuestionVO.tmContent">
                </p>
                <div
                  v-for="(t, tx) in i.tmDetailQuestionVO.tmSelectList"
                  :key="tx+ 1"
                >
                  <el-radio
                    style="display:block;margin-top:5px;"
                    v-html="checkNum(t.selectNo) + '.'+ t.selectContent"
                  />
                </div>
                <p style="font-size:14px;margin-top:5px;">
                  答案:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmAnswer }}
                </p>
                <p>
                  答案解析:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmExplain }}
                </p>
              </div>
            </div>
            <div v-if="i.tmType === 'A3题型' ||i.tmType === 'A4题型'">
              <p style="font-size:14px;">
                {{ i.tmDetailQuestionVO.tmContent }}
                <span style="float:right;margin:3px 60px 0 0;cursor:pointer;" @click="moveDown">下移</span>
                <span style="float:right;margin:3px 10px 0 0;cursor:pointer;" @click="moveUp">上移</span>>
                <span style="float:right;margin-right:20px">
                  <el-checkbox @change="checkChange(i, ix, $event)" />
                </span>
              </p>
              <div
                v-for="(q, qx) in i.tmDetailQuestionVO.tmDetailQuestionVOList"
                :key="qx+ 1"
              >
                <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                  <span
                    :class="{active:index===activeColor}"
                    style="font-size:14px;"
                  >
                    <i class="el-icon-caret-bottom" />
                    <strong>题号{{ q.tmNo }} 本题分数 {{ q.tmMark }}</strong>
                  </span>
                </div>
                <p
                  v-if="putAways"
                  style="font-size:14px;"
                  v-html="q.tmContent"
                >
                </p>
                <div v-if="putAways">
                  <el-radio
                    v-for="(t, tx) in q.tmSelectList"
                    :key="tx+ 1"
                    style="display:block;margin-top:5px;"
                    v-html="checkNum(t.selectNo) + '.'+t.selectContent"
                  />
                  <p style="font-size:14px;margin-top:5px;">
                    答案:&nbsp;&nbsp;&nbsp;{{ q.tmAnswer }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="i.tmType === 'B1题型'">
              <span style="float:right;margin:3px 60px 0 0;cursor:pointer;" @click="moveDown">下移</span>
              <span style="float:right;margin:3px 10px 0 0;cursor:pointer;" @click="moveUp">上移</span>
              <span style="float:right;margin-right:20px">
                <el-checkbox @change="checkChange(i, ix)" />
              </span>
              <p
                v-for="(b, binx) in i.tmDetailQuestionVO.tmSelectList"
                :key="binx+ 1"
                style="font-size:14px;margin-top:5px;font-weight:600;"
                v-html="checkNum(b.selectNo) + '.' + b.selectContent"
              />
              <div
                v-for="(q, qinx) in i.tmDetailQuestionVO.tmDetailQuestionVOList"
                :key="qinx+ 1"
              >
                <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                  <span
                    :class="{active:index===activeColor}"
                    style="font-size:14px;"
                  >
                    <i class="el-icon-caret-bottom" />
                    <strong>题号{{ q.tmNo }} 本题分数 {{ q.tmMark }}</strong>
                  </span>
                </div>
                <p
                  v-if="putAways"
                  style="font-size:14px;"
                  v-html='q.tmContent'
                >
                </p>
                <div v-if="putAways">
                  <el-radio
                    v-for="(b, binx) in i.tmDetailQuestionVO.tmSelectList"
                    :key="binx+ 1"
                    style="margin-top:5px;"
                    v-html="checkNum(b.selectNo)"
                  />
                  <p style="font-size:14px;margin-top:5px;">
                    答案:&nbsp;&nbsp;&nbsp;{{ q.tmAnswer }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="i.tmType === '判断题'">
              <span style="float:right;margin:3px 60px 0 0;cursor:pointer;">下移</span>
              <span style="float:right;margin:3px 10px 0 0;cursor:pointer;">上移</span>
              <span style="float:right;margin-right:20px">
                <el-checkbox @change="checkChange(i, ix)" />
              </span>
              <div>
                <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                  <span
                    :class="{active:index===activeColor}"
                    style="font-size:14px;"
                  >
                    <i class="el-icon-caret-bottom" />
                    <strong>题号{{ i.tmDetailQuestionVO.tmNo }} 本题分数 {{ i.tmDetailQuestionVO.tmMark }}</strong>

                  </span>
                </div>
                <p
                  v-if="putAways"
                  style="font-size:14px;"
                >
                  {{ i.tmDetailQuestionVO.tmContent }}
                </p>
                <div v-if="putAways">
                  <el-radio
                    style="margin-top:5px;"
                    label="对"
                  />
                  <el-radio
                    style="margin-top:5px;"
                    label="错"
                  />
                  <p style="font-size:14px;margin-top:5px;">
                    答案:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmAnswer === '1'?'对': '错' }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="i.tmType === '问答题' || i.tmType === '病案分析题' || i.tmType === '中医临证题'">
              <span style="float:right;margin:3px 60px 0 0;cursor:pointer;">下移</span>
              <span style="float:right;margin:3px 10px 0 0;cursor:pointer;">上移</span>
              <span style="float:right;margin-right:20px">
                <el-checkbox @change="checkChange(i)" />
              </span>
              <div>
                <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                  <span
                    :class="{active:index===activeColor}"
                    style="font-size:14px;"
                  >
                    <i class="el-icon-caret-bottom" />
                    <strong>题号{{ i.tmDetailQuestionVO.tmNo }} 本题分数 {{ i.tmDetailQuestionVO.tmMark }}</strong>
                  </span>
                </div>
                <div v-if="putAways">
                  <el-input
                    v-model="i.tmDetailQuestionVO.tmContent"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                  <p style="font-size:14px;margin-top:5px;">
                    答案:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmAnswer }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="i.tmType === '填空题'">
              <span style="float:right;margin:3px 60px 0 0;cursor:pointer;">下移</span>
              <span style="float:right;margin:3px 10px 0 0;cursor:pointer;">上移</span>
              <span style="float:right;margin-right:20px">
                <el-checkbox @change="checkChange(i, ix)" />
              </span>
              <div>
                <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                  <span
                    :class="{active:index===activeColor}"
                    style="font-size:14px;"
                  >
                    <i class="el-icon-caret-bottom" />
                    <strong>题号{{ i.tmDetailQuestionVO.tmNo }} 本题分数 {{ i.tmDetailQuestionVO.tmMark }}</strong>

                  </span>
                </div>
                <p
                  v-if="putAways"
                  style="font-size:14px;"
                  v-html=" i.tmDetailQuestionVO.tmContent"
                >
                </p>
                <div v-if="putAways">
                  <el-input
                    v-model="textarea"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                  <p style="font-size:14px;margin-top:5px;">
                    答案:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmAnswer }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="i.tmType === 'X题型' || i.tmType === '多选题'">
              <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                <span
                  :class="{active:index===activeColor}"
                  style="font-size:14px;"
                >
                  <i class="el-icon-caret-bottom" />
                  <strong>题号{{ i.tmDetailQuestionVO.tmNo }} 本题分数 {{ i.tmDetailQuestionVO.tmMark }}</strong>
                </span>
                <span style="float:right;margin:3px 60px 0 0;cursor:pointer;">下移</span>
                <span style="float:right;margin:3px 10px 0 0;cursor:pointer;">上移</span>
                <span style="float:right;margin-right:20px">
                  <el-checkbox @change="checkChange(i, ix)" />
                </span>
              </div>
              <div v-if="putAways">
                <p style="font-size:14px;" v-html="i.tmDetailQuestionVO.tmContent">
                </p>
                <div
                  v-for="(t, tx) in i.tmDetailQuestionVO.tmSelectList"
                  :key="tx+ 1"
                >
                  <el-checkbox style="display:block;margin-top:5px;" v-html="checkNum(t.selectNo) + '.'+ t.selectContent"></el-checkbox>
                </div>
                <p style="font-size:14px;margin-top:5px;">
                  答案:&nbsp;&nbsp;&nbsp;{{ i.tmDetailQuestionVO.tmAnswer }}
                </p>
              </div>
            </div>
            <div v-if="i.tmType === 'T题型'">
              <p style=" width:100%;height: 40px;background-color:rgb(216, 216, 216);line-height:40px;font-size:16px;margin: 0;">
                题号: {{ i.tmOrder }}
              </p>
              <div
                v-for="(q, qx) in i.tmDetailQuestionVO.tmDetailQuestionVOList"
                :key="qx + 1"
              >
                <el-input v-model="q.tmContent" autocomplete="off">
                  <i slot="prefix" style="font-size: 20px; color: black;">第{{qx + 1}}幕:</i>
                </el-input>
                <div
                  v-for="(t, tinx) in q.tmDetailQuestionVOList" :key="tinx"
                >
                  <div style=" width:100%;height: 40px;background-color:rgb(225, 240, 243);line-height:40px;">
                    <span
                      :class="{active:index===activeColor}"
                      style="font-size:14px;"
                    >
                      <i class="el-icon-caret-bottom" />
                      <strong>题号{{  t.tmNo }} 本题分数 {{ t.tmMark }}</strong>
                    </span>
                    <span style="float:right;margin:3px 60px 0 0;cursor:pointer;">下移</span>
                    <span style="float:right;margin:3px 10px 0 0;cursor:pointer;">上移</span>
                    <span style="float:right;margin-right:20px">
                      <el-checkbox @change="checkChange(i, ix)" />
                    </span>
                  </div>
                  <p
                    v-if="putAways"
                    style="font-size:14px;"
                    v-html="t.tmContent"
                  >
                  </p>
                  <div v-if="putAways">
                    <el-radio
                      v-for="(tr, trx) in t.tmSelectList"
                      :key="trx+ 1"
                      style="display:block;margin-top:5px;"
                      v-html="checkNum(tr.selectNo) + '.'+tr.selectContent"
                    />
                    <p style="font-size:14px;margin-top:5px;">
                      答案:&nbsp;&nbsp;&nbsp;{{ t.tmAnswer }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 添加试题 -->
    <Modal
      v-model="addModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1100"
    >
      <modal-header
        slot="header"
        :content="addId"
      />
      <template>
        <add
          v-if="addModal"
          :row-data="rowData"
          :operaility-data="operailityData"
          :exam-paper-list="examPaperList"
          :getEditData="getEditData"
          :type="type"
          @cancel="addModal = false"
          @add="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 修改试题 -->
    <Modal
      v-model="editModal"
      :mask-closable="false"
      height="200"
      title="对话框标题"
      class-name="vertical-center-modal"
      :width="1100"
    >
      <modal-header
        slot="header"
        :content="editId"
      />
      <template>
        <edit
          v-if="editModal"
          :row-data="editData"
          :current-tree-data="currentTreeData"
          :exam-paper-list="examPaperList"
          :getEditData="getEditData"
          :type="type"
          @cancel="editModal = false"
          @edit="subCallback"
        />
      </template>
      <div slot="footer" />
    </Modal>
    <!-- 删除试题 -->
    <Modal
      v-model="removeModal"
      :mask-closable="false"
      close-on-click-modal="false"
      width="600"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="removeId"
      />
      <removePost
        v-if="removeModal"
        :delete-url="'/paper/examPaperInfo/modifyPaperTm/' + examPaperList[0].id"
        :operaility-data="operailityData"
        :paperList="examPaperList"
        :method-type="'put'"
        @remove="subCallback"
        @cancel="cancel"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import add from './addQuestion.vue'
import edit from './editQuestion.vue'
import removePost from '@/components/common/removePost.vue'
export default {
  components: {
    add,
    edit,
    removePost
  },
  props: ['currentTreeData', 'rowData'],
  data () {
    return {
      showData: {},
      operailityData: [],
      activeColor: '',
      type: '',
      checked: false,
      textarea: '',
      showType: true,
      addModal: false,
      editModal: false,
      removeModal: false,
      editId: {id: 'editId', title: '修改试题'},
      addId: {id: 'addId', title: '添加试题'},
      removeId: {id: 'removeId', title: '删除试题'},
      putAways: true,
      multipleSelection: [],
      editData: {},
      examPaperList: [],
      paperList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化请求列表数据
    init () {
      if(this.rowData && this.rowData.id) {
        this.getEditData()
      }
    },
    showInput () {
      this.showType = !this.showType
    },
    // 题型分数改变后  重新计算题型指定总分
    typeScoreBlur (item) {
      this.showData.paperPassmark = item
      this.showType = true
      if (item === '') {
        this.showData.paperPassmark = 0
      }
    },
    // 查看时，获取回显数据
    getEditData () {
      this.ajax({
        ajaxSuccess: (res) => {
          this.showData = res.data
          this.examPaperList = res.data.examPaperTmVOList
        },
        ajaxParams: {
          url: '/paper/examPaperInfo/get/' + this.rowData.id,
          method: 'get'
        }
      })
    },
    delHtmlTag (str) {
      return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '')
    },
    moveUp (index) {
      if (index > 0) {
        this.swapItems(index, index - 1)
      }
    },
    moveDown (index) {
      this.showData.examPaperTmVOList.forEach(item => {
        if (index < item.tmInfoList.length - 1) {
          this.swapItems(index, index + 1)
        }
      })
    },
    swapItems(index1, index2) {
      this.showData.examPaperTmVOList.forEach(item => {
        const temp = item.tmInfoList[index1]
        item.tmInfoList[index1] = item.tmInfoList[index2]
        item.tmInfoList[index2] = temp
      })
    },
    checkChange (i, index, event) {
      if (event === false) {
        this.multipleSelection = []
      }else {
        this.multipleSelection.push(i)
      }
    },
    putAway () {
      this.putAways = true
    },
    // 展开全部
    unfoldAll () {
      this.putAways = true
    },
    // 收起全部
    packUpAll () {
      this.putAways = false
    },
    // 添加试题
    addQuestion () {
      this.type = 'add'
      this.addId.title = '添加试题'
      this.openModel('add')
    },
    // 修改试题
    editQuestion () {
      if (!this.isSelected()) {return}
      this.editData = this.multipleSelection[0]
      this.type = 'edit'
      this.openModel('edit')
    },
    // 删除试题
    removeQuestion () {
      if (!this.isSelected()) {return}
      this.openModel('remove')
    },
    // 手工换题
    handworkQuestion () {
      console.log('手工换题')
    },
    // 添加标记
    addMark () {
      // this.activeColor = this.checked
    },
    // 取消标记
    cancelMark () {
      this.activeColor = ''
    },
    // 生成excel
    generateExcel () {
      console.log('生成excel')
    },
    // 发布试卷
    releasePaper () {
      console.log('发布试卷')
    },
    // 生成答题卡
    generateAnswer () {
      console.log('生成答题卡')
    },
    // 生成word试卷
    generateWord () {
      console.log('生成word试卷')
    },
    checkNum (num) { // 把数字转换为字母
      if (typeof (num) === 'number') {return String.fromCharCode(0x60 + num).toUpperCase()} else {return num}
    },
    isSelected () {
      let len = this.multipleSelection.length
      let flag = true
      if (len === 0) {
        this.showMess('请选择数据')
        flag = false
      } else if (len > 1) {
        this.showMess('仅选择一条数据')
        flag = false
      }
      return flag
    }
  }
}
</script>
<style scoped>
  .questionType {
    width:100%;
    height: 40px;
    background-color:rgb(238, 241, 246);
    line-height:40px;
    font-size:16px;
  }
.topbar-user-arrow {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease 0s, vertical-align 0.2s ease 0s;
}
.active{
  color: red;
}
  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 70px;
}
</style>
