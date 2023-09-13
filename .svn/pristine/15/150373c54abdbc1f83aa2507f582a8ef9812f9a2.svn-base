<template>
  <div>
    <el-row class="but-space">
      <el-col
        :span="3"
        :offset="2"
      >
        <Icon
          style="font-size: 50px"
          type="arrow-down-a"
        />
      </el-col>
      <el-col :span="16">
        <p>填写导入考场的信息</p></br>
        <el-button
          size="mini"
          type="primary"
          @click="downloadExcel"
        >下载模板<i class="ivu-icon ivu-icon-arrow-down-a" /></el-button>
      </el-col>
    </el-row>
    <el-row class="but-space">
      <el-col
        :span="3"
        :offset="2"
      >
        <Icon
          style="font-size: 50px"
          type="upload"
        />
      </el-col>
      <el-col :span="16">
        <p>上传填好的考场信息表 ( 仅支持.xls/.xlsx格式)</p></br>
        <xlsx
          :row="1"
          @on-select-file="handleSelectedFile"
        >
          上传
        </xlsx>
      </el-col>
    </el-row>
    <el-row class="but-space">
      <el-col
        :span="18"
        :offset="5"
      >
        <p>本次已导入记录数 : {{ totalNumber }}条</p>
      </el-col>
    </el-row>

    <el-row class="but-space">
      <el-col
        :span="10"
        :offset="9"
      >
        <el-button class="blueBtn" @click="success">
          完成
        </el-button>
        <el-button class="blueBtn" @click="cancel">
          取消
        </el-button>
      </el-col>
    </el-row>
    <!--导出弹窗-->
    <Modal :mask-closable="false" height="200" v-model="exportModal"
           class-name="vertical-center-modal" :width="500">
      <modal-header slot="header" :content="exportId"></modal-header>
      <ajaxDerive v-if="exportModal" type='excel' fileName='考场信息模板' :url="'/paper/examPlace/exportTemplate'"
                  messTitle="确定要下载模板吗？"
                  @cancel='exportModal = false'></ajaxDerive>
      <div slot="footer"></div>
    </Modal>
    <!--导入-->
    <Modal
      v-model="toChannelModal"
      close-on-click-modal="false"
      width="1100"
      title="对话框标题"
      class-name="vertical-center-modal"
    >
      <modal-header
        slot="header"
        :content="toChannelId"
      />
      <to-channel
        v-if="toChannelModal"
        :handsontable-options="handsontableOptions"
        :url="'/paper/examPlace/importExamPlace'"
        :data="convertedData"
        :format="format"
        @refresh="refresh"
        @cancel="closeChannel"
        @success="subHandelEvent"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>
<script>
// import toChannel from '@/components/common/toChannel_base.vue'
import toChannel from '../../common/toChannel_base-handsontable.vue'
import ajaxDerive from '@/components/common/ajax-derive.vue'
// 当前组件引入全局的util
let Util = null
export default {
  components: {
    toChannel,
    ajaxDerive
  },
  // props接收父组件传递过来的数据
  props: ['operailityData', 'deptId', 'rowObj', 'setTableData'],
  data () {
    return {
      active: 0,
      // 保存按钮基本信息

      handsontableOptions: {
        columns: ''
      },
      exportModal: false,
      exportId: {id: 'exportId', title: '下载模板'},
      ch2en: {
        sex: { // 格式化数据中文对应的英文
          '男': 'BOY', // 对应的中文会被替换成英文
          '女': 'GIRL'
        }
      },
      // 导入条件
      loadBtn: {title: '提交', callParEvent: 'listenSubEvent'},
      toChannelId: {id: 'toChannelId', title: '考场信息表'},
      convertedData: {
      },
      format: {
        '考场名称': 'placeName',
        '考室名称': 'roomName',
        '考室容量': 'roomVolume'
      },

      // 记录总条数
      totalNumber: 0,
      toChannelModal: false,
      // form表单bind数据
      formValidate: {
        file: ''
      },

      // 当前组件提交(add)数据时,ajax处理的 基础信息设置
      addMessTitle: {
        type: 'add',
        successTitle: '添加成功!',
        errorTitle: '添加失败!',
        ajaxSuccess: 'ajaxSuccess',
        ajaxError: 'ajaxError',
        ajaxParams: {
          url: '/api/paper/examPlace/importExamPlace',
          method: 'post'
        }
      },
      // table
      dynamicHt: 100,
      tableData1: [{l: '1'}, {l: '1'}],
      http: ''
    }
  },
  created () {
    // 给当前组件注入全局util
    Util = this.$util
    this.init()
  },
  mounted () {
    // 初始化
    // let http = this.$store.getters.getEnvPath.http
    // this.http = '/api/passport/user/get-import-template'
    // console.log(this.$store.getters.getEnvPath.http, 'http21123')
    this.init()
  },
  methods: {
    /*
       * 组件初始化入口
       * */
    init () {
      // 默认请求加载数据
      // 初始化
    },
    /*
       * 点击提交按钮 监听是否提交数据
       * @param isLoadingFun boolean  form表单验证是否通过
       * */
    listenSubEvent (isLoadingFun) {
      console.log('上传')
      console.log(this.format, 'format')
      let isSubmit = this.submitForm('formValidate')
      if (isSubmit) {
        if (!isLoadingFun) {
          isLoadingFun = function () {
          }
        }
        isLoadingFun(true)
        this.addMessTitle.ajaxParams.data = this.getFormData(this.formValidate)
        this.ajax(this.addMessTitle, isLoadingFun)
      }
    },
    refresh () {
      this.setTableData()
    },
    downloadExcel () {
      this.exportModal = true
    },
    /*
       * 点击提交按钮 监听是否验证通过
       * @param formName string  form表单v-model数据对象名称
       * @return flag boolean   form表单验证是否通过
       * */
    submitForm (formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
        }
      })
      return flag
    },

    /*
       * 当前组件发送事件给父组件
       * 发送关闭(cancel)模态事件给父组件,请求关闭当前模态窗
       * */
    success () {
      this.$emit('cancel', 'toChannel', `导入${this.totalNumber}条数据`)
      this.setTableData()
    },

    cancel () {
      this.$emit('cancel', 'toChannel')
    },
    /*
       * 获取表单数据
       * @return string  格式:id=0&name=aa
       * */
    getFormData (data) {
      let myData = Util._.defaultsDeep({}, data)
      myData.type = data.type.join(',')
      return myData
    },
    // 下一步
    next () {

      this.active = this.active + 1
    },
    load () {
      this.active = 0
    },

    closeChannel () {
      this.toChannelModal = false
    },
    // 点击上传获取文件回调函数
    handleSelectedFile (convertedData) {
      if (convertedData.body === 0) {
        this.errorMess('导入数据为空，请重新选择数据')
        return
      }
      this.handsontableOptions.columns = this.handsontableValidate(convertedData.header)
      this.convertedData = convertedData
      console.log(this.convertedData)
      this.toChannelModal = true
    },

    // 验证必填
    _require (value, callback, message) {
      if (value !== '' && value != null) {
        callback(true)
      } else {
        callback(false)
      }
    },
    /** handsontable验证规则  根据列表头部自动生成验证规则
       * @params  data {Array}  头部
       * @return  {null|Array}  头部
       * */
    handsontableValidate (header) {
      let arr = []
      let index = header.indexOf('性别')
      arr[index] = {
        type: 'autocomplete', // 从里面选择
        source: ['男', '女'], // 数据源
        strict: true // 是否是严格模式，严格模式就只允许从数据源里面选择
      }
      index = header.indexOf('部门节点1')
      arr[index] = {data: index + '', validator: this._require, allowInvalid: true}
      return arr

    },

    // 导入成功回调函数
    subHandelEvent (data) {
      this.closeChannel()
      this.totalNumber += data.length
    }

  }

}
</script>
